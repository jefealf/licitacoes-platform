-- Script para configurar URLs de redirecionamento no Supabase
-- Execute este script no SQL Editor do Supabase

-- 1. Verificar configurações atuais de autenticação
SELECT 
    key,
    value
FROM auth.config
WHERE key IN ('site_url', 'redirect_urls');

-- 2. Atualizar site_url (substitua pela URL do seu projeto Vercel)
-- Exemplo: https://seu-projeto.vercel.app
UPDATE auth.config 
SET value = 'https://licitacoes-platform.vercel.app'
WHERE key = 'site_url';

-- 3. Atualizar redirect_urls (substitua pela URL do seu projeto Vercel)
-- Exemplo: https://seu-projeto.vercel.app/**
UPDATE auth.config 
SET value = '["https://licitacoes-platform.vercel.app/**", "http://localhost:5173/**"]'
WHERE key = 'redirect_urls';

-- 4. Verificar se as atualizações foram aplicadas
SELECT 
    key,
    value
FROM auth.config
WHERE key IN ('site_url', 'redirect_urls');

-- 5. Verificar usuários com email não confirmado
SELECT 
    id,
    email,
    email_confirmed_at,
    created_at,
    raw_user_meta_data
FROM auth.users
WHERE email_confirmed_at IS NULL
ORDER BY created_at DESC;

-- 6. Opcional: Confirmar email de usuários específicos (substitua o email)
-- UPDATE auth.users 
-- SET email_confirmed_at = NOW()
-- WHERE email = 'seu-email@exemplo.com';

-- 7. Verificar configurações de email
SELECT 
    key,
    value
FROM auth.config
WHERE key LIKE '%email%';

-- 8. Configurar template de email de confirmação (opcional)
-- UPDATE auth.config 
-- SET value = '{"subject": "Confirme seu email - LicitaInteligente", "template": "Confirme seu email clicando no link: {{ .ConfirmationURL }}"}'
-- WHERE key = 'email_template_confirm_signup';

-- 9. Verificar se o trigger está funcionando
SELECT 
    trigger_name,
    event_manipulation,
    action_statement
FROM information_schema.triggers 
WHERE trigger_name = 'on_auth_user_created';

-- 10. Verificar usuários órfãos (auth sem perfil)
SELECT 
    au.id,
    au.email,
    au.created_at as auth_created_at,
    CASE WHEN u.id IS NULL THEN 'Sem perfil' ELSE 'Com perfil' END as status
FROM auth.users au
LEFT JOIN public.users u ON au.id = u.id
WHERE u.id IS NULL
ORDER BY au.created_at DESC; 