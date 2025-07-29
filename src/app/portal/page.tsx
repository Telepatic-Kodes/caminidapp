'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Member {
  id: string;
  name: string;
  email: string;
  commission: string;
  role: string;
  joinDate: string;
  profileImage?: string;
  stats: {
    eventsAttended: number;
    volunteerHours: number;
    projectsContributed: number;
    paymentsMade: number;
  };
}

interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  type: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  registered: boolean;
}

interface Project {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'planning';
  progress: number;
  participants: number;
  deadline: string;
}

const mockMember: Member = {
  id: '1',
  name: 'María González',
  email: 'maria.gonzalez@email.com',
  commission: 'Educación y Formación',
  role: 'Miembro',
  joinDate: '2024-01-15',
  stats: {
    eventsAttended: 12,
    volunteerHours: 45,
    projectsContributed: 3,
    paymentsMade: 6
  }
};

const mockEvents: CommunityEvent[] = [
  {
    id: '1',
    title: 'Taller de Alfabetización Digital',
    description: 'Taller para enseñar habilidades digitales básicas a adultos mayores.',
    date: '2024-02-15T09:00:00',
    location: 'Centro Comunitario San José',
    type: 'workshop',
    status: 'upcoming',
    registered: true
  },
  {
    id: '2',
    title: 'Jornada de Salud Preventiva',
    description: 'Chequeos médicos gratuitos para la comunidad.',
    date: '2024-02-20T08:00:00',
    location: 'Plaza Central',
    type: 'volunteer',
    status: 'upcoming',
    registered: false
  },
  {
    id: '3',
    title: 'Reunión de Coordinación Mensual',
    description: 'Reunión mensual para coordinar actividades comunitarias.',
    date: '2024-02-10T18:00:00',
    location: 'Sala de Reuniones',
    type: 'meeting',
    status: 'completed',
    registered: true
  }
];

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Alfabetización Digital',
    description: 'Proyecto para enseñar habilidades digitales a adultos mayores.',
    status: 'active',
    progress: 75,
    participants: 15,
    deadline: '2024-03-15'
  },
  {
    id: '2',
    title: 'Huerto Comunitario',
    description: 'Creación de un huerto comunitario para promover la sostenibilidad.',
    status: 'planning',
    progress: 25,
    participants: 8,
    deadline: '2024-04-30'
  },
  {
    id: '3',
    title: 'Biblioteca Móvil',
    description: 'Implementación de una biblioteca móvil para zonas rurales.',
    status: 'completed',
    progress: 100,
    participants: 12,
    deadline: '2024-01-30'
  }
];

export default function PortalPage() {
  const [member, setMember] = useState<Member>(mockMember);
  const [events, setEvents] = useState<CommunityEvent[]>(mockEvents);
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [activeTab, setActiveTab] = useState('overview');
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleEventRegistration = (eventId: string) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId ? { ...event, registered: !event.registered } : event
    ));
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'workshop': return 'bg-blue-100 text-blue-800';
      case 'volunteer': return 'bg-green-100 text-green-800';
      case 'meeting': return 'bg-purple-100 text-purple-800';
      case 'social': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventStatusColor = (status: CommunityEvent['status']) => {
    switch (status) {
      case 'upcoming': return 'bg-yellow-100 text-yellow-800';
      case 'ongoing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProjectStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const tabs = [
    { id: 'overview', name: 'Resumen', icon: '📊' },
    { id: 'events', name: 'Eventos', icon: '📅' },
    { id: 'projects', name: 'Proyectos', icon: '📋' },
    { id: 'payments', name: 'Pagos', icon: '💰' },
    { id: 'voting', name: 'Votaciones', icon: '🗳️' },
    { id: 'resources', name: 'Recursos', icon: '📚' },
    { id: 'profile', name: 'Mi Perfil', icon: '👤' }
  ];

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Estadísticas del miembro */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Eventos Asistidos</dt>
                <dd className="text-lg font-medium text-gray-900">{member.stats.eventsAttended}</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Horas Voluntarias</dt>
                <dd className="text-lg font-medium text-gray-900">{member.stats.volunteerHours}</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
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
                <dt className="text-sm font-medium text-gray-500 truncate">Proyectos</dt>
                <dd className="text-lg font-medium text-gray-900">{member.stats.projectsContributed}</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Pagos Realizados</dt>
                <dd className="text-lg font-medium text-gray-900">{member.stats.paymentsMade}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Próximos eventos */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Próximos Eventos</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {events.filter(e => e.status === 'upcoming').slice(0, 3).map((event) => (
              <div key={event.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{event.title}</h4>
                    <p className="text-sm text-gray-500">{formatDate(event.date)}</p>
                    <p className="text-xs text-gray-400">{event.location}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getEventTypeColor(event.type)}`}>
                    {event.type}
                  </span>
                  <button
                    onClick={() => handleEventRegistration(event.id)}
                    className={`px-3 py-1 text-xs rounded-md ${
                      event.registered
                        ? 'bg-red-100 text-red-800 hover:bg-red-200'
                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                    }`}
                  >
                    {event.registered ? 'Cancelar' : 'Registrarse'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Proyectos activos */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Mis Proyectos</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {projects.filter(p => p.status === 'active').map((project) => (
              <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-gray-900">{project.title}</h4>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getProjectStatusColor(project.status)}`}>
                    {project.status === 'active' ? 'Activo' : project.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Progreso</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{project.participants} participantes</span>
                    <span>Vence: {new Date(project.deadline).toLocaleDateString('es-CL')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderEventsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Todos los Eventos</h3>
        <div className="flex space-x-2">
          <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
            <option value="all">Todos los tipos</option>
            <option value="workshop">Talleres</option>
            <option value="volunteer">Voluntariado</option>
            <option value="meeting">Reuniones</option>
            <option value="social">Sociales</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
            <option value="all">Todos los estados</option>
            <option value="upcoming">Próximos</option>
            <option value="ongoing">En curso</option>
            <option value="completed">Completados</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getEventTypeColor(event.type)}`}>
                  {event.type}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getEventStatusColor(event.status)}`}>
                  {event.status === 'upcoming' ? 'Próximo' : 
                   event.status === 'ongoing' ? 'En curso' : 'Completado'}
                </span>
              </div>
              
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h4>
              <p className="text-sm text-gray-600 mb-4">{event.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formatDate(event.date)}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {event.location}
                </div>
              </div>
              
              <button
                onClick={() => handleEventRegistration(event.id)}
                disabled={event.status === 'completed'}
                className={`w-full px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  event.registered
                    ? 'bg-red-100 text-red-800 hover:bg-red-200'
                    : 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'
                } ${event.status === 'completed' ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {event.status === 'completed' ? 'Evento completado' :
                 event.registered ? 'Cancelar registro' : 'Registrarse'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProjectsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Mis Proyectos</h3>
        <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
          <option value="all">Todos los estados</option>
          <option value="active">Activos</option>
          <option value="completed">Completados</option>
          <option value="planning">En planificación</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900">{project.title}</h4>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getProjectStatusColor(project.status)}`}>
                  {project.status === 'active' ? 'Activo' : 
                   project.status === 'completed' ? 'Completado' : 'Planificación'}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">{project.description}</p>
              
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>Progreso</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{project.participants} participantes</span>
                  <span>Vence: {new Date(project.deadline).toLocaleDateString('es-CL')}</span>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 bg-indigo-600 text-white px-3 py-2 rounded-md text-sm hover:bg-indigo-700 transition-colors">
                    Ver Detalles
                  </button>
                  <button className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-md text-sm hover:bg-gray-200 transition-colors">
                    Participar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPaymentsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Estado de Pagos</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">6</div>
            <div className="text-sm text-green-600">Pagos realizados</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">1</div>
            <div className="text-sm text-yellow-600">Pago pendiente</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">$180,000</div>
            <div className="text-sm text-blue-600">Total aportado</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Historial de Pagos</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              { month: 'Enero 2024', amount: 30000, status: 'completed', date: '2024-01-15' },
              { month: 'Diciembre 2023', amount: 30000, status: 'completed', date: '2023-12-15' },
              { month: 'Noviembre 2023', amount: 30000, status: 'completed', date: '2023-11-15' },
              { month: 'Febrero 2024', amount: 30000, status: 'pending', date: '2024-02-15' }
            ].map((payment, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <div className="text-sm font-medium text-gray-900">{payment.month}</div>
                  <div className="text-sm text-gray-500">${payment.amount.toLocaleString()} CLP</div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    payment.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {payment.status === 'completed' ? 'Completado' : 'Pendiente'}
                  </span>
                  <button className="text-indigo-600 hover:text-indigo-900 text-sm">
                    Ver recibo
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderVotingTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Votaciones Activas</h3>
        <div className="space-y-4">
          {[
            {
              id: '1',
              title: 'Nuevo Proyecto Comunitario',
              description: 'Votación para decidir el próximo proyecto comunitario a implementar.',
              endDate: '2024-02-15',
              participated: true,
              totalVotes: 45
            },
            {
              id: '2',
              title: 'Presupuesto Comisión Educación',
              description: 'Votación para decidir cómo distribuir el presupuesto de la comisión.',
              endDate: '2024-02-20',
              participated: false,
              totalVotes: 32
            }
          ].map((vote) => (
            <div key={vote.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-gray-900">{vote.title}</h4>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  vote.participated ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {vote.participated ? 'Participado' : 'Pendiente'}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{vote.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Vence: {new Date(vote.endDate).toLocaleDateString('es-CL')}</span>
                <span>{vote.totalVotes} votos</span>
              </div>
              <button className="mt-3 w-full bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700 transition-colors">
                {vote.participated ? 'Ver resultados' : 'Participar'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderResourcesTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'Manual de Miembro', type: 'pdf', size: '2.3 MB', downloads: 156 },
          { title: 'Reglamento Comunitario', type: 'pdf', size: '1.8 MB', downloads: 89 },
          { title: 'Guía de Eventos', type: 'pdf', size: '3.1 MB', downloads: 234 },
          { title: 'Plantilla de Proyectos', type: 'docx', size: '456 KB', downloads: 67 },
          { title: 'Presentación Comisión', type: 'pptx', size: '5.2 MB', downloads: 123 },
          { title: 'Base de Datos Miembros', type: 'xlsx', size: '789 KB', downloads: 45 }
        ].map((resource, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-500 uppercase">{resource.type}</span>
              </div>
              
              <h4 className="text-sm font-medium text-gray-900 mb-2">{resource.title}</h4>
              
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span>{resource.size}</span>
                <span>{resource.downloads} descargas</span>
              </div>
              
              <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700 transition-colors">
                Descargar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-6 mb-6">
          <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-2xl font-medium text-gray-600">
              {member.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
            <p className="text-gray-600">{member.email}</p>
            <p className="text-sm text-gray-500">Miembro desde {new Date(member.joinDate).toLocaleDateString('es-CL')}</p>
          </div>
          <button
            onClick={() => setShowProfileModal(true)}
            className="ml-auto bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Editar Perfil
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Información Personal</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre completo</label>
                <p className="text-sm text-gray-900">{member.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="text-sm text-gray-900">{member.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Comisión</label>
                <p className="text-sm text-gray-900">{member.commission}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Rol</label>
                <p className="text-sm text-gray-900">{member.role}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Estadísticas</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Eventos asistidos</span>
                <span className="text-sm font-medium text-gray-900">{member.stats.eventsAttended}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Horas voluntarias</span>
                <span className="text-sm font-medium text-gray-900">{member.stats.volunteerHours}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Proyectos contribuidos</span>
                <span className="text-sm font-medium text-gray-900">{member.stats.projectsContributed}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Pagos realizados</span>
                <span className="text-sm font-medium text-gray-900">{member.stats.paymentsMade}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverviewTab();
      case 'events':
        return renderEventsTab();
      case 'projects':
        return renderProjectsTab();
      case 'payments':
        return renderPaymentsTab();
      case 'voting':
        return renderVotingTab();
      case 'resources':
        return renderResourcesTab();
      case 'profile':
        return renderProfileTab();
      default:
        return renderOverviewTab();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/dashboard" className="text-indigo-600 hover:text-indigo-500 mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Portal de Miembros</h1>
                <p className="text-sm text-gray-600">Bienvenido, {member.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h6v-2H4v2zM4 15h6v-2H4v2zM4 11h6V9H4v2zM4 7h6V5H4v2zM10 7h10V5H10v2zM10 11h10V9H10v2zM10 15h10v-2H10v2z" />
                </svg>
              </button>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab content */}
        {renderTabContent()}
      </main>
    </div>
  );
} 