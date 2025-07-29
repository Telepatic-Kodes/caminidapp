'use client';

import { useState } from 'react';

// Mock RAG responses
const mockRAGResponse = async (question: string) => {
  const responses = {
    'estatutos': 'Según los estatutos de la comunidad, los miembros tienen derecho a participar en todas las actividades y votar en las decisiones importantes. Artículo 3, sección 2.',
    'onboarding': 'El proceso de onboarding incluye: 1) Bienvenida por email, 2) Invitación al grupo de WhatsApp, 3) Sesión de introducción, 4) Asignación de mentor.',
    'pagos': 'Los pagos de cuota mensual se realizan el día 5 de cada mes. Puedes pagar por transferencia bancaria o tarjeta de crédito.',
  };
  
  return new Promise((resolve) => {
    setTimeout(() => {
      const key = Object.keys(responses).find(k => question.toLowerCase().includes(k));
      resolve(responses[key as keyof typeof responses] || 'No encontré información específica sobre eso en nuestros documentos.');
    }, 1500);
  });
};

// Mock communication templates
const mockTemplates = [
  {
    id: 1,
    name: 'Bienvenida Nuevo Miembro',
    trigger: 'member_created',
    channel: 'email',
    subject: '¡Bienvenido a la comunidad!',
    body: 'Hola {{name}}, ¡bienvenido a nuestra comunidad! Te hemos enviado una guía de estatutos y próximos pasos.',
    status: 'active'
  },
  {
    id: 2,
    name: 'Recordatorio Evento',
    trigger: 'event_scheduled',
    channel: 'whatsapp',
    subject: '',
    body: 'Hola {{name}}, te recordamos que mañana tenemos el evento {{event_name}} a las {{event_time}}. ¡Esperamos verte!',
    status: 'active'
  },
  {
    id: 3,
    name: 'Encuesta Satisfacción',
    trigger: '30_days_after_join',
    channel: 'email',
    subject: '¿Cómo va tu experiencia?',
    body: 'Hola {{name}}, han pasado 30 días desde que te uniste. Nos encantaría conocer tu feedback.',
    status: 'active'
  }
];

export default function InternalCommsPage() {
  const [activeTab, setActiveTab] = useState('rag');
  const [question, setQuestion] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [ragResponse, setRagResponse] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [showCreateTemplate, setShowCreateTemplate] = useState(false);
  const [automationLogs, setAutomationLogs] = useState([
    {
      id: 1,
      member: 'Juan Pérez',
      template: 'Bienvenida Nuevo Miembro',
      channel: 'email',
      sentAt: '2024-01-15T10:30:00',
      status: 'sent'
    },
    {
      id: 2,
      member: 'María García',
      template: 'Recordatorio Evento',
      channel: 'whatsapp',
      sentAt: '2024-01-14T15:45:00',
      status: 'sent'
    }
  ]);

  const handleRAGSearch = async () => {
    if (!question.trim()) return;
    
    setIsSearching(true);
    try {
      const response = await mockRAGResponse(question);
      setRagResponse(response as string);
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleCreatePlaybook = () => {
    setShowCreateTemplate(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestor de Comunicación Interna</h1>
          <p className="text-gray-600">Centraliza comunicaciones y automatiza flujos con IA</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'rag', label: 'RAG Assistant' },
              { id: 'templates', label: 'Templates' },
              { id: 'automations', label: 'Automatizaciones' },
              { id: 'logs', label: 'Logs' }
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
        </div>

        {/* RAG Assistant */}
        {activeTab === 'rag' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Consulta RAG</h2>
              <p className="text-sm text-gray-600 mb-4">
                Pregunta sobre estatutos, políticas, FAQs y documentación de la comunidad
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tu pregunta
                  </label>
                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ej: ¿Cuáles son los estatutos sobre votaciones? ¿Cómo funciona el onboarding?"
                  />
                </div>
                
                <button
                  onClick={handleRAGSearch}
                  disabled={!question.trim() || isSearching}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {isSearching ? 'Buscando...' : 'Buscar en Documentos'}
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Respuesta IA</h2>
              
              {ragResponse ? (
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="whitespace-pre-wrap text-gray-900">{ragResponse}</p>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                      Fuente: Documentos de la comunidad • Embeddings: OpenAI ada-002
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <p>Haz una pregunta para obtener respuestas basadas en nuestros documentos</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Templates */}
        {activeTab === 'templates' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Templates de Comunicación</h2>
              <button
                onClick={handleCreatePlaybook}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Crear Playbook
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockTemplates.map((template) => (
                <div key={template.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-medium text-gray-900">{template.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      template.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {template.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Trigger:</strong> {template.trigger}</p>
                    <p><strong>Canal:</strong> {template.channel}</p>
                    {template.subject && <p><strong>Asunto:</strong> {template.subject}</p>}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-700 line-clamp-3">{template.body}</p>
                  </div>
                  
                  <div className="mt-4 flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900 text-sm">Editar</button>
                    <button className="text-purple-600 hover:text-purple-900 text-sm">Test</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Automations */}
        {activeTab === 'automations' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Flujos de Automatización</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Member Created</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Enviar email de bienvenida</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Agregar a grupo de WhatsApp</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-sm">Programar encuesta 30 días después</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Scheduled</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Enviar recordatorio 24h antes</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Seguimiento NPS 24h post-evento</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Logs */}
        {activeTab === 'logs' && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Logs de Comunicación</h2>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Miembro</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Template</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Canal</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enviado</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {automationLogs.map((log) => (
                      <tr key={log.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{log.member}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{log.template}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{log.channel}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{new Date(log.sentAt).toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            log.status === 'sent' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
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
        )}
      </div>

      {/* Create Template Modal */}
      {showCreateTemplate && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Crear Playbook</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Template</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ej: Bienvenida Nuevo Miembro"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Trigger</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Seleccionar trigger</option>
                    <option value="member_created">Member Created</option>
                    <option value="event_scheduled">Event Scheduled</option>
                    <option value="30_days_after_join">30 días después de unirse</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Canal</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Seleccionar canal</option>
                    <option value="email">Email</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="slack">Slack</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contenido</label>
                  <textarea
                    className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Usa {{variable}} para personalización..."
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateTemplate(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Crear Template
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