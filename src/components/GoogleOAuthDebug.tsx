import React, { useState } from 'react';

const GoogleOAuthDebug: React.FC = () => {
  const [debugInfo, setDebugInfo] = useState<any>(null);

  const checkOAuthConfig = () => {
    const info = {
      currentUrl: window.location.href,
      origin: window.location.origin,
      redirectUrl: `${window.location.origin}/auth/callback`,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    };

    setDebugInfo(info);
    console.log('🔍 Debug Info:', info);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        🔧 Debug Google OAuth
      </h3>
      
      <button
        onClick={checkOAuthConfig}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mb-4"
      >
        Verificar Configuração
      </button>

      {debugInfo && (
        <div className="bg-gray-50 p-4 rounded-md">
          <h4 className="font-medium text-gray-900 mb-2">Informações de Debug:</h4>
          <div className="text-sm text-gray-700 space-y-1">
            <p><strong>URL Atual:</strong> {debugInfo.currentUrl}</p>
            <p><strong>Origin:</strong> {debugInfo.origin}</p>
            <p><strong>Redirect URL:</strong> {debugInfo.redirectUrl}</p>
            <p><strong>User Agent:</strong> {debugInfo.userAgent}</p>
            <p><strong>Timestamp:</strong> {debugInfo.timestamp}</p>
          </div>
          
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <h5 className="font-medium text-yellow-800 mb-2">URLs que devem estar configuradas no Google Cloud Console:</h5>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• {debugInfo.redirectUrl}</li>
              <li>• https://licitacoes.vercel.app/auth/callback</li>
              <li>• http://localhost:5173/auth/callback</li>
            </ul>
          </div>
        </div>
      )}

      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
        <h4 className="font-medium text-blue-800 mb-2">Passos para corrigir o erro:</h4>
        <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
          <li>Vá para <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" className="underline">Google Cloud Console</a></li>
          <li>Selecione seu projeto</li>
          <li>Vá para APIs &amp; Services &gt; Credentials</li>
          <li>Clique no OAuth 2.0 Client ID</li>
          <li>Em "Authorized redirect URIs" adicione as URLs acima</li>
          <li>Clique em "Save"</li>
          <li>Aguarde alguns minutos para propagar</li>
        </ol>
      </div>
    </div>
  );
};

export default GoogleOAuthDebug; 