# 🚀 Configuração do Supabase - Guia Completo

## 📋 Pré-requisitos

1. **Conta no Supabase**: [supabase.com](https://supabase.com)
2. **Node.js** instalado
3. **Git** instalado

## 🔧 Passo a Passo

### 1. Criar Projeto no Supabase

1. **Acesse** [supabase.com](https://supabase.com)
2. **Faça login** com GitHub
3. **Clique em "New Project"**
4. **Configure:**
   - **Nome:** `licitacoes-platform`
   - **Database Password:** Crie uma senha forte
   - **Region:** São Paulo (mais próxima)
5. **Clique em "Create new project"**
6. **Aguarde** 2-3 minutos para o setup

### 2. Configurar Banco de Dados

1. **No Supabase Dashboard**, vá em **"SQL Editor"**
2. **Clique em "New query"**
3. **Cole o conteúdo** do arquivo `supabase-schema.sql`
4. **Clique em "Run"**
5. **Execute também** o arquivo `fix-trigger.sql` para garantir que o trigger funcione

### 3. Obter Credenciais

1. **Vá em "Settings" > "API"**
2. **Copie:**
   - **Project URL** (ex: `https://abc123.supabase.co`)
   - **anon public key** (ex: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

### 4. Configurar Variáveis de Ambiente

1. **Crie arquivo `.env`** na raiz do projeto:
```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima
```

2. **Substitua** pelos valores reais do seu projeto

### 5. Configurar Autenticação

1. **No Supabase**, vá em **"Authentication" > "Settings"**
2. **Configure:**
   - **Site URL:** `http://localhost:5173`
   - **Redirect URLs:** 
     - `http://localhost:5173/**`
     - `http://localhost:5173/login`
     - `http://localhost:5173/register`

### 6. Testar Configuração

1. **Execute o projeto:**
```bash
npm install
npm run dev
```

2. **Acesse:** `http://localhost:5173`
3. **Tente fazer login/registro**
4. **Verifique os logs** no console do navegador

## 🔍 Verificação

### Logs Esperados no Console:

```
🔗 Conectando ao Supabase: { url: "✅ Configurado", key: "✅ Configurado" }
🔐 Tentando login para: seu@email.com
✅ Usuário autenticado, buscando perfil...
✅ Perfil encontrado: Seu Nome
```

### Se Houver Erros:

1. **Verifique** se as variáveis de ambiente estão corretas
2. **Confirme** se o banco foi criado corretamente
3. **Execute** o script `fix-trigger.sql` novamente
4. **Verifique** as políticas de segurança (RLS)

## 🛠️ Solução de Problemas

### Erro: "Variáveis de ambiente não configuradas"
- **Solução:** Crie o arquivo `.env` com as credenciais corretas

### Erro: "Perfil de usuário não encontrado"
- **Solução:** Execute o script `fix-trigger.sql` no Supabase

### Erro: "Invalid API key"
- **Solução:** Verifique se a chave anônima está correta

### Erro: "Connection failed"
- **Solução:** Verifique se a URL do projeto está correta

## 📊 Estrutura do Banco

Após a configuração, você terá:

- ✅ **Tabela `users`** - Perfis dos usuários
- ✅ **Tabela `companies`** - Dados das empresas
- ✅ **Tabela `login_attempts`** - Logs de tentativas de login
- ✅ **Trigger automático** - Cria perfil ao registrar
- ✅ **Políticas de segurança** - RLS habilitado

## 🚀 Próximos Passos

1. **Teste o login/registro**
2. **Configure o deploy** (Vercel, Netlify, etc.)
3. **Adicione as variáveis** no ambiente de produção
4. **Configure domínios** no Supabase

---

**✅ Pronto!** Seu Supabase está configurado e funcionando! 🎉 

## 🎯 Problema de Redirecionamento Resolvido!

### ✅ O que foi implementado:

1. **Página de Callback** (`AuthCallbackPage.tsx`)
   - Processa tokens de autenticação
   - Redireciona automaticamente após confirmação
   - Trata erros de autenticação

2. **URLs de Redirecionamento Dinâmicas**
   - Detecta automaticamente se está em produção ou desenvolvimento
   - Configura URLs corretas para o Vercel

3. **Melhor Tratamento de Email Não Confirmado**
   - Mensagens claras sobre confirmação de email
   - Verificação antes do login

4. **Script SQL** (`fix-auth-redirects.sql`)
   - Configura URLs de redirecionamento no Supabase
   - Verifica usuários com email não confirmado

### 📋 URLs que Precisam ser Configuradas:

**No Supabase Dashboard → Authentication → Settings:**
- **Site URL**: `https://SEU-PROJETO.vercel.app`
- **Redirect URLs**: 
  - `https://SEU-PROJETO.vercel.app/**`
  - `http://localhost:5173/**`

Agora o redirecionamento deve funcionar corretamente! 🎯 