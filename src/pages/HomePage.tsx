import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Brain, Bell, BarChart3, Clock, Shield, CheckCircle, ArrowRight, Users, Target, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import SupabaseTest from '../components/SupabaseTest';
import { LoginTest } from '../components/LoginTest';
import { RegisterTest } from '../components/RegisterTest';

export function HomePage() {
  const { user } = useAuth();

  const features = [
    {
      icon: Brain,
      title: 'IA para Análise de Editais',
      description: 'Nossa inteligência artificial "mastiga" editais complexos e entrega resumos claros e objetivos.'
    },
    {
      icon: Search,
      title: 'Busca Avançada',
      description: 'Encontre licitações por palavra-chave, modalidade, órgão, valor e muito mais.'
    },
    {
      icon: Bell,
      title: 'Alertas Inteligentes',
      description: 'Receba notificações automáticas sobre novas licitações do seu interesse.'
    },
    {
      icon: BarChart3,
      title: 'Dashboard Completo',
      description: 'Acompanhe suas licitações de interesse e métricas importantes em tempo real.'
    },
    {
      icon: Clock,
      title: 'Prazos e Datas',
      description: 'Nunca perca um prazo importante com nosso sistema de lembretes automáticos.'
    },
    {
      icon: Shield,
      title: 'Dados Seguros',
      description: 'Sua informação protegida com criptografia de ponta e conformidade com a LGPD.'
    }
  ];

  const stats = [
    { number: '10.000+', label: 'Licitações Analisadas' },
    { number: '500+', label: 'Empresas Atendidas' },
    { number: '95%', label: 'Tempo Economizado' },
    { number: '24/7', label: 'Monitoramento' }
  ];

  const benefits = [
    'Economize até 90% do tempo na análise de editais',
    'Nunca perca uma oportunidade de negócio',
    'Entenda rapidamente os requisitos de cada licitação',
    'Monitore todas as etapas do processo',
    'Acesso a dados históricos e tendências'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Inteligência em{' '}
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                Licitações
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Simplifique sua participação em licitações públicas com nossa plataforma que "mastiga" 
              editais complexos e transforma em informações claras e acionáveis.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              {user ? (
                <Link
                  to="/dashboard"
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center space-x-2"
                >
                  <span>Acessar Dashboard</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center space-x-2"
                  >
                    <span>Entrar com Google</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    to="/search"
                    className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                  >
                    Ver Licitações
                  </Link>
                </>
              )}
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>100% Seguro</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>LGPD Compliance</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>500+ Empresas</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tudo que você precisa para vencer licitações
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nossa plataforma oferece ferramentas completas para monitorar, analisar e participar 
              de licitações públicas com eficiência.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Por que escolher nossa plataforma?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Transforme a complexidade das licitações em oportunidades claras de negócio.
              </p>
              
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>

              {!user && (
                <div className="mt-8">
                  <Link
                    to="/login"
                    className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold inline-flex items-center space-x-2"
                  >
                    <span>Entrar com Google</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              )}
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-teal-100 rounded-2xl p-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Edital Analisado</div>
                      <div className="text-sm text-gray-500">Há 2 minutos</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm font-medium text-gray-900">Resumo do Objeto</div>
                      <div className="text-sm text-gray-600">Aquisição de equipamentos de informática</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm font-medium text-gray-900">Valor Estimado</div>
                      <div className="text-sm text-gray-600">R$ 150.000,00</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm font-medium text-gray-900">Prazo de Entrega</div>
                      <div className="text-sm text-gray-600">15 dias corridos</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supabase Test Section - Apenas em desenvolvimento */}
      {import.meta.env.DEV && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                🔧 Teste de Conexão - Supabase
              </h2>
              <p className="text-gray-600">
                Verificando se a conexão com o banco de dados está funcionando corretamente.
              </p>
            </div>
            <SupabaseTest />
          </div>
        </section>
      )}

      {/* Login Test Section - Apenas em desenvolvimento */}
      {import.meta.env.DEV && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                🔐 Teste de Login - Debug
              </h2>
              <p className="text-gray-600">
                Teste o login com suas credenciais para identificar problemas.
              </p>
            </div>
            <LoginTest />
          </div>
        </section>
      )}

      {/* Register Test Section - Apenas em desenvolvimento */}
      {import.meta.env.DEV && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                📝 Teste de Registro - Debug
              </h2>
              <p className="text-gray-600">
                Teste o registro de novos usuários para identificar problemas.
              </p>
            </div>
            <RegisterTest />
          </div>
        </section>
      )}

      {/* CTA Section */}
      {!user && (
        <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Pronto para simplificar suas licitações?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Junte-se a centenas de empresas que já economizam tempo e aumentam suas chances 
              de sucesso em licitações públicas.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
              >
                Começar Gratuitamente
              </Link>
              <Link
                to="/pricing"
                className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold"
              >
                Ver Planos
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}