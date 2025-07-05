# 🚀 Guia Rápido de Deploy

## ⚡ Deploy em 5 minutos

### **Opção 1: Vercel (Mais Fácil)**

1. **Acesse:** [vercel.com](https://vercel.com)
2. **Login:** Com GitHub/GitLab/Bitbucket
3. **New Project:** Clique em "New Project"
4. **Import:** Selecione este repositório
5. **Deploy:** Clique em "Deploy"

**✅ Pronto!** Sua aplicação estará online em `https://seu-projeto.vercel.app`

---

### **Opção 2: Netlify**

1. **Acesse:** [netlify.com](https://netlify.com)
2. **Login:** Com GitHub
3. **New site:** "New site from Git"
4. **Repository:** Selecione este repositório
5. **Settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
6. **Deploy:** Clique em "Deploy site"

**✅ Pronto!** Sua aplicação estará online em `https://seu-projeto.netlify.app`

---

### **Opção 3: GitHub Pages**

1. **Adicione ao package.json:**
```json
{
  "homepage": "https://seuusuario.github.io/seurepositorio",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

2. **Instale gh-pages:**
```bash
npm install --save-dev gh-pages
```

3. **Deploy:**
```bash
npm run deploy
```

**✅ Pronto!** Sua aplicação estará online em `https://seuusuario.github.io/seurepositorio`

---

## 🔧 Configurações Avançadas

### **Domínio Personalizado**

**Vercel:**
1. Settings > Domains
2. Add Domain
3. Configure DNS

**Netlify:**
1. Site settings > Domain management
2. Add custom domain
3. Configure DNS

### **Variáveis de Ambiente**

Crie arquivo `.env`:
```env
VITE_APP_TITLE=LicitaInteligente
VITE_API_URL=https://api.seudominio.com
```

### **Build Local (Teste)**

```bash
# Instalar dependências
npm install

# Build para produção
npm run build

# Preview local
npm run preview
```

---

## 🎯 Recomendação

**Use Vercel** - É o mais fácil e rápido para projetos React/Vite!

- ✅ Deploy automático
- ✅ SSL gratuito
- ✅ CDN global
- ✅ Domínio personalizado
- ✅ Preview deployments

---

## 📞 Suporte

- **Vercel:** [vercel.com/docs](https://vercel.com/docs)
- **Netlify:** [docs.netlify.com](https://docs.netlify.com)
- **GitHub Pages:** [pages.github.com](https://pages.github.com) 