import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { CheckCircle, XCircle, Loader2, AlertCircle } from 'lucide-react';

export function SupabaseTest() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const [details, setDetails] = useState<any>(null);

  useEffect(() => {
    testSupabaseConnection();
  }, []);

  const testSupabaseConnection = async () => {
    try {
      setStatus('loading');
      setMessage('Testando conexão com Supabase...');

      // Testar conexão básica
      const { data, error } = await supabase.from('users').select('count').limit(1);

      if (error) {
        throw error;
      }

      setStatus('success');
      setMessage('✅ Conexão com Supabase estabelecida com sucesso!');
      setDetails({
        url: import.meta.env.VITE_SUPABASE_URL ? 'Configurado' : 'Não configurado',
        key: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Configurado' : 'Não configurado',
        connection: 'OK'
      });

    } catch (error: any) {
      setStatus('error');
      setMessage('❌ Erro na conexão com Supabase');
      setDetails({
        error: error.message,
        url: import.meta.env.VITE_SUPABASE_URL ? 'Configurado' : 'Não configurado',
        key: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Configurado' : 'Não configurado'
      });
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'loading':
        return <Loader2 className="w-5 h-5 animate-spin" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'loading':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className={`border rounded-lg p-4 ${getStatusColor()}`}>
        <div className="flex items-center space-x-3">
          {getStatusIcon()}
          <div className="flex-1">
            <h3 className="font-medium">Status do Supabase</h3>
            <p className="text-sm">{message}</p>
          </div>
        </div>

        {details && (
          <div className="mt-4 text-sm">
            <h4 className="font-medium mb-2">Detalhes:</h4>
            <ul className="space-y-1">
              <li><strong>URL:</strong> {details.url}</li>
              <li><strong>Chave:</strong> {details.key}</li>
              {details.connection && (
                <li><strong>Conexão:</strong> {details.connection}</li>
              )}
              {details.error && (
                <li><strong>Erro:</strong> {details.error}</li>
              )}
            </ul>
          </div>
        )}

        {status === 'error' && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-yellow-600" />
              <span className="text-sm text-yellow-800">
                Verifique se você configurou o arquivo .env com as credenciais corretas do Supabase.
              </span>
            </div>
          </div>
        )}

        <button
          onClick={testSupabaseConnection}
          disabled={status === 'loading'}
          className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          Testar Novamente
        </button>
      </div>
    </div>
  );
} 