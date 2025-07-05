# 🚀 Plataforma de Inteligência em Licitações

Uma plataforma SaaS moderna para monitoramento e análise de licitações públicas com IA.

## 🛠️ Tecnologias

- **React 18** + **TypeScript**
- **Vite** para build e desenvolvimento
- **Tailwind CSS** para estilização
- **React Router** para navegação
- **Lucide React** para ícones
- **Supabase** para backend e autenticação

## 🚀 Configuração Rápida

### 1. **Configurar Supabase (Obrigatório)**

Antes de executar o projeto, você precisa configurar o Supabase:

1. **Crie uma conta** em [supabase.com](https://supabase.com)
2. **Crie um novo projeto** no Supabase
3. **Execute o script SQL** do arquivo `supabase-schema.sql` no SQL Editor
4. **Execute também** o arquivo `fix-trigger.sql` para garantir que o trigger funcione
5. **Copie as credenciais** em Settings > API:
   - Project URL
   - anon public key

### 2. **Configurar Variáveis de Ambiente**

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima
```

### 3. **Instalar e Executar**

```bash
# Instalar dependências
npm install

# Verificar configuração
npm run check-env

# Executar em desenvolvimento
npm run dev
```

## 📋 Guia Completo de Configuração

Para instruções detalhadas, veja:
- [SETUP_SUPABASE.md](./SETUP_SUPABASE.md) - Guia completo do Supabase
- [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) - Documentação original

## 🔍 Verificação

Após a configuração, você verá no console:

```
🔗 Conectando ao Supabase: { url: "✅ Configurado", key: "✅ Configurado" }
```

E na página inicial (em desenvolvimento) haverá uma seção de teste da conexão.

## 🚀 Deploy - Opções Gratuitas

### 1. **Vercel (Recomendado)**

**Passos:**
1. Acesse [vercel.com](https://vercel.com)
2. Faça login com GitHub/GitLab/Bitbucket
3. Clique em "New Project"
4. Importe este repositório
5. **Configure as variáveis de ambiente** em Settings > Environment Variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Clique em "Deploy"

**Vantagens:**
- ✅ Deploy automático
- ✅ SSL gratuito
- ✅ CDN global
- ✅ Domínio personalizado
- ✅ Preview deployments

### 2. **Netlify**

**Passos:**
1. Acesse [netlify.com](https://netlify.com)
2. Faça login com GitHub
3. Clique em "New site from Git"
4. Selecione o repositório
5. Configure:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. **Configure as variáveis de ambiente** em Site settings > Environment variables
7. Clique em "Deploy site"

## 🛠️ Scripts Disponíveis

```bash
npm run dev          # Executar em desenvolvimento (com verificação de env)
npm run build        # Build para produção
npm run preview      # Preview do build
npm run lint         # Executar linter
npm run check-env    # Verificar configuração do ambiente
npm run setup        # Verificar setup completo
```

## 🔧 Solução de Problemas

### Erro: "Variáveis de ambiente não configuradas"
- **Solução:** Crie o arquivo `.env` com as credenciais corretas do Supabase

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

## 🔒 Segurança

- ✅ **Row Level Security (RLS)** habilitado
- ✅ **Autenticação** via Supabase Auth
- ✅ **Políticas de acesso** por usuário
- ✅ **Logs** de tentativas de login
- ✅ **HTTPS** automático em produção

## 📞 Suporte

Para dúvidas sobre:
- **Supabase:** [supabase.com/docs](https://supabase.com/docs)
- **Deploy:** [vercel.com/docs](https://vercel.com/docs)
- **Configuração:** Veja os arquivos `SETUP_SUPABASE.md` e `SUPABASE_SETUP.md`

---

**🎯 Recomendação:** Configure o Supabase primeiro, depois use **Vercel** para deploy! 