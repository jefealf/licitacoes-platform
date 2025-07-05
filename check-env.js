#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Verificando configuração do ambiente...\n');

// Verificar se o arquivo .env existe
const envPath = path.join(__dirname, '.env');
const envExists = fs.existsSync(envPath);

if (!envExists) {
  console.log('❌ Arquivo .env não encontrado!');
  console.log('📝 Crie o arquivo .env na raiz do projeto com o seguinte conteúdo:');
  console.log('');
  console.log('VITE_SUPABASE_URL=https://seu-projeto.supabase.co');
  console.log('VITE_SUPABASE_ANON_KEY=sua-chave-anonima');
  console.log('');
  console.log('💡 Veja o arquivo env.example para mais detalhes');
  process.exit(1);
}

// Ler o arquivo .env
const envContent = fs.readFileSync(envPath, 'utf8');
const lines = envContent.split('\n');

// Verificar variáveis necessárias
const requiredVars = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY'
];

const missingVars = [];
const configuredVars = [];

lines.forEach(line => {
  const trimmedLine = line.trim();
  if (trimmedLine && !trimmedLine.startsWith('#')) {
    const [key, value] = trimmedLine.split('=');
    if (key && value) {
      configuredVars.push(key);
    }
  }
});

requiredVars.forEach(varName => {
  if (!configuredVars.includes(varName)) {
    missingVars.push(varName);
  }
});

if (missingVars.length > 0) {
  console.log('❌ Variáveis de ambiente faltando:');
  missingVars.forEach(varName => {
    console.log(`   - ${varName}`);
  });
  console.log('');
  console.log('📝 Adicione as variáveis faltantes ao arquivo .env');
  process.exit(1);
}

// Verificar se os valores não são os padrões
const envVars = {};
lines.forEach(line => {
  const trimmedLine = line.trim();
  if (trimmedLine && !trimmedLine.startsWith('#')) {
    const [key, value] = trimmedLine.split('=');
    if (key && value) {
      envVars[key] = value;
    }
  }
});

const hasDefaultValues = 
  envVars.VITE_SUPABASE_URL === 'https://your-project.supabase.co' ||
  envVars.VITE_SUPABASE_ANON_KEY === 'your-anon-key';

if (hasDefaultValues) {
  console.log('⚠️  Variáveis de ambiente com valores padrão detectadas!');
  console.log('📝 Substitua os valores padrão pelos valores reais do seu projeto Supabase');
  console.log('');
  console.log('🔗 Para obter as credenciais:');
  console.log('   1. Acesse seu projeto no Supabase');
  console.log('   2. Vá em Settings > API');
  console.log('   3. Copie Project URL e anon public key');
  process.exit(1);
}

console.log('✅ Configuração do ambiente está correta!');
console.log('');
console.log('📊 Variáveis configuradas:');
console.log(`   - VITE_SUPABASE_URL: ${envVars.VITE_SUPABASE_URL ? '✅ Configurado' : '❌ Não configurado'}`);
console.log(`   - VITE_SUPABASE_ANON_KEY: ${envVars.VITE_SUPABASE_ANON_KEY ? '✅ Configurado' : '❌ Não configurado'}`);
console.log('');
console.log('🚀 Você pode executar o projeto agora!');
console.log('   npm run dev'); 