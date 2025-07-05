import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export function AuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Processando autenticação...');

  useEffect(() => {
    handleAuthCallback();
  }, []);

  const handleAuthCallback = async () => {
    try {
      console.log('🔄 Processando callback de autenticação...');
      
      // Obter parâmetros da URL
      const accessToken = searchParams.get('access_token');
      const refreshToken = searchParams.get('refresh_token');
      const error = searchParams.get('error');
      const errorDescription = searchParams.get('error_description');

      console.log('📋 Parâmetros da URL:', {
        hasAccessToken: !!accessToken,
        hasRefreshToken: !!refreshToken,
        error,
        errorDescription
      });

      // Se há erro na URL
      if (error) {
        console.error('❌ Erro no callback:', error, errorDescription);
        setStatus('error');
        setMessage(`Erro de autenticação: ${errorDescription || error}`);
        return;
      }

      // Se há tokens na URL, fazer login
      if (accessToken && refreshToken) {
        console.log('🔐 Tokens encontrados, fazendo login...');
        
        const { data, error: sessionError } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (sessionError) {
          console.error('❌ Erro ao definir sessão:', sessionError);
          setStatus('error');
          setMessage(`Erro ao processar autenticação: ${sessionError.message}`);
          return;
        }

        if (data.user) {
          console.log('✅ Usuário autenticado com sucesso:', data.user.email);
          setStatus('success');
          setMessage('Email confirmado com sucesso! Redirecionando...');
          
          // Aguardar um pouco para mostrar a mensagem
          setTimeout(() => {
            navigate('/dashboard', { replace: true });
          }, 2000);
        } else {
          console.error('❌ Nenhum usuário encontrado na sessão');
          setStatus('error');
          setMessage('Erro: Nenhum usuário encontrado na sessão');
        }
      } else {
        // Se não há tokens, verificar se há sessão ativa
        console.log('🔍 Verificando sessão ativa...');
        
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          console.error('❌ Erro ao obter usuário:', userError);
          setStatus('error');
          setMessage(`Erro ao verificar usuário: ${userError.message}`);
          return;
        }

        if (user) {
          console.log('✅ Usuário já autenticado:', user.email);
          setStatus('success');
          setMessage('Usuário já autenticado! Redirecionando...');
          
          setTimeout(() => {
            navigate('/dashboard', { replace: true });
          }, 2000);
        } else {
          console.log('❌ Nenhum usuário autenticado');
          setStatus('error');
          setMessage('Nenhum usuário autenticado encontrado');
          
          setTimeout(() => {
            navigate('/login', { replace: true });
          }, 3000);
        }
      }
    } catch (error: any) {
      console.error('❌ Erro interno no callback:', error);
      setStatus('error');
      setMessage(`Erro interno: ${error.message}`);
      
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 3000);
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'loading':
        return <Loader2 className="w-8 h-8 animate-spin text-blue-600" />;
      case 'success':
        return <CheckCircle className="w-8 h-8 text-green-600" />;
      case 'error':
        return <XCircle className="w-8 h-8 text-red-600" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'loading':
        return 'text-blue-600';
      case 'success':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            {getStatusIcon()}
          </div>
          <h2 className={`text-2xl font-bold ${getStatusColor()}`}>
            {status === 'loading' && 'Processando...'}
            {status === 'success' && 'Sucesso!'}
            {status === 'error' && 'Erro'}
          </h2>
          <p className="mt-4 text-gray-600">
            {message}
          </p>
          
          {status === 'loading' && (
            <div className="mt-6">
              <div className="animate-pulse flex space-x-4 justify-center">
                <div className="rounded-full bg-blue-200 h-2 w-2"></div>
                <div className="rounded-full bg-blue-200 h-2 w-2"></div>
                <div className="rounded-full bg-blue-200 h-2 w-2"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 