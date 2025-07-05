import { supabase, User, Company } from '../lib/supabase';

export class AuthService {
  // ===== LOGIN COM GOOGLE =====
  static async loginWithGoogle(): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      console.log('🔄 Iniciando login com Google...');

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) {
        console.error('❌ Erro no login com Google:', error);
        return {
          success: false,
          message: this.translateError(error.message)
        };
      }

      console.log('✅ Redirecionamento para Google iniciado');
      return {
        success: true,
        message: 'Redirecionando para Google...'
      };

    } catch (error: any) {
      console.error('❌ Erro interno no login com Google:', error);
      return {
        success: false,
        message: 'Erro interno do servidor'
      };
    }
  }

  // ===== LOGOUT =====
  static async logout(): Promise<{ success: boolean; message: string }> {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('❌ Erro no logout:', error);
        return {
          success: false,
          message: 'Erro ao fazer logout'
        };
      }

      return {
        success: true,
        message: 'Logout realizado com sucesso'
      };

    } catch (error: any) {
      console.error('❌ Erro interno no logout:', error);
      return {
        success: false,
        message: 'Erro interno do servidor'
      };
    }
  }

  // ===== VERIFICAR USUÁRIO ATUAL =====
  static async getCurrentUser(): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error || !user) {
        return {
          success: false,
          message: 'Usuário não autenticado'
        };
      }

      // Buscar perfil do usuário
      const profileResult = await this.getOrCreateUserProfile(user);
      if (!profileResult.success) {
        return profileResult;
      }

      return {
        success: true,
        message: 'Usuário autenticado',
        user: profileResult.user
      };

    } catch (error: any) {
      console.error('❌ Erro ao buscar usuário atual:', error);
      return {
        success: false,
        message: 'Erro interno do servidor'
      };
    }
  }

  // ===== MÉTODOS AUXILIARES =====

  // Buscar ou criar perfil do usuário
  private static async getOrCreateUserProfile(authUser: any): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      // Primeiro, tentar buscar o perfil
      const profileResult = await this.getUserProfile(authUser.id);
      
      if (profileResult.success) {
        return profileResult;
      }

      // Se não encontrou, criar o perfil
      console.log('🔄 Perfil não encontrado, criando...');
      return await this.createUserProfile(authUser);

    } catch (error: any) {
      console.error('❌ Erro ao buscar/criar perfil:', error);
      return {
        success: false,
        message: 'Erro ao processar perfil do usuário'
      };
    }
  }

  // Criar perfil do usuário
  private static async createUserProfile(authUser: any): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      const profileData = {
        id: authUser.id,
        email: authUser.email,
        name: authUser.user_metadata?.full_name || authUser.user_metadata?.name || 'Usuário',
        plan: 'free',
        has_company: false
      };

      const { data, error } = await supabase
        .from('users')
        .insert([profileData])
        .select()
        .single();

      if (error) {
        console.error('❌ Erro ao criar perfil:', error);
        return {
          success: false,
          message: 'Erro ao criar perfil do usuário'
        };
      }

      console.log('✅ Perfil criado:', data.name);
      return {
        success: true,
        message: 'Perfil criado com sucesso',
        user: data
      };

    } catch (error: any) {
      console.error('❌ Erro interno ao criar perfil:', error);
      return {
        success: false,
        message: 'Erro interno do servidor'
      };
    }
  }

  // Buscar perfil do usuário
  private static async getUserProfile(userId: string): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return {
            success: false,
            message: 'Perfil não encontrado'
          };
        }
        throw error;
      }

      return {
        success: true,
        message: 'Perfil encontrado',
        user: data
      };

    } catch (error: any) {
      console.error('❌ Erro ao buscar perfil:', error);
      return {
        success: false,
        message: 'Erro ao buscar perfil do usuário'
      };
    }
  }

  // Traduzir mensagens de erro
  private static translateError(errorMessage: string): string {
    const errorMap: { [key: string]: string } = {
      'Invalid login credentials': 'Credenciais inválidas',
      'User already registered': 'Usuário já cadastrado',
      'User not found': 'Usuário não encontrado',
      'Too many requests': 'Muitas tentativas. Tente novamente em alguns minutos.',
      'OAuth error': 'Erro na autenticação com Google',
      'OAuth account not linked': 'Conta Google não vinculada'
    };

    return errorMap[errorMessage] || errorMessage;
  }

  // ===== MÉTODOS PARA EMPRESA =====
  
  static async saveCompany(companyData: Omit<Company, 'id' | 'created_at' | 'updated_at'>): Promise<{ success: boolean; message: string; company?: Company }> {
    try {
      const { data, error } = await supabase
        .from('companies')
        .upsert([{
          ...companyData,
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        return {
          success: false,
          message: error.message
        };
      }

      return {
        success: true,
        message: 'Empresa salva com sucesso',
        company: data
      };

    } catch (error: any) {
      return {
        success: false,
        message: 'Erro interno do servidor'
      };
    }
  }

  static async getCompany(userId: string): Promise<{ success: boolean; message: string; company?: Company }> {
    try {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        return {
          success: false,
          message: error.message
        };
      }

      return {
        success: true,
        message: 'Empresa encontrada',
        company: data || null
      };

    } catch (error: any) {
      return {
        success: false,
        message: 'Erro interno do servidor'
      };
    }
  }
} 