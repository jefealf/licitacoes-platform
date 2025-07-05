# 🔥 Configuração do Firebase Authentication

## ✅ Por que Firebase?

- ✅ **Mais fácil de configurar** que Supabase
- ✅ **Documentação excelente**
- ✅ **Suporte nativo ao Google OAuth**
- ✅ **Gratuito para projetos pequenos/médios**
- ✅ **Interface amigável**
- ✅ **Menos problemas de configuração**

## 📋 Passos para Configurar

### 1. Criar Projeto no Firebase

1. **Acesse**: https://console.firebase.google.com/
2. **Clique em "Criar projeto"**
3. **Digite o nome**: `licitacoes-platform`
4. **Desabilite Google Analytics** (opcional)
5. **Clique em "Criar projeto"**

### 2. Configurar Authentication

1. **No painel do Firebase**, clique em "Authentication"
2. **Clique em "Começar"**
3. **Vá para a aba "Sign-in method"**
4. **Habilite "Google"**
5. **Configure**:
   - **Nome do projeto**: LicitaInteligente
   - **Email de suporte**: seu-email@gmail.com
6. **Clique em "Salvar"**

### 3. Configurar Firestore Database

1. **No painel do Firebase**, clique em "Firestore Database"
2. **Clique em "Criar banco de dados"**
3. **Escolha "Iniciar no modo de teste"**
4. **Selecione a localização**: `us-central1` (ou mais próxima)
5. **Clique em "Concluir"**

### 4. Adicionar App Web

1. **No painel do Firebase**, clique no ícone de engrenagem (⚙️)
2. **Selecione "Configurações do projeto"**
3. **Role até "Seus aplicativos"**
4. **Clique em "Adicionar aplicativo"**
5. **Selecione o ícone da web (</> )**
6. **Digite o nome**: `licitacoes-web`
7. **Clique em "Registrar aplicativo"**

### 5. Copiar Credenciais

Após registrar o app, você verá um código como este:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "licitacoes-platform.firebaseapp.com",
  projectId: "licitacoes-platform",
  storageBucket: "licitacoes-platform.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

### 6. Configurar Variáveis de Ambiente

1. **Copie o arquivo**: `firebase-env.example` para `.env`
2. **Preencha com suas credenciais**:

```env
VITE_FIREBASE_API_KEY=AIzaSyC...
VITE_FIREBASE_AUTH_DOMAIN=licitacoes-platform.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=licitacoes-platform
VITE_FIREBASE_STORAGE_BUCKET=licitacoes-platform.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

### 7. Configurar Regras do Firestore

1. **No Firestore**, vá para a aba "Regras"
2. **Substitua as regras por**:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Usuários podem ler/escrever apenas seus próprios dados
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Usuários podem ler/escrever apenas suas próprias empresas
    match /companies/{companyId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.user_id;
    }
  }
}
```

3. **Clique em "Publicar"**

### 8. Configurar no Vercel

1. **No Vercel**, vá para seu projeto
2. **Vá para Settings > Environment Variables**
3. **Adicione todas as variáveis** do arquivo `.env`
4. **Clique em "Save"**
5. **Faça redeploy**

## 🧪 Testando

### 1. Teste Local
```bash
npm install
npm run dev
```

### 2. Teste de Login
1. **Acesse**: http://localhost:5173
2. **Clique em "Entrar com Google"**
3. **Autorize no Google**
4. **Deve ser redirecionado para o dashboard**

### 3. Verificar no Firebase
1. **No Firebase Console**: Authentication > Users
2. **Verifique se o usuário foi criado**
3. **No Firestore**: Verifique se o perfil foi criado

## 🔧 Vantagens do Firebase

### ✅ Autenticação
- Login com Google funciona perfeitamente
- Sem problemas de redirect_uri_mismatch
- Interface amigável para gerenciar usuários
- Logs detalhados de autenticação

### ✅ Banco de Dados
- Firestore é mais simples que PostgreSQL
- Regras de segurança fáceis de configurar
- Interface visual para ver dados
- Backup automático

### ✅ Deploy
- Integração fácil com Vercel
- Variáveis de ambiente simples
- Sem problemas de CORS
- Performance excelente

## 🐛 Solução de Problemas

### Erro: "Firebase not initialized"
- Verifique se as variáveis de ambiente estão corretas
- Verifique se o arquivo `.env` existe

### Erro: "Permission denied"
- Verifique as regras do Firestore
- Certifique-se de que o usuário está autenticado

### Erro: "Google sign-in not enabled"
- Verifique se o Google está habilitado no Firebase
- Verifique se o domínio está autorizado

## 🎯 Próximos Passos

1. **Configure o Firebase** seguindo este guia
2. **Teste o login** localmente
3. **Configure no Vercel**
4. **Teste em produção**

---

**🎉 Firebase é muito mais confiável e fácil de usar que Supabase!** 