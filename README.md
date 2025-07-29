# Comunidad Dashboard

Una plataforma integral de gestión comunitaria desarrollada con Next.js, TypeScript y Tailwind CSS.

## 🚀 Funcionalidades Implementadas

### ✅ Dashboard Interactivo
- **Métricas en tiempo real** con actualizaciones automáticas
- **Gráficos dinámicos** de crecimiento y participación
- **Acciones rápidas** para acceso directo a funcionalidades
- **Sistema de roles** con permisos diferenciados
- **Notificaciones en tiempo real** con WebSocket

### ✅ Gestión de Miembros
- **CRUD completo** de miembros de la comunidad
- **Búsqueda avanzada** por nombre, email y comisión
- **Filtros múltiples** por estado, rol y comisión
- **Acciones en lote** para gestión masiva
- **Sistema de aprobación** de nuevos miembros
- **Estadísticas individuales** de participación

### ✅ Sistema de Eventos
- **Creación y gestión** de eventos comunitarios
- **Múltiples tipos** de eventos (talleres, voluntariado, reuniones)
- **Sistema de registro** para participantes
- **Calendario interactivo** con vista de eventos
- **Filtros avanzados** por tipo, estado y comisión
- **Gestión de ubicaciones** y horarios

### ✅ Sistema de Pagos
- **Integración con pasarelas** (Stripe, PayPal, MercadoPago)
- **Gestión de cuotas** y pagos mensuales
- **Seguimiento de pagos** vencidos y pendientes
- **Generación de recibos** automática
- **Configuración de pasarelas** desde el panel
- **Reportes financieros** detallados

### ✅ Sistema de Votaciones
- **Creación de votaciones** comunitarias
- **Múltiples tipos** de votación (única, múltiple)
- **Sistema de participación** en tiempo real
- **Resultados dinámicos** con gráficos
- **Control de visibilidad** (pública, comisión, privada)
- **Historial de votaciones** completadas

### ✅ Notificaciones en Tiempo Real
- **Sistema de notificaciones** push y email
- **Diferentes tipos** de notificaciones (info, warning, success, error)
- **Sonidos configurables** para alertas
- **Acciones directas** desde notificaciones
- **Gestión de preferencias** por usuario
- **WebSocket** para actualizaciones instantáneas

### ✅ Configuración Avanzada
- **Panel de configuración** completo del sistema
- **Gestión de integraciones** con servicios externos
- **Configuración de email** SMTP
- **Políticas de seguridad** y contraseñas
- **Configuración de almacenamiento** (local, S3, Cloudinary)
- **Gestión de zonas horarias** e idiomas

### ✅ Portal de Miembros
- **Área dedicada** para miembros de la comunidad
- **Dashboard personalizado** con estadísticas individuales
- **Gestión de eventos** y registros
- **Seguimiento de proyectos** y participación
- **Historial de pagos** y estado de cuenta
- **Acceso a recursos** y documentación
- **Perfil personalizable** con estadísticas

## 🛠️ Tecnologías Utilizadas

- **Next.js 14** - Framework de React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de estilos
- **Chart.js** - Gráficos y visualizaciones
- **Supabase** - Base de datos y autenticación
- **Clerk** - Gestión de usuarios y organizaciones
- **WebSocket** - Comunicación en tiempo real

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── dashboard/          # Dashboard principal
│   ├── miembros/          # Gestión de miembros
│   ├── eventos/           # Sistema de eventos
│   ├── pagos/             # Sistema de pagos
│   ├── votaciones/        # Sistema de votaciones
│   ├── portal/            # Portal de miembros
│   ├── configuracion/     # Configuración del sistema
│   ├── tareas/            # Tablero de tareas
│   ├── recursos/          # Gestión de recursos
│   └── layout.tsx         # Layout principal
├── components/
│   ├── RealTimeMetrics.tsx        # Métricas en tiempo real
│   ├── RealTimeNotifications.tsx  # Notificaciones en tiempo real
│   ├── StatsChart.tsx             # Componente de gráficos
│   ├── SearchBar.tsx              # Barra de búsqueda
│   ├── NotificationCenter.tsx     # Centro de notificaciones
│   ├── EventCalendar.tsx          # Calendario de eventos
│   ├── TaskBoard.tsx              # Tablero de tareas
│   ├── ResourceManager.tsx        # Gestor de recursos
│   └── LoadingSpinner.tsx         # Componente de carga
└── lib/
    ├── supabase.ts        # Configuración de Supabase
    └── mockData.ts        # Datos de ejemplo
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/comunidad-dashboard.git
cd comunidad-dashboard
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env.local
```

Editar `.env.local` con tus configuraciones:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima

# Clerk (Autenticación)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=tu_clave_publica
CLERK_SECRET_KEY=tu_clave_secreta

# Stripe (Pagos)
STRIPE_PUBLISHABLE_KEY=tu_clave_publica_stripe
STRIPE_SECRET_KEY=tu_clave_secreta_stripe

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu_email@gmail.com
SMTP_PASSWORD=tu_contraseña_de_aplicacion
```

4. **Ejecutar en desarrollo**
```bash
npm run dev
```

5. **Abrir en el navegador**
```
http://localhost:3000
```

## 🔧 Configuración de Base de Datos

### Supabase Setup

1. Crear proyecto en [Supabase](https://supabase.com)
2. Ejecutar las siguientes migraciones SQL:

```sql
-- Tabla de miembros
CREATE TABLE members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  phone VARCHAR,
  commission VARCHAR NOT NULL,
  role VARCHAR NOT NULL DEFAULT 'member',
  status VARCHAR NOT NULL DEFAULT 'active',
  join_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de eventos
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR NOT NULL,
  description TEXT,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  location VARCHAR NOT NULL,
  type VARCHAR NOT NULL,
  status VARCHAR NOT NULL DEFAULT 'upcoming',
  max_participants INTEGER,
  organizer_id UUID REFERENCES members(id),
  commission VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de pagos
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID REFERENCES members(id),
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR DEFAULT 'CLP',
  status VARCHAR NOT NULL DEFAULT 'pending',
  payment_method VARCHAR NOT NULL,
  gateway VARCHAR NOT NULL,
  due_date DATE NOT NULL,
  paid_date DATE,
  description TEXT,
  transaction_id VARCHAR,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de votaciones
CREATE TABLE votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR NOT NULL,
  description TEXT,
  question TEXT NOT NULL,
  type VARCHAR NOT NULL DEFAULT 'single',
  status VARCHAR NOT NULL DEFAULT 'pending',
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  created_by UUID REFERENCES members(id),
  commission VARCHAR NOT NULL,
  visibility VARCHAR NOT NULL DEFAULT 'public',
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 📊 Características Destacadas

### 🔄 Tiempo Real
- **WebSocket** para actualizaciones instantáneas
- **Notificaciones push** en tiempo real
- **Métricas dinámicas** que se actualizan automáticamente
- **Sincronización** entre múltiples usuarios

### 🔐 Seguridad
- **Autenticación** con Clerk
- **Autorización** basada en roles
- **Políticas de contraseñas** configurables
- **Autenticación de dos factores** opcional
- **Sesiones seguras** con timeout configurable

### 📱 Responsive Design
- **Diseño adaptativo** para móviles y tablets
- **Interfaz intuitiva** con navegación clara
- **Accesibilidad** siguiendo estándares WCAG
- **Tema oscuro** (próximamente)

### 🔧 Configurabilidad
- **Panel de configuración** completo
- **Integraciones** con servicios externos
- **Personalización** de apariencia
- **Gestión de idiomas** y zonas horarias

## 🚀 Despliegue

### Vercel (Recomendado)

1. **Conectar repositorio** a Vercel
2. **Configurar variables de entorno** en el dashboard de Vercel
3. **Desplegar automáticamente** en cada push

### Docker

```bash
# Construir imagen
docker build -t comunidad-dashboard .

# Ejecutar contenedor
docker run -p 3000:3000 comunidad-dashboard
```

## 🤝 Contribución

1. **Fork** el proyecto
2. **Crear** una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abrir** un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 📞 Soporte

- **Email**: soporte@comunidad-dashboard.com
- **Documentación**: [docs.comunidad-dashboard.com](https://docs.comunidad-dashboard.com)
- **Issues**: [GitHub Issues](https://github.com/tu-usuario/comunidad-dashboard/issues)

## 🎯 Roadmap

### Próximas Funcionalidades
- [ ] **Chat comunitario** en tiempo real
- [ ] **Sistema de gamificación** con puntos y badges
- [ ] **API pública** para integraciones externas
- [ ] **App móvil** nativa (React Native)
- [ ] **Análisis avanzado** con machine learning
- [ ] **Sistema de donaciones** integrado
- [ ] **Múltiples idiomas** (inglés, portugués)
- [ ] **Tema oscuro** completo
- [ ] **Exportación de datos** en múltiples formatos
- [ ] **Sistema de backup** automático

---

**Desarrollado con ❤️ para comunidades que quieren crecer juntas**
