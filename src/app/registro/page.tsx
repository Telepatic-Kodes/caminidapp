'use client';

import React, { useState } from 'react';
import { mockMembers } from '../../lib/mockData';

export default function RegistroPage() {
  const [members, setMembers] = useState(mockMembers);
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    country: '',
    status: 'active',
    participation_score: 0,
    joined_at: new Date().toISOString().slice(0, 10),
  });
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMembers([
      ...members,
      { id: (members.length + 1).toString(), ...form },
    ]);
    setSuccess('¡Miembro registrado exitosamente (mock)!');
    setForm({
      full_name: '',
      email: '',
      country: '',
      status: 'active',
      participation_score: 0,
      joined_at: new Date().toISOString().slice(0, 10),
    });
    setTimeout(() => setSuccess(''), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-2 sm:px-0">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Registro de Miembro (Mock)</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 mb-8 border border-gray-200">
        <div className="grid grid-cols-1 gap-4">
          <label className="block">
            <span className="text-gray-800 font-medium">Nombre completo</span>
            <input
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              placeholder="Nombre completo"
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 bg-gray-50"
              required
            />
          </label>
          <label className="block">
            <span className="text-gray-800 font-medium">Email</span>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 bg-gray-50"
              required
              type="email"
            />
          </label>
          <label className="block">
            <span className="text-gray-800 font-medium">País</span>
            <input
              name="country"
              value={form.country}
              onChange={handleChange}
              placeholder="País"
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 bg-gray-50"
              required
            />
          </label>
          <label className="block">
            <span className="text-gray-800 font-medium">Estado</span>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 bg-gray-50"
            >
              <option value="active">Activo</option>
              <option value="paused">En pausa</option>
              <option value="alumni">Egresado</option>
            </select>
          </label>
        </div>
        <button
          type="submit"
          className="mt-6 w-full bg-indigo-600 text-white px-4 py-2 rounded font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors shadow"
        >
          Registrar
        </button>
        {success && <div className="mt-2 text-green-700 font-medium bg-green-50 border border-green-200 rounded p-2 text-center">{success}</div>}
      </form>
      <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">Miembros registrados (Mock)</h2>
        <ul className="divide-y divide-gray-100">
          {members.map((m) => (
            <li key={m.id} className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <span className="font-medium text-gray-900 truncate max-w-xs">{m.full_name}</span>
              <span className="text-gray-700 text-sm truncate max-w-xs">{m.email}</span>
              <span className="text-gray-500 text-xs">{m.country} - <span className={m.status === 'active' ? 'text-green-600' : m.status === 'paused' ? 'text-yellow-600' : 'text-blue-600'}>{m.status}</span></span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 