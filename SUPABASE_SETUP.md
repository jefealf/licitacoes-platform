# 🗄️ Configuração do Supabase

## 🚀 Passo a Passo para Configurar o Banco de Dados

### **1. Criar Conta no Supabase**

1. **Acesse:** [supabase.com](https://supabase.com)
2. **Clique em "Start your project"**
3. **Faça login** com GitHub
4. **Clique em "New Project"**

### **2. Configurar Projeto**

1. **Nome do Projeto:** `licitacoes-platform`
2. **Database Password:** Crie uma senha forte
3. **Region:** Escolha a mais próxima (ex: São Paulo)
4. **Clique em "Create new project"**

### **3. Aguardar Setup**

- ⏱️ **Tempo:** 2-3 minutos
- ✅ **Status:** "Project is ready"

### **4. Configurar Banco de Dados**

1. **Vá em "SQL Editor"** no menu lateral
2. **Clique em "New query"**
3. **Cole o conteúdo** do arquivo `supabase-schema.sql`
4. **Clique em "Run"**

### **5. Obter Credenciais**

1. **Vá em "Settings" > "API"**
2. **Copie:**
   - **Project URL:** `https://your-project.supabase.co`
   - **anon public key:** `your-anon-key`

### **6. Configurar Variáveis de Ambiente**

1. **Crie arquivo `.env`** na raiz do projeto:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

2. **Substitua** pelos valores reais do seu projeto

### **7. Configurar Autenticação**

1. **Vá em "Authentication" > "Settings"**
2. **Configure:**
   - **Site URL:** `http://localhost:5173` (desenvolvimento)
   - **Redirect URLs:** 
     - `http://localhost:5173/**`
     - `https://seu-dominio.vercel.app/**`

### **8. Configurar Email (Opcional)**

1. **Vá em "Authentication" > "Email Templates"**
2. **Personalize** os templates de email
3. **Configure SMTP** se quiser emails personalizados

## 🔧 Configurações Avançadas

### **Políticas de Segurança (RLS)**

O script SQL já configura:
- ✅ **Row Level Security** habilitado
- ✅ **Políticas** para usuários verem apenas seus dados
- ✅ **Políticas** para empresas
- ✅ **Logs** de tentativas de login

### **Backup Automático**

- ✅ **Backup diário** automático
- ✅ **Point-in-time recovery**
- ✅ **Retenção** de 7 dias

### **Monitoramento**

1. **Vá em "Logs"** para ver:
   - Tentativas de login
   - Erros de autenticação
   - Queries lentas

## 🚀 Deploy no Vercel

### **1. Configurar Variáveis no Vercel**

1. **Dashboard do Vercel** > **Settings** > **Environment Variables**
2. **Adicione:**
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

### **2. Atualizar Redirect URLs**

1. **Supabase** > **Authentication** > **Settings**
2. **Adicione:** `https://seu-dominio.vercel.app/**`

## 📊 Estrutura do Banco

### **Tabela: users**
- `id` - UUID (chave primária)
- `email` - Email único
- `name` - Nome completo
- `plan` - 'free' ou 'premium'
- `has_company` - Boolean
- `cpf` - CPF (se pessoa física)
- Dados de endereço

### **Tabela: companies**
- `id` - UUID (chave primária)
- `user_id` - Referência ao usuário
- `corporate_name` - Razão social
- `cnpj` - CNPJ único
- Dados completos da empresa

### **Tabela: login_attempts**
- `id` - UUID (chave primária)
- `user_id` - Referência ao usuário
- `email` - Email usado
- `success` - Boolean
- `ip_address` - IP do usuário
- `user_agent` - Navegador
- `created_at` - Timestamp

## 🔒 Segurança

### **Recursos Implementados:**
- ✅ **Row Level Security (RLS)**
- ✅ **Políticas de acesso** por usuário
- ✅ **Logs** de tentativas de login
- ✅ **Validação** de dados
- ✅ **Índices** para performance

### **Boas Práticas:**
- 🔐 **Senhas** sempre criptografadas
- 🛡️ **JWT tokens** seguros
- 📝 **Logs** de auditoria
- 🔄 **Backup** automático

## 🆘 Suporte

### **Links Úteis:**
- [Supabase Docs](https://supabase.com/docs)
- [Authentication Guide](https://supabase.com/docs/guides/auth)
- [Database Guide](https://supabase.com/docs/guides/database)

### **Comandos Úteis:**
```bash
# Verificar conexão
npm run dev

# Testar autenticação
# Acesse: http://localhost:5173/login
```

---

**✅ Pronto!** Seu banco de dados está configurado e seguro! 🚀 