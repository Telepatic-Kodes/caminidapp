// Datos mock para el dashboard de comunidad

export const mockEvents = [
  {
    id: '1',
    title: 'Reunión de Comisión Educación',
    description: 'Reunión mensual para planificar actividades educativas',
    date: '2024-01-20',
    time: '18:00',
    location: 'Sala de Reuniones',
    type: 'meeting' as const,
    attendees: 12,
    maxAttendees: 20,
    commission: 'Educación y Formación'
  },
  {
    id: '2',
    title: 'Taller de Alfabetización Digital',
    description: 'Taller para enseñar uso básico de computadoras',
    date: '2024-01-22',
    time: '15:00',
    location: 'Laboratorio de Computación',
    type: 'workshop' as const,
    attendees: 8,
    maxAttendees: 15,
    commission: 'Educación y Formación'
  },
  {
    id: '3',
    title: 'Campaña de Limpieza Comunitaria',
    description: 'Actividad de voluntariado para limpiar espacios públicos',
    date: '2024-01-25',
    time: '09:00',
    location: 'Parque Central',
    type: 'volunteer' as const,
    attendees: 25,
    maxAttendees: 30,
    commission: 'Medio Ambiente'
  },
  {
    id: '4',
    title: 'Capacitación en Primeros Auxilios',
    description: 'Curso básico de primeros auxilios para la comunidad',
    date: '2024-01-28',
    time: '14:00',
    location: 'Centro Comunitario',
    type: 'training' as const,
    attendees: 18,
    maxAttendees: 25,
    commission: 'Salud y Bienestar'
  },
  {
    id: '5',
    title: 'Cena de Integración',
    description: 'Cena para fortalecer lazos entre miembros',
    date: '2024-01-30',
    time: '19:00',
    location: 'Restaurante Comunitario',
    type: 'social' as const,
    attendees: 35,
    maxAttendees: 40,
    commission: 'Desarrollo Comunitario'
  }
];

export const mockTasks = [
  {
    id: '1',
    title: 'Preparar material para taller de alfabetización',
    description: 'Organizar computadoras y material didáctico para el taller del 22 de enero',
    status: 'in-progress' as const,
    priority: 'high' as const,
    assignee: 'María González',
    commission: 'Educación y Formación',
    dueDate: '2024-01-21',
    createdAt: '2024-01-15',
    tags: ['educación', 'tecnología', 'taller']
  },
  {
    id: '2',
    title: 'Revisar presupuesto de comisión de salud',
    description: 'Revisar y aprobar el presupuesto trimestral de la comisión',
    status: 'review' as const,
    priority: 'medium' as const,
    assignee: 'Dr. Roberto Silva',
    commission: 'Salud y Bienestar',
    dueDate: '2024-01-25',
    createdAt: '2024-01-10',
    tags: ['finanzas', 'presupuesto', 'salud']
  },
  {
    id: '3',
    title: 'Organizar campaña de reciclaje',
    description: 'Planificar y coordinar la campaña de reciclaje mensual',
    status: 'todo' as const,
    priority: 'high' as const,
    assignee: 'Ing. Carmen Vega',
    commission: 'Medio Ambiente',
    dueDate: '2024-01-30',
    createdAt: '2024-01-18',
    tags: ['medio ambiente', 'reciclaje', 'campaña']
  },
  {
    id: '4',
    title: 'Actualizar base de datos de miembros',
    description: 'Revisar y actualizar información de todos los miembros activos',
    status: 'completed' as const,
    priority: 'low' as const,
    assignee: 'Alejandro Torres',
    commission: 'Tecnología',
    dueDate: '2024-01-20',
    createdAt: '2024-01-05',
    tags: ['datos', 'administración', 'miembros']
  },
  {
    id: '5',
    title: 'Preparar presentación para reunión de directorio',
    description: 'Crear presentación con avances y métricas del trimestre',
    status: 'in-progress' as const,
    priority: 'urgent' as const,
    assignee: 'Sra. Isabel Morales',
    commission: 'Desarrollo Comunitario',
    dueDate: '2024-01-23',
    createdAt: '2024-01-16',
    tags: ['presentación', 'directorio', 'métricas']
  }
];

export const mockResources = [
  {
    id: '1',
    name: 'Laptop Dell Inspiron',
    description: 'Computadora portátil para talleres de tecnología',
    category: 'technology' as const,
    quantity: 5,
    available: 3,
    location: 'Laboratorio de Computación',
    condition: 'good' as const,
    lastMaintenance: '2024-01-10',
    assignedTo: 'María González',
    commission: 'Educación y Formación',
    purchaseDate: '2023-06-15',
    purchasePrice: 450000
  },
  {
    id: '2',
    name: 'Proyector Epson',
    description: 'Proyector multimedia para presentaciones',
    category: 'equipment' as const,
    quantity: 2,
    available: 1,
    location: 'Sala de Reuniones',
    condition: 'excellent' as const,
    lastMaintenance: '2024-01-05',
    assignedTo: 'Dr. Roberto Silva',
    commission: 'Salud y Bienestar',
    purchaseDate: '2023-08-20',
    purchasePrice: 280000
  },
  {
    id: '3',
    name: 'Mesa de Reuniones',
    description: 'Mesa grande para reuniones de comisión',
    category: 'furniture' as const,
    quantity: 1,
    available: 1,
    location: 'Sala de Reuniones',
    condition: 'good' as const,
    lastMaintenance: '2023-12-15',
    assignedTo: '',
    commission: 'General',
    purchaseDate: '2023-03-10',
    purchasePrice: 120000
  },
  {
    id: '4',
    name: 'Libros de Alfabetización',
    description: 'Colección de libros para programa de alfabetización',
    category: 'books' as const,
    quantity: 50,
    available: 45,
    location: 'Biblioteca Comunitaria',
    condition: 'good' as const,
    lastMaintenance: '2024-01-12',
    assignedTo: '',
    commission: 'Educación y Formación',
    purchaseDate: '2023-09-05',
    purchasePrice: 75000
  },
  {
    id: '5',
    name: 'Kit de Primeros Auxilios',
    description: 'Kit completo de primeros auxilios para emergencias',
    category: 'equipment' as const,
    quantity: 3,
    available: 2,
    location: 'Centro de Salud',
    condition: 'maintenance' as const,
    lastMaintenance: '2024-01-15',
    assignedTo: 'Dr. Roberto Silva',
    commission: 'Salud y Bienestar',
    purchaseDate: '2023-11-20',
    purchasePrice: 95000
  },
  {
    id: '6',
    name: 'Contenedores de Reciclaje',
    description: 'Contenedores para separación de residuos',
    category: 'materials' as const,
    quantity: 20,
    available: 15,
    location: 'Almacén de Materiales',
    condition: 'fair' as const,
    lastMaintenance: '2023-12-20',
    assignedTo: 'Ing. Carmen Vega',
    commission: 'Medio Ambiente',
    purchaseDate: '2023-07-10',
    purchasePrice: 180000
  }
];

// Datos existentes del dashboard
export const mockDashboardData = {
  totalMembers: 156,
  activeMembers: 142,
  totalCommissions: 6,
  activeProjects: 23,
  participationRate: 78,
  pendingApprovals: 8,
  recentActivity: [
    { id: 1, member: 'María González', action: 'se unió a Educación y Formación', time: '2 horas' },
    { id: 2, member: 'Carlos Ruiz', action: 'completó proyecto "Alfabetización Digital"', time: '5 horas' },
    { id: 3, member: 'Ana Silva', action: 'reportó avances en proyecto de salud', time: '1 día' },
    { id: 4, member: 'Luis Mendoza', action: 'se unió a Medio Ambiente', time: '2 días' },
  ],
  commissionStats: [
    { name: 'Educación y Formación', members: 45, projects: 8, lead: 'Dr. Patricia López' },
    { name: 'Salud y Bienestar', members: 32, projects: 6, lead: 'Dr. Roberto Silva' },
    { name: 'Medio Ambiente', members: 28, projects: 5, lead: 'Ing. Carmen Vega' },
    { name: 'Tecnología', members: 25, projects: 4, lead: 'Ing. Alejandro Torres' },
    { name: 'Desarrollo Comunitario', members: 18, projects: 3, lead: 'Sra. Isabel Morales' },
    { name: 'Emprendimiento', members: 8, projects: 2, lead: 'Sr. Manuel Rojas' },
  ],
  pendingMembers: [
    { id: '1', name: 'Juan Pérez', email: 'juan@email.com', commission: 'Educación', submittedAt: '2024-01-15' },
    { id: '2', name: 'María García', email: 'maria@email.com', commission: 'Salud', submittedAt: '2024-01-14' },
    { id: '3', name: 'Carlos López', email: 'carlos@email.com', commission: 'Tecnología', submittedAt: '2024-01-13' },
  ],
  overduePayments: [
    { id: '1', member: 'Ana Silva', amount: 50000, dueDate: '2024-01-10', daysOverdue: 5 },
    { id: '2', member: 'Luis Mendoza', amount: 75000, dueDate: '2024-01-08', daysOverdue: 7 },
    { id: '3', member: 'Carmen Vega', amount: 60000, dueDate: '2024-01-05', daysOverdue: 10 },
  ]
}; 