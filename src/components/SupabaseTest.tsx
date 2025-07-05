import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

const SupabaseTest: React.FC = () => {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testConnection = async () => {
    setLoading(true);
    setTestResults([]);
    
    try {
      addResult('🔄 Iniciando teste de conexão...');
      
      // 1. Verificar variáveis de ambiente
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      addResult(`📋 URL: ${supabaseUrl ? '✅ Configurada' : '❌ Não configurada'}`);
      addResult(`📋 Key: ${supabaseKey ? '✅ Configurada' : '❌ Não configurada'}`);
      
      if (!supabaseUrl || !supabaseKey) {
        addResult('❌ Variáveis de ambiente não configuradas!');
        return;
      }

      // 2. Testar conexão básica
      addResult('🔄 Testando conexão básica...');
      const { data, error } = await supabase.from('users').select('count').limit(1);
      
      if (error) {
        addResult(`❌ Erro na conexão: ${error.message}`);
        addResult(`📋 Código do erro: ${error.code}`);
        addResult(`📋 Detalhes: ${error.details}`);
      } else {
        addResult('✅ Conexão básica funcionando!');
      }

      // 3. Testar autenticação
      addResult('🔄 Testando sistema de autenticação...');
      const { data: authData, error: authError } = await supabase.auth.getSession();
      
      if (authError) {
        addResult(`❌ Erro na autenticação: ${authError.message}`);
      } else {
        addResult('✅ Sistema de autenticação funcionando!');
        addResult(`📋 Sessão ativa: ${authData.session ? 'Sim' : 'Não'}`);
      }

      // 4. Testar registro (sem enviar email)
      addResult('🔄 Testando registro (simulação)...');
      const testEmail = `test-${Date.now()}@example.com`;
      
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: testEmail,
        password: 'test123456',
        options: {
          data: { name: 'Teste' },
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (signUpError) {
        addResult(`❌ Erro no registro: ${signUpError.message}`);
        addResult(`📋 Código: ${signUpError.status}`);
      } else {
        addResult('✅ Registro funcionando!');
        addResult(`📋 Usuário criado: ${signUpData.user?.id}`);
        addResult(`📋 Email confirmado: ${signUpData.user?.email_confirmed_at ? 'Sim' : 'Não'}`);
        
        // Se o usuário foi criado, vamos deletá-lo para não poluir o banco
        if (signUpData.user) {
          addResult('🔄 Limpando usuário de teste...');
          const { error: deleteError } = await supabase.auth.admin.deleteUser(signUpData.user.id);
          if (deleteError) {
            addResult(`⚠️ Não foi possível deletar usuário de teste: ${deleteError.message}`);
          } else {
            addResult('✅ Usuário de teste removido!');
          }
        }
      }

      // 5. Verificar tabelas
      addResult('🔄 Verificando tabelas...');
      
      const { data: usersTable, error: usersError } = await supabase
        .from('users')
        .select('count')
        .limit(1);
      
      if (usersError) {
        addResult(`❌ Erro na tabela users: ${usersError.message}`);
      } else {
        addResult('✅ Tabela users acessível!');
      }

      const { data: companiesTable, error: companiesError } = await supabase
        .from('companies')
        .select('count')
        .limit(1);
      
      if (companiesError) {
        addResult(`❌ Erro na tabela companies: ${companiesError.message}`);
      } else {
        addResult('✅ Tabela companies acessível!');
      }

    } catch (error: any) {
      addResult(`❌ Erro geral: ${error.message}`);
    } finally {
      setLoading(false);
      addResult('🏁 Teste concluído!');
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">🔧 Teste de Conexão Supabase</h2>
      
      <button
        onClick={testConnection}
        disabled={loading}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Testando...' : 'Executar Teste'}
      </button>

      <div className="bg-gray-100 p-4 rounded max-h-96 overflow-y-auto">
        <h3 className="font-semibold mb-2">Resultados:</h3>
        {testResults.length === 0 ? (
          <p className="text-gray-500">Clique em "Executar Teste" para começar</p>
        ) : (
          <div className="space-y-1">
            {testResults.map((result, index) => (
              <div key={index} className="text-sm font-mono">
                {result}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
        <h3 className="font-semibold text-yellow-800 mb-2">📋 Informações de Debug:</h3>
        <div className="text-sm text-yellow-700 space-y-1">
          <p>URL: {import.meta.env.VITE_SUPABASE_URL || 'Não configurada'}</p>
          <p>Key: {import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Configurada' : 'Não configurada'}</p>
          <p>Ambiente: {import.meta.env.MODE}</p>
          <p>Origin: {window.location.origin}</p>
        </div>
      </div>
    </div>
  );
};

export default SupabaseTest; 