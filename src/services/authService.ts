import { supabase, User, Company, LoginAttempt } from '../lib/supabase';

export class AuthService {
  // Login com email e senha
  static async login(email: string, password: string): Promise<{ user: User | null; error: string | null }> {
    try {
      console.log('🔐 Tentando login para:', email);
      
      // Primeiro, verificar se o usuário existe
      const { exists: userExists } = await this.checkUserExists(email);
      
      if (!userExists) {
        console.log('❌ Usuário não encontrado no sistema');
        await this.logLoginAttempt(email, false);
        return { user: null, error: 'Email não cadastrado no sistema. Verifique o email ou crie uma conta.' };
      }

      console.log('✅ Usuário encontrado, tentando autenticar...');
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('❌ Erro no login:', error.message);
        
        // Registrar tentativa de login falhada
        await this.logLoginAttempt(email, false);
        
        // Traduzir mensagens de erro para português
        let errorMessage = error.message;
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Senha incorreta. Verifique suas credenciais.';
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Email não confirmado. Verifique sua caixa de entrada.';
        } else if (error.message.includes('Too many requests')) {
          errorMessage = 'Muitas tentativas de login. Tente novamente em alguns minutos.';
        }
        
        return { user: null, error: errorMessage };
      }

      if (data.user) {
        console.log('✅ Usuário autenticado, buscando perfil...');
        
        // Buscar dados completos do usuário
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (userError) {
          console.error('❌ Erro ao buscar dados do usuário:', userError);
          
          // Se o usuário existe no auth mas não na tabela users, tentar criar o perfil
          if (userError.code === 'PGRST116') {
            console.log('🔄 Tentando criar perfil de usuário...');
            const { data: createdUser, error: createError } = await supabase
              .from('users')
              .insert([
                {
                  id: data.user.id,
                  email: data.user.email,
                  name: data.user.user_metadata?.name || 'Usuário',
                  plan: 'free',
                  has_company: false
                }
              ])
              .select()
              .single();

            if (createError) {
              console.error('❌ Erro ao criar perfil:', createError);
              return { user: null, error: 'Erro ao criar perfil do usuário. Tente se registrar novamente.' };
            }

            console.log('✅ Perfil criado com sucesso');
            await this.logLoginAttempt(email, true, data.user.id);
            return { user: createdUser, error: null };
          }
          
          return { user: null, error: 'Perfil de usuário não encontrado. Tente se registrar novamente.' };
        }

        console.log('✅ Perfil encontrado:', userData.name);
        // Registrar tentativa de login bem-sucedida
        await this.logLoginAttempt(email, true, data.user.id);

        return { user: userData, error: null };
      }

      return { user: null, error: 'Usuário não encontrado' };
    } catch (error) {
      console.error('❌ Erro interno no login:', error);
      return { user: null, error: 'Erro interno do servidor' };
    }
  }

  // Registro de novo usuário
  static async register(name: string, email: string, password: string): Promise<{ user: User | null; error: string | null }> {
    try {
      console.log('📝 Tentando registrar usuário:', email);
      
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
        console.error('❌ Erro no registro:', error.message);
        return { user: null, error: error.message };
      }

      if (data.user) {
        console.log('✅ Usuário criado no auth, aguardando trigger...');
        console.log('🆔 ID do usuário:', data.user.id);
        
        // Aguardar um pouco para o trigger criar o perfil
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Buscar o perfil criado pelo trigger
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (userError) {
          console.error('❌ Erro ao buscar perfil criado:', userError);
          
          // Se o trigger falhou, tentar criar manualmente
          if (userError.code === 'PGRST116') {
            console.log('🔄 Trigger falhou, criando perfil manualmente...');
            
            const profileData = {
              id: data.user.id,
              email: data.user.email,
              name: name,
              plan: 'free',
              has_company: false
            };
            
            console.log('📊 Dados do perfil a criar:', profileData);
            
            const { data: createdUser, error: createError } = await supabase
              .from('users')
              .insert([profileData])
              .select()
              .single();

            if (createError) {
              console.error('❌ Erro ao criar perfil manualmente:', createError);
              console.error('📋 Detalhes do erro:', {
                code: createError.code,
                message: createError.message,
                details: createError.details,
                hint: createError.hint
              });
              
              // Verificar se é problema de RLS
              if (createError.code === '42501') {
                return { user: null, error: 'Erro de permissão. Verifique as políticas de segurança da tabela users.' };
              }
              
              return { user: null, error: `Erro ao criar perfil do usuário: ${createError.message}` };
            }

            console.log('✅ Perfil criado manualmente:', createdUser);
            return { user: createdUser, error: null };
          }
          
          return { user: null, error: `Erro ao criar perfil do usuário: ${userError.message}` };
        }

        console.log('✅ Perfil criado pelo trigger:', userData.name);
        return { user: userData, error: null };
      }

      return { user: null, error: 'Erro ao criar usuário' };
    } catch (error) {
      console.error('❌ Erro interno no registro:', error);
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
      console.log('🔍 Verificando usuário atual...');
      
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error || !user) {
        console.log('❌ Usuário não autenticado:', error?.message || 'Nenhum usuário encontrado');
        return { user: null, error: error?.message || 'Usuário não autenticado' };
      }

      console.log('✅ Usuário autenticado, buscando perfil...');
      
      // Buscar dados completos do usuário
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (userError) {
        console.error('❌ Erro ao carregar dados do usuário:', userError);
        
        // Se o perfil não existe, tentar criar
        if (userError.code === 'PGRST116') {
          console.log('🔄 Perfil não encontrado, criando...');
          const { data: createdUser, error: createError } = await supabase
            .from('users')
            .insert([
              {
                id: user.id,
                email: user.email,
                name: user.user_metadata?.name || 'Usuário',
                plan: 'free',
                has_company: false
              }
            ])
            .select()
            .single();

          if (createError) {
            console.error('❌ Erro ao criar perfil:', createError);
            return { user: null, error: 'Erro ao carregar dados do usuário' };
          }

          console.log('✅ Perfil criado:', createdUser.name);
          return { user: createdUser, error: null };
        }
        
        return { user: null, error: 'Erro ao carregar dados do usuário' };
      }

      console.log('✅ Perfil carregado:', userData.name);
      return { user: userData, error: null };
    } catch (error) {
      console.error('❌ Erro interno ao buscar usuário atual:', error);
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
      console.log('📝 Registrando tentativa de login:', { email, success, userId });
      
      const loginData = {
        user_id: userId || null,
        email,
        success,
        ip_address: '127.0.0.1', // Em produção, pegar do request
        user_agent: navigator.userAgent || 'Unknown',
      };

      console.log('📊 Dados para inserção:', loginData);

      const { error } = await supabase
        .from('login_attempts')
        .insert([loginData]);

      if (error) {
        console.error('❌ Erro ao registrar tentativa de login:', error);
        // Não vamos falhar o login por causa disso, apenas logar o erro
      } else {
        console.log('✅ Tentativa de login registrada com sucesso');
      }
    } catch (error) {
      console.error('❌ Erro ao registrar tentativa de login:', error);
      // Não vamos falhar o login por causa disso
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

  // Verificar se email existe no Supabase Auth
  static async checkUserExists(email: string): Promise<{ exists: boolean; error: string | null }> {
    try {
      console.log('🔍 Verificando se usuário existe:', email);
      
      // Tentar buscar usuário por email (isso só funciona para usuários autenticados)
      // Como alternativa, vamos tentar um login com senha incorreta para ver se o email existe
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password: 'senha_incorreta_temporaria'
      });

      // Se o erro for "Invalid login credentials", significa que o email existe
      // Se for "Email not confirmed" ou similar, também significa que existe
      if (error && (error.message.includes('Invalid login credentials') || 
                    error.message.includes('Email not confirmed') ||
                    error.message.includes('Invalid email'))) {
        return { exists: true, error: null };
      }

      return { exists: false, error: null };
    } catch (error) {
      console.error('❌ Erro ao verificar usuário:', error);
      return { exists: false, error: 'Erro interno do servidor' };
    }
  }
} 