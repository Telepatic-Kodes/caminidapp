'use client';

import { useState, useEffect } from 'react';

// Mock feed data
const mockFeedData = [
  {
    id: 1,
    author: {
      name: 'Juan Pérez',
      avatar: '👨‍💼',
      role: 'Miembro'
    },
    content: '¡Excelente evento de networking ayer! Conocí a varios profesionales del sector de IA. ¿Alguien más asistió?',
    timestamp: '2024-01-15T10:30:00',
    likes: 12,
    comments: [
      {
        id: 1,
        author: 'María García',
        content: '¡Sí, fue increíble! Me encantó la charla sobre machine learning.',
        timestamp: '2024-01-15T11:00:00'
      },
      {
        id: 2,
        author: 'Carlos López',
        content: '¿Cuándo será el próximo evento?',
        timestamp: '2024-01-15T11:30:00'
      }
    ],
    type: 'event'
  },
  {
    id: 2,
    author: {
      name: 'Ana Martínez',
      avatar: '👩‍💻',
      role: 'Admin'
    },
    content: '🚀 ¡Nuevo programa de mentoría disponible! Si eres experto en tu campo y quieres ayudar a otros miembros, inscríbete como mentor. Si buscas guía profesional, encuentra tu mentor ideal.',
    timestamp: '2024-01-15T09:15:00',
    likes: 25,
    comments: [
      {
        id: 3,
        author: 'Luis Rodríguez',
        content: '¡Me interesa mucho! ¿Cómo me inscribo?',
        timestamp: '2024-01-15T09:30:00'
      }
    ],
    type: 'announcement'
  },
  {
    id: 3,
    author: {
      name: 'Pedro Silva',
      avatar: '👨‍🎓',
      role: 'Miembro'
    },
    content: 'Compartiendo mi experiencia: Acabo de completar un proyecto de IA que aumentó la eficiencia de mi empresa en un 40%. ¿Alguien más ha implementado soluciones similares?',
    timestamp: '2024-01-14T16:45:00',
    likes: 18,
    comments: [
      {
        id: 4,
        author: 'Sofia Chen',
        content: '¡Impresionante! ¿Qué tecnologías usaste?',
        timestamp: '2024-01-14T17:00:00'
      },
      {
        id: 5,
        author: 'Pedro Silva',
        content: 'Principalmente Python, TensorFlow y APIs de OpenAI. Te puedo contar más detalles si te interesa.',
        timestamp: '2024-01-14T17:15:00'
      }
    ],
    type: 'experience'
  }
];

export default function FeedPage() {
  const [posts, setPosts] = useState(mockFeedData);
  const [newPost, setNewPost] = useState('');
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [newComment, setNewComment] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const handleCreatePost = () => {
    if (!newPost.trim()) return;
    
    const post = {
      id: Date.now(),
      author: {
        name: 'Tú',
        avatar: '👤',
        role: 'Miembro'
      },
      content: newPost,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: [],
      type: 'general'
    };
    
    setPosts([post, ...posts]);
    setNewPost('');
  };

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleAddComment = (postId: number) => {
    if (!newComment.trim()) return;
    
    const comment = {
      id: Date.now(),
      author: 'Tú',
      content: newComment,
      timestamp: new Date().toISOString()
    };
    
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, comments: [...post.comments, comment] }
        : post
    ));
    setNewComment('');
  };

  const filteredPosts = posts.filter(post => {
    if (activeFilter === 'all') return true;
    return post.type === activeFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Feed Social</h1>
          <p className="text-gray-600">Comparte y conecta con la comunidad</p>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex space-x-4">
            {[
              { id: 'all', label: 'Todos', icon: '📱' },
              { id: 'event', label: 'Eventos', icon: '🎉' },
              { id: 'announcement', label: 'Anuncios', icon: '📢' },
              { id: 'experience', label: 'Experiencias', icon: '💡' }
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md border ${
                  activeFilter === filter.id
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <span>{filter.icon}</span>
                <span>{filter.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600">👤</span>
                </div>
                <div className="flex-1">
                  <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="¿Qué quieres compartir con la comunidad?"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={3}
                  />
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex space-x-2">
                      <button className="text-gray-500 hover:text-blue-600">
                        📷
                      </button>
                      <button className="text-gray-500 hover:text-blue-600">
                        🎥
                      </button>
                      <button className="text-gray-500 hover:text-blue-600">
                        📎
                      </button>
                    </div>
                    <button
                      onClick={handleCreatePost}
                      disabled={!newPost.trim()}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                      Publicar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts */}
            {filteredPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow">
                <div className="p-6">
                  {/* Post Header */}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-lg">{post.author.avatar}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {post.author.role}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {new Date(post.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="mb-4">
                    <p className="text-gray-900 whitespace-pre-wrap">{post.content}</p>
                  </div>

                  {/* Post Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleLike(post.id)}
                        className="flex items-center space-x-2 text-gray-500 hover:text-red-600 transition-colors"
                      >
                        <span>❤️</span>
                        <span>{post.likes}</span>
                      </button>
                      <button
                        onClick={() => setSelectedPost(post)}
                        className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors"
                      >
                        <span>💬</span>
                        <span>{post.comments.length}</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-500 hover:text-green-600 transition-colors">
                        <span>🔄</span>
                        <span>Compartir</span>
                      </button>
                    </div>
                  </div>

                  {/* Comments Preview */}
                  {post.comments.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="space-y-3">
                        {post.comments.slice(0, 2).map((comment) => (
                          <div key={comment.id} className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                              <span className="text-xs">👤</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-sm text-gray-900">{comment.author}</span>
                                <span className="text-xs text-gray-500">
                                  {new Date(comment.timestamp).toLocaleString()}
                                </span>
                              </div>
                              <p className="text-sm text-gray-700">{comment.content}</p>
                            </div>
                          </div>
                        ))}
                        {post.comments.length > 2 && (
                          <button
                            onClick={() => setSelectedPost(post)}
                            className="text-sm text-blue-600 hover:text-blue-800"
                          >
                            Ver todos los comentarios ({post.comments.length})
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Community Stats */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Estadísticas</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Miembros activos</span>
                  <span className="font-semibold">1,250</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Posts hoy</span>
                  <span className="font-semibold">23</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Interacciones</span>
                  <span className="font-semibold">156</span>
                </div>
              </div>
            </div>

            {/* Trending Topics */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tendencias</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">#IA</span>
                  <span className="text-xs text-gray-500">45 posts</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">#Networking</span>
                  <span className="text-xs text-gray-500">32 posts</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">#Emprendimiento</span>
                  <span className="text-xs text-gray-500">28 posts</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">#Mentoría</span>
                  <span className="text-xs text-gray-500">15 posts</span>
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Próximos Eventos</h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="font-medium text-sm">Workshop de IA</p>
                  <p className="text-xs text-gray-600">25 de Enero, 18:00</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="font-medium text-sm">Networking Night</p>
                  <p className="text-xs text-gray-600">30 de Enero, 19:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comment Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Comentarios</h3>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {selectedPost.comments.map((comment) => (
                  <div key={comment.id} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-sm">👤</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm text-gray-900">{comment.author}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(comment.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Escribe un comentario..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => handleAddComment(selectedPost.id)}
                    disabled={!newComment.trim()}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    Comentar
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