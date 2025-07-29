'use client';

import { useState } from 'react';

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

interface ResourceManagerProps {
  resources: Resource[];
  onResourceUpdate: (resourceId: string, updates: Partial<Resource>) => void;
  onResourceAdd: () => void;
  onResourceDelete: (resourceId: string) => void;
}

export default function ResourceManager({ 
  resources, 
  onResourceUpdate, 
  onResourceAdd, 
  onResourceDelete 
}: ResourceManagerProps) {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterCondition, setFilterCondition] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = [
    { id: 'equipment', name: 'Equipamiento', icon: '🔧', color: 'bg-blue-100 text-blue-800' },
    { id: 'materials', name: 'Materiales', icon: '📦', color: 'bg-green-100 text-green-800' },
    { id: 'technology', name: 'Tecnología', icon: '💻', color: 'bg-purple-100 text-purple-800' },
    { id: 'furniture', name: 'Mobiliario', icon: '🪑', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'books', name: 'Libros', icon: '📚', color: 'bg-red-100 text-red-800' },
    { id: 'other', name: 'Otros', icon: '📋', color: 'bg-gray-100 text-gray-800' }
  ];

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent':
        return 'bg-green-500';
      case 'good':
        return 'bg-blue-500';
      case 'fair':
        return 'bg-yellow-500';
      case 'poor':
        return 'bg-orange-500';
      case 'maintenance':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getConditionText = (condition: string) => {
    switch (condition) {
      case 'excellent':
        return 'Excelente';
      case 'good':
        return 'Bueno';
      case 'fair':
        return 'Regular';
      case 'poor':
        return 'Malo';
      case 'maintenance':
        return 'Mantenimiento';
      default:
        return 'Desconocido';
    }
  };

  const getCategoryIcon = (category: string) => {
    return categories.find(cat => cat.id === category)?.icon || '📋';
  };

  const getCategoryColor = (category: string) => {
    return categories.find(cat => cat.id === category)?.color || 'bg-gray-100 text-gray-800';
  };

  const filteredResources = resources.filter(resource => {
    const categoryMatch = filterCategory === 'all' || resource.category === filterCategory;
    const conditionMatch = filterCondition === 'all' || resource.condition === filterCondition;
    const searchMatch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return categoryMatch && conditionMatch && searchMatch;
  });

  const totalValue = resources.reduce((sum, resource) => sum + resource.purchasePrice, 0);
  const totalItems = resources.reduce((sum, resource) => sum + resource.quantity, 0);
  const availableItems = resources.reduce((sum, resource) => sum + resource.available, 0);
  const maintenanceNeeded = resources.filter(r => r.condition === 'maintenance').length;

  const handleCheckout = (resourceId: string) => {
    const resource = resources.find(r => r.id === resourceId);
    if (resource && resource.available > 0) {
      onResourceUpdate(resourceId, { available: resource.available - 1 });
    }
  };

  const handleReturn = (resourceId: string) => {
    const resource = resources.find(r => r.id === resourceId);
    if (resource && resource.available < resource.quantity) {
      onResourceUpdate(resourceId, { available: resource.available + 1 });
    }
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Gestión de Recursos</h3>
          <button
            onClick={onResourceAdd}
            className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition-colors"
          >
            Agregar Recurso
          </button>
        </div>

        {/* Filtros y búsqueda */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Categoría:</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">Todas</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Estado:</label>
            <select
              value={filterCondition}
              onChange={(e) => setFilterCondition(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">Todos</option>
              <option value="excellent">Excelente</option>
              <option value="good">Bueno</option>
              <option value="fair">Regular</option>
              <option value="poor">Malo</option>
              <option value="maintenance">Mantenimiento</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Vista:</label>
            <div className="flex border border-gray-300 rounded-md">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 text-sm ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-gray-600'}`}
              >
                Cuadrícula
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 text-sm ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'text-gray-600'}`}
              >
                Lista
              </button>
            </div>
          </div>

          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Buscar recursos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-3 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{totalItems}</p>
                <p className="text-xs text-gray-500">Total Items</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{availableItems}</p>
                <p className="text-xs text-gray-500">Disponibles</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">${totalValue.toLocaleString()}</p>
                <p className="text-xs text-gray-500">Valor Total</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{maintenanceNeeded}</p>
                <p className="text-xs text-gray-500">Mantenimiento</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">{getCategoryIcon(resource.category)}</span>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{resource.name}</h4>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${getCategoryColor(resource.category)}`}>
                        {categories.find(cat => cat.id === resource.category)?.name}
                      </span>
                    </div>
                  </div>
                  <span className={`inline-block w-3 h-3 rounded-full ${getConditionColor(resource.condition)}`}></span>
                </div>

                <p className="text-xs text-gray-600 mb-3 line-clamp-2">{resource.description}</p>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Disponible:</span>
                    <span className="font-medium">{resource.available}/{resource.quantity}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Ubicación:</span>
                    <span className="font-medium">{resource.location}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Estado:</span>
                    <span className="font-medium">{getConditionText(resource.condition)}</span>
                  </div>

                  {resource.assignedTo && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Asignado a:</span>
                      <span className="font-medium">{resource.assignedTo}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200">
                  <div className="flex space-x-2">
                    {resource.available > 0 && (
                      <button
                        onClick={() => handleCheckout(resource.id)}
                        className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                      >
                        Prestar
                      </button>
                    )}
                    {resource.available < resource.quantity && (
                      <button
                        onClick={() => handleReturn(resource.id)}
                        className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                      >
                        Devolver
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => onResourceDelete(resource.id)}
                    className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{getCategoryIcon(resource.category)}</span>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{resource.name}</h4>
                      <p className="text-xs text-gray-600">{resource.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{resource.available}/{resource.quantity}</p>
                      <p className="text-xs text-gray-500">Disponible</p>
                    </div>

                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{resource.location}</p>
                      <p className="text-xs text-gray-500">Ubicación</p>
                    </div>

                    <div className="text-center">
                      <span className={`inline-block w-3 h-3 rounded-full ${getConditionColor(resource.condition)}`}></span>
                      <p className="text-xs text-gray-500 mt-1">{getConditionText(resource.condition)}</p>
                    </div>

                    <div className="flex space-x-2">
                      {resource.available > 0 && (
                        <button
                          onClick={() => handleCheckout(resource.id)}
                          className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                        >
                          Prestar
                        </button>
                      )}
                      {resource.available < resource.quantity && (
                        <button
                          onClick={() => handleReturn(resource.id)}
                          className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                          Devolver
                        </button>
                      )}
                      <button
                        onClick={() => onResourceDelete(resource.id)}
                        className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 