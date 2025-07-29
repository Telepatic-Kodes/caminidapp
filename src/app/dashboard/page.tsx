'use client';

import { useState, useEffect } from 'react';
import RealTimeMetrics from '@/components/RealTimeMetrics';
import RealTimeNotifications from '@/components/RealTimeNotifications';
import StatsChart from '@/components/StatsChart';
import SearchBar from '@/components/SearchBar';

// Mock data for CRM contacts
const mockContacts = [
  { id: 1, name: 'Juan Pérez', email: 'juan@example.com', status: 'active', lastContact: '2024-01-15' },
  { id: 2, name: 'María García', email: 'maria@example.com', status: 'prospect', lastContact: '2024-01-10' },
  { id: 3, name: 'Carlos López', email: 'carlos@example.com', status: 'lead', lastContact: '2024-01-12' },
];

// Mock deals data
const mockDeals = [
  { id: 1, title: 'Sponsorship Package A', value: 5000, stage: 'negotiation', contact: 'Juan Pérez' },
  { id: 2, title: 'Event Partnership', value: 3000, stage: 'proposal', contact: 'María García' },
  { id: 3, title: 'Membership Upgrade', value: 1500, stage: 'closed', contact: 'Carlos López' },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [contacts, setContacts] = useState(mockContacts);
  const [deals, setDeals] = useState(mockDeals);
  const [showCreateDeal, setShowCreateDeal] = useState(false);

  // CRM Timeline data
  const timelineData = [
    { id: 1, type: 'contact', title: 'Nuevo contacto agregado', description: 'Juan Pérez se unió a la comunidad', timestamp: '2024-01-15T10:30:00' },
    { id: 2, type: 'deal', title: 'Deal creado', description: 'Sponsorship Package A - $5,000', timestamp: '2024-01-14T15:45:00' },
    { id: 3, type: 'event', title: 'Evento programado', description: 'Workshop de IA - 25 de Enero', timestamp: '2024-01-13T09:20:00' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with 360° Panel */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Panel 360°</h1>
              <p className="text-gray-600">Visión completa de la comunidad</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowCreateDeal(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Crear Deal
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Vista General' },
              { id: 'crm', label: 'CRM Core' },
              { id: 'deals', label: 'Deals' },
              { id: 'analytics', label: 'Analytics' }
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

        {/* Content based on active tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* CRM Core Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">CRM Core</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Contactos activos</span>
                  <span className="font-semibold">{contacts.filter(c => c.status === 'active').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Prospectos</span>
                  <span className="font-semibold">{contacts.filter(c => c.status === 'prospect').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Leads</span>
                  <span className="font-semibold">{contacts.filter(c => c.status === 'lead').length}</span>
                </div>
              </div>
            </div>

            {/* Deals Overview */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pipeline de Deals</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total valor</span>
                  <span className="font-semibold">${deals.reduce((sum, deal) => sum + deal.value, 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Deals activos</span>
                  <span className="font-semibold">{deals.filter(d => d.stage !== 'closed').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cerrados este mes</span>
                  <span className="font-semibold">{deals.filter(d => d.stage === 'closed').length}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
              <div className="space-y-3">
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
                  Agregar Contacto
                </button>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                  Crear Deal
                </button>
                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors">
                  Programar Evento
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'crm' && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Timeline CRM</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {timelineData.map((item) => (
                  <div key={item.id} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <div className={`w-3 h-3 rounded-full mt-2 ${
                      item.type === 'contact' ? 'bg-blue-500' :
                      item.type === 'deal' ? 'bg-green-500' : 'bg-purple-500'
                    }`}></div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{new Date(item.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'deals' && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Pipeline de Deals</h3>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deal</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contacto</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Etapa</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {deals.map((deal) => (
                      <tr key={deal.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{deal.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{deal.contact}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">${deal.value.toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            deal.stage === 'closed' ? 'bg-green-100 text-green-800' :
                            deal.stage === 'negotiation' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {deal.stage}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900">Editar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <RealTimeMetrics />
            <StatsChart />
          </div>
        )}
      </div>

      {/* Create Deal Modal */}
      {showCreateDeal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Crear Nuevo Deal</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Título del Deal</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ej: Sponsorship Package"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contacto</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Seleccionar contacto</option>
                    {contacts.map(contact => (
                      <option key={contact.id} value={contact.id}>{contact.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Valor</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="5000"
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateDeal(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Crear Deal
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