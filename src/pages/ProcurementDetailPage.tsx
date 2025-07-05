import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, Eye, Calendar, MapPin, Building, DollarSign, Clock, CheckCircle, AlertCircle, FileText, Users } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function ProcurementDetailPage() {
  const { id } = useParams();

  // Simulated data - in real app, this would come from an API
  const procurement = {
    id: '1',
    title: 'Aquisição de Equipamentos de Informática para Laboratórios',
    agency: 'Ministério da Educação',
    state: 'DF',
    city: 'Brasília',
    modality: 'Pregão Eletrônico',
    number: 'PE-2024-001',
    value: 'R$ 450.000,00',
    publishDate: new Date(2024, 11, 5),
    deadline: new Date(2024, 11, 15),
    openingDate: new Date(2024, 11, 16, 9, 0),
    status: 'open',
    description: 'Aquisição de equipamentos de informática, incluindo computadores desktop, notebooks e equipamentos de rede para modernização dos laboratórios de informática das instituições federais de ensino.',
    summary: {
      objective: 'Modernizar a infraestrutura de TI dos laboratórios educacionais',
      deliveryTime: '30 dias corridos após assinatura do contrato',
      warranty: 'Mínimo de 36 meses para todos os equipamentos',
      paymentTerms: 'Pagamento em até 30 dias após entrega e aceite'
    },
    items: [
      {
        id: '1',
        description: 'Computador Desktop - Core i5, 8GB RAM, 256GB SSD',
        quantity: 50,
        unitValue: 'R$ 3.500,00',
        totalValue: 'R$ 175.000,00'
      },
      {
        id: '2',
        description: 'Notebook - Core i5, 8GB RAM, 256GB SSD, Tela 14"',
        quantity: 20,
        unitValue: 'R$ 4.000,00',
        totalValue: 'R$ 80.000,00'
      },
      {
        id: '3',
        description: 'Switch 24 portas Gigabit com gerenciamento',
        quantity: 10,
        unitValue: 'R$ 1.200,00',
        totalValue: 'R$ 12.000,00'
      },
      {
        id: '4',
        description: 'Roteador Wi-Fi 6 empresarial',
        quantity: 15,
        unitValue: 'R$ 800,00',
        totalValue: 'R$ 12.000,00'
      }
    ],
    requirements: [
      'Certificação INMETRO para todos os equipamentos',
      'Garantia mínima de 3 anos com suporte técnico local',
      'Experiência comprovada de pelo menos 3 anos no fornecimento de equipamentos similares',
      'Certificado de regularidade fiscal',
      'Comprovação de capacidade técnica e operacional',
      'Seguro de responsabilidade civil',
      'Compromisso de substituição de equipamentos defeituosos em até 48h'
    ],
    documents: [
      {
        name: 'Edital Completo',
        type: 'PDF',
        size: '2.4 MB',
        required: true
      },
      {
        name: 'Anexo I - Especificações Técnicas',
        type: 'PDF',
        size: '856 KB',
        required: true
      },
      {
        name: 'Anexo II - Minuta do Contrato',
        type: 'PDF',
        size: '324 KB',
        required: true
      },
      {
        name: 'Anexo III - Modelo de Proposta',
        type: 'DOC',
        size: '128 KB',
        required: true
      }
    ],
    timeline: [
      {
        event: 'Publicação do Edital',
        date: new Date(2024, 11, 5),
        status: 'completed'
      },
      {
        event: 'Prazo para Esclarecimentos',
        date: new Date(2024, 11, 12),
        status: 'current'
      },
      {
        event: 'Entrega das Propostas',
        date: new Date(2024, 11, 15),
        status: 'pending'
      },
      {
        event: 'Sessão de Abertura',
        date: new Date(2024, 11, 16, 9, 0),
        status: 'pending'
      },
      {
        event: 'Homologação',
        date: new Date(2024, 11, 25),
        status: 'pending'
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'current':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-gray-100 text-gray-600 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'current':
        return <Clock className="w-4 h-4" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/search"
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para busca</span>
        </Link>
        
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {procurement.title}
            </h1>
            <div className="flex items-center space-x-6 text-gray-600">
              <div className="flex items-center space-x-2">
                <Building className="w-5 h-5" />
                <span>{procurement.agency}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>{procurement.city}, {procurement.state}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>{procurement.number}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <Eye className="w-4 h-4" />
              <span>Monitorar</span>
            </button>
            <button className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              <span>Baixar Edital</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* AI Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6 border border-blue-100">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">IA</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Resumo Inteligente</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Objetivo</h3>
                <p className="text-gray-700 text-sm">{procurement.summary.objective}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Prazo de Entrega</h3>
                <p className="text-gray-700 text-sm">{procurement.summary.deliveryTime}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Garantia</h3>
                <p className="text-gray-700 text-sm">{procurement.summary.warranty}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Pagamento</h3>
                <p className="text-gray-700 text-sm">{procurement.summary.paymentTerms}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Descrição do Objeto</h2>
            <p className="text-gray-700 leading-relaxed">{procurement.description}</p>
          </div>

          {/* Items */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Itens da Licitação</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Item</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-900">Qtd</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-900">Valor Unit.</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-900">Valor Total</th>
                  </tr>
                </thead>
                <tbody>
                  {procurement.items.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-gray-900">{item.description}</td>
                      <td className="py-3 px-4 text-right text-gray-700">{item.quantity}</td>
                      <td className="py-3 px-4 text-right text-gray-700">{item.unitValue}</td>
                      <td className="py-3 px-4 text-right font-semibold text-gray-900">{item.totalValue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Requirements */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Requisitos e Documentos</h2>
            <ul className="space-y-3">
              {procurement.requirements.map((requirement, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{requirement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Key Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações Principais</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <DollarSign className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-600">Valor Estimado</div>
                  <div className="text-lg font-semibold text-gray-900">{procurement.value}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-600">Publicado</div>
                  <div className="font-semibold text-gray-900">
                    {format(procurement.publishDate, 'dd/MM/yyyy', { locale: ptBR })}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-red-400" />
                <div>
                  <div className="text-sm text-gray-600">Prazo para Propostas</div>
                  <div className="font-semibold text-red-600">
                    {format(procurement.deadline, 'dd/MM/yyyy - HH:mm', { locale: ptBR })}
                  </div>
                  <div className="text-sm text-red-600">
                    {formatDistanceToNow(procurement.deadline, { addSuffix: true, locale: ptBR })}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-600">Modalidade</div>
                  <div className="font-semibold text-gray-900">{procurement.modality}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cronograma</h3>
            <div className="space-y-4">
              {procurement.timeline.map((event, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${getStatusColor(event.status)}`}>
                    {getStatusIcon(event.status)}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{event.event}</div>
                    <div className="text-sm text-gray-600">
                      {format(event.date, 'dd/MM/yyyy', { locale: ptBR })}
                      {event.date.getHours() > 0 && (
                        <span> - {format(event.date, 'HH:mm', { locale: ptBR })}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Documents */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Documentos</h3>
            <div className="space-y-3">
              {procurement.documents.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{doc.name}</div>
                      <div className="text-xs text-gray-500">{doc.type} • {doc.size}</div>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}