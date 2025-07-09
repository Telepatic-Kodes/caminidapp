'use client';

import { useState, useEffect } from 'react';

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
  }[];
}

interface StatsChartProps {
  title: string;
  data: ChartData;
  type: 'line' | 'bar' | 'doughnut';
  height?: number;
}

export default function StatsChart({ title, data, type, height = 300 }: StatsChartProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [isClient, setIsClient] = useState(false);

  // Evitar problemas de hidratación
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Función para renderizar gráfico de barras simple
  const renderBarChart = () => {
    const maxValue = Math.max(...data.datasets[0].data);
    
    return (
      <div className="space-y-3">
        {data.labels.map((label, index) => {
          const value = data.datasets[0].data[index];
          const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
          
          return (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-20 text-sm text-gray-600 truncate">{label}</div>
              <div className="flex-1">
                <div className="bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: data.datasets[0].backgroundColor
                    }}
                  ></div>
                </div>
              </div>
              <div className="w-12 text-sm font-medium text-gray-900 text-right">
                {value.toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Función para renderizar gráfico de línea simple
  const renderLineChart = () => {
    const maxValue = Math.max(...data.datasets[0].data);
    const minValue = Math.min(...data.datasets[0].data);
    const range = maxValue - minValue;
    
    return (
      <div className="relative" style={{ height: `${height}px` }}>
        <svg className="w-full h-full" viewBox={`0 0 ${data.labels.length * 60} ${height}`}>
          {/* Líneas de fondo */}
          {[0, 25, 50, 75, 100].map((percent) => (
            <line
              key={percent}
              x1="0"
              y1={height - (height * percent / 100)}
              x2={data.labels.length * 60}
              y2={height - (height * percent / 100)}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}
          
          {/* Línea de datos */}
          <polyline
            fill="none"
            stroke={data.datasets[0].borderColor}
            strokeWidth="2"
            points={data.datasets[0].data.map((value, index) => {
              const x = index * 60 + 30;
              const y = height - ((value - minValue) / range) * height * 0.8 - height * 0.1;
              return `${x},${y}`;
            }).join(' ')}
          />
          
          {/* Puntos de datos */}
          {data.datasets[0].data.map((value, index) => {
            const x = index * 60 + 30;
            const y = height - ((value - minValue) / range) * height * 0.8 - height * 0.1;
            
            return (
              <g key={index}>
                <circle
                  cx={x}
                  cy={y}
                  r="4"
                  fill={data.datasets[0].backgroundColor}
                  stroke="white"
                  strokeWidth="2"
                />
                <text
                  x={x}
                  y={y - 10}
                  textAnchor="middle"
                  className="text-xs fill-gray-600"
                >
                  {value.toLocaleString()}
                </text>
              </g>
            );
          })}
          
          {/* Etiquetas del eje X */}
          {data.labels.map((label, index) => (
            <text
              key={index}
              x={index * 60 + 30}
              y={height - 5}
              textAnchor="middle"
              className="text-xs fill-gray-500"
            >
              {label}
            </text>
          ))}
        </svg>
      </div>
    );
  };

  // Función para renderizar gráfico de dona simple
  const renderDoughnutChart = () => {
    const total = data.datasets[0].data.reduce((sum, value) => sum + value, 0);
    
    return (
      <div className="flex items-center justify-center space-x-8">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {data.datasets[0].data.map((value, index) => {
              const startAngle = data.datasets[0].data
                .slice(0, index)
                .reduce((sum, val) => sum + (val / total) * 360, 0);
              const endAngle = startAngle + (value / total) * 360;
              
              // Redondear los valores para evitar diferencias de precisión
              const x1 = Math.round((50 + 35 * Math.cos((startAngle - 90) * Math.PI / 180)) * 1000) / 1000;
              const y1 = Math.round((50 + 35 * Math.sin((startAngle - 90) * Math.PI / 180)) * 1000) / 1000;
              const x2 = Math.round((50 + 35 * Math.cos((endAngle - 90) * Math.PI / 180)) * 1000) / 1000;
              const y2 = Math.round((50 + 35 * Math.sin((endAngle - 90) * Math.PI / 180)) * 1000) / 1000;
              
              const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
              
              return (
                <path
                  key={index}
                  d={`M 50 50 L ${x1} ${y1} A 35 35 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                  fill={data.datasets[0].backgroundColor}
                  stroke="white"
                  strokeWidth="2"
                />
              );
            })}
            <circle cx="50" cy="50" r="15" fill="white" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">{total.toLocaleString()}</div>
              <div className="text-xs text-gray-500">Total</div>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          {data.labels.map((label, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: data.datasets[0].backgroundColor }}
              ></div>
              <span className="text-sm text-gray-600">{label}</span>
              <span className="text-sm font-medium text-gray-900">
                {data.datasets[0].data[index].toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="week">Última semana</option>
          <option value="month">Último mes</option>
          <option value="quarter">Último trimestre</option>
          <option value="year">Último año</option>
        </select>
      </div>
      
      <div className="overflow-x-auto">
        {isClient && (
          <>
            {type === 'bar' && renderBarChart()}
            {type === 'line' && renderLineChart()}
            {type === 'doughnut' && renderDoughnutChart()}
          </>
        )}
        {!isClient && (
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500">Cargando gráfico...</div>
          </div>
        )}
      </div>
    </div>
  );
} 