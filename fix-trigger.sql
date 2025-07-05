-- Script para verificar e corrigir o trigger de criação automática de usuários
-- Execute este script no SQL Editor do Supabase

-- 1. Verificar se o trigger existe
SELECT 
    trigger_name,
    event_manipulation,
    action_statement
FROM information_schema.triggers 
WHERE trigger_name = 'on_auth_user_created';

-- 2. Verificar se a função existe
SELECT 
    routine_name,
    routine_type
FROM information_schema.routines 
WHERE routine_name = 'handle_new_user';

-- 3. Recriar a função com melhor tratamento de erro
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Verificar se o perfil já existe para evitar duplicação
    IF NOT EXISTS (SELECT 1 FROM public.users WHERE id = NEW.id) THEN
        INSERT INTO public.users (id, email, name)
        VALUES (
            NEW.id, 
            NEW.email, 
            COALESCE(NEW.raw_user_meta_data->>'name', 'Usuário')
        );
    END IF;
    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        -- Log do erro para debug
        RAISE LOG 'Erro ao criar perfil de usuário: %', SQLERRM;
        RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Recriar o trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5. Verificar usuários que existem no auth mas não na tabela users
SELECT 
    au.id,
    au.email,
    au.created_at as auth_created_at
FROM auth.users au
LEFT JOIN public.users u ON au.id = u.id
WHERE u.id IS NULL;

-- 6. Criar perfis para usuários que existem no auth mas não na tabela users
INSERT INTO public.users (id, email, name, plan, has_company)
SELECT 
    au.id,
    au.email,
    COALESCE(au.raw_user_meta_data->>'name', 'Usuário'),
    'free',
    false
FROM auth.users au
LEFT JOIN public.users u ON au.id = u.id
WHERE u.id IS NULL
ON CONFLICT (id) DO NOTHING; 