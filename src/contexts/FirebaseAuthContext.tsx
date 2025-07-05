import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { FirebaseAuthService, User, Company } from '../services/firebaseAuthService';

interface AuthContextType {
  user: User | null;
  company: Company | null;
  loading: boolean;
  loginWithGoogle: () => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<{ success: boolean; message: string }>;
  saveCompany: (companyData: Omit<Company, 'id' | 'created_at' | 'updated_at'>) => Promise<{ success: boolean; message: string }>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  // Carregar usuário inicial
  const loadUser = async () => {
    try {
      console.log('🔄 Carregando usuário inicial...');
      const result = await FirebaseAuthService.getCurrentUser();
      
      if (result.success && result.user) {
        console.log('✅ Usuário carregado:', result.user.name);
        setUser(result.user);
        
        // Carregar dados da empresa se o usuário tem uma
        if (result.user.has_company) {
          await loadCompany(result.user.id);
        }
      } else {
        console.log('❌ Nenhum usuário autenticado');
        setUser(null);
        setCompany(null);
      }
    } catch (error) {
      console.error('❌ Erro ao carregar usuário:', error);
      setUser(null);
      setCompany(null);
    } finally {
      setLoading(false);
    }
  };

  // Carregar dados da empresa
  const loadCompany = async (userId: string) => {
    try {
      const result = await FirebaseAuthService.getCompany(userId);
      if (result.success && result.company) {
        console.log('✅ Empresa carregada:', result.company.corporate_name);
        setCompany(result.company);
      } else {
        console.log('❌ Nenhuma empresa encontrada');
        setCompany(null);
      }
    } catch (error) {
      console.error('❌ Erro ao carregar empresa:', error);
      setCompany(null);
    }
  };

  // Login com Google
  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      console.log('🔄 Iniciando login com Google...');
      
      const result = await FirebaseAuthService.loginWithGoogle();
      
      if (result.success && result.user) {
        console.log('✅ Login com Google realizado com sucesso');
        setUser(result.user);
        return { success: true, message: result.message };
      } else {
        console.log('❌ Login com Google falhou:', result.message);
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('❌ Erro interno no login com Google:', error);
      return { success: false, message: 'Erro interno do servidor' };
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      setLoading(true);
      console.log('🔄 Iniciando logout...');
      
      const result = await FirebaseAuthService.logout();
      
      if (result.success) {
        console.log('✅ Logout realizado com sucesso');
        setUser(null);
        setCompany(null);
        return { success: true, message: result.message };
      } else {
        console.log('❌ Logout falhou:', result.message);
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('❌ Erro interno no logout:', error);
      return { success: false, message: 'Erro interno do servidor' };
    } finally {
      setLoading(false);
    }
  };

  // Salvar empresa
  const saveCompany = async (companyData: Omit<Company, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      if (!user) {
        return { success: false, message: 'Usuário não autenticado' };
      }

      console.log('🔄 Salvando empresa...');
      const result = await FirebaseAuthService.saveCompany(companyData);
      
      if (result.success && result.company) {
        console.log('✅ Empresa salva com sucesso');
        setCompany(result.company);
        
        // Atualizar flag has_company no usuário
        setUser(prev => prev ? { ...prev, has_company: true } : null);
        
        return { success: true, message: result.message };
      } else {
        console.log('❌ Erro ao salvar empresa:', result.message);
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('❌ Erro interno ao salvar empresa:', error);
      return { success: false, message: 'Erro interno do servidor' };
    }
  };

  // Atualizar dados do usuário
  const refreshUser = async () => {
    try {
      console.log('🔄 Atualizando dados do usuário...');
      await loadUser();
    } catch (error) {
      console.error('❌ Erro ao atualizar usuário:', error);
    }
  };

  // Carregar usuário na inicialização
  useEffect(() => {
    loadUser();
  }, []);

  const value: AuthContextType = {
    user,
    company,
    loading,
    loginWithGoogle,
    logout,
    saveCompany,
    refreshUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 