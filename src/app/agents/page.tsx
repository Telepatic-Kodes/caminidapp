'use client';

import { useState } from 'react';

// Mock agent responses
const mockAgentResponse = async (agentType: string, input: string) => {
  const responses = {
    content: {
      suggestions: [
        '🚀 ¡Nuevo evento de networking! Conecta con profesionales del sector',
        '💡 Workshop de IA: Aprende las últimas tendencias en tecnología',
        '🌟 ¡Únete a nuestra comunidad! Crecimiento profesional garantizado'
      ],
      variants: [
        '🔥 Evento imperdible: Networking profesional este viernes',
        '📈 ¿Buscas crecer? Únete a nuestro próximo evento',
        '✨ Oportunidad única: Conecta con expertos del sector'
      ]
    },
    engagement: {
      replies: [
        '¡Excelente iniciativa! Me encantaría participar',
        '¿Habrá networking después del evento?',
        '¿Pueden compartir el link de registro?'
      ],
      questions: [
        '¿Qué temas específicos se tratarán?',
        '¿Es presencial o virtual?',
        '¿Hay algún costo asociado?'
      ]
    },
    comms: {
      responses: [
        'Según nuestros estatutos, los eventos son gratuitos para miembros activos',
        'El proceso de registro se realiza a través de nuestra plataforma',
        'Los eventos se realizan el último viernes de cada mes'
      ]
    }
  };
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(responses[agentType as keyof typeof responses]);
    }, 2000);
  });
};

export default function AgentsPage() {
  const [activeAgent, setActiveAgent] = useState('content');
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [agentResponse, setAgentResponse] = useState<any>(null);
  const [agentLogs, setAgentLogs] = useState([
    {
      id: 1,
      agent: 'Content Agent',
      action: 'Generated post variants',
      timestamp: '2024-01-15T10:30:00',
      status: 'approved'
    },
    {
      id: 2,
      agent: 'Engagement Agent',
      action: 'Suggested replies',
      timestamp: '2024-01-14T15:45:00',
      status: 'pending'
    }
  ]);

  const handleAgentAction = async () => {
    if (!input.trim()) return;
    
    setIsProcessing(true);
    try {
      const response = await mockAgentResponse(activeAgent, input);
      setAgentResponse(response);
    } catch (error) {
      console.error('Error processing:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleApprove = (action: string) => {
    alert(`Acción aprobada: ${action}`);
    setAgentLogs([...agentLogs, {
      id: Date.now(),
      agent: `${activeAgent.charAt(0).toUpperCase() + activeAgent.slice(1)} Agent`,
      action,
      timestamp: new Date().toISOString(),
      status: 'approved'
    }]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Agent Framework</h1>
          <p className="text-gray-600">Agentes IA para automatizar tareas y mejorar engagement</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Agent Selection */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Seleccionar Agente</h2>
            
            <div className="space-y-3">
              {[
                {
                  id: 'content',
                  name: 'Content Agent',
                  description: 'Genera contenido para redes sociales',
                  icon: '📝',
                  color: 'blue'
                },
                {
                  id: 'engagement',
                  name: 'Engagement Agent',
                  description: 'Sugiere respuestas y engagement',
                  icon: '💬',
                  color: 'green'
                },
                {
                  id: 'comms',
                  name: 'Comms Agent',
                  description: 'Responde preguntas con RAG',
                  icon: '🤖',
                  color: 'purple'
                }
              ].map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => setActiveAgent(agent.id)}
                  className={`w-full p-4 rounded-lg border-2 transition-colors ${
                    activeAgent === agent.id
                      ? `border-${agent.color}-500 bg-${agent.color}-50`
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{agent.icon}</span>
                    <div className="text-left">
                      <h3 className="font-medium text-gray-900">{agent.name}</h3>
                      <p className="text-sm text-gray-600">{agent.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Agent Input */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Entrada del Agente</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {activeAgent === 'content' && 'Descripción del contenido a generar'}
                  {activeAgent === 'engagement' && 'Comentario o post para analizar'}
                  {activeAgent === 'comms' && 'Pregunta sobre la comunidad'}
                </label>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={
                    activeAgent === 'content' ? 'Ej: Anuncio de nuevo evento de networking' :
                    activeAgent === 'engagement' ? 'Ej: Comentario de un miembro sobre un evento' :
                    'Ej: ¿Cuáles son los estatutos sobre votaciones?'
                  }
                />
              </div>
              
              <button
                onClick={handleAgentAction}
                disabled={!input.trim() || isProcessing}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isProcessing ? 'Procesando...' : 'Ejecutar Agente'}
              </button>
            </div>
          </div>

          {/* Agent Response */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Respuesta del Agente</h2>
            
            {agentResponse ? (
              <div className="space-y-4">
                {activeAgent === 'content' && (
                  <>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Sugerencias de Contenido</h3>
                      <div className="space-y-2">
                        {agentResponse.suggestions?.map((suggestion: string, index: number) => (
                          <div key={index} className="p-3 bg-gray-50 rounded-md">
                            <p className="text-sm text-gray-900">{suggestion}</p>
                            <button
                              onClick={() => handleApprove(`Approved suggestion: ${suggestion}`)}
                              className="mt-2 text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                            >
                              Aprobar
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Variantes</h3>
                      <div className="space-y-2">
                        {agentResponse.variants?.map((variant: string, index: number) => (
                          <div key={index} className="p-3 bg-blue-50 rounded-md">
                            <p className="text-sm text-gray-900">{variant}</p>
                            <button
                              onClick={() => handleApprove(`Approved variant: ${variant}`)}
                              className="mt-2 text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                            >
                              Aprobar
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                
                {activeAgent === 'engagement' && (
                  <>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Respuestas Sugeridas</h3>
                      <div className="space-y-2">
                        {agentResponse.replies?.map((reply: string, index: number) => (
                          <div key={index} className="p-3 bg-green-50 rounded-md">
                            <p className="text-sm text-gray-900">{reply}</p>
                            <button
                              onClick={() => handleApprove(`Approved reply: ${reply}`)}
                              className="mt-2 text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                            >
                              Usar
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Preguntas Sugeridas</h3>
                      <div className="space-y-2">
                        {agentResponse.questions?.map((question: string, index: number) => (
                          <div key={index} className="p-3 bg-yellow-50 rounded-md">
                            <p className="text-sm text-gray-900">{question}</p>
                            <button
                              onClick={() => handleApprove(`Approved question: ${question}`)}
                              className="mt-2 text-xs bg-yellow-600 text-white px-2 py-1 rounded hover:bg-yellow-700"
                            >
                              Usar
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                
                {activeAgent === 'comms' && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Respuesta con RAG</h3>
                    <div className="space-y-2">
                      {agentResponse.responses?.map((response: string, index: number) => (
                        <div key={index} className="p-3 bg-purple-50 rounded-md">
                          <p className="text-sm text-gray-900">{response}</p>
                          <button
                            onClick={() => handleApprove(`Approved response: ${response}`)}
                            className="mt-2 text-xs bg-purple-600 text-white px-2 py-1 rounded hover:bg-purple-700"
                          >
                            Enviar
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <p>Ejecuta el agente para ver las respuestas</p>
              </div>
            )}
          </div>
        </div>

        {/* Agent Logs */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Logs de Agentes</h2>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agente</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acción</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {agentLogs.map((log) => (
                    <tr key={log.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{log.agent}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{log.action}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{new Date(log.timestamp).toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          log.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 