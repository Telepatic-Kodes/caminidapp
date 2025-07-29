'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  commission: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  lastActivity: string;
  profileImage?: string;
}

const mockMembers: Member[] = [
  {
    id: '1',
    name: 'María González',
    email: 'maria.gonzalez@email.com',
    phone: '+56 9 1234 5678',
    commission: 'Educación y Formación',
    role: 'Miembro',
    status: 'active',
    joinDate: '2024-01-15',
    lastActivity: '2024-01-20 14:30'
  },
  {
    id: '2',
    name: 'Carlos Ruiz',
    email: 'carlos.ruiz@email.com',
    phone: '+56 9 2345 6789',
    commission: 'Salud y Bienestar',
    role: 'Coordinador',
    status: 'active',
    joinDate: '2023-12-10',
    lastActivity: '2024-01-20 16:45'
  },
  {
    id: '3',
    name: 'Ana Silva',
    email: 'ana.silva@email.com',
    phone: '+56 9 3456 7890',
    commission: 'Medio Ambiente',
    role: 'Mentor',
    status: 'active',
    joinDate: '2023-11-20',
    lastActivity: '2024-01-19 09:15'
  },
  {
    id: '4',
    name: 'Luis Mendoza',
    email: 'luis.mendoza@email.com',
    phone: '+56 9 4567 8901',
    commission: 'Tecnología',
    role: 'Miembro',
    status: 'inactive',
    joinDate: '2023-10-05',
    lastActivity: '2024-01-10 11:20'
  },
  {
    id: '5',
    name: 'Carmen Vega',
    email: 'carmen.vega@email.com',
    phone: '+56 9 5678 9012',
    commission: 'Desarrollo Comunitario',
    role: 'Director',
    status: 'active',
    joinDate: '2023-09-15',
    lastActivity: '2024-01-20 18:30'
  }
];

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>(mockMembers);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>(mockMembers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [commissionFilter, setCommissionFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  // Filtros y búsqueda
  useEffect(() => {
    let filtered = members.filter(member => {
      const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          member.commission.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
      const matchesCommission = commissionFilter === 'all' || member.commission === commissionFilter;
      const matchesRole = roleFilter === 'all' || member.role === roleFilter;
      
      return matchesSearch && matchesStatus && matchesCommission && matchesRole;
    });

    // Ordenamiento
    filtered.sort((a, b) => {
      let aValue = a[sortBy as keyof Member];
      let bValue = b[sortBy as keyof Member];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredMembers(filtered);
  }, [members, searchTerm, statusFilter, commissionFilter, roleFilter, sortBy, sortOrder]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleStatusChange = (memberId: string, newStatus: Member['status']) => {
    setMembers(prev => prev.map(member => 
      member.id === memberId ? { ...member, status: newStatus } : member
    ));
  };

  const handleDeleteMember = (memberId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este miembro?')) {
      setMembers(prev => prev.filter(member => member.id !== memberId));
      setSelectedMembers(prev => prev.filter(id => id !== memberId));
    }
  };

  const handleBulkAction = (action: string) => {
    if (selectedMembers.length === 0) return;
    
    switch (action) {
      case 'activate':
        setMembers(prev => prev.map(member => 
          selectedMembers.includes(member.id) ? { ...member, status: 'active' } : member
        ));
        break;
      case 'deactivate':
        setMembers(prev => prev.map(member => 
          selectedMembers.includes(member.id) ? { ...member, status: 'inactive' } : member
        ));
        break;
      case 'delete':
        if (confirm(`¿Estás seguro de que quieres eliminar ${selectedMembers.length} miembros?`)) {
          setMembers(prev => prev.filter(member => !selectedMembers.includes(member.id)));
        }
        break;
    }
    setSelectedMembers([]);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedMembers(filteredMembers.map(member => member.id));
    } else {
      setSelectedMembers([]);
    }
  };

  const getStatusColor = (status: Member['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Director': return 'bg-purple-100 text-purple-800';
      case 'Coordinador': return 'bg-blue-100 text-blue-800';
      case 'Mentor': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
              <h1 className="text-2xl font-bold text-gray-900">Gestión de Miembros</h1>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Agregar Miembro
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtros y búsqueda */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Búsqueda */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
              <input
                type="text"
                placeholder="Nombre, email o comisión..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
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
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
                <option value="pending">Pendiente</option>
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

            {/* Filtro por rol */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rol</label>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">Todos los roles</option>
                <option value="Director">Director</option>
                <option value="Coordinador">Coordinador</option>
                <option value="Mentor">Mentor</option>
                <option value="Miembro">Miembro</option>
              </select>
            </div>
          </div>
        </div>

        {/* Acciones en lote */}
        {selectedMembers.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-900">
                {selectedMembers.length} miembros seleccionados
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleBulkAction('activate')}
                  className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                >
                  Activar
                </button>
                <button
                  onClick={() => handleBulkAction('deactivate')}
                  className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700"
                >
                  Desactivar
                </button>
                <button
                  onClick={() => handleBulkAction('delete')}
                  className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tabla de miembros */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                Miembros ({filteredMembers.length})
              </h3>
              <div className="flex items-center space-x-4">
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [field, order] = e.target.value.split('-');
                    setSortBy(field);
                    setSortOrder(order as 'asc' | 'desc');
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="name-asc">Nombre A-Z</option>
                  <option value="name-desc">Nombre Z-A</option>
                  <option value="joinDate-desc">Más recientes</option>
                  <option value="joinDate-asc">Más antiguos</option>
                  <option value="lastActivity-desc">Última actividad</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedMembers.length === filteredMembers.length && filteredMembers.length > 0}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Miembro
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Comisión
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rol
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Última Actividad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedMembers.includes(member.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedMembers(prev => [...prev, member.id]);
                          } else {
                            setSelectedMembers(prev => prev.filter(id => id !== member.id));
                          }
                        }}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-700">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{member.name}</div>
                          <div className="text-sm text-gray-500">{member.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{member.commission}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(member.role)}`}>
                        {member.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(member.status)}`}>
                        {member.status === 'active' ? 'Activo' : 
                         member.status === 'inactive' ? 'Inactivo' : 'Pendiente'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(member.lastActivity).toLocaleDateString('es-CL')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingMember(member)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleStatusChange(member.id, member.status === 'active' ? 'inactive' : 'active')}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          {member.status === 'active' ? 'Desactivar' : 'Activar'}
                        </button>
                        <button
                          onClick={() => handleDeleteMember(member.id)}
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

        {/* Paginación */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Anterior
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Siguiente
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Mostrando <span className="font-medium">1</span> a <span className="font-medium">{filteredMembers.length}</span> de{' '}
                <span className="font-medium">{filteredMembers.length}</span> resultados
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Anterior
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Siguiente
                </button>
              </nav>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 