'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Vote {
  id: string;
  title: string;
  description: string;
  question: string;
  options: VoteOption[];
  status: 'active' | 'pending' | 'completed' | 'cancelled';
  startDate: string;
  endDate: string;
  createdBy: string;
  commission: string;
  totalVotes: number;
  eligibleVoters: number;
  type: 'single' | 'multiple';
  visibility: 'public' | 'commission' | 'private';
}

interface VoteOption {
  id: string;
  text: string;
  votes: number;
  percentage: number;
}

const mockVotes: Vote[] = [
  {
    id: '1',
    title: 'Nuevo Proyecto Comunitario',
    description: 'Votación para decidir el próximo proyecto comunitario a implementar en el barrio.',
    question: '¿Cuál proyecto te gustaría que se implemente en la comunidad?',
    options: [
      { id: '1-1', text: 'Parque infantil', votes: 45, percentage: 45 },
      { id: '1-2', text: 'Centro de reciclaje', votes: 32, percentage: 32 },
      { id: '1-3', text: 'Biblioteca comunitaria', votes: 23, percentage: 23 }
    ],
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    createdBy: 'María González',
    commission: 'Desarrollo Comunitario',
    totalVotes: 100,
    eligibleVoters: 150,
    type: 'single',
    visibility: 'public'
  },
  {
    id: '2',
    title: 'Presupuesto Comisión Educación',
    description: 'Votación para decidir cómo distribuir el presupuesto de la comisión de educación.',
    question: '¿En qué área priorizar el presupuesto educativo?',
    options: [
      { id: '2-1', text: 'Material didáctico', votes: 28, percentage: 35 },
      { id: '2-2', text: 'Capacitación docente', votes: 25, percentage: 31 },
      { id: '2-3', text: 'Infraestructura', votes: 15, percentage: 19 },
      { id: '2-4', text: 'Actividades extracurriculares', votes: 12, percentage: 15 }
    ],
    status: 'completed',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    createdBy: 'Carlos Ruiz',
    commission: 'Educación y Formación',
    totalVotes: 80,
    eligibleVoters: 120,
    type: 'single',
    visibility: 'commission'
  },
  {
    id: '3',
    title: 'Horarios de Actividades',
    description: 'Votación para establecer los horarios de las actividades comunitarias.',
    question: '¿Qué horarios prefieres para las actividades comunitarias?',
    options: [
      { id: '3-1', text: 'Mañana (8:00 - 12:00)', votes: 35, percentage: 35 },
      { id: '3-2', text: 'Tarde (14:00 - 18:00)', votes: 40, percentage: 40 },
      { id: '3-3', text: 'Noche (19:00 - 22:00)', votes: 25, percentage: 25 }
    ],
    status: 'pending',
    startDate: '2024-02-20',
    endDate: '2024-03-20',
    createdBy: 'Ana Silva',
    commission: 'Desarrollo Comunitario',
    totalVotes: 0,
    eligibleVoters: 200,
    type: 'single',
    visibility: 'public'
  }
];

export default function VotesPage() {
  const [votes, setVotes] = useState<Vote[]>(mockVotes);
  const [filteredVotes, setFilteredVotes] = useState<Vote[]>(mockVotes);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [commissionFilter, setCommissionFilter] = useState<string>('all');
  const [visibilityFilter, setVisibilityFilter] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedVote, setSelectedVote] = useState<Vote | null>(null);

  // Filtros
  useEffect(() => {
    let filtered = votes.filter(vote => {
      const matchesSearch = vote.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          vote.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || vote.status === statusFilter;
      const matchesCommission = commissionFilter === 'all' || vote.commission === commissionFilter;
      const matchesVisibility = visibilityFilter === 'all' || vote.visibility === visibilityFilter;
      
      return matchesSearch && matchesStatus && matchesCommission && matchesVisibility;
    });

    setFilteredVotes(filtered);
  }, [votes, searchTerm, statusFilter, commissionFilter, visibilityFilter]);

  const handleVote = (voteId: string, optionId: string) => {
    setVotes(prev => prev.map(vote => {
      if (vote.id === voteId) {
        const updatedOptions = vote.options.map(option => {
          if (option.id === optionId) {
            return { ...option, votes: option.votes + 1 };
          }
          return option;
        });
        
        // Recalcular porcentajes
        const totalVotes = updatedOptions.reduce((sum, option) => sum + option.votes, 0);
        const optionsWithPercentages = updatedOptions.map(option => ({
          ...option,
          percentage: totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0
        }));
        
        return {
          ...vote,
          options: optionsWithPercentages,
          totalVotes: vote.totalVotes + 1
        };
      }
      return vote;
    }));
  };

  const handleStatusChange = (voteId: string, newStatus: Vote['status']) => {
    setVotes(prev => prev.map(vote => 
      vote.id === voteId ? { ...vote, status: newStatus } : vote
    ));
  };

  const handleDeleteVote = (voteId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta votación?')) {
      setVotes(prev => prev.filter(vote => vote.id !== voteId));
    }
  };

  const getStatusColor = (status: Vote['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getVisibilityColor = (visibility: Vote['visibility']) => {
    switch (visibility) {
      case 'public': return 'bg-blue-100 text-blue-800';
      case 'commission': return 'bg-purple-100 text-purple-800';
      case 'private': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: Vote['status']) => {
    switch (status) {
      case 'active': return 'Activa';
      case 'pending': return 'Pendiente';
      case 'completed': return 'Completada';
      case 'cancelled': return 'Cancelada';
      default: return status;
    }
  };

  const getVisibilityLabel = (visibility: Vote['visibility']) => {
    switch (visibility) {
      case 'public': return 'Pública';
      case 'commission': return 'Comisión';
      case 'private': return 'Privada';
      default: return visibility;
    }
  };

  const isVoteActive = (vote: Vote) => {
    const now = new Date();
    const startDate = new Date(vote.startDate);
    const endDate = new Date(vote.endDate);
    return now >= startDate && now <= endDate && vote.status === 'active';
  };

  const getParticipationRate = (vote: Vote) => {
    return vote.eligibleVoters > 0 ? Math.round((vote.totalVotes / vote.eligibleVoters) * 100) : 0;
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
              <h1 className="text-2xl font-bold text-gray-900">Votaciones Comunitarias</h1>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Crear Votación
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtros */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Búsqueda */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Buscar votaciones</label>
              <input
                type="text"
                placeholder="Título o descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
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
                <option value="active">Activas</option>
                <option value="pending">Pendientes</option>
                <option value="completed">Completadas</option>
                <option value="cancelled">Canceladas</option>
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

            {/* Filtro por visibilidad */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Visibilidad</label>
              <select
                value={visibilityFilter}
                onChange={(e) => setVisibilityFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">Todas las visibilidades</option>
                <option value="public">Pública</option>
                <option value="commission">Comisión</option>
                <option value="private">Privada</option>
              </select>
            </div>
          </div>
        </div>

        {/* Lista de votaciones */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredVotes.map((vote) => (
            <div key={vote.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(vote.status)}`}>
                      {getStatusLabel(vote.status)}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getVisibilityColor(vote.visibility)}`}>
                      {getVisibilityLabel(vote.visibility)}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {vote.commission}
                  </div>
                </div>

                {/* Título y descripción */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{vote.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{vote.description}</p>

                {/* Pregunta */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-900 mb-2">{vote.question}</p>
                </div>

                {/* Opciones de votación */}
                <div className="space-y-3 mb-4">
                  {vote.options.map((option) => (
                    <div key={option.id} className="relative">
                      <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div className="flex items-center space-x-3">
                          {isVoteActive(vote) && vote.status === 'active' ? (
                            <button
                              onClick={() => handleVote(vote.id, option.id)}
                              className="w-4 h-4 border border-gray-300 rounded-full hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                              <div className="w-2 h-2 bg-indigo-600 rounded-full mx-auto mt-0.5"></div>
                            </button>
                          ) : (
                            <div className="w-4 h-4 border border-gray-300 rounded-full bg-gray-100"></div>
                          )}
                          <span className="text-sm text-gray-900">{option.text}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">{option.votes} votos</div>
                          <div className="text-xs text-gray-500">{option.percentage}%</div>
                        </div>
                      </div>
                      
                      {/* Barra de progreso */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-b-lg">
                        <div 
                          className="h-1 bg-indigo-600 rounded-b-lg transition-all duration-300"
                          style={{ width: `${option.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Estadísticas */}
                <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                  <div>
                    <div className="text-lg font-semibold text-gray-900">{vote.totalVotes}</div>
                    <div className="text-xs text-gray-500">Total votos</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-gray-900">{getParticipationRate(vote)}%</div>
                    <div className="text-xs text-gray-500">Participación</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-gray-900">{vote.eligibleVoters}</div>
                    <div className="text-xs text-gray-500">Elegibles</div>
                  </div>
                </div>

                {/* Fechas */}
                <div className="text-xs text-gray-500 mb-4">
                  <div>Inicio: {new Date(vote.startDate).toLocaleDateString('es-CL')}</div>
                  <div>Fin: {new Date(vote.endDate).toLocaleDateString('es-CL')}</div>
                  <div>Creado por: {vote.createdBy}</div>
                </div>

                {/* Acciones */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedVote(vote)}
                    className="flex-1 bg-indigo-600 text-white px-3 py-2 rounded-md text-sm hover:bg-indigo-700 transition-colors"
                  >
                    Ver Detalles
                  </button>
                  {vote.status === 'pending' && (
                    <button
                      onClick={() => handleStatusChange(vote.id, 'active')}
                      className="flex-1 bg-green-600 text-white px-3 py-2 rounded-md text-sm hover:bg-green-700 transition-colors"
                    >
                      Activar
                    </button>
                  )}
                  {vote.status === 'active' && (
                    <button
                      onClick={() => handleStatusChange(vote.id, 'completed')}
                      className="flex-1 bg-gray-600 text-white px-3 py-2 rounded-md text-sm hover:bg-gray-700 transition-colors"
                    >
                      Finalizar
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteVote(vote.id)}
                    className="px-3 py-2 text-red-600 hover:text-red-900 text-sm"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Estadísticas generales */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Estadísticas de Votaciones</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">{votes.length}</div>
              <div className="text-sm text-gray-500">Total votaciones</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {votes.filter(v => v.status === 'active').length}
              </div>
              <div className="text-sm text-gray-500">Votaciones activas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {votes.reduce((sum, v) => sum + v.totalVotes, 0)}
              </div>
              <div className="text-sm text-gray-500">Total de votos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round(votes.reduce((sum, v) => sum + getParticipationRate(v), 0) / votes.length)}%
              </div>
              <div className="text-sm text-gray-500">Participación promedio</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 