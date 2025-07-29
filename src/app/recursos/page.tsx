'use client';

import { useState } from 'react';
import Link from 'next/link';
import ResourceManager from '@/components/ResourceManager';
import { mockResources } from '@/lib/mockData';

interface Resource {
  id: string;
  name: string;
  description: string;
  category: 'equipment' | 'materials' | 'technology' | 'furniture' | 'books' | 'other';
  quantity: number;
  available: number;
  location: string;
  condition: 'excellent' | 'good' | 'fair' | 'poor' | 'maintenance';
  lastMaintenance: string;
  assignedTo: string;
  commission: string;
  purchaseDate: string;
  purchasePrice: number;
}

export default function RecursosPage() {
  const [resources, setResources] = useState<Resource[]>(mockResources);

  const handleResourceUpdate = (resourceId: string, updates: Partial<Resource>) => {
    setResources(prev => 
      prev.map(resource => 
        resource.id === resourceId 
          ? { ...resource, ...updates }
          : resource
      )
    );
  };

  const handleResourceAdd = () => {
    // Aquí se abriría un modal para agregar un nuevo recurso
    console.log('Agregar nuevo recurso');
  };

  const handleResourceDelete = (resourceId: string) => {
    setResources(prev => prev.filter(resource => resource.id !== resourceId));
  };

  // Estadísticas
  const totalResources = resources.length;
  const totalValue = resources.reduce((sum, resource) => sum + resource.purchasePrice, 0);
  const totalItems = resources.reduce((sum, resource) => sum + resource.quantity, 0);
  const availableItems = resources.reduce((sum, resource) => sum + resource.available, 0);
  const maintenanceNeeded = resources.filter(r => r.condition === 'maintenance').length;

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
              <h1 className="text-2xl font-bold text-gray-900">Gestión de Recursos</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Métricas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Recursos</dt>
                    <dd className="text-lg font-medium text-gray-900">{totalResources}</dd>
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Disponibles</dt>
                    <dd className="text-lg font-medium text-gray-900">{availableItems}</dd>
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Valor Total</dt>
                    <dd className="text-lg font-medium text-gray-900">${totalValue.toLocaleString()}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Mantenimiento</dt>
                    <dd className="text-lg font-medium text-gray-900">{maintenanceNeeded}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gestor de recursos */}
        <ResourceManager
          resources={resources}
          onResourceUpdate={handleResourceUpdate}
          onResourceAdd={handleResourceAdd}
          onResourceDelete={handleResourceDelete}
        />

        {/* Recursos que requieren mantenimiento */}
        {maintenanceNeeded > 0 && (
          <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <svg className="w-6 h-6 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h3 className="text-lg font-medium text-red-900">Recursos que Requieren Mantenimiento</h3>
            </div>
            <div className="space-y-3">
              {resources
                .filter(resource => resource.condition === 'maintenance')
                .map(resource => (
                  <div key={resource.id} className="bg-white p-4 rounded-lg border border-red-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{resource.name}</h4>
                        <p className="text-xs text-gray-600">{resource.description}</p>
                        <p className="text-xs text-gray-500">Ubicación: {resource.location}</p>
                        <p className="text-xs text-gray-500">Último mantenimiento: {new Date(resource.lastMaintenance).toLocaleDateString('es-ES')}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="inline-block px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                          Mantenimiento
                        </span>
                        <button
                          onClick={() => handleResourceUpdate(resource.id, { condition: 'good' as const })}
                          className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                        >
                          Marcar como Reparado
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Distribución por categoría */}
        <div className="mt-8 bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Distribución por Categoría</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Equipamiento', count: resources.filter(r => r.category === 'equipment').length, color: 'bg-blue-500' },
                { name: 'Materiales', count: resources.filter(r => r.category === 'materials').length, color: 'bg-green-500' },
                { name: 'Tecnología', count: resources.filter(r => r.category === 'technology').length, color: 'bg-purple-500' },
                { name: 'Mobiliario', count: resources.filter(r => r.category === 'furniture').length, color: 'bg-yellow-500' },
                { name: 'Libros', count: resources.filter(r => r.category === 'books').length, color: 'bg-red-500' },
                { name: 'Otros', count: resources.filter(r => r.category === 'other').length, color: 'bg-gray-500' }
              ].map((category, index) => (
                <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className={`w-4 h-4 rounded-full ${category.color} mr-3`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{category.name}</p>
                    <p className="text-xs text-gray-500">{category.count} recursos</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 