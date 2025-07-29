'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  type: 'meeting' | 'workshop' | 'volunteer' | 'social' | 'training';
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  maxParticipants: number;
  currentParticipants: number;
  organizer: string;
  commission: string;
  tags: string[];
  imageUrl?: string;
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Taller de Alfabetización Digital',
    description: 'Taller para enseñar habilidades digitales básicas a adultos mayores de la comunidad.',
    startDate: '2024-02-15T09:00:00',
    endDate: '2024-02-15T12:00:00',
    location: 'Centro Comunitario San José',
    type: 'workshop',
    status: 'upcoming',
    maxParticipants: 20,
    currentParticipants: 15,
    organizer: 'María González',
    commission: 'Educación y Formación',
    tags: ['educación', 'tecnología', 'adultos mayores']
  },
  {
    id: '2',
    title: 'Jornada de Salud Preventiva',
    description: 'Chequeos médicos gratuitos para la comunidad.',
    startDate: '2024-02-20T08:00:00',
    endDate: '2024-02-20T17:00:00',
    location: 'Plaza Central',
    type: 'volunteer',
    status: 'upcoming',
    maxParticipants: 50,
    currentParticipants: 35,
    organizer: 'Dr. Carlos Ruiz',
    commission: 'Salud y Bienestar',
    tags: ['salud', 'prevención', 'gratuito']
  },
  {
    id: '3',
    title: 'Reunión de Coordinación Mensual',
    description: 'Reunión mensual para coordinar actividades y proyectos comunitarios.',
    startDate: '2024-02-10T18:00:00',
    endDate: '2024-02-10T20:00:00',
    location: 'Sala de Reuniones',
    type: 'meeting',
    status: 'completed',
    maxParticipants: 30,
    currentParticipants: 25,
    organizer: 'Carmen Vega',
    commission: 'Desarrollo Comunitario',
    tags: ['coordinación', 'reunión']
  },
  {
    id: '4',
    title: 'Campaña de Reciclaje',
    description: 'Campaña para promover el reciclaje en la comunidad.',
    startDate: '2024-02-25T10:00:00',
    endDate: '2024-02-25T16:00:00',
    location: 'Parque Municipal',
    type: 'volunteer',
    status: 'upcoming',
    maxParticipants: 40,
    currentParticipants: 28,
    organizer: 'Ana Silva',
    commission: 'Medio Ambiente',
    tags: ['medio ambiente', 'reciclaje', 'voluntariado']
  }
];

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(mockEvents);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [commissionFilter, setCommissionFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'calendar' | 'grid'>('list');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  // Filtros
  useEffect(() => {
    let filtered = events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = typeFilter === 'all' || event.type === typeFilter;
      const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
      const matchesCommission = commissionFilter === 'all' || event.commission === commissionFilter;
      
      return matchesSearch && matchesType && matchesStatus && matchesCommission;
    });

    setFilteredEvents(filtered);
  }, [events, searchTerm, typeFilter, statusFilter, commissionFilter]);

  const handleDeleteEvent = (eventId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este evento?')) {
      setEvents(prev => prev.filter(event => event.id !== eventId));
    }
  };

  const handleStatusChange = (eventId: string, newStatus: Event['status']) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId ? { ...event, status: newStatus } : event
    ));
  };

  const getTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800';
      case 'workshop': return 'bg-green-100 text-green-800';
      case 'volunteer': return 'bg-purple-100 text-purple-800';
      case 'social': return 'bg-pink-100 text-pink-800';
      case 'training': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: Event['status']) => {
    switch (status) {
      case 'upcoming': return 'bg-green-100 text-green-800';
      case 'ongoing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: Event['type']) => {
    switch (type) {
      case 'meeting': return 'Reunión';
      case 'workshop': return 'Taller';
      case 'volunteer': return 'Voluntariado';
      case 'social': return 'Social';
      case 'training': return 'Capacitación';
      default: return type;
    }
  };

  const getStatusLabel = (status: Event['status']) => {
    switch (status) {
      case 'upcoming': return 'Próximo';
      case 'ongoing': return 'En curso';
      case 'completed': return 'Completado';
      case 'cancelled': return 'Cancelado';
      default: return status;
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
              <h1 className="text-2xl font-bold text-gray-900">Gestión de Eventos</h1>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Crear Evento
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtros y controles */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Búsqueda */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Buscar eventos</label>
              <input
                type="text"
                placeholder="Título, descripción o ubicación..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Filtro por tipo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de evento</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">Todos los tipos</option>
                <option value="meeting">Reunión</option>
                <option value="workshop">Taller</option>
                <option value="volunteer">Voluntariado</option>
                <option value="social">Social</option>
                <option value="training">Capacitación</option>
              </select>
            </div>

            {/* Filtro por estado */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">Todos los estados</option>
                <option value="upcoming">Próximos</option>
                <option value="ongoing">En curso</option>
                <option value="completed">Completados</option>
                <option value="cancelled">Cancelados</option>
              </select>
            </div>

            {/* Filtro por comisión */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Comisión</label>
              <select
                value={commissionFilter}
                onChange={(e) => setCommissionFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">Todas las comisiones</option>
                <option value="Educación y Formación">Educación y Formación</option>
                <option value="Salud y Bienestar">Salud y Bienestar</option>
                <option value="Medio Ambiente">Medio Ambiente</option>
                <option value="Tecnología">Tecnología</option>
                <option value="Desarrollo Comunitario">Desarrollo Comunitario</option>
              </select>
            </div>
          </div>

          {/* Modo de vista */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Vista:</span>
              <div className="flex border border-gray-300 rounded-md">
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1 text-sm ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
                >
                  Lista
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1 text-sm ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
                >
                  Cuadrícula
                </button>
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`px-3 py-1 text-sm ${viewMode === 'calendar' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
                >
                  Calendario
                </button>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {filteredEvents.length} eventos encontrados
            </div>
          </div>
        </div>

        {/* Vista de lista */}
        {viewMode === 'list' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Evento
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha y Hora
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ubicación
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tipo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Participantes
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredEvents.map((event) => (
                    <tr key={event.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{event.title}</div>
                          <div className="text-sm text-gray-500">{event.description.substring(0, 100)}...</div>
                          <div className="text-xs text-gray-400">Organizado por: {event.organizer}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(event.startDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {event.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(event.type)}`}>
                          {getTypeLabel(event.type)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(event.status)}`}>
                          {getStatusLabel(event.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {event.currentParticipants}/{event.maxParticipants}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingEvent(event)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleStatusChange(event.id, event.status === 'upcoming' ? 'cancelled' : 'upcoming')}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            {event.status === 'upcoming' ? 'Cancelar' : 'Reactivar'}
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(event.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Vista de cuadrícula */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(event.type)}`}>
                      {getTypeLabel(event.type)}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(event.status)}`}>
                      {getStatusLabel(event.status)}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{event.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formatDate(event.startDate)}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {event.organizer}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-gray-500">
                      {event.currentParticipants}/{event.maxParticipants} participantes
                    </div>
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full" 
                        style={{ width: `${(event.currentParticipants / event.maxParticipants) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingEvent(event)}
                      className="flex-1 bg-indigo-600 text-white px-3 py-2 rounded-md text-sm hover:bg-indigo-700 transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleStatusChange(event.id, event.status === 'upcoming' ? 'cancelled' : 'upcoming')}
                      className="flex-1 bg-gray-600 text-white px-3 py-2 rounded-md text-sm hover:bg-gray-700 transition-colors"
                    >
                      {event.status === 'upcoming' ? 'Cancelar' : 'Reactivar'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Vista de calendario (simplificada) */}
        {viewMode === 'calendar' && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-center text-gray-500">
              <p>Vista de calendario en desarrollo</p>
              <p className="text-sm">Esta funcionalidad estará disponible próximamente</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 