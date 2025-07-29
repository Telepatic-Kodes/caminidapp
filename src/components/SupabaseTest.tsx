'use client';

import { useState, useEffect } from 'react';
import { db, supabase, Member } from '@/lib/supabase';

export default function SupabaseTest() {
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'mock' | 'error'>('checking');
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Test database connection
  useEffect(() => {
    const testConnection = async () => {
      try {
        if (supabase) {
          // Test if we can connect to Supabase
          const { error } = await supabase.from('members').select('count').limit(1);
          
          if (error) {
            console.log('Supabase connection test failed:', error);
            setConnectionStatus('error');
          } else {
            console.log('Supabase connection successful');
            setConnectionStatus('connected');
          }
        } else {
          console.log('Supabase not configured, using mock mode');
          setConnectionStatus('mock');
        }
      } catch (err) {
        console.log('Supabase connection error:', err);
        setConnectionStatus('error');
      }
    };

    testConnection();
  }, []);

  // Load members
  const loadMembers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await db.members.getAll();
      
      if (error) {
        setError(`Error loading members: ${error}`);
      } else {
        setMembers(data || []);
      }
    } catch (err) {
      setError(`Unexpected error: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  // Add a test member
  const addTestMember = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const testMember = {
        full_name: `Test Member ${Date.now()}`,
        email: `test${Date.now()}@example.com`,
        phone: '123456789',
        country: 'Test Country',
        cause: 'Test Cause',
        status: 'active' as const,
        participation_score: 50,
        joined_at: new Date().toISOString().slice(0, 10),
      };

      const { data, error } = await db.members.create(testMember);
      
      if (error) {
        setError(`Error creating member: ${error}`);
      } else {
        console.log('Member created successfully:', data);
        // Reload the list
        await loadMembers();
      }
    } catch (err) {
      setError(`Unexpected error: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Supabase Database Test</h2>
      
      {/* Connection Status */}
      <div className="mb-6 p-4 rounded-lg border">
        <h3 className="text-lg font-semibold mb-2">Connection Status</h3>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${
            connectionStatus === 'checking' ? 'bg-yellow-500' :
            connectionStatus === 'connected' ? 'bg-green-500' :
            connectionStatus === 'mock' ? 'bg-blue-500' : 'bg-red-500'
          }`}></div>
          <span className="text-sm">
            {connectionStatus === 'checking' && 'Checking connection...'}
            {connectionStatus === 'connected' && 'Connected to Supabase'}
            {connectionStatus === 'mock' && 'Using mock data (Supabase not configured)'}
            {connectionStatus === 'error' && 'Connection failed'}
          </span>
        </div>
        {connectionStatus === 'mock' && (
          <p className="text-xs text-blue-600 mt-2">
            �� To connect to real database, create a .env.local file with your Supabase credentials
          </p>
        )}
      </div>

      {/* Test Actions */}
      <div className="mb-6 space-y-4">
        <div className="flex space-x-4">
          <button
            onClick={loadMembers}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load Members'}
          </button>
          
          <button
            onClick={addTestMember}
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Add Test Member'}
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700">
            {error}
          </div>
        )}
      </div>

      {/* Members List */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Members ({members.length})</h3>
        {members.length === 0 ? (
          <p className="text-gray-500">No members loaded. Click &ldquo;Load Members&rdquo; to fetch data.</p>
        ) : (
          <div className="space-y-2">
            {members.map((member) => (
              <div key={member.id} className="p-3 border rounded bg-gray-50">
                <div className="font-medium">{member.full_name}</div>
                <div className="text-sm text-gray-600">{member.email}</div>
                <div className="text-xs text-gray-500">
                  {member.country} • {member.status} • Score: {member.participation_score}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Learning Notes */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">Learning Notes:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• The database functions use try-catch for error handling</li>
          <li>• Mock data is used as fallback when Supabase is not configured</li>
          <li>• All database operations are asynchronous (use async/await)</li>
          <li>• TypeScript interfaces ensure type safety</li>
          <li>• The db object provides a clean API for database operations</li>
        </ul>
      </div>
    </div>
  );
} 