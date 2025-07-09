-- Esquema de base de datos para Comunidad para el Desarrollo
-- Basado en el PRD v1.0

-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Tabla de comisiones (debe ir primero por las foreign keys)
CREATE TABLE commissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    lead_id UUID, -- Referencia a un miembro que es líder
    okr_text TEXT, -- Objetivos y resultados clave
    kpi_json JSONB DEFAULT '{}', -- Métricas en formato JSON
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de miembros
CREATE TABLE members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    country TEXT NOT NULL,
    commission_id UUID REFERENCES commissions(id) ON DELETE SET NULL,
    cause TEXT, -- Causa asignada (manual o por IA)
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'alumni')),
    participation_score INTEGER DEFAULT 0 CHECK (participation_score >= 0 AND participation_score <= 100),
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de proyectos
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    commission_id UUID NOT NULL REFERENCES commissions(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    progress_pct INTEGER DEFAULT 0 CHECK (progress_pct >= 0 AND progress_pct <= 100),
    last_update TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    summary_ai TEXT, -- Resumen generado por IA
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de pagos
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
    amount_clp INTEGER NOT NULL CHECK (amount_clp > 0),
    due_date DATE NOT NULL,
    paid_at TIMESTAMP WITH TIME ZONE,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de actividad (logs para auditoría)
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES members(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    table_name TEXT NOT NULL,
    record_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejorar performance
CREATE INDEX idx_members_email ON members(email);
CREATE INDEX idx_members_commission ON members(commission_id);
CREATE INDEX idx_members_status ON members(status);
CREATE INDEX idx_projects_commission ON projects(commission_id);
CREATE INDEX idx_payments_member ON payments(member_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_due_date ON payments(due_date);
CREATE INDEX idx_activity_logs_user ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_created ON activity_logs(created_at);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para updated_at
CREATE TRIGGER update_members_updated_at BEFORE UPDATE ON members FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_commissions_updated_at BEFORE UPDATE ON commissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Función para registrar actividad
CREATE OR REPLACE FUNCTION log_activity()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO activity_logs (user_id, action, table_name, record_id, new_values)
        VALUES (current_setting('app.current_user_id', true)::UUID, 'INSERT', TG_TABLE_NAME, NEW.id, to_jsonb(NEW));
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO activity_logs (user_id, action, table_name, record_id, old_values, new_values)
        VALUES (current_setting('app.current_user_id', true)::UUID, 'UPDATE', TG_TABLE_NAME, NEW.id, to_jsonb(OLD), to_jsonb(NEW));
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO activity_logs (user_id, action, table_name, record_id, old_values)
        VALUES (current_setting('app.current_user_id', true)::UUID, 'DELETE', TG_TABLE_NAME, OLD.id, to_jsonb(OLD));
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

-- Triggers para logging de actividad
CREATE TRIGGER log_members_activity AFTER INSERT OR UPDATE OR DELETE ON members FOR EACH ROW EXECUTE FUNCTION log_activity();
CREATE TRIGGER log_commissions_activity AFTER INSERT OR UPDATE OR DELETE ON commissions FOR EACH ROW EXECUTE FUNCTION log_activity();
CREATE TRIGGER log_projects_activity AFTER INSERT OR UPDATE OR DELETE ON projects FOR EACH ROW EXECUTE FUNCTION log_activity();
CREATE TRIGGER log_payments_activity AFTER INSERT OR UPDATE OR DELETE ON payments FOR EACH ROW EXECUTE FUNCTION log_activity();

-- Datos iniciales de comisiones (según el PRD)
INSERT INTO commissions (name, okr_text, kpi_json) VALUES
('Educación y Formación', 'Mejorar el acceso a educación de calidad en comunidades vulnerables', '{"target_members": 50, "target_projects": 10}'),
('Salud y Bienestar', 'Promover hábitos saludables y acceso a servicios básicos de salud', '{"target_members": 40, "target_projects": 8}'),
('Medio Ambiente', 'Implementar proyectos de sostenibilidad y conservación ambiental', '{"target_members": 35, "target_projects": 7}'),
('Tecnología', 'Bridging the digital divide through technology education and access', '{"target_members": 30, "target_projects": 6}'),
('Desarrollo Comunitario', 'Fortalecer el tejido social y la participación ciudadana', '{"target_members": 25, "target_projects": 5}'),
('Emprendimiento', 'Apoyar el desarrollo de microempresas y emprendedores locales', '{"target_members": 20, "target_projects": 4}');

-- Políticas de seguridad RLS (Row Level Security)
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Políticas básicas (se pueden ajustar según necesidades)
CREATE POLICY "Members can view their own data" ON members FOR SELECT USING (auth.uid()::text = id::text);
CREATE POLICY "Admins can view all members" ON members FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Commissions are viewable by all" ON commissions FOR SELECT USING (true);
CREATE POLICY "Projects are viewable by all" ON projects FOR SELECT USING (true);
CREATE POLICY "Payments can be viewed by member or admin" ON payments FOR SELECT USING (auth.uid()::text = member_id::text OR auth.jwt() ->> 'role' = 'admin'); 