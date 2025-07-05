# 🔐 Configuração do Google OAuth

## ✅ Sistema Simplificado

Recriamos todo o sistema de autenticação para usar **apenas login com Google**, eliminando:
- ❌ Registro com email/senha
- ❌ Confirmação de email
- ❌ Recuperação de senha
- ❌ Complexidade de formulários

## 🚀 Vantagens do Google OAuth

- ✅ **Login com 1 clique**
- ✅ **Sem necessidade de senhas**
- ✅ **Dados verificados pelo Google**
- ✅ **Mais seguro**
- ✅ **Experiência simplificada**

## 📋 Passos para Configurar

### 1. Configurar Google Cloud Console

1. Acesse: https://console.cloud.google.com/
2. Crie um novo projeto ou selecione um existente
3. Vá para **APIs & Services** > **Credentials**
4. Clique em **Create Credentials** > **OAuth 2.0 Client IDs**
5. Configure:
   - **Application type**: Web application
   - **Name**: LicitaInteligente
   - **Authorized redirect URIs**:
     - `https://licitacoes.vercel.app/auth/callback`
     - `http://localhost:5173/auth/callback` (para desenvolvimento)
6. Anote o **Client ID** e **Client Secret**

### 2. Configurar Supabase

1. Acesse o [painel do Supabase](https://supabase.com/dashboard)
2. Vá para **Authentication** > **Providers**
3. Habilite **Google**
4. Configure:
   - **Client ID**: (do Google Cloud Console)
   - **Client Secret**: (do Google Cloud Console)
5. Salve as configurações

### 3. Executar Script SQL

1. No Supabase, vá para **SQL Editor**
2. Execute o arquivo `setup-google-auth.sql`
3. Verifique se não há erros

### 4. Configurar URLs de Redirecionamento

No Supabase:
1. Vá para **Authentication** > **URL Configuration**
2. Configure:
   - **Site URL**: `https://licitacoes.vercel.app`
   - **Redirect URLs**:
     - `https://licitacoes.vercel.app/auth/callback`
     - `https://licitacoes.vercel.app/dashboard`
     - `http://localhost:5173/auth/callback` (desenvolvimento)

### 5. Fazer Deploy

1. Faça commit das alterações
2. Push para o GitHub
3. O Vercel fará deploy automático

## 🧪 Testando o Sistema

### 1. Teste de Conexão
1. Acesse sua aplicação
2. Role até "Teste de Conexão Supabase"
3. Execute o teste

### 2. Teste de Login
1. Clique em "Entrar com Google"
2. Autorize no Google
3. Deve ser redirecionado para o dashboard

### 3. Verificar no Supabase
1. Vá para **Authentication** > **Users**
2. Verifique se o usuário foi criado
3. Verifique se o perfil foi criado na tabela `users`

## 🔧 Fluxo de Autenticação

```
1. Usuário clica "Entrar com Google"
2. Redirecionado para Google OAuth
3. Usuário autoriza a aplicação
4. Google redireciona para /auth/callback
5. Supabase processa o callback
6. Trigger cria perfil automaticamente
7. Usuário é redirecionado para /dashboard
```

## 🐛 Solução de Problemas

### Erro: "OAuth error"
- Verifique se o Google OAuth está habilitado no Supabase
- Verifique se Client ID e Secret estão corretos
- Verifique se as URLs de redirecionamento estão configuradas

### Erro: "Invalid redirect URI"
- Verifique as URLs no Google Cloud Console
- Verifique as URLs no Supabase
- Certifique-se de que inclui `/auth/callback`

### Usuário não criado
- Execute o script SQL novamente
- Verifique se o trigger está funcionando
- Verifique os logs no console

### Perfil não criado
- Verifique se a tabela `users` existe
- Verifique se as políticas RLS estão corretas
- Verifique se o trigger está funcionando

## 📊 Logs Esperados

**Login bem-sucedido:**
```
🔄 Iniciando login com Google...
✅ Redirecionamento para Google iniciado
🔄 Processando callback de autenticação Google...
✅ Sessão criada com sucesso
🔄 Perfil não encontrado, criando...
✅ Perfil criado: João Silva
```

## 🎯 Próximos Passos

1. **Configure o Google Cloud Console**
2. **Configure o Supabase**
3. **Execute o script SQL**
4. **Teste o login**
5. **Verifique se tudo está funcionando**

---

**🎉 Sistema de autenticação simplificado e pronto para uso!** 