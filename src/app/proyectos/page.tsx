'use client';

import { useState } from 'react';
import Link from 'next/link';

// Tipos para los proyectos
interface Project {
  id: string;
  title: string;
  description: string;
  commission: string;
  lead: string;
  progress: number;
  status: 'active' | 'completed' | 'paused';
  startDate: string;
  endDate?: string;
  members: number;
  impact: {
    beneficiaries: number;
    hoursVolunteered: number;
    fundsRaised: number;
  };
  lastUpdate: string;
  nextMilestone: string;
}

// Datos de ejemplo para proyectos
const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Alfabetización Digital para Adultos',
    description: 'Programa de capacitación en tecnologías básicas para adultos mayores en comunidades rurales.',
    commission: 'Educación y Formación',
    lead: 'Dr. Patricia López',
    progress: 75,
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2024-06-30',
    members: 12,
    impact: {
      beneficiaries: 150,
      hoursVolunteered: 480,
      fundsRaised: 2500000
    },
    lastUpdate: '2024-01-20',
    nextMilestone: 'Finalización de módulo 3 - 25 de enero'
  },
  {
    id: '2',
    title: 'Clínica Móvil de Salud Preventiva',
    description: 'Servicios de salud preventiva y educación sanitaria en comunidades de difícil acceso.',
    commission: 'Salud y Bienestar',
    lead: 'Dr. Roberto Silva',
    progress: 45,
    status: 'active',
    startDate: '2024-02-01',
    endDate: '2024-08-31',
    members: 8,
    impact: {
      beneficiaries: 300,
      hoursVolunteered: 320,
      fundsRaised: 1800000
    },
    lastUpdate: '2024-01-18',
    nextMilestone: 'Adquisición de equipamiento médico - 30 de enero'
  },
  {
    id: '3',
    title: 'Reforestación Comunitaria',
    description: 'Plantación de árboles nativos y educación ambiental en parques urbanos.',
    commission: 'Medio Ambiente',
    lead: 'Ing. Carmen Vega',
    progress: 90,
    status: 'active',
    startDate: '2023-11-01',
    endDate: '2024-03-31',
    members: 15,
    impact: {
      beneficiaries: 500,
      hoursVolunteered: 720,
      fundsRaised: 1200000
    },
    lastUpdate: '2024-01-22',
    nextMilestone: 'Ceremonia de cierre - 15 de febrero'
  },
  {
    id: '4',
    title: 'App de Conectividad Rural',
    description: 'Desarrollo de aplicación móvil para conectar comunidades rurales con servicios esenciales.',
    commission: 'Tecnología',
    lead: 'Ing. Alejandro Torres',
    progress: 30,
    status: 'active',
    startDate: '2024-01-10',
    endDate: '2024-12-31',
    members: 6,
    impact: {
      beneficiaries: 200,
      hoursVolunteered: 180,
      fundsRaised: 3500000
    },
    lastUpdate: '2024-01-19',
    nextMilestone: 'Prototipo funcional - 5 de febrero'
  }
];

export default function ProyectosPage() {
  const [selectedCommission, setSelectedCommission] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Filtrar proyectos según los filtros seleccionados
  const filteredProjects = mockProjects.filter(project => {
    const commissionMatch = selectedCommission === 'all' || project.commission === selectedCommission;
    const statusMatch = selectedStatus === 'all' || project.status === selectedStatus;
    return commissionMatch && statusMatch;
  });

  // Obtener comisiones únicas
  const commissions = ['all', ...Array.from(new Set(mockProjects.map(p => p.commission)))];

  // Función para obtener el color del estado
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Función para obtener el color de la barra de progreso
  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
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
              <h1 className="text-2xl font-bold text-gray-900">Proyectos de la Comunidad</h1>
            </div>
            <Link
              href="/dashboard"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtros */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filtrar por Comisión
              </label>
              <select
                value={selectedCommission}
                onChange={(e) => setSelectedCommission(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                {commissions.map(commission => (
                  <option key={commission} value={commission}>
                    {commission === 'all' ? 'Todas las comisiones' : commission}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filtrar por Estado
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">Todos los estados</option>
                <option value="active">Activos</option>
                <option value="completed">Completados</option>
                <option value="paused">Pausados</option>
              </select>
            </div>
          </div>
        </div>

        {/* Estadísticas generales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-indigo-500 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Proyectos</dt>
                    <dd className="text-lg font-medium text-gray-900">{mockProjects.length}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Beneficiarios</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {mockProjects.reduce((sum, p) => sum + p.impact.beneficiaries, 0).toLocaleString()}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Horas Voluntarias</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {mockProjects.reduce((sum, p) => sum + p.impact.hoursVolunteered, 0).toLocaleString()}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Fondos Recaudados</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      ${(mockProjects.reduce((sum, p) => sum + p.impact.fundsRaised, 0) / 1000000).toFixed(1)}M CLP
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de proyectos */}
        <div className="space-y-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                      <span className={`ml-3 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                        {project.status === 'active' ? 'Activo' : 
                         project.status === 'completed' ? 'Completado' : 'Pausado'}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{project.description}</p>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <span className="mr-4">Comisión: {project.commission}</span>
                      <span className="mr-4">Líder: {project.lead}</span>
                      <span>{project.members} miembros</span>
                    </div>
                  </div>
                </div>

                {/* Barra de progreso */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Progreso</span>
                    <span className="text-sm text-gray-500">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getProgressColor(project.progress)}`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Métricas de impacto */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm font-medium text-gray-500">Beneficiarios</div>
                    <div className="text-lg font-semibold text-gray-900">{project.impact.beneficiaries.toLocaleString()}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm font-medium text-gray-500">Horas Voluntarias</div>
                    <div className="text-lg font-semibold text-gray-900">{project.impact.hoursVolunteered.toLocaleString()}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm font-medium text-gray-500">Fondos Recaudados</div>
                    <div className="text-lg font-semibold text-gray-900">${(project.impact.fundsRaised / 1000).toLocaleString()}K CLP</div>
                  </div>
                </div>

                {/* Información adicional */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-gray-500">
                  <div>
                    <p>Última actualización: {project.lastUpdate}</p>
                    <p>Próximo hito: {project.nextMilestone}</p>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <Link
                      href={project.title === 'Alfabetización Digital para Adultos' ? '/proyectos/alfabetizacion-digital' : `/proyectos/${project.id}`}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Ver Detalles
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mensaje cuando no hay proyectos */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No se encontraron proyectos</h3>
            <p className="mt-1 text-sm text-gray-500">
              Intenta ajustar los filtros para ver más resultados.
            </p>
          </div>
        )}
      </main>
    </div>
  );
} 