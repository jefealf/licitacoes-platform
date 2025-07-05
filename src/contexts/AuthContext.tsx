import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'premium';
  avatar?: string;
  lastLogin?: Date;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Dados de usuários demo para simulação
const demoUsers: Record<string, User> = {
  'demo@licitainteligente.com': {
    id: '1',
    name: 'João Silva',
    email: 'demo@licitainteligente.com',
    plan: 'premium',
    lastLogin: new Date()
  },
  'admin@licitainteligente.com': {
    id: '2',
    name: 'Maria Santos',
    email: 'admin@licitainteligente.com',
    plan: 'premium',
    lastLogin: new Date()
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar usuário do localStorage na inicialização
  useEffect(() => {
    const savedUser = localStorage.getItem('authUser');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        localStorage.removeItem('authUser');
      }
    }
    setIsLoading(false);
  }, []);

  // Salvar usuário no localStorage quando mudar
  useEffect(() => {
    if (user) {
      localStorage.setItem('authUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('authUser');
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Validação básica
      if (!email || !password) {
        throw new Error('Email e senha são obrigatórios');
      }

      // Simular validação de credenciais
      if (email === 'demo@licitainteligente.com' && password === 'demo123') {
        const userData = demoUsers[email];
        setUser(userData);
        return;
      }

      if (email === 'admin@licitainteligente.com' && password === 'admin123') {
        const userData = demoUsers[email];
        setUser(userData);
        return;
      }

      // Simular erro de credenciais inválidas
      if (Math.random() < 0.1) {
        throw new Error('Erro de conexão com o servidor');
      }

      throw new Error('Email ou senha incorretos');
      
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    // Limpar dados adicionais se necessário
    localStorage.removeItem('rememberedEmail');
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Validação básica
      if (!name || !email || !password) {
        throw new Error('Todos os campos são obrigatórios');
      }

      if (password.length < 6) {
        throw new Error('Senha deve ter pelo menos 6 caracteres');
      }

      // Simular verificação se email já existe
      if (demoUsers[email]) {
        throw new Error('Email já está em uso');
      }

      // Simular criação de usuário
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        plan: 'free',
        lastLogin: new Date()
      };

      setUser(newUser);
      
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      register,
      isAuthenticated: !!user,
      isLoading,
      updateUser
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