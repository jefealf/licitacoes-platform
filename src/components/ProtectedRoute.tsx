import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requirePremium?: boolean;
}

export function ProtectedRoute({ 
  children, 
  requireAuth = true, 
  requirePremium = false 
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  // Se não requer autenticação, mostrar o conteúdo
  if (!requireAuth) {
    return <>{children}</>;
  }

  // Se requer autenticação mas usuário não está logado
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Se requer plano premium mas usuário tem plano gratuito
  if (requirePremium && user?.plan === 'free') {
    return <Navigate to="/pricing" state={{ from: location }} replace />;
  }

  // Usuário autenticado e com permissões adequadas
  return <>{children}</>;
} 