'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Payment {
  id: string;
  memberId: string;
  memberName: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: 'credit_card' | 'debit_card' | 'bank_transfer' | 'cash' | 'paypal';
  dueDate: string;
  paidDate?: string;
  description: string;
  transactionId?: string;
  gateway: 'stripe' | 'paypal' | 'mercadopago' | 'manual';
  commission: string;
}

const mockPayments: Payment[] = [
  {
    id: '1',
    memberId: '1',
    memberName: 'María González',
    amount: 50000,
    currency: 'CLP',
    status: 'completed',
    paymentMethod: 'credit_card',
    dueDate: '2024-01-15',
    paidDate: '2024-01-14',
    description: 'Cuota mensual - Enero 2024',
    transactionId: 'txn_123456789',
    gateway: 'stripe',
    commission: 'Educación y Formación'
  },
  {
    id: '2',
    memberId: '2',
    memberName: 'Carlos Ruiz',
    amount: 75000,
    currency: 'CLP',
    status: 'pending',
    paymentMethod: 'bank_transfer',
    dueDate: '2024-01-20',
    description: 'Cuota mensual - Enero 2024',
    gateway: 'manual',
    commission: 'Salud y Bienestar'
  },
  {
    id: '3',
    memberId: '3',
    memberName: 'Ana Silva',
    amount: 60000,
    currency: 'CLP',
    status: 'failed',
    paymentMethod: 'debit_card',
    dueDate: '2024-01-10',
    description: 'Cuota mensual - Enero 2024',
    transactionId: 'txn_987654321',
    gateway: 'paypal',
    commission: 'Medio Ambiente'
  },
  {
    id: '4',
    memberId: '4',
    memberName: 'Luis Mendoza',
    amount: 45000,
    currency: 'CLP',
    status: 'completed',
    paymentMethod: 'cash',
    dueDate: '2024-01-05',
    paidDate: '2024-01-05',
    description: 'Cuota mensual - Enero 2024',
    gateway: 'manual',
    commission: 'Tecnología'
  }
];

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>(mockPayments);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [gatewayFilter, setGatewayFilter] = useState<string>('all');
  const [commissionFilter, setCommissionFilter] = useState<string>('all');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  // Estadísticas
  const totalRevenue = payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);
  const pendingPayments = payments.filter(p => p.status === 'pending');
  const failedPayments = payments.filter(p => p.status === 'failed');

  // Filtros
  useEffect(() => {
    let filtered = payments.filter(payment => {
      const matchesSearch = payment.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          payment.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
      const matchesGateway = gatewayFilter === 'all' || payment.gateway === gatewayFilter;
      const matchesCommission = commissionFilter === 'all' || payment.commission === commissionFilter;
      
      return matchesSearch && matchesStatus && matchesGateway && matchesCommission;
    });

    setFilteredPayments(filtered);
  }, [payments, searchTerm, statusFilter, gatewayFilter, commissionFilter]);

  const handleStatusChange = (paymentId: string, newStatus: Payment['status']) => {
    setPayments(prev => prev.map(payment => 
      payment.id === paymentId ? { 
        ...payment, 
        status: newStatus,
        paidDate: newStatus === 'completed' ? new Date().toISOString().split('T')[0] : payment.paidDate
      } : payment
    ));
  };

  const handleDeletePayment = (paymentId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este pago?')) {
      setPayments(prev => prev.filter(payment => payment.id !== paymentId));
    }
  };

  const getStatusColor = (status: Payment['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getGatewayColor = (gateway: Payment['gateway']) => {
    switch (gateway) {
      case 'stripe': return 'bg-purple-100 text-purple-800';
      case 'paypal': return 'bg-blue-100 text-blue-800';
      case 'mercadopago': return 'bg-green-100 text-green-800';
      case 'manual': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentMethodIcon = (method: Payment['paymentMethod']) => {
    switch (method) {
      case 'credit_card': return '💳';
      case 'debit_card': return '💳';
      case 'bank_transfer': return '🏦';
      case 'cash': return '💵';
      case 'paypal': return '📱';
      default: return '💰';
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

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
              <h1 className="text-2xl font-bold text-gray-900">Gestión de Pagos</h1>
            </div>
            <button
              onClick={() => setShowPaymentModal(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Registrar Pago
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Métricas principales */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Ingresos Totales</dt>
                    <dd className="text-lg font-medium text-gray-900">{formatCurrency(totalRevenue, 'CLP')}</dd>
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Pagos Pendientes</dt>
                    <dd className="text-lg font-medium text-gray-900">{pendingPayments.length}</dd>
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Pagos Fallidos</dt>
                    <dd className="text-lg font-medium text-gray-900">{failedPayments.length}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total de Pagos</dt>
                    <dd className="text-lg font-medium text-gray-900">{payments.length}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Búsqueda */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Buscar pagos</label>
              <input
                type="text"
                placeholder="Miembro o descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Filtro por estado */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">Todos los estados</option>
                <option value="completed">Completados</option>
                <option value="pending">Pendientes</option>
                <option value="failed">Fallidos</option>
                <option value="refunded">Reembolsados</option>
              </select>
            </div>

            {/* Filtro por pasarela */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pasarela</label>
              <select
                value={gatewayFilter}
                onChange={(e) => setGatewayFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">Todas las pasarelas</option>
                <option value="stripe">Stripe</option>
                <option value="paypal">PayPal</option>
                <option value="mercadopago">MercadoPago</option>
                <option value="manual">Manual</option>
              </select>
            </div>

            {/* Filtro por comisión */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Comisión</label>
              <select
                value={commissionFilter}
                onChange={(e) => setCommissionFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">Todas las comisiones</option>
                <option value="Educación y Formación">Educación y Formación</option>
                <option value="Salud y Bienestar">Salud y Bienestar</option>
                <option value="Medio Ambiente">Medio Ambiente</option>
                <option value="Tecnología">Tecnología</option>
                <option value="Desarrollo Comunitario">Desarrollo Comunitario</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabla de pagos */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Pagos ({filteredPayments.length})
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Miembro
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descripción
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Monto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Método
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha Vencimiento
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-700">
                              {payment.memberName.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{payment.memberName}</div>
                          <div className="text-sm text-gray-500">{payment.commission}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{payment.description}</div>
                      {payment.transactionId && (
                        <div className="text-xs text-gray-500">ID: {payment.transactionId}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(payment.amount, payment.currency)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="mr-2">{getPaymentMethodIcon(payment.paymentMethod)}</span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getGatewayColor(payment.gateway)}`}>
                          {payment.gateway}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                        {payment.status === 'completed' ? 'Completado' :
                         payment.status === 'pending' ? 'Pendiente' :
                         payment.status === 'failed' ? 'Fallido' : 'Reembolsado'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(payment.dueDate).toLocaleDateString('es-CL')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedPayment(payment)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Ver
                        </button>
                        {payment.status === 'pending' && (
                          <button
                            onClick={() => handleStatusChange(payment.id, 'completed')}
                            className="text-green-600 hover:text-green-900"
                          >
                            Marcar como pagado
                          </button>
                        )}
                        {payment.status === 'completed' && (
                          <button
                            onClick={() => handleStatusChange(payment.id, 'refunded')}
                            className="text-orange-600 hover:text-orange-900"
                          >
                            Reembolsar
                          </button>
                        )}
                        <button
                          onClick={() => handleDeletePayment(payment.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Configuración de pasarelas */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Configuración de Pasarelas de Pago</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Stripe */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-gray-900">Stripe</h4>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-xs text-gray-500">Activo</span>
                </div>
              </div>
              <p className="text-xs text-gray-600 mb-3">Configuración de API keys y webhooks</p>
              <button className="w-full bg-purple-600 text-white px-3 py-2 rounded-md text-sm hover:bg-purple-700 transition-colors">
                Configurar
              </button>
            </div>

            {/* PayPal */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-gray-900">PayPal</h4>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-xs text-gray-500">Activo</span>
                </div>
              </div>
              <p className="text-xs text-gray-600 mb-3">Configuración de credenciales</p>
              <button className="w-full bg-blue-600 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors">
                Configurar
              </button>
            </div>

            {/* MercadoPago */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-gray-900">MercadoPago</h4>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                  <span className="text-xs text-gray-500">Inactivo</span>
                </div>
              </div>
              <p className="text-xs text-gray-600 mb-3">Configuración de tokens</p>
              <button className="w-full bg-green-600 text-white px-3 py-2 rounded-md text-sm hover:bg-green-700 transition-colors">
                Activar
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 