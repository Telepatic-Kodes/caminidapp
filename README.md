# Comunidad Dashboard - SaaS MVP

Un dashboard completo para gestión de comunidades, construido con Next.js, TypeScript y datos mock para desarrollo rápido.

## 🚀 Características

- **Dashboard interactivo** con KPIs y métricas en tiempo real
- **Gráficos interactivos** usando Chart.js (barras, dona, líneas)
- **Diseño responsive** que se adapta a móviles, tablets y desktop
- **Sistema de registro** de miembros con validación
- **Gestión de proyectos** con páginas de detalles
- **Mock data completo** para desarrollo sin dependencias externas
- **UI/UX moderna** con Tailwind CSS

## 🛠️ Tecnologías

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Gráficos**: Chart.js, react-chartjs-2
- **Control de versiones**: Git
- **Desarrollo**: ESLint, Prettier

## 📁 Estructura del Proyecto

```
comunidad-dashboard/
├── src/
│   ├── app/                    # App Router de Next.js
│   │   ├── dashboard/          # Página principal del dashboard
│   │   ├── proyectos/          # Lista y detalles de proyectos
│   │   ├── registro/           # Formulario de registro
│   │   └── api/                # API routes
│   ├── components/             # Componentes reutilizables
│   └── lib/                    # Utilidades y datos mock
├── public/                     # Archivos estáticos
└── package.json
```

## 🚀 Cómo ejecutar el proyecto

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/Telepatic-Codes/cpd.git
cd cpd
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:3000
```

## 📊 Páginas Disponibles

- **`/`** - Página principal con navegación
- **`/dashboard`** - Dashboard con KPIs y métricas
- **`/proyectos`** - Lista de proyectos activos
- **`/proyectos/alfabetizacion-digital`** - Detalles del proyecto con gráficos
- **`/registro`** - Formulario de registro de miembros

## 🎨 Características de UI/UX

- **Diseño responsive** con breakpoints para móvil, tablet y desktop
- **Gráficos interactivos** con hover effects y tooltips
- **Animaciones suaves** y transiciones
- **Paleta de colores consistente** y accesible
- **Tipografía escalable** y legible

## 📈 KPIs y Métricas

El dashboard incluye métricas clave como:
- Número de beneficiarios
- Horas voluntarias
- Fondos recaudados
- Progreso de proyectos
- Tendencias temporales

## 🔧 Desarrollo

### Comandos útiles

```bash
# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar tests
npm run test

# Linting
npm run lint
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Tomas** - [Telepatic-Codes](https://github.com/Telepatic-Codes)

---

⭐ **¡Si te gusta este proyecto, dale una estrella en GitHub!**
