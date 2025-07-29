'use client';

import { useState, useEffect } from 'react';

// Mock KPI data
const mockKPIData = {
  mau: {
    current: 1250,
    previous: 1180,
    growth: 5.9,
    trend: 'up'
  },
  deals: {
    won: 45,
    total: 78,
    winRate: 57.7,
    value: 125000
  },
  engagement: {
    activeUsers: 890,
    retention: 78.5,
    avgSession: 12.5
  },
  revenue: {
    monthly: 45000,
    growth: 12.3,
    target: 50000
  }
};

export default function DashboardKPIPage() {
  const [activePeriod, setActivePeriod] = useState('month');
  const [kpiData, setKpiData] = useState(mockKPIData);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard KPI</h1>
          <p className="text-gray-600">Métricas clave de rendimiento y análisis avanzado</p>
        </div>

        {/* Period Selector */}
        <div className="mb-8">
          <div className="flex space-x-4">
            {[
              { id: 'week', label: 'Esta Semana' },
              { id: 'month', label: 'Este Mes' },
              { id: 'quarter', label: 'Este Trimestre' },
              { id: 'year', label: 'Este Año' }
            ].map((period) => (
              <button
                key={period.id}
                onClick={() => setActivePeriod(period.id)}
                className={`px-4 py-2 rounded-md font-medium ${
                  activePeriod === period.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* MAU */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">MAU</p>
                <p className="text-2xl font-bold text-gray-900">{kpiData.mau.current.toLocaleString()}</p>
                <p className={`text-sm ${kpiData.mau.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {kpiData.mau.trend === 'up' ? '↗' : '↘'} {kpiData.mau.growth}% vs mes anterior
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-xl">👥</span>
              </div>
            </div>
          </div>

          {/* Deals Won */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Deals Ganados</p>
                <p className="text-2xl font-bold text-gray-900">{kpiData.deals.won}</p>
                <p className="text-sm text-gray-600">
                  {kpiData.deals.winRate}% win rate
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-xl">💰</span>
              </div>
            </div>
          </div>

          {/* Revenue */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ingresos</p>
                <p className="text-2xl font-bold text-gray-900">${kpiData.revenue.monthly.toLocaleString()}</p>
                <p className="text-sm text-green-600">
                  ↗ {kpiData.revenue.growth}% vs mes anterior
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 text-xl">📈</span>
              </div>
            </div>
          </div>

          {/* Engagement */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Engagement</p>
                <p className="text-2xl font-bold text-gray-900">{kpiData.engagement.retention}%</p>
                <p className="text-sm text-gray-600">
                  {kpiData.engagement.avgSession} min avg session
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-yellow-600 text-xl">🔥</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* MAU Trend */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tendencia MAU</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Usuarios Activos Mensuales</span>
                <span className="font-semibold">{kpiData.mau.current.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${(kpiData.mau.current / 2000) * 100}%` }}
                ></div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Nuevos</p>
                  <p className="font-semibold">+{Math.floor(kpiData.mau.current * 0.15)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Retenidos</p>
                  <p className="font-semibold">{Math.floor(kpiData.mau.current * 0.75)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Reactivados</p>
                  <p className="font-semibold">{Math.floor(kpiData.mau.current * 0.10)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Deals Pipeline */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pipeline de Deals</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Valor Total</span>
                <span className="font-semibold">${kpiData.deals.value.toLocaleString()}</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Prospección</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-gray-400 h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                    <span className="text-sm font-semibold">25%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Calificación</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-400 h-2 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                    <span className="text-sm font-semibold">40%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Propuesta</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                    <span className="text-sm font-semibold">60%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Negociación</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-400 h-2 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                    <span className="text-sm font-semibold">80%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Cerrado</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-400 h-2 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                    <span className="text-sm font-semibold">100%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Analysis */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Análisis de Ingresos</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">${kpiData.revenue.monthly.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Ingresos del Mes</p>
              <div className="mt-2">
                <span className="text-green-600 text-sm">↗ {kpiData.revenue.growth}%</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">${kpiData.revenue.target.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Meta Mensual</p>
              <div className="mt-2">
                <span className="text-blue-600 text-sm">
                  {Math.round((kpiData.revenue.monthly / kpiData.revenue.target) * 100)}% completado
                </span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">${(kpiData.revenue.monthly * 12).toLocaleString()}</p>
              <p className="text-sm text-gray-600">Proyección Anual</p>
              <div className="mt-2">
                <span className="text-purple-600 text-sm">Basado en tendencia actual</span>
              </div>
            </div>
          </div>
        </div>

        {/* Engagement Metrics */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Métricas de Engagement</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{kpiData.engagement.activeUsers}</p>
              <p className="text-sm text-gray-600">Usuarios Activos</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{kpiData.engagement.retention}%</p>
              <p className="text-sm text-gray-600">Tasa de Retención</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{kpiData.engagement.avgSession}</p>
              <p className="text-sm text-gray-600">Minutos Promedio</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">4.2</p>
              <p className="text-sm text-gray-600">Páginas por Sesión</p>
            </div>
          </div>
        </div>

        {/* Performance Indicators */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Indicadores de Rendimiento</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Conversión de Leads</span>
                <span className="font-semibold">23.5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tiempo de Respuesta</span>
                <span className="font-semibold">2.3 horas</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Satisfacción del Cliente</span>
                <span className="font-semibold">4.8/5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tasa de Churn</span>
                <span className="font-semibold text-red-600">2.1%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Objetivos vs Realidad</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">MAU</span>
                  <span className="text-sm font-semibold">1250 / 1500</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '83%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Ingresos</span>
                  <span className="text-sm font-semibold">$45K / $50K</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Deals Ganados</span>
                  <span className="text-sm font-semibold">45 / 60</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Engagement</span>
                  <span className="text-sm font-semibold">78.5% / 85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 