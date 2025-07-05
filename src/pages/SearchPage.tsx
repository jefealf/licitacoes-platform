import React, { useState } from 'react';
import { Search, Filter, MapPin, DollarSign, Calendar, Building, Eye, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    modality: '',
    state: '',
    minValue: '',
    maxValue: '',
    status: 'open'
  });

  const procurements = [
    {
      id: '1',
      title: 'Aquisição de Equipamentos de Informática para Laboratórios',
      agency: 'Ministério da Educação',
      state: 'DF',
      modality: 'Pregão Eletrônico',
      value: 'R$ 450.000,00',
      publishDate: new Date(2024, 11, 5),
      deadline: new Date(2024, 11, 15),
      status: 'open',
      summary: 'Aquisição de 50 computadores desktop, 20 notebooks e equipamentos de rede para modernização dos laboratórios de informática.',
      requirements: ['Certificação INMETRO', 'Garantia mínima de 3 anos', 'Suporte técnico local']
    },
    {
      id: '2',
      title: 'Contratação de Serviços de Limpeza e Conservação',
      agency: 'Prefeitura de São Paulo',
      state: 'SP',
      modality: 'Concorrência',
      value: 'R$ 120.000,00',
      publishDate: new Date(2024, 11, 3),
      deadline: new Date(2024, 11, 20),
      status: 'open',
      summary: 'Contratação de empresa especializada para serviços de limpeza e conservação predial por 12 meses.',
      requirements: ['Alvará de funcionamento', 'Experiência comprovada', 'Seguro de responsabilidade civil']
    },
    {
      id: '3',
      title: 'Fornecimento de Material de Escritório',
      agency: 'Governo do Estado do Rio de Janeiro',
      state: 'RJ',
      modality: 'Pregão Eletrônico',
      value: 'R$ 85.000,00',
      publishDate: new Date(2024, 11, 1),
      deadline: new Date(2024, 11, 25),
      status: 'open',
      summary: 'Fornecimento de materiais de escritório diversos para as secretarias estaduais.',
      requirements: ['Certificado de origem', 'Entrega parcelada', 'Prazo de validade mínimo']
    },
    {
      id: '4',
      title: 'Aquisição de Veículos para Frota Oficial',
      agency: 'Ministério da Saúde',
      state: 'DF',
      modality: 'Concorrência',
      value: 'R$ 800.000,00',
      publishDate: new Date(2024, 10, 28),
      deadline: new Date(2024, 11, 30),
      status: 'open',
      summary: 'Aquisição de 15 veículos utilitários para renovação da frota oficial do ministério.',
      requirements: ['Emplacamento em Brasília', 'Garantia de fábrica', 'Treinamento de condutores']
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

  const getModalityColor = (modality: string) => {
    switch (modality) {
      case 'Pregão Eletrônico':
        return 'bg-blue-100 text-blue-800';
      case 'Concorrência':
        return 'bg-purple-100 text-purple-800';
      case 'Tomada de Preços':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredProcurements = procurements.filter(procurement => {
    const matchesSearch = procurement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         procurement.agency.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = !filters.state || procurement.state === filters.state;
    const matchesModality = !filters.modality || procurement.modality === filters.modality;
    const matchesStatus = !filters.status || procurement.status === filters.status;
    
    return matchesSearch && matchesState && matchesModality && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Buscar Licitações</h1>
        <p className="text-gray-600 mt-2">
          Encontre oportunidades de negócio em licitações públicas
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Busque por objeto, órgão ou palavra-chave..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Filter className="w-5 h-5" />
              <span>Filtros Avançados</span>
            </button>
            <div className="text-sm text-gray-500">
              {filteredProcurements.length} licitações encontradas
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Modalidade
                </label>
                <select
                  value={filters.modality}
                  onChange={(e) => setFilters({...filters, modality: e.target.value})}
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
                  value={filters.state}
                  onChange={(e) => setFilters({...filters, state: e.target.value})}
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
                  Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Todos</option>
                  <option value="open">Abertos</option>
                  <option value="closed">Fechados</option>
                  <option value="evaluation">Em Avaliação</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valor Mínimo
                </label>
                <input
                  type="text"
                  placeholder="R$ 0,00"
                  value={filters.minValue}
                  onChange={(e) => setFilters({...filters, minValue: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="space-y-6">
        {filteredProcurements.map((procurement) => (
          <div key={procurement.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {procurement.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <Building className="w-4 h-4" />
                      <span>{procurement.agency}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{procurement.state}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(procurement.status)}`}>
                    Aberto
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getModalityColor(procurement.modality)}`}>
                    {procurement.modality}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 mb-4">
                {procurement.summary}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-600">Valor Estimado</div>
                    <div className="font-semibold text-gray-900">{procurement.value}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-600">Publicado</div>
                    <div className="font-semibold text-gray-900">
                      {formatDistanceToNow(procurement.publishDate, { 
                        addSuffix: true, 
                        locale: ptBR 
                      })}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-red-400" />
                  <div>
                    <div className="text-sm text-gray-600">Prazo</div>
                    <div className="font-semibold text-red-600">
                      {formatDistanceToNow(procurement.deadline, { 
                        addSuffix: true, 
                        locale: ptBR 
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm font-medium text-gray-700 mb-2">Principais Requisitos:</div>
                <div className="flex flex-wrap gap-2">
                  {procurement.requirements.map((req, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-md">
                      {req}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm font-medium">Monitorar</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-700 transition-colors">
                    <BookOpen className="w-4 h-4" />
                    <span className="text-sm font-medium">Edital Original</span>
                  </button>
                </div>
                <Link
                  to={`/procurement/${procurement.id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Ver Detalhes
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProcurements.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhuma licitação encontrada
          </h3>
          <p className="text-gray-600">
            Tente ajustar seus filtros ou termos de busca
          </p>
        </div>
      )}
    </div>
  );
}