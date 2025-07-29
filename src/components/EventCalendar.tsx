'use client';

import { useState } from 'react';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'meeting' | 'workshop' | 'volunteer' | 'training' | 'social';
  attendees: number;
  maxAttendees: number;
  commission: string;
}

interface EventCalendarProps {
  events: Event[];
  onEventClick: (event: Event) => void;
  onAddEvent: () => void;
}

export default function EventCalendar({ events, onEventClick, onAddEvent }: EventCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Generar días del mes
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];
    
    // Días del mes anterior
    for (let i = startingDay - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({ date: prevDate, isCurrentMonth: false });
    }
    
    // Días del mes actual
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      days.push({ date: currentDate, isCurrentMonth: true });
    }
    
    // Días del mes siguiente
    const remainingDays = 42 - days.length; // 6 semanas * 7 días
    for (let i = 1; i <= remainingDays; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({ date: nextDate, isCurrentMonth: false });
    }
    
    return days;
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting':
        return 'bg-blue-500';
      case 'workshop':
        return 'bg-green-500';
      case 'volunteer':
        return 'bg-purple-500';
      case 'training':
        return 'bg-yellow-500';
      case 'social':
        return 'bg-pink-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      month: 'long',
      year: 'numeric'
    });
  };

  const days = getDaysInMonth(currentDate);
  const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Calendario de Eventos</h3>
          <button
            onClick={onAddEvent}
            className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition-colors"
          >
            Agregar Evento
          </button>
        </div>
      </div>
      
      <div className="p-6">
        {/* Navegación del calendario */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={goToPreviousMonth}
            className="p-2 text-gray-600 hover:text-gray-900"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-gray-900 capitalize">
              {formatDate(currentDate)}
            </h2>
            <button
              onClick={goToToday}
              className="px-3 py-1 text-sm text-indigo-600 hover:text-indigo-700 border border-indigo-600 rounded-md hover:bg-indigo-50 transition-colors"
            >
              Hoy
            </button>
          </div>
          
          <button
            onClick={goToNextMonth}
            className="p-2 text-gray-600 hover:text-gray-900"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Días de la semana */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendario */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            const dayEvents = getEventsForDate(day.date);
            const isToday = day.date.toDateString() === new Date().toDateString();
            const isSelected = selectedDate && day.date.toDateString() === selectedDate.toDateString();
            
            return (
              <div
                key={index}
                onClick={() => setSelectedDate(day.date)}
                className={`
                  min-h-[80px] p-2 border border-gray-200 cursor-pointer transition-colors
                  ${day.isCurrentMonth ? 'bg-white' : 'bg-gray-50'}
                  ${isToday ? 'bg-blue-50 border-blue-300' : ''}
                  ${isSelected ? 'bg-indigo-50 border-indigo-300' : ''}
                  hover:bg-gray-50
                `}
              >
                <div className="text-sm font-medium text-gray-900 mb-1">
                  {day.date.getDate()}
                </div>
                
                {/* Eventos del día */}
                <div className="space-y-1">
                  {dayEvents.slice(0, 2).map((event) => (
                    <div
                      key={event.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick(event);
                      }}
                      className={`
                        text-xs p-1 rounded truncate cursor-pointer text-white
                        ${getEventTypeColor(event.type)}
                        hover:opacity-80 transition-opacity
                      `}
                      title={event.title}
                    >
                      {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="text-xs text-gray-500 text-center">
                      +{dayEvents.length - 2} más
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Eventos del día seleccionado */}
        {selectedDate && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              Eventos del {selectedDate.toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </h4>
            
            {getEventsForDate(selectedDate).length === 0 ? (
              <p className="text-sm text-gray-500">No hay eventos programados para este día.</p>
            ) : (
              <div className="space-y-2">
                {getEventsForDate(selectedDate).map((event) => (
                  <div
                    key={event.id}
                    onClick={() => onEventClick(event)}
                    className="p-3 bg-white rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-sm font-medium text-gray-900">{event.title}</h5>
                        <p className="text-xs text-gray-500">{event.time} • {event.location}</p>
                        <p className="text-xs text-gray-400">{event.commission}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block w-3 h-3 rounded-full ${getEventTypeColor(event.type)}`}></span>
                        <p className="text-xs text-gray-500 mt-1">
                          {event.attendees}/{event.maxAttendees} asistentes
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 