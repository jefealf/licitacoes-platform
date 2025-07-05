import React from 'react';
import { Check, Star, Zap } from 'lucide-react';
import { useAuth } from '../contexts/FirebaseAuthContext';

export function PricingPage() {
  const { user } = useAuth();

  const plans = [
    {
      name: 'Gratuito',
      price: 'R$ 0',
      period: 'sempre',
      description: 'Perfeito para conhecer a plataforma',
      features: [
        'Até 10 buscas por mês',
        'Visualização básica de editais',
        'Acesso ao hub de conteúdo',
        '1 alerta simples',
        'Suporte por email'
      ],
      limitations: [
        'Sem análise IA de editais',
        'Sem filtros avançados',
        'Sem alertas personalizados'
      ],
      cta: 'Plano Atual',
      current: user?.plan === 'free',
      popular: false
    },
    {
      name: 'Premium',
      price: 'R$ 97',
      period: 'por mês',
      description: 'Para empresas que levam licitações a sério',
      features: [
        'Buscas ilimitadas',
        'Análise IA completa de editais',
        'Filtros avançados por modalidade, órgão, valor',
        'Alertas inteligentes ilimitados',
        'Histórico completo de licitações',
        'Exportação de dados',
        'Suporte prioritário',
        'Acesso antecipado a novos recursos'
      ],
      limitations: [],
      cta: user?.plan === 'premium' ? 'Plano Atual' : 'Assinar Premium',
      current: user?.plan === 'premium',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Personalizado',
      period: 'sob consulta',
      description: 'Solução completa para grandes empresas',
      features: [
        'Tudo do Premium',
        'API dedicada',
        'Integração com sistemas internos',
        'Múltiplos usuários',
        'Relatórios personalizados',
        'Gerente de conta dedicado',
        'Treinamento da equipe',
        'SLA garantido'
      ],
      limitations: [],
      cta: 'Falar com Vendas',
      current: false,
      popular: false
    }
  ];

  const faq = [
    {
      question: 'Posso cancelar minha assinatura a qualquer momento?',
      answer: 'Sim, você pode cancelar sua assinatura a qualquer momento. O cancelamento será efetivo no final do período de cobrança atual.'
    },
    {
      question: 'Como funciona a análise IA dos editais?',
      answer: 'Nossa IA processa os editais e extrai informações importantes como objeto, valor, prazos, requisitos e documentos necessários, apresentando tudo de forma clara e estruturada.'
    },
    {
      question: 'Posso mudar de plano depois?',
      answer: 'Claro! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As mudanças são aplicadas imediatamente.'
    },
    {
      question: 'Os dados das licitações são atualizados em tempo real?',
      answer: 'Sim, nossa plataforma é integrada com as APIs oficiais e atualiza os dados de licitações várias vezes ao dia.'
    },
    {
      question: 'Existe desconto para pagamento anual?',
      answer: 'Sim, oferecemos 20% de desconto para assinaturas anuais. Entre em contato para mais detalhes.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Escolha o plano ideal para você
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Desde empresas iniciantes até grandes corporações, temos o plano perfeito 
          para suas necessidades em licitações públicas.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {plans.map((plan, index) => (
          <div key={index} className={`relative rounded-2xl border-2 p-8 ${
            plan.popular 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 bg-white'
          } ${plan.current ? 'ring-2 ring-green-500' : ''}`}>
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                  <Star className="w-4 h-4" />
                  <span>Mais Popular</span>
                </span>
              </div>
            )}
            
            {plan.current && (
              <div className="absolute -top-4 right-4">
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Atual
                </span>
              </div>
            )}

            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                {plan.period !== 'sob consulta' && (
                  <span className="text-gray-600 ml-2">/{plan.period}</span>
                )}
              </div>
              <p className="text-gray-600">{plan.description}</p>
            </div>

            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
              {plan.limitations.map((limitation, limitationIndex) => (
                <li key={limitationIndex} className="flex items-start space-x-3 opacity-50">
                  <div className="w-5 h-5 flex-shrink-0 mt-0.5">
                    <div className="w-3 h-3 border border-gray-400 rounded-full mx-auto mt-1"></div>
                  </div>
                  <span className="text-gray-600 line-through">{limitation}</span>
                </li>
              ))}
            </ul>

            <button 
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                plan.current
                  ? 'bg-gray-100 text-gray-600 cursor-not-allowed'
                  : plan.popular
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}
              disabled={plan.current}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      {/* Features Comparison */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Compare todos os recursos
        </h2>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Recursos</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Gratuito</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Premium</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-4 px-6 text-gray-900">Buscas por mês</td>
                  <td className="py-4 px-6 text-center text-gray-600">10</td>
                  <td className="py-4 px-6 text-center text-green-600">Ilimitadas</td>
                  <td className="py-4 px-6 text-center text-green-600">Ilimitadas</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-900">Análise IA de editais</td>
                  <td className="py-4 px-6 text-center text-red-500">✗</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-900">Filtros avançados</td>
                  <td className="py-4 px-6 text-center text-red-500">✗</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-900">Alertas inteligentes</td>
                  <td className="py-4 px-6 text-center text-gray-600">1 básico</td>
                  <td className="py-4 px-6 text-center text-green-600">Ilimitados</td>
                  <td className="py-4 px-6 text-center text-green-600">Ilimitados</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-900">API dedicada</td>
                  <td className="py-4 px-6 text-center text-red-500">✗</td>
                  <td className="py-4 px-6 text-center text-red-500">✗</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-900">Suporte</td>
                  <td className="py-4 px-6 text-center text-gray-600">Email</td>
                  <td className="py-4 px-6 text-center text-gray-600">Prioritário</td>
                  <td className="py-4 px-6 text-center text-gray-600">Dedicado</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Perguntas Frequentes
        </h2>
        
        <div className="max-w-3xl mx-auto space-y-6">
          {faq.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {item.question}
              </h3>
              <p className="text-gray-600">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-8 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          Pronto para transformar seu negócio?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Junte-se a centenas de empresas que já economizam tempo e aumentam 
          suas chances de sucesso em licitações.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
            Começar Teste Gratuito
          </button>
          <button className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold">
            Falar com Especialista
          </button>
        </div>
      </div>
    </div>
  );
}