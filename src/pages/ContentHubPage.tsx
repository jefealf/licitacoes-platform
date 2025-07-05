import React from 'react';
import { BookOpen, Video, FileText, Users, Clock, ArrowRight, Star, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ContentHubPage() {
  const categories = [
    {
      id: 'guides',
      title: 'Guias Completos',
      icon: BookOpen,
      description: 'Guias passo a passo para dominar licitações',
      color: 'blue'
    },
    {
      id: 'tutorials',
      title: 'Vídeo Tutoriais',
      icon: Video,
      description: 'Aprenda visualmente com nossos especialistas',
      color: 'green'
    },
    {
      id: 'templates',
      title: 'Modelos e Templates',
      icon: FileText,
      description: 'Documentos prontos para suas propostas',
      color: 'purple'
    },
    {
      id: 'webinars',
      title: 'Webinars e Eventos',
      icon: Users,
      description: 'Participe de eventos ao vivo com especialistas',
      color: 'orange'
    }
  ];

  const featuredContent = [
    {
      id: '1',
      title: 'Guia Completo: Como Participar de um Pregão Eletrônico',
      type: 'Guia',
      duration: '15 min',
      rating: 4.9,
      description: 'Aprenda todo o processo, desde a habilitação até a entrega da proposta comercial.',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true
    },
    {
      id: '2',
      title: 'Documentação Necessária para Licitações',
      type: 'Checklist',
      duration: '10 min',
      rating: 4.8,
      description: 'Lista completa de documentos exigidos nas principais modalidades licitatórias.',
      image: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true
    },
    {
      id: '3',
      title: 'Estratégias de Precificação Competitiva',
      type: 'Vídeo',
      duration: '25 min',
      rating: 4.7,
      description: 'Como formar preços competitivos sem comprometer a margem de lucro.',
      image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true
    }
  ];

  const recentPosts = [
    {
      id: '1',
      title: 'Mudanças na Lei de Licitações: O que você precisa saber',
      excerpt: 'Análise das principais alterações trazidas pela Nova Lei de Licitações e como elas impactam sua empresa.',
      author: 'Dr. João Santos',
      publishDate: '2024-12-05',
      readTime: '8 min',
      category: 'Legislação'
    },
    {
      id: '2',
      title: 'Dicas para Elaborar uma Proposta Técnica Vencedora',
      excerpt: 'Elementos essenciais que não podem faltar na sua proposta técnica para aumentar as chances de sucesso.',
      author: 'Ana Costa',
      publishDate: '2024-12-03',
      readTime: '12 min',
      category: 'Estratégia'
    },
    {
      id: '3',
      title: 'Como Interpretar Editais Complexos de Forma Eficiente',
      excerpt: 'Metodologia para analisar editais extensos e identificar rapidamente os pontos mais importantes.',
      author: 'Carlos Silva',
      publishDate: '2024-12-01',
      readTime: '10 min',
      category: 'Análise'
    },
    {
      id: '4',
      title: 'Gestão de Prazos em Licitações: Nunca Mais Perca um Deadline',
      excerpt: 'Sistema completo para organizar e monitorar todos os prazos importantes dos seus processos licitatórios.',
      author: 'Maria Oliveira',
      publishDate: '2024-11-28',
      readTime: '6 min',
      category: 'Organização'
    }
  ];

  const learningPath = [
    {
      step: 1,
      title: 'Fundamentos das Licitações',
      description: 'Entenda os conceitos básicos e a legislação',
      duration: '2 horas',
      completed: false
    },
    {
      step: 2,
      title: 'Modalidades Licitatórias',
      description: 'Conheça as diferentes modalidades e suas especificidades',
      duration: '3 horas',
      completed: false
    },
    {
      step: 3,
      title: 'Preparação de Documentos',
      description: 'Aprenda a preparar toda documentação necessária',
      duration: '4 horas',
      completed: false
    },
    {
      step: 4,
      title: 'Estratégias de Proposta',
      description: 'Desenvolva propostas técnicas e comerciais vencedoras',
      duration: '3 horas',
      completed: false
    },
    {
      step: 5,
      title: 'Gestão de Contratos',
      description: 'Gerencie contratos públicos com eficiência',
      duration: '2 horas',
      completed: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Hub de Conteúdo
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Aprenda tudo sobre licitações com nossos guias especializados, 
          vídeos tutoriais e materiais exclusivos.
        </p>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className={`w-12 h-12 bg-${category.color}-100 rounded-lg flex items-center justify-center mb-4`}>
              <category.icon className={`w-6 h-6 text-${category.color}-600`} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {category.title}
            </h3>
            <p className="text-gray-600 text-sm">
              {category.description}
            </p>
          </div>
        ))}
      </div>

      {/* Featured Content */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Conteúdo em Destaque</h2>
          <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1">
            <span>Ver todos</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredContent.map((content) => (
            <div key={content.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <img
                src={content.image}
                alt={content.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {content.type}
                  </span>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{content.duration}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {content.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {content.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900">{content.rating}</span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1">
                    <span>Acessar</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Blog Posts */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Artigos Recentes</h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1">
              <span>Ver blog completo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-6">
            {recentPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                    {post.category}
                  </span>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{post.readTime}</span>
                    <span>{new Date(post.publishDate).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Por {post.author}</span>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1">
                    <span>Ler mais</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Learning Path */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Trilha de Aprendizado</h2>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Do Iniciante ao Especialista
            </h3>
            <p className="text-gray-600 text-sm mb-6">
              Siga nossa trilha estruturada e se torne um especialista em licitações públicas.
            </p>
            
            <div className="space-y-4">
              {learningPath.map((item) => (
                <div key={item.step} className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold ${
                    item.completed 
                      ? 'bg-green-100 border-green-500 text-green-700'
                      : 'bg-gray-100 border-gray-300 text-gray-600'
                  }`}>
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-600 mb-1">{item.description}</p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{item.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium mt-6">
              Iniciar Trilha
            </button>
          </div>

          {/* Quick Resources */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Recursos Rápidos
            </h3>
            
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <Download className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-medium text-gray-900">Checklist de Documentos</div>
                  <div className="text-sm text-gray-600">PDF • 245 KB</div>
                </div>
              </button>
              
              <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <Download className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-medium text-gray-900">Modelo de Proposta</div>
                  <div className="text-sm text-gray-600">DOCX • 128 KB</div>
                </div>
              </button>
              
              <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <Download className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-medium text-gray-900">Planilha de Custos</div>
                  <div className="text-sm text-gray-600">XLSX • 89 KB</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}