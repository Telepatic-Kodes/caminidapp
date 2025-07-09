'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function AlfabetizacionDigitalPage() {
  // Mock de KPIs y analíticas
  const kpi = {
    target_beneficiaries: 200,
    target_hours: 500,
    target_funds: 3000000,
  };

  const analytics = {
    beneficiaries: 150,
    volunteer_hours: 480,
    funds_raised: 2500000,
    progress_pct: 75,
    last_update: "2024-01-20",
    next_milestone: "Finalización de módulo 3 - 25 de enero",
  };

  // Datos para el gráfico de barras (progreso mensual)
  const barChartData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Beneficiarios',
        data: [20, 35, 50, 75, 100, 150],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
      {
        label: 'Horas Voluntarias',
        data: [50, 100, 150, 200, 300, 480],
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Datos para el gráfico de dona (progreso vs meta)
  const doughnutData = {
    labels: ['Completado', 'Pendiente'],
    datasets: [
      {
        data: [analytics.progress_pct, 100 - analytics.progress_pct],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(229, 231, 235, 0.8)',
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(229, 231, 235, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Progreso Mensual del Proyecto',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Progreso General',
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Alfabetización Digital para Adultos
              </h1>
              <span className="inline-block px-3 py-1 text-sm rounded-full bg-green-100 text-green-800 font-semibold">
                Activo
              </span>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-4">
              <div className="text-sm text-gray-500">
                <span className="font-semibold">Última actualización:</span> {analytics.last_update}
              </div>
            </div>
          </div>
          
          <p className="mt-4 text-lg text-gray-700">
            Programa de capacitación en tecnologías básicas para adultos mayores en comunidades rurales.
          </p>
          
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
            <div><span className="font-semibold">Comisión:</span> Educación y Formación</div>
            <div><span className="font-semibold">Líder:</span> Dr. Patricia López</div>
            <div><span className="font-semibold">Miembros:</span> 12</div>
          </div>
        </div>

        {/* KPIs Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">Beneficiarios</div>
              <div className="text-3xl font-bold text-gray-900">{analytics.beneficiaries}</div>
              <div className="text-xs text-gray-400">Meta: {kpi.target_beneficiaries}</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">Horas Voluntarias</div>
              <div className="text-3xl font-bold text-gray-900">{analytics.volunteer_hours}</div>
              <div className="text-xs text-gray-400">Meta: {kpi.target_hours}</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">Fondos Recaudados</div>
              <div className="text-3xl font-bold text-gray-900">
                ${(analytics.funds_raised / 1000).toLocaleString()}K CLP
              </div>
              <div className="text-xs text-gray-400">
                Meta: ${(kpi.target_funds / 1000).toLocaleString()}K
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progreso General</span>
            <span className="text-sm text-gray-500">{analytics.progress_pct}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${analytics.progress_pct}%` }}
            ></div>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            <span className="font-semibold">Próximo hito:</span> {analytics.next_milestone}
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <Bar data={barChartData} options={barChartOptions} />
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Detalles del Proyecto</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <span className="font-semibold">Objetivo:</span> Capacitar a adultos mayores en el uso de tecnologías básicas.
            </div>
            <div>
              <span className="font-semibold">Duración:</span> 6 meses (Enero - Junio 2024)
            </div>
            <div>
              <span className="font-semibold">Ubicación:</span> Comunidades rurales de la región
            </div>
            <div>
              <span className="font-semibold">Presupuesto:</span> $3,000,000 CLP
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 