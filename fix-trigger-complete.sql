-- Script completo para verificar e corrigir o trigger de criação de usuários
-- Execute este script no SQL Editor do Supabase

-- 1. Verificar se a função existe
SELECT 
    routine_name,
    routine_type,
    routine_definition
FROM information_schema.routines 
WHERE routine_name = 'handle_new_user';

-- 2. Verificar se o trigger existe
SELECT 
    trigger_name,
    event_manipulation,
    action_statement,
    action_timing
FROM information_schema.triggers 
WHERE trigger_name = 'on_auth_user_created';

-- 3. Verificar usuários que existem no auth mas não na tabela users
SELECT 
    au.id,
    au.email,
    au.created_at as auth_created_at,
    au.raw_user_meta_data
FROM auth.users au
LEFT JOIN public.users u ON au.id = u.id
WHERE u.id IS NULL
ORDER BY au.created_at DESC;

-- 4. Recriar a função com melhor tratamento de erro
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Log para debug
    RAISE LOG 'Trigger handle_new_user executado para usuário: %', NEW.id;
    
    -- Verificar se o perfil já existe para evitar duplicação
    IF NOT EXISTS (SELECT 1 FROM public.users WHERE id = NEW.id) THEN
        -- Inserir o perfil
        INSERT INTO public.users (
            id, 
            email, 
            name,
            plan,
            has_company
        ) VALUES (
            NEW.id, 
            NEW.email, 
            COALESCE(NEW.raw_user_meta_data->>'name', 'Usuário'),
            'free',
            false
        );
        
        RAISE LOG 'Perfil criado com sucesso para usuário: %', NEW.id;
    ELSE
        RAISE LOG 'Perfil já existe para usuário: %', NEW.id;
    END IF;
    
    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        -- Log detalhado do erro
        RAISE LOG 'Erro ao criar perfil de usuário: % - %', SQLERRM, SQLSTATE;
        -- Retornar NEW mesmo com erro para não quebrar o processo de registro
        RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Recriar o trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 6. Verificar políticas da tabela users
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'users';

-- 7. Recriar políticas se necessário
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Users can insert own profile" ON users;

-- Política para visualização
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

-- Política para atualização
CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Política para inserção (importante para o trigger)
CREATE POLICY "Users can insert own profile" ON users
    FOR INSERT WITH CHECK (auth.uid() = id);

-- 8. Verificar se RLS está habilitado
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables 
WHERE tablename = 'users';

-- 9. Habilitar RLS se não estiver
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- 10. Criar perfis para usuários que existem no auth mas não na tabela users
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

-- 11. Verificar resultado
SELECT 
    'Usuários no auth' as tipo,
    COUNT(*) as quantidade
FROM auth.users
UNION ALL
SELECT 
    'Usuários na tabela users' as tipo,
    COUNT(*) as quantidade
FROM public.users;

-- 12. Testar o trigger (opcional - descomente se quiser testar)
-- INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_user_meta_data)
-- VALUES (
--     gen_random_uuid(),
--     'teste@exemplo.com',
--     crypt('senha123', gen_salt('bf')),
--     now(),
--     now(),
--     now(),
--     '{"name": "Usuário Teste"}'::jsonb
-- ); 