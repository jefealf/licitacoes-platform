import { supabase, User, Company, LoginAttempt } from '../lib/supabase';

export class AuthService {
  // Login com email e senha
  static async login(email: string, password: string): Promise<{ user: User | null; error: string | null }> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Registrar tentativa de login falhada
        await this.logLoginAttempt(email, false);
        return { user: null, error: error.message };
      }

      if (data.user) {
        // Buscar dados completos do usuário
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (userError) {
          return { user: null, error: 'Erro ao carregar dados do usuário' };
        }

        // Registrar tentativa de login bem-sucedida
        await this.logLoginAttempt(email, true, data.user.id);

        return { user: userData, error: null };
      }

      return { user: null, error: 'Usuário não encontrado' };
    } catch (error) {
      console.error('Erro no login:', error);
      return { user: null, error: 'Erro interno do servidor' };
    }
  }

  // Registro de novo usuário
  static async register(name: string, email: string, password: string): Promise<{ user: User | null; error: string | null }> {
    try {
      // Criar usuário no Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) {
        return { user: null, error: error.message };
      }

      if (data.user) {
        // Criar perfil do usuário na tabela users
        const { data: userData, error: userError } = await supabase
          .from('users')
          .insert([
            {
              id: data.user.id,
              email,
              name,
              plan: 'free',
              has_company: false,
            },
          ])
          .select()
          .single();

        if (userError) {
          return { user: null, error: 'Erro ao criar perfil do usuário' };
        }

        return { user: userData, error: null };
      }

      return { user: null, error: 'Erro ao criar usuário' };
    } catch (error) {
      console.error('Erro no registro:', error);
      return { user: null, error: 'Erro interno do servidor' };
    }
  }

  // Logout
  static async logout(): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.signOut();
      return { error: error?.message || null };
    } catch (error) {
      console.error('Erro no logout:', error);
      return { error: 'Erro interno do servidor' };
    }
  }

  // Buscar usuário atual
  static async getCurrentUser(): Promise<{ user: User | null; error: string | null }> {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error || !user) {
        return { user: null, error: error?.message || 'Usuário não autenticado' };
      }

      // Buscar dados completos do usuário
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (userError) {
        return { user: null, error: 'Erro ao carregar dados do usuário' };
      }

      return { user: userData, error: null };
    } catch (error) {
      console.error('Erro ao buscar usuário atual:', error);
      return { user: null, error: 'Erro interno do servidor' };
    }
  }

  // Atualizar dados do usuário
  static async updateUser(userId: string, updates: Partial<User>): Promise<{ user: User | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('users')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        return { user: null, error: error.message };
      }

      return { user: data, error: null };
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      return { user: null, error: 'Erro interno do servidor' };
    }
  }

  // Salvar dados da empresa
  static async saveCompany(companyData: Omit<Company, 'id' | 'created_at' | 'updated_at'>): Promise<{ company: Company | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('companies')
        .upsert([
          {
            ...companyData,
            updated_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) {
        return { company: null, error: error.message };
      }

      return { company: data, error: null };
    } catch (error) {
      console.error('Erro ao salvar empresa:', error);
      return { company: null, error: 'Erro interno do servidor' };
    }
  }

  // Buscar dados da empresa
  static async getCompany(userId: string): Promise<{ company: Company | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = não encontrado
        return { company: null, error: error.message };
      }

      return { company: data || null, error: null };
    } catch (error) {
      console.error('Erro ao buscar empresa:', error);
      return { company: null, error: 'Erro interno do servidor' };
    }
  }

  // Registrar tentativa de login
  private static async logLoginAttempt(email: string, success: boolean, userId?: string): Promise<void> {
    try {
      await supabase
        .from('login_attempts')
        .insert([
          {
            user_id: userId || null,
            email,
            success,
            ip_address: '127.0.0.1', // Em produção, pegar do request
            user_agent: navigator.userAgent,
          },
        ]);
    } catch (error) {
      console.error('Erro ao registrar tentativa de login:', error);
    }
  }

  // Recuperar senha
  static async resetPassword(email: string): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      return { error: error?.message || null };
    } catch (error) {
      console.error('Erro ao resetar senha:', error);
      return { error: 'Erro interno do servidor' };
    }
  }

  // Verificar se email já existe
  static async checkEmailExists(email: string): Promise<{ exists: boolean; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .single();

      if (error && error.code !== 'PGRST116') {
        return { exists: false, error: error.message };
      }

      return { exists: !!data, error: null };
    } catch (error) {
      console.error('Erro ao verificar email:', error);
      return { exists: false, error: 'Erro interno do servidor' };
    }
  }
} 