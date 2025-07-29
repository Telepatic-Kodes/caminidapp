'use client';

import { useState } from 'react';
import Link from 'next/link';
import NotificationCenter from '@/components/NotificationCenter';
import SearchBar from '@/components/SearchBar';
import StatsChart from '@/components/StatsChart';

// Definimos los tipos para los roles
type UserRole = 'admin' | 'coordinator' | 'mentor' | 'director' | 'member';

// Datos de ejemplo para el dashboard (en un proyecto real vendrían de una API)
const mockData = {
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

// Configuración de permisos por rol
const rolePermissions = {
  admin: {
    canApproveMembers: true,
    canManageUsers: true,
    canViewAllCommissions: true,
    canManagePayments: true,
    canGenerateReports: true,
    canViewAnalytics: true,
  },
  coordinator: {
    canApproveMembers: true,
    canManageUsers: false,
    canViewAllCommissions: false,
    canManagePayments: false,
    canGenerateReports: true,
    canViewAnalytics: true,
  },
  mentor: {
    canApproveMembers: false,
    canManageUsers: false,
    canViewAllCommissions: false,
    canManagePayments: false,
    canGenerateReports: false,
    canViewAnalytics: true,
  },
  director: {
    canApproveMembers: true,
    canManageUsers: true,
    canViewAllCommissions: true,
    canManagePayments: true,
    canGenerateReports: true,
    canViewAnalytics: true,
  },
  member: {
    canApproveMembers: false,
    canManageUsers: false,
    canViewAllCommissions: false,
    canManagePayments: false,
    canGenerateReports: false,
    canViewAnalytics: false,
  },
};

export default function DashboardPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');
  const [currentRole, setCurrentRole] = useState<UserRole>('admin');

  // Estado para notificaciones
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'warning' as const,
      title: 'Pagos vencidos',
      message: 'Tienes 3 pagos vencidos que requieren atención inmediata.',
      timestamp: 'Hace 2 horas',
      read: false,
      action: {
        label: 'Ver pagos',
        onClick: () => console.log('Ver pagos vencidos')
      }
    },
    {
      id: '2',
      type: 'info' as const,
      title: 'Nuevos miembros',
      message: '5 nuevos miembros esperan aprobación en tu comisión.',
      timestamp: 'Hace 4 horas',
      read: false,
      action: {
        label: 'Revisar',
        onClick: () => console.log('Revisar miembros')
      }
    },
    {
      id: '3',
      type: 'success' as const,
      title: 'Proyecto completado',
      message: 'El proyecto "Alfabetización Digital" ha sido completado exitosamente.',
      timestamp: 'Hace 1 día',
      read: true
    }
  ]);

  const permissions = rolePermissions[currentRole];

  // Función para aprobar miembros
  const handleApproveMember = (memberId: string) => {
    // Aquí iría la lógica para aprobar al miembro
    console.log(`Aprobando miembro: ${memberId}`);
    // En un proyecto real, harías una llamada a la API
  };

  // Función para rechazar miembros
  const handleRejectMember = (memberId: string) => {
    // Aquí iría la lógica para rechazar al miembro
    console.log(`Rechazando miembro: ${memberId}`);
    // En un proyecto real, harías una llamada a la API
  };

  // Funciones para manejar notificaciones
  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const handleDismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="text-indigo-600 hover:text-indigo-500 mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard de Comunidad</h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* Barra de búsqueda */}
              <SearchBar placeholder="Buscar miembros, proyectos..." />
              
              {/* Centro de notificaciones */}
              <NotificationCenter
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
                onDismiss={handleDismissNotification}
              />
              
              {/* Selector de rol */}
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Rol:</label>
                <select
                  value={currentRole}
                  onChange={(e) => setCurrentRole(e.target.value as UserRole)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="admin">Administrador</option>
                  <option value="coordinator">Coordinador</option>
                  <option value="mentor">Mentor</option>
                  <option value="director">Director</option>
                  <option value="member">Miembro</option>
                </select>
              </div>
              
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="week">Última semana</option>
                <option value="month">Último mes</option>
                <option value="quarter">Último trimestre</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Métricas principales */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {/* Total de miembros */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-indigo-500 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Miembros</dt>
                    <dd className="text-lg font-medium text-gray-900">{mockData.totalMembers}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Miembros activos */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Miembros Activos</dt>
                    <dd className="text-lg font-medium text-gray-900">{mockData.activeMembers}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Proyectos activos */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Proyectos Activos</dt>
                    <dd className="text-lg font-medium text-gray-900">{mockData.activeProjects}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Tasa de participación */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Participación</dt>
                    <dd className="text-lg font-medium text-gray-900">{mockData.participationRate}%</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alertas para administradores */}
        {permissions.canApproveMembers && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Miembros pendientes de aprobación */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <span className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>
                  Miembros Pendientes ({mockData.pendingMembers.length})
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {mockData.pendingMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.email}</p>
                        <p className="text-xs text-gray-400">Comisión: {member.commission}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleApproveMember(member.id)}
                          className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition-colors"
                        >
                          Aprobar
                        </button>
                        <button
                          onClick={() => handleRejectMember(member.id)}
                          className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
                        >
                          Rechazar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pagos vencidos */}
            {permissions.canManagePayments && (
              <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center">
                    <span className="w-3 h-3 bg-red-400 rounded-full mr-2"></span>
                    Pagos Vencidos ({mockData.overduePayments.length})
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {mockData.overduePayments.map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{payment.member}</p>
                          <p className="text-sm text-gray-500">${payment.amount.toLocaleString()} CLP</p>
                          <p className="text-xs text-red-600">{payment.daysOverdue} días vencido</p>
                        </div>
                        <button className="px-3 py-1 bg-indigo-500 text-white text-xs rounded hover:bg-indigo-600 transition-colors">
                          Enviar Recordatorio
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Estadísticas por comisión */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Miembros por Comisión</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {mockData.commissionStats.map((commission, index) => (
                  <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-indigo-500 rounded-full mr-3"></div>
                      <div>
                        <span className="text-sm font-medium text-gray-900">{commission.name}</span>
                        <p className="text-xs text-gray-500">Líder: {commission.lead}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">{commission.projects} proyectos</span>
                      <span className="text-sm font-medium text-gray-900">{commission.members} miembros</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actividad reciente */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Actividad Reciente</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {mockData.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{activity.member}</span> {activity.action}
                      </p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sección de acciones rápidas */}
        <div className="mt-8 bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Acciones Rápidas</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {permissions.canApproveMembers && (
                <Link
                  href="/registro"
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8 h-8 bg-indigo-100 rounded-md flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-900">Agregar Miembro</span>
                </Link>
              )}

              <Link
                href="/proyectos"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-900">Ver Proyectos</span>
              </Link>

              <Link
                href="/eventos"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-900">Gestionar Eventos</span>
              </Link>

              <Link
                href="/tareas"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-900">Tablero de Tareas</span>
              </Link>

              <Link
                href="/recursos"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-8 h-8 bg-orange-100 rounded-md flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-900">Gestionar Recursos</span>
              </Link>

              {permissions.canGenerateReports && (
                <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h6v-2H4v2zM4 15h6v-2H4v2zM4 11h6V9H4v2zM4 7h6V5H4v2zM10 7h10V5H10v2zM10 11h10V9H10v2zM10 15h10v-2H10v2z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-900">Generar Reporte</span>
                </button>
              )}

              {permissions.canManageUsers && (
                <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 bg-red-100 rounded-md flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-900">Gestionar Usuarios</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Sección de gráficos y estadísticas */}
        {permissions.canViewAnalytics && (
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Análisis y Estadísticas</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <StatsChart
                title="Crecimiento de Miembros"
                type="line"
                data={{
                  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                  datasets: [{
                    label: 'Miembros',
                    data: [120, 135, 142, 148, 152, 156],
                    backgroundColor: '#3b82f6',
                    borderColor: '#3b82f6'
                  }]
                }}
              />
              
              <StatsChart
                title="Distribución por Comisión"
                type="doughnut"
                data={{
                  labels: ['Educación', 'Salud', 'Medio Ambiente', 'Tecnología', 'Comunidad', 'Emprendimiento'],
                  datasets: [{
                    label: 'Miembros',
                    data: [45, 32, 28, 25, 18, 8],
                    backgroundColor: '#10b981',
                    borderColor: '#10b981'
                  }]
                }}
              />
              
              <StatsChart
                title="Horas Voluntarias por Mes"
                type="bar"
                data={{
                  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                  datasets: [{
                    label: 'Horas',
                    data: [1200, 1350, 1420, 1480, 1520, 1560],
                    backgroundColor: '#f59e0b',
                    borderColor: '#f59e0b'
                  }]
                }}
              />
              
              <StatsChart
                title="Participación en Proyectos"
                type="bar"
                data={{
                  labels: ['Educación', 'Salud', 'Medio Ambiente', 'Tecnología', 'Comunidad', 'Emprendimiento'],
                  datasets: [{
                    label: 'Proyectos',
                    data: [8, 6, 5, 4, 3, 2],
                    backgroundColor: '#8b5cf6',
                    borderColor: '#8b5cf6'
                  }]
                }}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 