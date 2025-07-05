# 🔧 Solução de Problemas - Cadastro não funciona

## 🚨 Problema: Cadastro não reflete no Supabase

### 1. Verificar Variáveis de Ambiente

**Problema mais comum:** Variáveis de ambiente não configuradas.

**Solução:**
1. Copie o arquivo de exemplo:
   ```bash
   cp env.example .env
   ```

2. Edite o arquivo `.env` com suas credenciais reais:
   ```env
   VITE_SUPABASE_URL=https://seu-projeto.supabase.co
   VITE_SUPABASE_ANON_KEY=sua-chave-anonima-aqui
   ```

3. Reinicie o servidor:
   ```bash
   npm run dev
   ```

### 2. Testar Conexão

1. Acesse: `http://localhost:5173`
2. Role até a seção "Teste de Conexão Supabase"
3. Clique em "Executar Teste"
4. Verifique os resultados

**Se o teste falhar:**
- ❌ Variáveis não configuradas
- ❌ Credenciais incorretas
- ❌ Projeto inativo
- ❌ Tabelas não criadas

### 3. Verificar Configuração do Supabase

#### 3.1 Executar Script SQL
1. Acesse o [painel do Supabase](https://supabase.com/dashboard)
2. Vá para SQL Editor
3. Execute o arquivo `setup-auth.sql`

#### 3.2 Configurar URLs de Redirecionamento
1. Vá para **Authentication** > **URL Configuration**
2. Configure:
   - **Site URL**: `https://licitacoes.vercel.app`
   - **Redirect URLs**:
     - `https://licitacoes.vercel.app/auth/callback`
     - `https://licitacoes.vercel.app/login`
     - `https://licitacoes.vercel.app/dashboard`
     - `http://localhost:5173/auth/callback`

#### 3.3 Configurar Templates de Email
1. Vá para **Authentication** > **Email Templates**
2. Configure o template de confirmação
3. Certifique-se de que o link aponta para `/auth/callback`

### 4. Verificar Políticas RLS

Execute no SQL Editor do Supabase:

```sql
-- Verificar se RLS está habilitado
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename IN ('users', 'companies');

-- Verificar políticas
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename IN ('users', 'companies');
```

### 5. Verificar Trigger

Execute no SQL Editor:

```sql
-- Verificar se o trigger existe
SELECT 
    trigger_name,
    event_manipulation,
    action_statement
FROM information_schema.triggers 
WHERE trigger_name = 'on_auth_user_created';

-- Verificar se a função existe
SELECT 
    routine_name,
    routine_type
FROM information_schema.routines 
WHERE routine_name = 'handle_new_user';
```

### 6. Debug no Console

Abra o console do navegador (F12) e verifique:

1. **Logs de conexão:**
   ```
   🔗 Conectando ao Supabase: { url: "✅ Configurado", key: "✅ Configurado" }
   ```

2. **Logs de registro:**
   ```
   🔄 Iniciando registro: { name: "...", email: "..." }
   ✅ Usuário criado no Auth: ...
   ❌ Erro no registro: ...
   ```

### 7. Problemas Comuns e Soluções

#### 7.1 "Invalid API key"
- **Causa:** Chave anônima incorreta
- **Solução:** Verificar chave no painel do Supabase

#### 7.2 "Invalid URL"
- **Causa:** URL do projeto incorreta
- **Solução:** Verificar URL no painel do Supabase

#### 7.3 "Table does not exist"
- **Causa:** Tabelas não criadas
- **Solução:** Executar script SQL

#### 7.4 "RLS policy violation"
- **Causa:** Políticas RLS não configuradas
- **Solução:** Executar script SQL

#### 7.5 "Email not sent"
- **Causa:** Templates de email não configurados
- **Solução:** Configurar templates no painel

### 8. Teste Completo

1. **Limpe o cache do navegador**
2. **Reinicie o servidor de desenvolvimento**
3. **Execute o teste de conexão**
4. **Tente registrar um novo usuário**
5. **Verifique os logs no console**
6. **Verifique no painel do Supabase se o usuário foi criado**

### 9. Logs Esperados

**Registro bem-sucedido:**
```
🔄 Iniciando registro: { name: "João", email: "joao@email.com" }
✅ Usuário criado no Auth: abc123...
✅ Perfil criado: João
```

**Erro comum:**
```
❌ Erro no registro: Invalid API key
❌ Erro no registro: Table 'users' does not exist
❌ Erro no registro: RLS policy violation
```

### 10. Contato

Se o problema persistir:
1. Execute o teste de conexão
2. Copie os logs do console
3. Verifique se todas as etapas foram seguidas
4. Teste com um novo projeto Supabase

---

**🎯 Objetivo:** Ter um cadastro que funcione perfeitamente e envie email de confirmação! 