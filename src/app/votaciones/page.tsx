'use client';

import { useState } from 'react';

// Mock voting data
const mockPolls = [
  {
    id: 1,
    title: '¿Cuál debería ser el tema del próximo evento?',
    description: 'Vota por el tema que más te interese para nuestro próximo evento de networking',
    options: [
      { id: 1, text: 'Inteligencia Artificial y Machine Learning', votes: 45, percentage: 45 },
      { id: 2, text: 'Emprendimiento y Startups', votes: 32, percentage: 32 },
      { id: 3, text: 'Marketing Digital y Growth Hacking', votes: 18, percentage: 18 },
      { id: 4, text: 'Fintech y Blockchain', votes: 5, percentage: 5 }
    ],
    totalVotes: 100,
    status: 'active',
    endDate: '2024-01-25',
    category: 'eventos'
  },
  {
    id: 2,
    title: '¿Deberíamos implementar un sistema de mentoría?',
    description: 'Vota si crees que sería beneficioso tener un programa de mentoría en la comunidad',
    options: [
      { id: 1, text: 'Sí, definitivamente', votes: 78, percentage: 78 },
      { id: 2, text: 'Sí, pero con algunas condiciones', votes: 15, percentage: 15 },
      { id: 3, text: 'No, no es necesario', votes: 7, percentage: 7 }
    ],
    totalVotes: 100,
    status: 'closed',
    endDate: '2024-01-20',
    category: 'gobernanza'
  }
];

export default function VotacionesPage() {
  const [activeTab, setActiveTab] = useState('active');
  const [polls, setPolls] = useState(mockPolls);
  const [showCreatePoll, setShowCreatePoll] = useState(false);
  const [newPoll, setNewPoll] = useState({
    title: '',
    description: '',
    category: 'general',
    endDate: '',
    options: ['', '', '']
  });

  const handleVote = (pollId: number, optionId: number) => {
    setPolls(polls.map(poll => {
      if (poll.id === pollId) {
        const updatedOptions = poll.options.map(option => {
          if (option.id === optionId) {
            return { ...option, votes: option.votes + 1 };
          }
          return option;
        });
        
        const totalVotes = updatedOptions.reduce((sum, option) => sum + option.votes, 0);
        const updatedOptionsWithPercentage = updatedOptions.map(option => ({
          ...option,
          percentage: Math.round((option.votes / totalVotes) * 100)
        }));
        
        return {
          ...poll,
          options: updatedOptionsWithPercentage,
          totalVotes
        };
      }
      return poll;
    }));
  };

  const handleCreatePoll = () => {
    const poll = {
      id: Date.now(),
      title: newPoll.title,
      description: newPoll.description,
      options: newPoll.options.filter(option => option.trim() !== '').map((option, index) => ({
        id: index + 1,
        text: option,
        votes: 0,
        percentage: 0
      })),
      totalVotes: 0,
      status: 'active',
      endDate: newPoll.endDate,
      category: newPoll.category
    };
    
    setPolls([poll, ...polls]);
    setShowCreatePoll(false);
    setNewPoll({
      title: '',
      description: '',
      category: 'general',
      endDate: '',
      options: ['', '', '']
    });
  };

  const filteredPolls = polls.filter(poll => 
    activeTab === 'active' ? poll.status === 'active' : poll.status === 'closed'
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Votaciones</h1>
          <p className="text-gray-600">Participa en las decisiones de la comunidad</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <nav className="flex space-x-8">
              {[
                { id: 'active', label: 'Votaciones Activas' },
                { id: 'closed', label: 'Votaciones Cerradas' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
            
            {activeTab === 'active' && (
              <button
                onClick={() => setShowCreatePoll(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Crear Votación
              </button>
            )}
          </div>
        </div>

        {/* Polls List */}
        <div className="space-y-6">
          {filteredPolls.map((poll) => (
            <div key={poll.id} className="bg-white rounded-lg shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{poll.title}</h3>
                    <p className="text-gray-600 mt-1">{poll.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      poll.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {poll.status === 'active' ? 'Activa' : 'Cerrada'}
                    </span>
                    <span className="text-sm text-gray-500">
                      {poll.totalVotes} votos
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {poll.options.map((option) => (
                    <div key={option.id} className="relative">
                      <button
                        onClick={() => poll.status === 'active' && handleVote(poll.id, option.id)}
                        disabled={poll.status === 'closed'}
                        className={`w-full p-4 rounded-lg border-2 transition-all ${
                          poll.status === 'active'
                            ? 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                            : 'border-gray-100 bg-gray-50 cursor-not-allowed'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-gray-900">{option.text}</span>
                          <div className="flex items-center space-x-3">
                            <span className="text-sm font-semibold text-gray-600">
                              {option.votes} votos
                            </span>
                            <span className="text-sm font-semibold text-blue-600">
                              {option.percentage}%
                            </span>
                          </div>
                        </div>
                        
                        {/* Progress bar */}
                        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${option.percentage}%` }}
                          ></div>
                        </div>
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>Categoría: {poll.category}</span>
                    <span>Termina: {new Date(poll.endDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPolls.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {activeTab === 'active' ? 'No hay votaciones activas' : 'No hay votaciones cerradas'}
            </p>
          </div>
        )}
      </div>

      {/* Create Poll Modal */}
      {showCreatePoll && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Crear Nueva Votación</h3>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
                  <input
                    type="text"
                    value={newPoll.title}
                    onChange={(e) => setNewPoll({...newPoll, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="¿Cuál debería ser el tema del próximo evento?"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                  <textarea
                    value={newPoll.description}
                    onChange={(e) => setNewPoll({...newPoll, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe el propósito de esta votación..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
                  <select
                    value={newPoll.category}
                    onChange={(e) => setNewPoll({...newPoll, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="general">General</option>
                    <option value="eventos">Eventos</option>
                    <option value="gobernanza">Gobernanza</option>
                    <option value="proyectos">Proyectos</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Cierre</label>
                  <input
                    type="date"
                    value={newPoll.endDate}
                    onChange={(e) => setNewPoll({...newPoll, endDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Opciones</label>
                  <div className="space-y-2">
                    {newPoll.options.map((option, index) => (
                      <input
                        key={index}
                        type="text"
                        value={option}
                        onChange={(e) => {
                          const updatedOptions = [...newPoll.options];
                          updatedOptions[index] = e.target.value;
                          setNewPoll({...newPoll, options: updatedOptions});
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={`Opción ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowCreatePoll(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handleCreatePoll}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Crear Votación
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 