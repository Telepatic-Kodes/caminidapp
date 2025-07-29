'use client';

import { useState } from 'react';

// Mock Stripe payment processing
const processStripePayment = async (amount: number, currency: string = 'USD') => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        paymentIntentId: 'pi_' + Math.random().toString(36).substr(2, 9),
        amount,
        currency,
        status: 'succeeded'
      });
    }, 2000);
  });
};

export default function PagosPage() {
  const [activeTab, setActiveTab] = useState('cuotas');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentResult, setPaymentResult] = useState<any>(null);
  const [paymentHistory, setPaymentHistory] = useState([
    {
      id: 1,
      member: 'Juan Pérez',
      amount: 50,
      currency: 'USD',
      status: 'completed',
      date: '2024-01-15',
      description: 'Cuota mensual - Enero 2024'
    },
    {
      id: 2,
      member: 'María García',
      amount: 50,
      currency: 'USD',
      status: 'pending',
      date: '2024-01-14',
      description: 'Cuota mensual - Enero 2024'
    }
  ]);

  const handleTestCharge = async () => {
    setIsProcessing(true);
    try {
      const result = await processStripePayment(50, 'USD');
      setPaymentResult(result);
      setPaymentHistory([...paymentHistory, {
        id: Date.now(),
        member: 'Test User',
        amount: 50,
        currency: 'USD',
        status: 'completed',
        date: new Date().toISOString().split('T')[0],
        description: 'Test charge - Stripe Sandbox'
      }]);
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Pagos</h1>
          <p className="text-gray-600">Administra cuotas, pagos y transacciones de la comunidad</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'cuotas', label: 'Cuotas' },
              { id: 'stripe', label: 'Stripe Sandbox' },
              { id: 'history', label: 'Historial' },
              { id: 'reports', label: 'Reportes' }
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

        {/* Cuotas Tab */}
        {activeTab === 'cuotas' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cuota Mensual */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Cuota Mensual</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Monto</span>
                  <span className="font-semibold text-lg">$50 USD</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Frecuencia</span>
                  <span className="font-semibold">Mensual</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Próximo pago</span>
                  <span className="font-semibold">5 de Febrero</span>
                </div>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                  Pagar Ahora
                </button>
              </div>
            </div>

            {/* Cuota Anual */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Cuota Anual</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Monto</span>
                  <span className="font-semibold text-lg">$500 USD</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Descuento</span>
                  <span className="font-semibold text-green-600">17%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Próximo pago</span>
                  <span className="font-semibold">5 de Enero 2025</span>
                </div>
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
                  Pagar Anual
                </button>
              </div>
            </div>

            {/* Estado de Cuenta */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Estado de Cuenta</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Saldo actual</span>
                  <span className="font-semibold text-green-600">$0 USD</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Próximo pago</span>
                  <span className="font-semibold">$50 USD</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Estado</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        Al día
                      </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stripe Sandbox Tab */}
        {activeTab === 'stripe' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Stripe Test Environment</h2>
              <p className="text-gray-600 mb-6">
                Prueba las funcionalidades de pago con el entorno de sandbox de Stripe
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Test Charge */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Charge</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Monto</label>
                      <input
                        type="number"
                        defaultValue="50"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Moneda</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="USD">USD - Dólar Estadounidense</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="CLP">CLP - Peso Chileno</option>
                      </select>
                    </div>
                    <button
                      onClick={handleTestCharge}
                      disabled={isProcessing}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                      {isProcessing ? 'Procesando...' : 'Realizar Test Charge'}
                    </button>
                  </div>
                </div>

                {/* Payment Result */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Resultado del Pago</h3>
                  {paymentResult ? (
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className="font-semibold text-green-600">{paymentResult.status}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Intent ID:</span>
                        <span className="font-mono text-sm">{paymentResult.paymentIntentId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Amount:</span>
                        <span className="font-semibold">${paymentResult.amount} {paymentResult.currency}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500">Realiza un test charge para ver el resultado</p>
                  )}
                </div>
              </div>
            </div>

            {/* Stripe Configuration */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuración Stripe</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Publishable Key</label>
                  <input
                    type="text"
                    placeholder="pk_test_..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Secret Key</label>
                  <input
                    type="password"
                    placeholder="sk_test_..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Historial de Pagos</h2>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Miembro</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paymentHistory.map((payment) => (
                      <tr key={payment.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{payment.member}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{payment.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">${payment.amount} {payment.currency}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{payment.date}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            payment.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {payment.status}
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

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ingresos Mensuales</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Enero 2024</span>
                  <span className="font-semibold">$2,500 USD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Diciembre 2023</span>
                  <span className="font-semibold">$2,300 USD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Noviembre 2023</span>
                  <span className="font-semibold">$2,100 USD</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Métricas de Pago</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tasa de éxito</span>
                  <span className="font-semibold text-green-600">98.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pagos pendientes</span>
                  <span className="font-semibold text-yellow-600">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Morosidad</span>
                  <span className="font-semibold text-red-600">1.5%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 