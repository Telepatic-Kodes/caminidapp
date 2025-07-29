'use client';

import { useState, useEffect } from 'react';

interface Metric {
  id: string;
  label: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: string;
  color: string;
}

interface RealTimeMetricsProps {
  refreshInterval?: number;
}

export default function RealTimeMetrics({ refreshInterval = 30000 }: RealTimeMetricsProps) {
  const [metrics, setMetrics] = useState<Metric[]>([
    {
      id: 'active-members',
      label: 'Miembros Activos',
      value: 142,
      change: 5,
      changeType: 'increase',
      icon: '👥',
      color: 'bg-green-500'
    },
    {
      id: 'online-users',
      label: 'Usuarios en Línea',
      value: 23,
      change: -2,
      changeType: 'decrease',
      icon: '🟢',
      color: 'bg-blue-500'
    },
    {
      id: 'active-projects',
      label: 'Proyectos Activos',
      value: 23,
      change: 3,
      changeType: 'increase',
      icon: '📋',
      color: 'bg-purple-500'
    },
    {
      id: 'pending-tasks',
      label: 'Tareas Pendientes',
      value: 45,
      change: -8,
      changeType: 'decrease',
      icon: '⏳',
      color: 'bg-yellow-500'
    },
    {
      id: 'total-events',
      label: 'Eventos del Mes',
      value: 12,
      change: 2,
      changeType: 'increase',
      icon: '📅',
      color: 'bg-indigo-500'
    },
    {
      id: 'volunteer-hours',
      label: 'Horas Voluntarias',
      value: 1560,
      change: 120,
      changeType: 'increase',
      icon: '⏰',
      color: 'bg-orange-500'
    }
  ]);

  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simular actualizaciones en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.value + Math.floor(Math.random() * 10) - 5,
        change: Math.floor(Math.random() * 20) - 10,
        changeType: Math.random() > 0.5 ? 'increase' : 'decrease'
      })));
      setLastUpdate(new Date());
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Métricas en Tiempo Real</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-500">
            Última actualización: {lastUpdate.toLocaleTimeString()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <div key={metric.id} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${metric.color} rounded-lg flex items-center justify-center text-white text-lg`}>
                  {metric.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value.toLocaleString()}</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`flex items-center space-x-1 ${
                  metric.changeType === 'increase' ? 'text-green-600' : 
                  metric.changeType === 'decrease' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  <span className="text-sm font-medium">
                    {metric.changeType === 'increase' ? '+' : ''}{metric.change}
                  </span>
                  <svg className={`w-4 h-4 ${
                    metric.changeType === 'increase' ? 'rotate-0' : 
                    metric.changeType === 'decrease' ? 'rotate-180' : ''
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </div>
                <p className="text-xs text-gray-500">vs mes anterior</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Indicadores de estado del sistema */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Estado del Sistema</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">API Activa</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Base de Datos</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Notificaciones</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">WebSocket</span>
          </div>
        </div>
      </div>
    </div>
  );
} 