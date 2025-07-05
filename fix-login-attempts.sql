-- Script para corrigir as políticas da tabela login_attempts
-- Execute este script no SQL Editor do Supabase

-- 1. Verificar se a tabela existe
SELECT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'login_attempts'
);

-- 2. Verificar políticas existentes
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
WHERE tablename = 'login_attempts';

-- 3. Remover políticas existentes que podem estar causando problemas
DROP POLICY IF EXISTS "Anyone can insert login attempts" ON login_attempts;
DROP POLICY IF EXISTS "Users can view own login attempts" ON login_attempts;
DROP POLICY IF EXISTS "Users can insert own login attempts" ON login_attempts;

-- 4. Criar nova política mais permissiva para inserção
CREATE POLICY "Allow login attempts insertion" ON login_attempts
    FOR INSERT 
    WITH CHECK (true);

-- 5. Criar política para visualização (apenas para usuários autenticados)
CREATE POLICY "Users can view own login attempts" ON login_attempts
    FOR SELECT 
    USING (
        auth.uid() = user_id OR 
        (user_id IS NULL AND auth.uid() IS NOT NULL)
    );

-- 6. Verificar se RLS está habilitado
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables 
WHERE tablename = 'login_attempts';

-- 7. Habilitar RLS se não estiver
ALTER TABLE login_attempts ENABLE ROW LEVEL SECURITY;

-- 8. Verificar estrutura da tabela
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'login_attempts' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 9. Testar inserção (opcional - execute apenas se quiser testar)
-- INSERT INTO login_attempts (email, success, ip_address, user_agent)
-- VALUES ('test@example.com', false, '127.0.0.1', 'Test Agent');

-- 10. Verificar se a inserção funcionou
-- SELECT * FROM login_attempts ORDER BY created_at DESC LIMIT 5; 