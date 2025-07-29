'use client';

import { useState } from 'react';

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

interface TaskBoardProps {
  tasks: Task[];
  onTaskUpdate: (taskId: string, updates: Partial<Task>) => void;
  onTaskCreate: () => void;
}

export default function TaskBoard({ tasks, onTaskUpdate, onTaskCreate }: TaskBoardProps) {
  const [draggedTask, setDraggedTask] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  const columns = [
    { id: 'todo', title: 'Por Hacer', color: 'bg-gray-100' },
    { id: 'in-progress', title: 'En Progreso', color: 'bg-blue-100' },
    { id: 'review', title: 'En Revisión', color: 'bg-yellow-100' },
    { id: 'completed', title: 'Completado', color: 'bg-green-100' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-500';
      case 'high':
        return 'bg-orange-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'Urgente';
      case 'high':
        return 'Alta';
      case 'medium':
        return 'Media';
      case 'low':
        return 'Baja';
      default:
        return 'Normal';
    }
  };

  const filteredTasks = tasks.filter(task => {
    const statusMatch = filterStatus === 'all' || task.status === filterStatus;
    const priorityMatch = filterPriority === 'all' || task.priority === filterPriority;
    return statusMatch && priorityMatch;
  });

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedTask(taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, status: string) => {
    e.preventDefault();
    if (draggedTask) {
      onTaskUpdate(draggedTask, { status: status as Task['status'] });
      setDraggedTask(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short'
    });
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Tablero de Tareas</h3>
          <button
            onClick={onTaskCreate}
            className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition-colors"
          >
            Nueva Tarea
          </button>
        </div>

        {/* Filtros */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Estado:</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">Todos</option>
              <option value="todo">Por Hacer</option>
              <option value="in-progress">En Progreso</option>
              <option value="review">En Revisión</option>
              <option value="completed">Completado</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Prioridad:</label>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">Todas</option>
              <option value="urgent">Urgente</option>
              <option value="high">Alta</option>
              <option value="medium">Media</option>
              <option value="low">Baja</option>
            </select>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {columns.map((column) => {
            const columnTasks = filteredTasks.filter(task => task.status === column.id);
            
            return (
              <div key={column.id} className="space-y-4">
                <div className={`p-3 rounded-lg ${column.color}`}>
                  <h4 className="font-medium text-gray-900">{column.title}</h4>
                  <p className="text-sm text-gray-600">{columnTasks.length} tareas</p>
                </div>

                <div
                  className="min-h-[400px] p-3 bg-gray-50 rounded-lg"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, column.id)}
                >
                  <div className="space-y-3">
                    {columnTasks.map((task) => (
                      <div
                        key={task.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, task.id)}
                        className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-move hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="text-sm font-medium text-gray-900 line-clamp-2">
                            {task.title}
                          </h5>
                          <span className={`inline-block w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`}></span>
                        </div>

                        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                          {task.description}
                        </p>

                        <div className="space-y-2">
                          {/* Tags */}
                          {task.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {task.tags.slice(0, 2).map((tag, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 text-xs bg-indigo-100 text-indigo-700 rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                              {task.tags.length > 2 && (
                                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                                  +{task.tags.length - 2}
                                </span>
                              )}
                            </div>
                          )}

                          {/* Asignado y comisión */}
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{task.assignee}</span>
                            <span>{task.commission}</span>
                          </div>

                          {/* Fecha de vencimiento */}
                          <div className="flex items-center justify-between">
                            <span className={`text-xs ${
                              isOverdue(task.dueDate) ? 'text-red-600 font-medium' : 'text-gray-500'
                            }`}>
                              Vence: {formatDate(task.dueDate)}
                              {isOverdue(task.dueDate) && ' ⚠️'}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              getPriorityColor(task.priority).replace('bg-', 'text-').replace('-500', '-700')
                            } ${getPriorityColor(task.priority).replace('bg-', 'bg-').replace('-500', '-100')}`}>
                              {getPriorityText(task.priority)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Estadísticas rápidas */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-500 rounded-md flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {tasks.filter(t => t.status === 'todo').length}
                </p>
                <p className="text-xs text-gray-500">Por Hacer</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {tasks.filter(t => t.status === 'in-progress').length}
                </p>
                <p className="text-xs text-gray-500">En Progreso</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {tasks.filter(t => t.status === 'review').length}
                </p>
                <p className="text-xs text-gray-500">En Revisión</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {tasks.filter(t => t.status === 'completed').length}
                </p>
                <p className="text-xs text-gray-500">Completadas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 