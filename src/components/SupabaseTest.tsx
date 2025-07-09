'use client';

// Este componente ya no usa Supabase, solo mock data
import { useState, useEffect } from 'react';
import { mockCommissions } from '@/lib/mockData';

export default function SupabaseTest() {
  const [commissions, setCommissions] = useState<typeof mockCommissions>([]);

  useEffect(() => {
    // Simula una carga asíncrona
    setTimeout(() => {
      setCommissions(mockCommissions);
    }, 500);
  }, []);

  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
      <div className="flex items-center space-x-2">
        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span className="text-green-800 font-medium">¡Mock de conexión exitosa!</span>
      </div>
      <p className="text-green-700 mt-2 text-sm">
        Se encontraron {commissions.length} comisiones (mock).
      </p>
      {commissions.length > 0 && (
        <div className="mt-3">
          <h4 className="text-sm font-medium text-green-800 mb-2">Comisiones disponibles:</h4>
          <ul className="text-sm text-green-700 space-y-1">
            {commissions.map((commission) => (
              <li key={commission.id} className="flex justify-between">
                <span>{commission.name}</span>
                <span className="text-green-600">
                  {commission.kpi_json?.target_members || 0} miembros objetivo
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 