'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface SearchResult {
  id: string;
  type: 'member' | 'project' | 'commission';
  title: string;
  subtitle: string;
  description?: string;
  url: string;
  status?: string;
}

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

// Datos de ejemplo para la búsqueda
const mockSearchData: SearchResult[] = [
  // Miembros
  { id: '1', type: 'member', title: 'María González', subtitle: 'Educación y Formación', description: 'maria@email.com', url: '/dashboard', status: 'active' },
  { id: '2', type: 'member', title: 'Carlos Ruiz', subtitle: 'Tecnología', description: 'carlos@email.com', url: '/dashboard', status: 'active' },
  { id: '3', type: 'member', title: 'Ana Silva', subtitle: 'Salud y Bienestar', description: 'ana@email.com', url: '/dashboard', status: 'pending' },
  
  // Proyectos
  { id: '4', type: 'project', title: 'Alfabetización Digital', subtitle: 'Educación y Formación', description: 'Programa de capacitación en tecnologías básicas', url: '/proyectos', status: 'active' },
  { id: '5', type: 'project', title: 'Clínica Móvil', subtitle: 'Salud y Bienestar', description: 'Servicios de salud preventiva en comunidades', url: '/proyectos', status: 'active' },
  { id: '6', type: 'project', title: 'Reforestación Comunitaria', subtitle: 'Medio Ambiente', description: 'Plantación de árboles nativos en parques urbanos', url: '/proyectos', status: 'completed' },
  
  // Comisiones
  { id: '7', type: 'commission', title: 'Educación y Formación', subtitle: '45 miembros', description: 'Líder: Dr. Patricia López', url: '/dashboard', status: 'active' },
  { id: '8', type: 'commission', title: 'Salud y Bienestar', subtitle: '32 miembros', description: 'Líder: Dr. Roberto Silva', url: '/dashboard', status: 'active' },
  { id: '9', type: 'commission', title: 'Medio Ambiente', subtitle: '28 miembros', description: 'Líder: Ing. Carmen Vega', url: '/dashboard', status: 'active' },
];

export default function SearchBar({ onSearch, placeholder = "Buscar miembros, proyectos, comisiones..." }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);

  // Cerrar resultados cuando se hace clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Manejar navegación con teclado
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!isOpen) return;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setSelectedIndex(prev => prev < results.length - 1 ? prev + 1 : 0);
          break;
        case 'ArrowUp':
          event.preventDefault();
          setSelectedIndex(prev => prev > 0 ? prev - 1 : results.length - 1);
          break;
        case 'Enter':
          event.preventDefault();
          if (selectedIndex >= 0 && results[selectedIndex]) {
            window.location.href = results[selectedIndex].url;
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setSelectedIndex(-1);
          break;
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  // Función de búsqueda
  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const lowercaseQuery = searchQuery.toLowerCase();
    const filteredResults = mockSearchData.filter(item => 
      item.title.toLowerCase().includes(lowercaseQuery) ||
      item.subtitle.toLowerCase().includes(lowercaseQuery) ||
      (item.description && item.description.toLowerCase().includes(lowercaseQuery))
    );

    setResults(filteredResults);
    setIsOpen(filteredResults.length > 0);
    setSelectedIndex(-1);
  };

  // Manejar cambios en la búsqueda
  const handleInputChange = (value: string) => {
    setQuery(value);
    performSearch(value);
    if (onSearch) onSearch(value);
  };

  // Obtener icono según el tipo de resultado
  const getResultIcon = (type: string) => {
    switch (type) {
      case 'member':
        return (
          <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 'project':
        return (
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        );
      case 'commission':
        return (
          <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  // Obtener color del estado
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-lg">
      {/* Campo de búsqueda */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder={placeholder}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true);
          }}
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setResults([]);
              setIsOpen(false);
            }}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Resultados de búsqueda */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 max-h-96 overflow-y-auto">
          <div className="py-2">
            {results.length === 0 ? (
              <div className="px-4 py-6 text-center">
                <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
                </svg>
                <p className="mt-2 text-sm text-gray-500">No se encontraron resultados</p>
                <p className="text-xs text-gray-400">Intenta con otros términos</p>
              </div>
            ) : (
              <>
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {results.length} resultado{results.length !== 1 ? 's' : ''}
                  </p>
                </div>
                {results.map((result, index) => (
                  <Link
                    key={result.id}
                    href={result.url}
                    className={`block px-4 py-3 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none ${
                      index === selectedIndex ? 'bg-gray-50' : ''
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        {getResultIcon(result.type)}
                      </div>
                      <div className="ml-3 flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {result.title}
                          </p>
                          {result.status && (
                            <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(result.status)}`}>
                              {result.status === 'active' ? 'Activo' : 
                               result.status === 'pending' ? 'Pendiente' : 'Completado'}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 truncate">
                          {result.subtitle}
                        </p>
                        {result.description && (
                          <p className="text-xs text-gray-400 truncate mt-1">
                            {result.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 