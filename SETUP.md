# 🚀 Configuración de Supabase para Comunidad Dashboard

## 📋 Pasos para configurar la base de datos

### 1. Crear cuenta en Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Haz clic en "Start your project"
3. Regístrate con tu cuenta de Google
4. Crea una nueva organización: "Comunidad para el Desarrollo"
5. Crea un nuevo proyecto:
   - **Nombre**: `comunidad-dashboard`
   - **Contraseña de DB**: `Comunidad2024!` (guárdala)
   - **Región**: `South America (São Paulo)`

### 2. Configurar la base de datos

1. Ve al **SQL Editor** en el dashboard de Supabase
2. Copia y pega el contenido de `database/schema.sql`
3. Ejecuta el script completo
4. Verifica que se crearon las tablas en **Table Editor**

### 3. Obtener credenciales

1. Ve a **Settings** → **API**
2. Copia:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4. Configurar variables de entorno

1. Crea un archivo `.env.local` en la raíz del proyecto
2. Copia el contenido de `config/env.example`
3. Reemplaza las credenciales con las reales de Supabase

```bash
# Ejemplo de .env.local
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

### 5. Configurar autenticación

1. Ve a **Authentication** → **Providers**
2. Habilita **Google** y configura:
   - **Client ID**: (obtener de Google Cloud Console)
   - **Client Secret**: (obtener de Google Cloud Console)
3. Configura **Site URL**: `http://localhost:3000`
4. Configura **Redirect URLs**: `http://localhost:3000/auth/callback`

### 6. Probar la conexión

```bash
npm run dev
```

Ve a `http://localhost:3000` y verifica que no hay errores en la consola.

## 🔧 Configuración adicional

### Políticas de seguridad (RLS)

Las políticas básicas ya están configuradas en el schema. Puedes ajustarlas en:
**Authentication** → **Policies**

### Funciones de base de datos

El schema incluye:
- Triggers para `updated_at`
- Logging de actividad
- Índices para performance

## 📊 Estructura de la base de datos

### Tablas principales:

1. **`commissions`** - Comisiones temáticas
2. **`members`** - Miembros de la comunidad
3. **`projects`** - Proyectos por comisión
4. **`payments`** - Sistema de pagos
5. **`activity_logs`** - Auditoría de cambios

### Relaciones:

- `members.commission_id` → `commissions.id`
- `projects.commission_id` → `commissions.id`
- `payments.member_id` → `members.id`

## 🚨 Troubleshooting

### Error: "Invalid API key"
- Verifica que las credenciales en `.env.local` sean correctas
- Asegúrate de que el archivo `.env.local` esté en la raíz del proyecto

### Error: "Table does not exist"
- Ejecuta el script SQL completo en Supabase
- Verifica que todas las tablas se crearon correctamente

### Error de autenticación
- Verifica la configuración de Google OAuth
- Asegúrate de que las URLs de redirección estén configuradas

## 📚 Recursos adicionales

- [Documentación de Supabase](https://supabase.com/docs)
- [Guía de autenticación](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security) 