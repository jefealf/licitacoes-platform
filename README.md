# 🚀 Plataforma de Inteligência em Licitações

Uma plataforma SaaS moderna para monitoramento e análise de licitações públicas com IA.

## 🛠️ Tecnologias

- **React 18** + **TypeScript**
- **Vite** para build e desenvolvimento
- **Tailwind CSS** para estilização
- **React Router** para navegação
- **Lucide React** para ícones

## 🚀 Deploy - Opções Gratuitas

### 1. **Vercel (Recomendado)**

**Passos:**
1. Acesse [vercel.com](https://vercel.com)
2. Faça login com GitHub/GitLab/Bitbucket
3. Clique em "New Project"
4. Importe este repositório
5. Vercel detectará automaticamente que é um projeto Vite
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
6. Clique em "Deploy site"

### 3. **GitHub Pages**

**Passos:**
1. Adicione ao `package.json`:
```json
{
  "homepage": "https://seuusuario.github.io/seurepositorio",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

2. Instale: `npm install --save-dev gh-pages`
3. Execute: `npm run deploy`

### 4. **Firebase Hosting**

**Passos:**
1. Instale Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Inicialize: `firebase init hosting`
4. Build: `npm run build`
5. Deploy: `firebase deploy`

## 📦 Build Local

```bash
# Instalar dependências
npm install

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 🔧 Configurações

### Variáveis de Ambiente
Crie um arquivo `.env` na raiz:

```env
VITE_APP_TITLE=LicitaInteligente
VITE_API_URL=https://api.seudominio.com
```

### Configuração do Vite
O projeto já está configurado para:
- ✅ Build otimizado
- ✅ Code splitting
- ✅ Minificação
- ✅ Service Worker (se necessário)

## 🌐 Domínios Personalizados

### Vercel
1. Vá em Settings > Domains
2. Adicione seu domínio
3. Configure DNS conforme instruções

### Netlify
1. Vá em Site settings > Domain management
2. Adicione custom domain
3. Configure DNS

## 📱 PWA (Progressive Web App)

Para transformar em PWA, adicione ao `vite.config.ts`:

```typescript
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    })
  ]
})
```

## 🔒 Segurança

- ✅ HTTPS automático
- ✅ Headers de segurança
- ✅ CSP configurado
- ✅ Rate limiting (se necessário)

## 📊 Monitoramento

### Vercel Analytics
Adicione ao `index.html`:
```html
<script>
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
</script>
<script defer src="/_vercel/insights/script.js"></script>
```

## 🚀 Performance

O projeto está otimizado para:
- ✅ Lighthouse Score > 90
- ✅ Core Web Vitals
- ✅ Lazy loading
- ✅ Image optimization

## 📞 Suporte

Para dúvidas sobre deploy:
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [Firebase Docs](https://firebase.google.com/docs/hosting)

---

**🎯 Recomendação:** Use **Vercel** para o melhor desempenho e facilidade de uso! 