import React, { useState } from 'react';
import { AuthService } from '../services/authService';
import { CheckCircle, XCircle, Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';

export function LoginTest() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const handleTestLogin = async () => {
    if (!email || !password) {
      setResult({ success: false, message: 'Preencha email e senha' });
      return;
    }

    setIsLoading(true);
    setResult(null);
    setLogs([]);

    try {
      addLog('🔍 Verificando se usuário existe...');
      const { exists, error: checkError } = await AuthService.checkUserExists(email);
      
      if (checkError) {
        addLog(`❌ Erro ao verificar usuário: ${checkError}`);
        setResult({ success: false, message: checkError });
        return;
      }

      if (!exists) {
        addLog('❌ Usuário não encontrado no sistema');
        setResult({ success: false, message: 'Email não cadastrado no sistema' });
        return;
      }

      addLog('✅ Usuário encontrado, tentando login...');
      
      const { user, error } = await AuthService.login(email, password);

      if (error) {
        addLog(`❌ Erro no login: ${error}`);
        setResult({ success: false, message: error });
        return;
      }

      if (user) {
        addLog(`✅ Login realizado com sucesso! Usuário: ${user.name}`);
        setResult({ 
          success: true, 
          message: `Login realizado com sucesso! Bem-vindo, ${user.name}`,
          user 
        });
      } else {
        addLog('❌ Login falhou sem erro específico');
        setResult({ success: false, message: 'Login falhou sem erro específico' });
      }

    } catch (error: any) {
      addLog(`❌ Erro interno: ${error.message}`);
      setResult({ success: false, message: `Erro interno: ${error.message}` });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">🧪 Teste de Login</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="seu@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Senha
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Sua senha"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <button
          onClick={handleTestLogin}
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Testando...
            </>
          ) : (
            'Testar Login'
          )}
        </button>
      </div>

      {result && (
        <div className={`mt-4 p-3 rounded-md ${
          result.success 
            ? 'bg-green-50 border border-green-200 text-green-800' 
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          <div className="flex items-center">
            {result.success ? (
              <CheckCircle className="w-4 h-4 mr-2" />
            ) : (
              <XCircle className="w-4 h-4 mr-2" />
            )}
            <span className="font-medium">{result.message}</span>
          </div>
        </div>
      )}

      {logs.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Logs de Debug:</h4>
          <div className="bg-gray-50 p-3 rounded-md max-h-40 overflow-y-auto">
            {logs.map((log, index) => (
              <div key={index} className="text-xs text-gray-600 mb-1">
                {log}
              </div>
            ))}
          </div>
        </div>
      )}

      {result?.user && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <h4 className="text-sm font-medium text-blue-800 mb-2">Dados do Usuário:</h4>
          <pre className="text-xs text-blue-700 overflow-x-auto">
            {JSON.stringify(result.user, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
} 