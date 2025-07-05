import React, { useState } from 'react';
import { AuthService } from '../services/authService';
import { CheckCircle, XCircle, Loader2, Eye, EyeOff } from 'lucide-react';

export function RegisterTest() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const handleTestRegister = async () => {
    if (!name || !email || !password) {
      setResult({ success: false, message: 'Preencha todos os campos' });
      return;
    }

    setIsLoading(true);
    setResult(null);
    setLogs([]);

    try {
      addLog('📝 Iniciando processo de registro...');
      addLog(`👤 Nome: ${name}`);
      addLog(`📧 Email: ${email}`);
      
      const { user, error } = await AuthService.register(name, email, password);

      if (error) {
        addLog(`❌ Erro no registro: ${error}`);
        setResult({ success: false, message: error });
        return;
      }

      if (user) {
        addLog(`✅ Registro realizado com sucesso!`);
        addLog(`🆔 ID do usuário: ${user.id}`);
        addLog(`👤 Nome: ${user.name}`);
        addLog(`📧 Email: ${user.email}`);
        addLog(`📋 Plano: ${user.plan}`);
        
        setResult({ 
          success: true, 
          message: `Registro realizado com sucesso! Bem-vindo, ${user.name}`,
          user 
        });
      } else {
        addLog('❌ Registro falhou sem erro específico');
        setResult({ success: false, message: 'Registro falhou sem erro específico' });
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
      <h3 className="text-lg font-semibold mb-4">📝 Teste de Registro</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome Completo
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Seu nome completo"
          />
        </div>

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
          onClick={handleTestRegister}
          disabled={isLoading}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Registrando...
            </>
          ) : (
            'Testar Registro'
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
          <h4 className="text-sm font-medium text-blue-800 mb-2">Dados do Usuário Criado:</h4>
          <pre className="text-xs text-blue-700 overflow-x-auto">
            {JSON.stringify(result.user, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
} 