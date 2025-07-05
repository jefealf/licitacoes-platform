import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const AuthCallbackPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Processando autenticação...');

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log('🔄 Processando callback de autenticação Google...');
        
        // Processar o callback do Supabase OAuth
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('❌ Erro no callback:', error);
          setStatus('error');
          setMessage('Erro ao processar autenticação. Tente novamente.');
          return;
        }

        if (data.session) {
          console.log('✅ Sessão criada com sucesso');
          setStatus('success');
          setMessage('Login realizado com sucesso! Redirecionando para o dashboard...');
          
          // Aguardar um pouco para mostrar a mensagem de sucesso
          setTimeout(() => {
            navigate('/dashboard', { replace: true });
          }, 2000);
        } else {
          console.log('❌ Nenhuma sessão encontrada');
          setStatus('error');
          setMessage('Autenticação não processada. Verifique o link ou tente novamente.');
        }
      } catch (error) {
        console.error('❌ Erro interno no callback:', error);
        setStatus('error');
        setMessage('Erro interno do servidor. Tente novamente.');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100">
            {status === 'loading' && (
              <svg className="animate-spin h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {status === 'success' && (
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
            {status === 'error' && (
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>
          
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {status === 'loading' && 'Processando login...'}
            {status === 'success' && 'Login realizado!'}
            {status === 'error' && 'Erro no login'}
          </h2>
          
          <p className="mt-2 text-sm text-gray-600">
            {message}
          </p>

          {status === 'error' && (
            <div className="mt-4">
              <button
                onClick={() => navigate('/login')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Tentar novamente
              </button>
            </div>
          )}
        </div>

        {/* Debug Info */}
        {import.meta.env.DEV && (
          <div className="mt-8 p-4 bg-gray-100 rounded-md">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Debug Info (Desenvolvimento)</h3>
            <div className="text-xs text-gray-600 space-y-1">
              <p>Status: {status}</p>
              <p>Message: {message}</p>
              <p>URL: {window.location.href}</p>
              <p>Search Params: {searchParams.toString()}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthCallbackPage; 