import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthService } from '../services/authService';
import { User, Company } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  company: Company | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  saveCompany: (companyData: Omit<Company, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Verificar usuário atual na inicialização
  useEffect(() => {
    checkCurrentUser();
  }, []);

  // Carregar dados da empresa quando usuário mudar
  useEffect(() => {
    if (user?.has_company) {
      loadCompany();
    } else {
      setCompany(null);
    }
  }, [user]);

  const checkCurrentUser = async () => {
    try {
      setIsLoading(true);
      console.log('🔄 Verificando usuário atual...');
      
      const { user: currentUser, error } = await AuthService.getCurrentUser();
      
      if (error) {
        console.log('❌ Usuário não autenticado:', error);
        setUser(null);
      } else {
        console.log('✅ Usuário autenticado:', currentUser?.name);
        setUser(currentUser);
      }
    } catch (error) {
      console.error('❌ Erro ao verificar usuário atual:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const loadCompany = async () => {
    if (!user) return;

    try {
      const { company: companyData, error } = await AuthService.getCompany(user.id);
      
      if (error) {
        console.error('Erro ao carregar dados da empresa:', error);
      } else {
        setCompany(companyData);
      }
    } catch (error) {
      console.error('Erro ao carregar empresa:', error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      console.log('🔄 Iniciando processo de login...');

      const { user: loggedUser, error } = await AuthService.login(email, password);

      if (error) {
        console.error('❌ Erro no login:', error);
        setError(error);
        throw new Error(error);
      }

      if (loggedUser) {
        console.log('✅ Login realizado com sucesso:', loggedUser.name);
        setUser(loggedUser);
      }
    } catch (error) {
      console.error('❌ Erro no login:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      const { error } = await AuthService.logout();

      if (error) {
        console.error('Erro no logout:', error);
      }

      setUser(null);
      setCompany(null);
    } catch (error) {
      console.error('Erro no logout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const { user: newUser, error } = await AuthService.register(name, email, password);

      if (error) {
        setError(error);
        throw new Error(error);
      }

      if (newUser) {
        setUser(newUser);
      }
    } catch (error) {
      console.error('Erro no registro:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (updates: Partial<User>) => {
    if (!user) return;

    try {
      setIsLoading(true);
      setError(null);

      const { user: updatedUser, error } = await AuthService.updateUser(user.id, updates);

      if (error) {
        setError(error);
        throw new Error(error);
      }

      if (updatedUser) {
        setUser(updatedUser);
      }
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const saveCompany = async (companyData: Omit<Company, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user) return;

    try {
      setIsLoading(true);
      setError(null);

      const { company: savedCompany, error } = await AuthService.saveCompany({
        ...companyData,
        user_id: user.id,
      });

      if (error) {
        setError(error);
        throw new Error(error);
      }

      if (savedCompany) {
        setCompany(savedCompany);
        // Atualizar flag has_company no usuário
        await updateUser({ has_company: true });
      }
    } catch (error) {
      console.error('Erro ao salvar empresa:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      company,
      login,
      logout,
      register,
      updateUser,
      saveCompany,
      isAuthenticated: !!user,
      isLoading,
      error
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}