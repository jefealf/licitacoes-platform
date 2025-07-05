import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, AlertCircle, Clock, DollarSign, FileText, Eye, Bell, Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function DashboardPage() {
  const stats = [
    {
      title: 'Licitações Monitoradas',
      value: '23',
      change: '+12%',
      trend: 'up',
      icon: Eye,
      color: 'blue'
    },
    {
      title: 'Alertas Ativos',
      value: '8',
      change: '+3',
      trend: 'up',
      icon: Bell,
      color: 'green'
    },
    {
      title: 'Valor Total Monitorado',
      value: 'R$ 2.3M',
      change: '+25%',
      trend: 'up',
      icon: DollarSign,
      color: 'purple'
    },
    {
      title: 'Prazos Esta Semana',
      value: '5',
      change: '-2',
      trend: 'down',
      icon: Clock,
      color: 'orange'
    }
  ];

  const recentProcurements = [
    {
      id: '1',
      title: 'Aquisição de Equipamentos de Informática',
      agency: 'Ministério da Educação',
      value: 'R$ 450.000,00',
      deadline: new Date(2024, 11, 15),
      status: 'open',
      type: 'Pregão Eletrônico'
    },
    {
      id: '2',
      title: 'Contratação de Serviços de Limpeza',
      agency: 'Prefeitura de São Paulo',
      value: 'R$ 120.000,00',
      deadline: new Date(2024, 11, 20),
      status: 'open',
      type: 'Concorrência'
    },
    {
      id: '3',
      title: 'Fornecimento de Material de Escritório',
      agency: 'Governo do Estado RJ',
      value: 'R$ 85.000,00',
      deadline: new Date(2024, 11, 25),
      status: 'open',
      type: 'Pregão Eletrônico'
    }
  ];

  const alerts = [
    {
      id: '1',
      title: 'Nova licitação encontrada',
      description: 'Pregão Eletrônico para aquisição de notebooks',
      type: 'success',
      time: new Date(2024, 11, 8, 14, 30)
    },
    {
      id: '2',
      title: 'Prazo se aproximando',
      description: 'Edital #PE-2024-001 vence em 2 dias',
      type: 'warning',
      time: new Date(2024, 11, 8, 10, 15)
    },
    {
      id: '3',
      title: 'Resultado publicado',
      description: 'Licitação #CC-2024-008 teve resultado divulgado',
      type: 'info',
      time: new Date(2024, 11, 7, 16, 45)
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-red-100 text-red-800';
      case 'evaluation':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Acompanhe suas licitações e métricas importantes
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <p className={`text-sm mt-2 flex items-center ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendingUp className={`w-4 h-4 mr-1 ${
                    stat.trend === 'down' ? 'rotate-180' : ''
                  }`} />
                  {stat.change}
                </p>
              </div>
              <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Procurements */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Licitações Recentes
                </h2>
                <Link
                  to="/search"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Ver todas
                </Link>
              </div>
            </div>
            
            <div className="divide-y divide-gray-100">
              {recentProcurements.map((procurement) => (
                <Link
                  key={procurement.id}
                  to={`/procurement/${procurement.id}`}
                  className="block p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-2">
                        {procurement.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <span>{procurement.agency}</span>
                        <span>•</span>
                        <span>{procurement.type}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-lg font-semibold text-gray-900">
                          {procurement.value}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(procurement.status)}`}>
                          Aberto
                        </span>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="flex items-center text-sm text-gray-600 mb-1">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>Prazo:</span>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {formatDistanceToNow(procurement.deadline, { 
                          addSuffix: true, 
                          locale: ptBR 
                        })}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="space-y-6">
          {/* Recent Alerts */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Alertas Recentes
                </h2>
                <Link
                  to="/alerts"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Ver todos
                </Link>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border ${getAlertColor(alert.type)}`}
                >
                  <h3 className="font-medium text-gray-900 mb-1">
                    {alert.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {alert.description}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDistanceToNow(alert.time, { 
                      addSuffix: true, 
                      locale: ptBR 
                    })}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Ações Rápidas
            </h3>
            <div className="space-y-3">
              <Link
                to="/search"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">
                  Buscar Licitações
                </span>
              </Link>
              
              <Link
                to="/alerts"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Bell className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">
                  Criar Alerta
                </span>
              </Link>
              
              <Link
                to="/content"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">
                  Guias e Tutoriais
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}