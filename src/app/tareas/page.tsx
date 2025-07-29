'use client';

import { useState } from 'react';
import Link from 'next/link';
import TaskBoard from '@/components/TaskBoard';
import { mockTasks } from '@/lib/mockData';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee: string;
  commission: string;
  dueDate: string;
  createdAt: string;
  tags: string[];
}

export default function TareasPage() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const handleTaskUpdate = (taskId: string, updates: Partial<Task>) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { ...task, ...updates }
          : task
      )
    );
  };

  const handleTaskCreate = () => {
    // Aquí se abriría un modal para crear una nueva tarea
    console.log('Crear nueva tarea');
  };

  const handleTaskDelete = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  // Estadísticas
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const overdueTasks = tasks.filter(t => {
    const dueDate = new Date(t.dueDate);
    const today = new Date();
    return dueDate < today && t.status !== 'completed';
  }).length;
  const urgentTasks = tasks.filter(t => t.priority === 'urgent' && t.status !== 'completed').length;

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
              <h1 className="text-2xl font-bold text-gray-900">Gestión de Tareas</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Métricas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gray-500 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Tareas</dt>
                    <dd className="text-lg font-medium text-gray-900">{totalTasks}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Completadas</dt>
                    <dd className="text-lg font-medium text-gray-900">{completedTasks}</dd>
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Vencidas</dt>
                    <dd className="text-lg font-medium text-gray-900">{overdueTasks}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-orange-500 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Urgentes</dt>
                    <dd className="text-lg font-medium text-gray-900">{urgentTasks}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tablero de tareas */}
        <TaskBoard
          tasks={tasks}
          onTaskUpdate={handleTaskUpdate}
          onTaskCreate={handleTaskCreate}
        />

        {/* Tareas vencidas */}
        {overdueTasks > 0 && (
          <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <svg className="w-6 h-6 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium text-red-900">Tareas Vencidas</h3>
            </div>
            <div className="space-y-3">
              {tasks
                .filter(task => {
                  const dueDate = new Date(task.dueDate);
                  const today = new Date();
                  return dueDate < today && task.status !== 'completed';
                })
                .map(task => (
                  <div key={task.id} className="bg-white p-4 rounded-lg border border-red-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{task.title}</h4>
                        <p className="text-xs text-gray-600">Vence: {new Date(task.dueDate).toLocaleDateString('es-ES')}</p>
                        <p className="text-xs text-gray-500">Asignado a: {task.assignee}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          task.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                          task.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {task.priority === 'urgent' ? 'Urgente' :
                           task.priority === 'high' ? 'Alta' :
                           task.priority === 'medium' ? 'Media' : 'Baja'}
                        </span>
                        <button
                          onClick={() => handleTaskUpdate(task.id, { status: 'in-progress' })}
                          className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                          Iniciar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 