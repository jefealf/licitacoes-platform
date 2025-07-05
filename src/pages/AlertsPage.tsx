import React, { useState } from 'react';
import { Plus, Bell, Search, Filter, Edit2, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';

export function AlertsPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newAlert, setNewAlert] = useState({
    name: '',
    keywords: '',
    modality: '',
    state: '',
    minValue: '',
    maxValue: ''
  });

  const alerts = [
    {
      id: '1',
      name: 'Equipamentos de TI',
      keywords: 'computador, notebook, servidor, equipamento informática',
      modality: 'Pregão Eletrônico',
      state: 'SP',
      minValue: '50000',
      maxValue: '500000',
      active: true,
      matchesCount: 12,
      lastMatch: new Date(2024, 11, 8, 14, 30),
      createdAt: new Date(2024, 10, 15)
    },
    {
      id: '2',
      name: 'Serviços de Limpeza',
      keywords: 'limpeza, conservação, higienização',
      modality: '',
      state: 'RJ',
      minValue: '20000',
      maxValue: '',
      active: true,
      matchesCount: 8,
      lastMatch: new Date(2024, 11, 7, 9, 15),
      createdAt: new Date(2024, 10, 20)
    },
    {
      id: '3',
      name: 'Material de Escritório',
      keywords: 'papel, caneta, material escritório',
      modality: 'Pregão Eletrônico',
      state: '',
      minValue: '',
      maxValue: '100000',
      active: false,
      matchesCount: 5,
      lastMatch: new Date(2024, 11, 5, 16, 45),
      createdAt: new Date(2024, 10, 10)
    }
  ];

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would create the alert via API
    console.log('Creating alert:', newAlert);
    setShowCreateForm(false);
    setNewAlert({
      name: '',
      keywords: '',
      modality: '',
      state: '',
      minValue: '',
      maxValue: ''
    });
  };

  const toggleAlert = (id: string) => {
    // In a real app, this would toggle the alert via API
    console.log('Toggling alert:', id);
  };

  const deleteAlert = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este alerta?')) {
      // In a real app, this would delete the alert via API
      console.log('Deleting alert:', id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Alertas Inteligentes</h1>
          <p className="text-gray-600 mt-2">
            Configure alertas para receber notificações sobre novas licitações
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Novo Alerta</span>
        </button>
      </div>

      {/* Create Alert Form */}
      {showCreateForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Criar Novo Alerta</h2>
          <form onSubmit={handleCreateAlert} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Alerta
                </label>
                <input
                  type="text"
                  required
                  value={newAlert.name}
                  onChange={(e) => setNewAlert({...newAlert, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: Equipamentos de TI"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Palavras-chave
                </label>
                <input
                  type="text"
                  required
                  value={newAlert.keywords}
                  onChange={(e) => setNewAlert({...newAlert, keywords: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: computador, notebook, servidor"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Modalidade
                </label>
                <select
                  value={newAlert.modality}
                  onChange={(e) => setNewAlert({...newAlert, modality: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Todas</option>
                  <option value="Pregão Eletrônico">Pregão Eletrônico</option>
                  <option value="Concorrência">Concorrência</option>
                  <option value="Tomada de Preços">Tomada de Preços</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado
                </label>
                <select
                  value={newAlert.state}
                  onChange={(e) => setNewAlert({...newAlert, state: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Todos</option>
                  <option value="SP">São Paulo</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="DF">Distrito Federal</option>
                  <option value="MG">Minas Gerais</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valor Mínimo
                </label>
                <input
                  type="text"
                  value={newAlert.minValue}
                  onChange={(e) => setNewAlert({...newAlert, minValue: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="R$ 0,00"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valor Máximo
                </label>
                <input
                  type="text"
                  value={newAlert.maxValue}
                  onChange={(e) => setNewAlert({...newAlert, maxValue: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="R$ 1.000.000,00"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Criar Alerta
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Alerts List */}
      <div className="grid grid-cols-1 gap-6">
        {alerts.map((alert) => (
          <div key={alert.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{alert.name}</h3>
                  <button
                    onClick={() => toggleAlert(alert.id)}
                    className={`p-1 rounded-full transition-colors ${
                      alert.active ? 'text-green-600 hover:text-green-700' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {alert.active ? (
                      <ToggleRight className="w-6 h-6" />
                    ) : (
                      <ToggleLeft className="w-6 h-6" />
                    )}
                  </button>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    alert.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {alert.active ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Palavras-chave:</span>
                    <p className="font-medium text-gray-900">{alert.keywords}</p>
                  </div>
                  {alert.modality && (
                    <div>
                      <span className="text-gray-600">Modalidade:</span>
                      <p className="font-medium text-gray-900">{alert.modality}</p>
                    </div>
                  )}
                  {alert.state && (
                    <div>
                      <span className="text-gray-600">Estado:</span>
                      <p className="font-medium text-gray-900">{alert.state}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-gray-600">Valor:</span>
                    <p className="font-medium text-gray-900">
                      {alert.minValue && `R$ ${parseInt(alert.minValue).toLocaleString()}`}
                      {alert.minValue && alert.maxValue && ' - '}
                      {alert.maxValue && `R$ ${parseInt(alert.maxValue).toLocaleString()}`}
                      {!alert.minValue && !alert.maxValue && 'Qualquer valor'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteAlert(alert.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="grid grid-cols-3 gap-8 text-sm">
                <div>
                  <span className="text-gray-600">Correspondências:</span>
                  <p className="font-semibold text-blue-600">{alert.matchesCount} licitações</p>
                </div>
                <div>
                  <span className="text-gray-600">Última correspondência:</span>
                  <p className="font-medium text-gray-900">
                    {alert.lastMatch.toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600">Criado em:</span>
                  <p className="font-medium text-gray-900">
                    {alert.createdAt.toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
              
              <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
                <Bell className="w-4 h-4" />
                <span className="text-sm font-medium">Ver Correspondências</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {alerts.length === 0 && (
        <div className="text-center py-12">
          <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum alerta configurado
          </h3>
          <p className="text-gray-600 mb-4">
            Crie seu primeiro alerta para receber notificações sobre licitações relevantes
          </p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Criar Primeiro Alerta
          </button>
        </div>
      )}
    </div>
  );
}