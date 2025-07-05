-- =====================================================
-- SCRIPT DE CONFIGURAÇÃO DO SISTEMA DE AUTENTICAÇÃO
-- =====================================================

-- 1. CONFIGURAR URLS DE REDIRECIONAMENTO
-- =====================================================

-- NOTA: As URLs de redirecionamento devem ser configuradas no painel do Supabase
-- Vá para: Authentication > URL Configuration
-- Configure:
-- Site URL: https://licitacoes.vercel.app
-- Redirect URLs:
--   - https://licitacoes.vercel.app/auth/callback
--   - https://licitacoes.vercel.app/login
--   - https://licitacoes.vercel.app/dashboard
--   - http://localhost:5173/auth/callback (para desenvolvimento)

-- 2. VERIFICAR E CRIAR TABELA USERS SE NÃO EXISTIR
-- =====================================================

-- Criar tabela users se não existir
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'premium')),
  avatar TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  has_company BOOLEAN DEFAULT FALSE,
  cpf TEXT,
  phone TEXT,
  birth_date DATE,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT
);

-- 3. CONFIGURAR RLS (ROW LEVEL SECURITY)
-- =====================================================

-- Habilitar RLS na tabela users
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Remover políticas existentes se houver
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;

-- Política para usuários verem apenas seus próprios dados
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

-- Política para usuários editarem apenas seus próprios dados
CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Política para inserção de novos perfis (apenas para o próprio usuário)
CREATE POLICY "Users can insert own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- 4. CRIAR TRIGGER PARA CRIAR PERFIL AUTOMATICAMENTE
-- =====================================================

-- Função para criar perfil automaticamente
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, plan, has_company)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', 'Usuário'),
    'free',
    FALSE
  );
  RETURN NEW;
EXCEPTION
  WHEN unique_violation THEN
    -- Se o usuário já existe, apenas retorna
    RETURN NEW;
  WHEN OTHERS THEN
    -- Log do erro e retorna
    RAISE WARNING 'Erro ao criar perfil para usuário %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para executar a função quando um novo usuário é criado
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5. CONFIGURAR TABELA COMPANIES
-- =====================================================

-- Criar tabela companies se não existir
CREATE TABLE IF NOT EXISTS public.companies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  corporate_name TEXT NOT NULL,
  trade_name TEXT NOT NULL,
  cnpj TEXT UNIQUE NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  website TEXT,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS na tabela companies
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

-- Remover políticas existentes se houver
DROP POLICY IF EXISTS "Users can view own companies" ON public.companies;
DROP POLICY IF EXISTS "Users can update own companies" ON public.companies;
DROP POLICY IF EXISTS "Users can insert own companies" ON public.companies;

-- Política para usuários verem apenas suas próprias empresas
CREATE POLICY "Users can view own companies" ON public.companies
  FOR SELECT USING (auth.uid() = user_id);

-- Política para usuários editarem apenas suas próprias empresas
CREATE POLICY "Users can update own companies" ON public.companies
  FOR UPDATE USING (auth.uid() = user_id);

-- Política para usuários inserirem apenas suas próprias empresas
CREATE POLICY "Users can insert own companies" ON public.companies
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 6. CRIAR ÍNDICES PARA MELHOR PERFORMANCE
-- =====================================================

-- Índice na tabela users
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_plan ON public.users(plan);

-- Índice na tabela companies
CREATE INDEX IF NOT EXISTS idx_companies_user_id ON public.companies(user_id);
CREATE INDEX IF NOT EXISTS idx_companies_cnpj ON public.companies(cnpj);

-- 7. VERIFICAR CONFIGURAÇÕES
-- =====================================================

-- Verificar usuários existentes
SELECT 
  id, 
  email, 
  email_confirmed_at,
  created_at
FROM auth.users 
ORDER BY created_at DESC 
LIMIT 10;

-- Verificar perfis de usuários
SELECT 
  u.id,
  u.email,
  u.name,
  u.plan,
  u.has_company,
  u.created_at
FROM public.users u
ORDER BY u.created_at DESC
LIMIT 10;

-- Verificar empresas
SELECT 
  c.id,
  c.corporate_name,
  c.trade_name,
  c.cnpj,
  u.email as user_email
FROM public.companies c
JOIN public.users u ON c.user_id = u.id
ORDER BY c.created_at DESC
LIMIT 10;

-- 8. MENSAGENS DE CONFIRMAÇÃO
-- =====================================================

DO $$
BEGIN
  RAISE NOTICE '✅ Configuração do sistema de autenticação concluída!';
  RAISE NOTICE '📧 IMPORTANTE: Configure os templates de email no painel do Supabase';
  RAISE NOTICE '🔗 IMPORTANTE: Configure as URLs de redirecionamento no painel do Supabase';
  RAISE NOTICE '🛡️ RLS habilitado nas tabelas users e companies';
  RAISE NOTICE '⚡ Trigger criado para criação automática de perfis';
  RAISE NOTICE '📊 Índices criados para melhor performance';
END $$; 