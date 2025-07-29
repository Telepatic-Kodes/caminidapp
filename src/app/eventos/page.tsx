'use client';

import { useState } from 'react';
import Link from 'next/link';
import EventCalendar from '@/components/EventCalendar';
import { mockEvents } from '@/lib/mockData';

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

export default function EventosPage() {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const handleAddEvent = () => {
    // Aquí se abriría un modal para crear un nuevo evento
    console.log('Agregar nuevo evento');
  };

  const handleCloseModal = () => {
    setShowEventModal(false);
    setSelectedEvent(null);
  };

  const handleJoinEvent = (eventId: string) => {
    setEvents(prev => 
      prev.map(event => 
        event.id === eventId && event.attendees < event.maxAttendees
          ? { ...event, attendees: event.attendees + 1 }
          : event
      )
    );
  };

  const handleLeaveEvent = (eventId: string) => {
    setEvents(prev => 
      prev.map(event => 
        event.id === eventId && event.attendees > 0
          ? { ...event, attendees: event.attendees - 1 }
          : event
      )
    );
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
              <h1 className="text-2xl font-bold text-gray-900">Gestión de Eventos</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Calendario de eventos */}
        <div className="mb-8">
          <EventCalendar
            events={events}
            onEventClick={handleEventClick}
            onAddEvent={handleAddEvent}
          />
        </div>

        {/* Lista de próximos eventos */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Próximos Eventos</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events
                .filter(event => new Date(event.date) >= new Date())
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .slice(0, 6)
                .map((event) => (
                  <div key={event.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{event.title}</h4>
                        <p className="text-xs text-gray-600">{event.commission}</p>
                      </div>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                        event.type === 'meeting' ? 'bg-blue-100 text-blue-800' :
                        event.type === 'workshop' ? 'bg-green-100 text-green-800' :
                        event.type === 'volunteer' ? 'bg-purple-100 text-purple-800' :
                        event.type === 'training' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-pink-100 text-pink-800'
                      }`}>
                        {event.type === 'meeting' ? 'Reunión' :
                         event.type === 'workshop' ? 'Taller' :
                         event.type === 'volunteer' ? 'Voluntariado' :
                         event.type === 'training' ? 'Capacitación' : 'Social'}
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">{event.description}</p>

                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-gray-500">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(event.date).toLocaleDateString('es-ES', {
                          weekday: 'short',
                          day: 'numeric',
                          month: 'short'
                        })}
                      </div>

                      <div className="flex items-center text-xs text-gray-500">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {event.time}
                      </div>

                      <div className="flex items-center text-xs text-gray-500">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {event.location}
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">
                          {event.attendees}/{event.maxAttendees} asistentes
                        </span>
                        <div className="flex space-x-1">
                          {event.attendees < event.maxAttendees && (
                            <button
                              onClick={() => handleJoinEvent(event.id)}
                              className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                            >
                              Unirse
                            </button>
                          )}
                          {event.attendees > 0 && (
                            <button
                              onClick={() => handleLeaveEvent(event.id)}
                              className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                            >
                              Salir
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>

      {/* Modal de detalles del evento */}
      {showEventModal && selectedEvent && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">{selectedEvent.title}</h3>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-gray-600">{selectedEvent.description}</p>

                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-900">
                      {new Date(selectedEvent.date).toLocaleDateString('es-ES', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>

                  <div className="flex items-center text-sm">
                    <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-900">{selectedEvent.time}</span>
                  </div>

                  <div className="flex items-center text-sm">
                    <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-900">{selectedEvent.location}</span>
                  </div>

                  <div className="flex items-center text-sm">
                    <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="text-gray-900">{selectedEvent.commission}</span>
                  </div>

                  <div className="flex items-center text-sm">
                    <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                    <span className="text-gray-900">
                      {selectedEvent.attendees}/{selectedEvent.maxAttendees} asistentes
                    </span>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  {selectedEvent.attendees < selectedEvent.maxAttendees && (
                    <button
                      onClick={() => {
                        handleJoinEvent(selectedEvent.id);
                        handleCloseModal();
                      }}
                      className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                    >
                      Unirse al Evento
                    </button>
                  )}
                  <button
                    onClick={handleCloseModal}
                    className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 