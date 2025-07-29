'use client';

import { useState } from 'react';

// Mock AI content generation
const generateAIContent = async (prompt: string, platform: string) => {
  // Simulate AI response
  const responses = {
    linkedin: `🚀 ¡Increíble oportunidad para la comunidad! ${prompt}\n\n#Innovación #Comunidad #Crecimiento`,
    twitter: `🔥 ${prompt}\n\n¿Qué opinas? 👇\n\n#Innovación #Comunidad`,
    instagram: `✨ ${prompt}\n\n💡 ¿Te gustaría ser parte de esto?\n\n#Innovación #Comunidad #Crecimiento`,
  };
  
  return new Promise((resolve) => {
    setTimeout(() => resolve(responses[platform as keyof typeof responses] || responses.linkedin), 2000);
  });
};

export default function ContentStudioPage() {
  const [content, setContent] = useState('');
  const [platform, setPlatform] = useState('linkedin');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [scheduledPosts, setScheduledPosts] = useState([
    {
      id: 1,
      content: '🚀 Lanzamiento de nuestro nuevo programa de mentoría',
      platform: 'linkedin',
      scheduledFor: '2024-01-20T10:00:00',
      status: 'scheduled'
    }
  ]);

  const handleGenerateContent = async () => {
    if (!content.trim()) return;
    
    setIsGenerating(true);
    try {
      const aiContent = await generateAIContent(content, platform);
      setGeneratedContent(aiContent as string);
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublish = (contentToPublish: string) => {
    // Simulate publishing
    alert(`Contenido publicado en ${platform}: ${contentToPublish}`);
  };

  const handleSchedule = (contentToSchedule: string) => {
    const newPost = {
      id: Date.now(),
      content: contentToSchedule,
      platform,
      scheduledFor: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
      status: 'scheduled'
    };
    setScheduledPosts([...scheduledPosts, newPost]);
    alert('Post programado exitosamente');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Studio</h1>
          <p className="text-gray-600">Crea y programa contenido para redes sociales con IA</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Content Creation */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Crear Contenido</h2>
            
            {/* Platform Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Plataforma</label>
              <div className="flex space-x-4">
                {[
                  { id: 'linkedin', name: 'LinkedIn', icon: '💼' },
                  { id: 'twitter', name: 'Twitter', icon: '🐦' },
                  { id: 'instagram', name: 'Instagram', icon: '📷' }
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPlatform(p.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md border ${
                      platform === p.id
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <span>{p.icon}</span>
                    <span>{p.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción del contenido
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe el contenido que quieres crear... (ej: Anuncio de nuevo evento de networking)"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerateContent}
              disabled={!content.trim() || isGenerating}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isGenerating ? 'Generando...' : 'Generar con IA'}
            </button>
          </div>

          {/* Generated Content */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contenido Generado</h2>
            
            {generatedContent ? (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-600 mb-2">Preview para {platform}:</p>
                  <p className="whitespace-pre-wrap text-gray-900">{generatedContent}</p>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => handlePublish(generatedContent)}
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                  >
                    Publicar Ahora
                  </button>
                  <button
                    onClick={() => handleSchedule(generatedContent)}
                    className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
                  >
                    Programar
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <p>Genera contenido para ver la preview aquí</p>
              </div>
            )}
          </div>
        </div>

        {/* Scheduled Posts */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Posts Programados</h2>
          </div>
          <div className="p-6">
            {scheduledPosts.length > 0 ? (
              <div className="space-y-4">
                {scheduledPosts.map((post) => (
                  <div key={post.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="text-gray-900">{post.content}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                        <span>📅 {new Date(post.scheduledFor).toLocaleString()}</span>
                        <span>📱 {post.platform}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          post.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {post.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 text-sm">Editar</button>
                      <button className="text-red-600 hover:text-red-900 text-sm">Cancelar</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <p>No hay posts programados</p>
              </div>
            )}
          </div>
        </div>

        {/* Content Calendar */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Calendario de Contenido</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-7 gap-2">
              {/* Calendar header */}
              {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
              
              {/* Calendar days */}
              {Array.from({ length: 35 }, (_, i) => {
                const day = i + 1;
                const hasContent = day === 20; // Mock: day 20 has content
                
                return (
                  <div
                    key={day}
                    className={`p-2 text-center border rounded-md ${
                      hasContent
                        ? 'bg-blue-50 border-blue-200'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-sm text-gray-900">{day}</span>
                    {hasContent && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mt-1"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 