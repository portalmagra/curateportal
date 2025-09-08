'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '../components/Header'

type Language = 'en' | 'es' | 'pt'

const translations = {
  pageTitle: { 
    en: 'Your Health Analysis', 
    es: 'Tu Análisis de Salud',
    pt: 'Sua Análise de Saúde'
  },
  heroTitle: { 
    en: 'Your Personalized\nHealth Analysis', 
    es: 'Tu Análisis de\nSalud Personalizado',
    pt: 'Sua Análise de\nSaúde Personalizada'
  },
  heroSubtitle: { 
    en: 'Based on your responses, here are your personalized recommendations', 
    es: 'Basado en tus respuestas, aquí están tus recomendaciones personalizadas',
    pt: 'Baseado em suas respostas, aqui estão suas recomendações personalizadas'
  },
  
  // Analysis sections
  analysisTitle: { 
    en: 'AI Health Analysis', 
    es: 'Análisis de Salud con IA',
    pt: 'Análise de Saúde com IA'
  },
  recommendationsTitle: { 
    en: 'Personalized Recommendations', 
    es: 'Recomendaciones Personalizadas',
    pt: 'Recomendações Personalizadas'
  },
  productsTitle: { 
    en: 'Curated Amazon Products', 
    es: 'Productos Amazon Curados',
    pt: 'Produtos Amazon Curados'
  },
  
  // Plan promotion
  planTitle: { 
    en: 'Get Your Complete 30-Day Plan', 
    es: 'Obtén tu Plan Completo de 30 Días',
    pt: 'Obtenha seu Plano Completo de 30 Dias'
  },
  planDescription: { 
    en: 'Unlock your full potential with a detailed, personalized wellness plan designed specifically for you', 
    es: 'Desbloquea tu potencial completo con un plan de bienestar detallado y personalizado diseñado específicamente para ti',
    pt: 'Desbloqueie seu potencial completo com um plano de bem-estar detalhado e personalizado projetado especificamente para você'
  },
  planPrice: { 
    en: 'Only $37', 
    es: 'Solo $37',
    pt: 'Apenas $37'
  },
  planValue: { 
    en: 'Value: $197', 
    es: 'Valor: $197',
    pt: 'Valor: $197'
  },
  planSavings: { 
    en: 'Save $160', 
    es: 'Ahorra $160',
    pt: 'Economize $160'
  },
  planFeatures: {
    en: [
      'Daily personalized recommendations',
      'Detailed supplement protocols',
      'Lifestyle optimization tips',
      'Progress tracking system',
      '24/7 support access'
    ],
    es: [
      'Recomendaciones personalizadas diarias',
      'Protocolos detallados de suplementos',
      'Consejos de optimización del estilo de vida',
      'Sistema de seguimiento del progreso',
      'Acceso a soporte 24/7'
    ],
    pt: [
      'Recomendações personalizadas diárias',
      'Protocolos detalhados de suplementos',
      'Dicas de otimização do estilo de vida',
      'Sistema de acompanhamento do progresso',
      'Acesso ao suporte 24/7'
    ]
  },
  
  // Buttons
  getPlanButton: { 
    en: 'Get My 30-Day Plan', 
    es: 'Obtener Mi Plan de 30 Días',
    pt: 'Obter Meu Plano de 30 Dias'
  },
  viewProductsButton: { 
    en: 'View All Products', 
    es: 'Ver Todos los Productos',
    pt: 'Ver Todos os Produtos'
  },
  
  // Loading
  analyzing: { 
    en: 'Analyzing your responses...', 
    es: 'Analizando tus respuestas...',
    pt: 'Analisando suas respostas...'
  },
  
  // Footer
  footerTagline: { 
    en: 'Your personalized wellness portal', 
    es: 'Tu portal personalizado de bienestar',
    pt: 'Seu portal personalizado de bem-estar'
  }
}

export default function ResultsPage() {
  const [language, setLanguage] = useState<Language>('en')
  const [loading, setLoading] = useState(true)
  const [analysis, setAnalysis] = useState<any>(null)
  const [products, setProducts] = useState<any[]>([])
  
  const t = (key: keyof typeof translations) => translations[key]?.[language] || translations[key]?.en || key
  
  const generateFallbackProducts = (lang: string) => {
    return [
      {
        id: 1,
        name: lang === 'en' ? 'Multivitamin Complex' : 
              lang === 'es' ? 'Complejo Multivitamínico' : 
              'Complexo Multivitamínico',
        price: '$24.99',
        rating: 4.8,
        image: 'https://via.placeholder.com/200x200/10b981/ffffff?text=Multivitamin',
        link: `https://amazon.com/s?k=multivitamin+women&tag=portalsolutio-20`,
        description: lang === 'en' ? 'Essential vitamins and minerals for overall health' :
                    lang === 'es' ? 'Vitaminas y minerales esenciales para la salud general' :
                    'Vitaminas e minerais essenciais para a saúde geral'
      },
      {
        id: 2,
        name: lang === 'en' ? 'Omega-3 Fish Oil' : 
              lang === 'es' ? 'Aceite de Pescado Omega-3' : 
              'Óleo de Peixe Ômega-3',
        price: '$18.99',
        rating: 4.9,
        image: 'https://via.placeholder.com/200x200/3b82f6/ffffff?text=Omega-3',
        link: `https://amazon.com/s?k=omega+3+fish+oil&tag=portalsolutio-20`,
        description: lang === 'en' ? 'High-quality fish oil for heart and brain health' :
                    lang === 'es' ? 'Aceite de pescado de alta calidad para la salud del corazón y cerebro' :
                    'Óleo de peixe de alta qualidade para saúde do coração e cérebro'
      }
    ]
  }
  
  useEffect(() => {
    // Get assessment data from URL params or localStorage
    const urlParams = new URLSearchParams(window.location.search)
    const assessmentId = urlParams.get('assessmentId')
    
    if (assessmentId) {
      loadAssessmentResults(assessmentId)
    } else {
      // Fallback: simulate assessment data
      simulateAssessmentResults()
    }
  }, [language])
  
  const loadAssessmentResults = async (assessmentId: string) => {
    try {
      setLoading(true)
      
      // Get real answers from localStorage
      const storedAnswers = localStorage.getItem('assessmentAnswers')
      const storedLanguage = localStorage.getItem('assessmentLanguage')
      
      let answers
      if (storedAnswers) {
        answers = JSON.parse(storedAnswers)
      } else {
        // Fallback to mock data
        answers = {
          goal: 'Weight Management',
          energy: 'Moderate',
          challenge: 'Lack of Energy',
          stress: 'Several times a week',
          sleep: 'Fair - Some rest',
          supplements: 'No, but interested',
          concern: 'Long-term health',
          planImportance: 'Very Important',
          additionalInfo: 'Looking to improve overall wellness and energy levels'
        }
      }
      
      // Generate analysis based on answers
      const analysisResponse = await fetch('/api/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers, language })
      })
      
      const analysisData = await analysisResponse.json()
      
      if (analysisData.success) {
        setAnalysis(analysisData.analysis)
      }
      
      // Generate product recommendations
      const productsResponse = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers, language })
      })
      
      const productsData = await productsResponse.json()
      
      console.log('🛍️ Products API Response:', productsData)
      
      if (productsData.success) {
        setProducts(productsData.products)
        console.log('✅ Products loaded:', productsData.products.length)
      } else {
        console.error('❌ Products API failed:', productsData.error)
        // Use fallback products
        setProducts(generateFallbackProducts(language))
      }
      
      setLoading(false)
    } catch (error) {
      console.error('Error loading assessment results:', error)
      simulateAssessmentResults()
    }
  }
  
  const simulateAssessmentResults = () => {
    setTimeout(() => {
      setAnalysis({
        summary: language === 'en' ? 'Based on your responses, our AI analysis reveals that your primary health goal is weight management. You\'re currently experiencing moderate energy levels, with lack of energy being your biggest challenge. Your stress frequency is several times a week, and your sleep quality is fair - some rest. This indicates a need for targeted interventions in multiple areas.' :
                   language === 'es' ? 'Basado en tus respuestas, nuestro análisis de IA revela que tu objetivo principal de salud es el control de peso. Actualmente experimentas niveles de energía moderados, con falta de energía siendo tu mayor desafío. Tu frecuencia de estrés es varias veces por semana, y tu calidad de sueño es regular - algo de descanso. Esto indica la necesidad de intervenciones específicas en múltiples áreas.' :
                   'Baseado em suas respostas, nossa análise de IA revela que seu objetivo principal de saúde é o controle de peso. Você está atualmente experimentando níveis de energia moderados, com falta de energia sendo seu maior desafio. Sua frequência de estresse é várias vezes por semana, e sua qualidade de sono é regular - algum descanso. Isso indica a necessidade de intervenções específicas em múltiplas áreas.',
        recommendations: [
          language === 'en' ? 'Focus on metabolic optimization and sustainable weight management' :
          language === 'es' ? 'Enfócate en optimización metabólica y manejo sostenible del peso' :
          'Foque na otimização metabólica e controle sustentável de peso',
          language === 'en' ? 'Implement daily stress management routine' :
          language === 'es' ? 'Implementa rutina diaria de manejo del estrés' :
          'Implemente rotina diária de gerenciamento de estresse',
          language === 'en' ? 'Prioritize sleep quality improvement' :
          language === 'es' ? 'Prioriza la mejora de la calidad del sueño' :
          'Priorize a melhoria da qualidade do sono',
          language === 'en' ? 'Consider targeted supplement protocol' :
          language === 'es' ? 'Considera protocolo de suplementos específicos' :
          'Considere protocolo de suplementos específicos'
        ],
        priorityAreas: [
          language === 'en' ? 'Nutrition planning and portion control' :
          language === 'es' ? 'Planificación nutricional y control de porciones' :
          'Planejamento nutricional e controle de porções',
          language === 'en' ? 'Sleep optimization and stress management' :
          language === 'es' ? 'Optimización del sueño y manejo del estrés' :
          'Otimização do sono e gerenciamento de estresse'
        ],
        riskFactors: [
          language === 'en' ? 'High stress levels may impact overall health' :
          language === 'es' ? 'Altos niveles de estrés pueden impactar la salud general' :
          'Altos níveis de estresse podem impactar a saúde geral',
          language === 'en' ? 'Poor sleep may be affecting energy and recovery' :
          language === 'es' ? 'El sueño pobre puede estar afectando la energía y recuperación' :
          'O sono ruim pode estar afetando a energia e recuperação'
        ],
        nextSteps: [
          language === 'en' ? 'Start with highest priority area for maximum impact' :
          language === 'es' ? 'Comienza con el área de mayor prioridad para máximo impacto' :
          'Comece com a área de maior prioridade para máximo impacto',
          language === 'en' ? 'Track progress weekly to adjust approach' :
          language === 'es' ? 'Rastrea el progreso semanalmente para ajustar el enfoque' :
          'Acompanhe o progresso semanalmente para ajustar a abordagem',
          language === 'en' ? 'Consider comprehensive 30-day plan for systematic improvement' :
          language === 'es' ? 'Considera un plan integral de 30 días para mejora sistemática' :
          'Considere um plano abrangente de 30 dias para melhoria sistemática'
        ]
      })
      
      setProducts([
        {
          id: 1,
          name: language === 'en' ? 'Green Tea Extract' : language === 'es' ? 'Extracto de Té Verde' : 'Extrato de Chá Verde',
          price: '$16.99',
          rating: 4.6,
          image: 'https://via.placeholder.com/200x200/10b981/ffffff?text=Green+Tea',
          link: 'https://amazon.com/dp/B08ABC123?tag=portalsolutio-20',
          description: language === 'en' ? 'Natural metabolism support and weight management' : language === 'es' ? 'Soporte natural del metabolismo y control de peso' : 'Suporte natural do metabolismo e controle de peso'
        },
        {
          id: 2,
          name: language === 'en' ? 'Ashwagandha Stress Relief' : language === 'es' ? 'Alivio del Estrés con Ashwagandha' : 'Alívio do Estresse com Ashwagandha',
          price: '$24.99',
          rating: 4.8,
          image: 'https://via.placeholder.com/200x200/8b5cf6/ffffff?text=Ashwagandha',
          link: 'https://amazon.com/dp/B08JKL012?tag=portalsolutio-20',
          description: language === 'en' ? 'Adaptogenic herb for stress management and relaxation' : language === 'es' ? 'Hierba adaptogénica para el manejo del estrés y relajación' : 'Erva adaptogênica para gerenciamento de estresse e relaxamento'
        },
        {
          id: 3,
          name: language === 'en' ? 'Melatonin Sleep Support' : language === 'es' ? 'Soporte para el Sueño con Melatonina' : 'Suporte para o Sono com Melatonina',
          price: '$18.99',
          rating: 4.6,
          image: 'https://via.placeholder.com/200x200/6366f1/ffffff?text=Melatonin',
          link: 'https://amazon.com/dp/B08GHI789?tag=portalsolutio-20',
          description: language === 'en' ? 'Natural sleep aid for better rest and recovery' : language === 'es' ? 'Ayuda natural para el sueño para mejor descanso y recuperación' : 'Auxílio natural para o sono para melhor descanso e recuperação'
        },
        {
          id: 4,
          name: language === 'en' ? 'Multivitamin Complex' : language === 'es' ? 'Complejo Multivitamínico' : 'Complexo Multivitamínico',
          price: '$24.99',
          rating: 4.8,
          image: 'https://via.placeholder.com/200x200/10b981/ffffff?text=Multivitamin',
          link: 'https://amazon.com/dp/B08N5WRWNW?tag=portalsolutio-20',
          description: language === 'en' ? 'Essential vitamins and minerals for overall health' : language === 'es' ? 'Vitaminas y minerales esenciales para la salud general' : 'Vitaminas e minerais essenciais para a saúde geral'
        },
        {
          id: 5,
          name: language === 'en' ? 'Omega-3 Fish Oil' : language === 'es' ? 'Aceite de Pescado Omega-3' : 'Óleo de Peixe Ômega-3',
          price: '$18.99',
          rating: 4.9,
          image: 'https://via.placeholder.com/200x200/3b82f6/ffffff?text=Omega-3',
          link: 'https://amazon.com/dp/B07QK2ZQZQ?tag=portalsolutio-20',
          description: language === 'en' ? 'High-quality fish oil for heart and brain health' : language === 'es' ? 'Aceite de pescado de alta calidad para la salud del corazón y cerebro' : 'Óleo de peixe de alta qualidade para saúde do coração e cérebro'
        },
        {
          id: 6,
          name: language === 'en' ? 'B-Complex Vitamins' : language === 'es' ? 'Vitaminas del Complejo B' : 'Vitaminas do Complexo B',
          price: '$22.99',
          rating: 4.7,
          image: 'https://via.placeholder.com/200x200/f59e0b/ffffff?text=B-Complex',
          link: 'https://amazon.com/dp/B08DEF456?tag=portalsolutio-20',
          description: language === 'en' ? 'Essential B vitamins for energy production' : language === 'es' ? 'Vitaminas B esenciales para la producción de energía' : 'Vitaminas B essenciais para produção de energia'
        }
      ])
      
      setLoading(false)
    }, 2000)
  }
  
  if (loading) {
    return (
      <>
        <Header language={language} onLanguageChange={setLanguage} />
        <main style={{ padding: '2rem', textAlign: 'center', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🤖</div>
            <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1f2937' }}>
              {t('analyzing')}
            </h1>
            <div style={{ width: '50px', height: '50px', border: '3px solid #e5e7eb', borderTop: '3px solid #3b82f6', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
          </div>
        </main>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </>
    )
  }
  
  return (
    <>
      <Header language={language} onLanguageChange={setLanguage} />
      <main style={{ padding: '2rem', minHeight: '80vh' }}>
        {/* Hero Section */}
        <section style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            marginBottom: '1rem', 
            color: '#1f2937',
            whiteSpace: 'pre-line'
          }}>
            {t('heroTitle')}
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
            {t('heroSubtitle')}
          </p>
        </section>
        
        {/* AI Analysis Section */}
        <section style={{ marginBottom: '3rem' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#1f2937' }}>
              {t('analysisTitle')}
            </h2>
            
            {/* Summary */}
            <div style={{ 
              background: 'linear-gradient(135deg, #f0fdf4, #ecfdf5)', 
              padding: '2rem', 
              borderRadius: '16px',
              border: '1px solid #d1fae5',
              marginBottom: '2rem'
            }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#1f2937' }}>
                {language === 'en' ? 'Health Assessment Summary' : language === 'es' ? 'Resumen de Evaluación de Salud' : 'Resumo da Avaliação de Saúde'}
              </h3>
              <p style={{ fontSize: '1.1rem', color: '#374151', lineHeight: '1.6' }}>
                {analysis?.summary}
              </p>
            </div>
            
            {/* Detailed Analysis Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              
              {/* Recommendations */}
              <div style={{ 
                background: 'white', 
                padding: '1.5rem', 
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
              }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#1f2937', display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '0.5rem' }}>🎯</span>
                  {t('recommendationsTitle')}
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {analysis?.recommendations.map((rec: string, index: number) => (
                    <li key={index} style={{ 
                      padding: '0.5rem 0', 
                      color: '#374151',
                      fontSize: '0.95rem'
                    }}>
                      <span style={{ color: '#10b981', marginRight: '0.5rem' }}>✓</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Priority Areas */}
              <div style={{ 
                background: 'white', 
                padding: '1.5rem', 
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
              }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#1f2937', display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '0.5rem' }}>⭐</span>
                  {language === 'en' ? 'Priority Areas' : language === 'es' ? 'Áreas Prioritarias' : 'Áreas Prioritárias'}
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {analysis?.priorityAreas.map((area: string, index: number) => (
                    <li key={index} style={{ 
                      padding: '0.5rem 0', 
                      color: '#374151',
                      fontSize: '0.95rem'
                    }}>
                      <span style={{ color: '#3b82f6', marginRight: '0.5rem' }}>→</span>
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Risk Factors */}
              <div style={{ 
                background: 'white', 
                padding: '1.5rem', 
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
              }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#1f2937', display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '0.5rem' }}>⚠️</span>
                  {language === 'en' ? 'Risk Factors' : language === 'es' ? 'Factores de Riesgo' : 'Fatores de Risco'}
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {analysis?.riskFactors.map((risk: string, index: number) => (
                    <li key={index} style={{ 
                      padding: '0.5rem 0', 
                      color: '#374151',
                      fontSize: '0.95rem'
                    }}>
                      <span style={{ color: '#f59e0b', marginRight: '0.5rem' }}>!</span>
                      {risk}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Next Steps */}
              <div style={{ 
                background: 'white', 
                padding: '1.5rem', 
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
              }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#1f2937', display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '0.5rem' }}>🚀</span>
                  {language === 'en' ? 'Next Steps' : language === 'es' ? 'Próximos Pasos' : 'Próximos Passos'}
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {analysis?.nextSteps.map((step: string, index: number) => (
                    <li key={index} style={{ 
                      padding: '0.5rem 0', 
                      color: '#374151',
                      fontSize: '0.95rem'
                    }}>
                      <span style={{ color: '#10b981', marginRight: '0.5rem' }}>→</span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Products Section */}
        <section style={{ marginBottom: '3rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#1f2937' }}>
              {t('productsTitle')}
            </h2>
            <p style={{ fontSize: '1rem', color: '#6b7280', marginBottom: '2rem', textAlign: 'center' }}>
              {language === 'en' ? 'Carefully selected products based on your health assessment and goals' : 
               language === 'es' ? 'Productos cuidadosamente seleccionados basados en tu evaluación de salud y objetivos' :
               'Produtos cuidadosamente selecionados baseados na sua avaliação de saúde e objetivos'}
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {products.map((product) => (
                <div key={product.id} style={{ 
                  background: 'white', 
                  borderRadius: '16px', 
                  padding: '1.5rem',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)'
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}>
                  <div style={{ 
                    width: '100%', 
                    height: '120px', 
                    background: product.image,
                    borderRadius: '12px', 
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    color: 'white',
                    fontWeight: 'bold'
                  }}>
                    {product.name.split(' ')[0]}
                  </div>
                  
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#1f2937', fontWeight: '600' }}>
                    {product.name}
                  </h3>
                  
                  <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '1rem', lineHeight: '1.4' }}>
                    {product.description}
                  </p>
                  
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ color: '#fbbf24', marginRight: '0.25rem' }}>★</span>
                      <span style={{ color: '#6b7280', fontSize: '0.9rem', fontWeight: '500' }}>{product.rating}</span>
                    </div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#059669' }}>
                      {product.price}
                    </div>
                  </div>
                  
                  <a 
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      padding: '0.75rem 1rem',
                      background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '10px',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #1d4ed8, #1e40af)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
                    }}
                  >
                    {language === 'en' ? 'View on Amazon' : language === 'es' ? 'Ver en Amazon' : 'Ver na Amazon'}
                  </a>
                </div>
              ))}
            </div>
            
            {/* Additional Info */}
            <div style={{ 
              background: 'linear-gradient(135deg, #eff6ff, #dbeafe)', 
              padding: '1.5rem', 
              borderRadius: '12px',
              marginTop: '2rem',
              textAlign: 'center'
            }}>
              <p style={{ fontSize: '0.9rem', color: '#374151', margin: 0 }}>
                {language === 'en' ? '💡 All products are carefully curated based on your specific health needs and goals. Prices and availability may vary on Amazon.' :
                 language === 'es' ? '💡 Todos los productos están cuidadosamente seleccionados basados en tus necesidades específicas de salud y objetivos. Los precios y disponibilidad pueden variar en Amazon.' :
                 '💡 Todos os produtos são cuidadosamente selecionados baseados em suas necessidades específicas de saúde e objetivos. Preços e disponibilidade podem variar na Amazon.'}
              </p>
            </div>
          </div>
        </section>
        
        {/* Plan Promotion Section */}
        <section style={{ marginBottom: '3rem' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ 
              background: 'linear-gradient(135deg, #1f2937, #374151)', 
              padding: '3rem', 
              borderRadius: '20px',
              textAlign: 'center',
              color: 'white'
            }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'white' }}>
                {t('planTitle')}
              </h2>
              <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: '#d1d5db', lineHeight: '1.6' }}>
                {t('planDescription')}
              </p>
              
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#10b981', marginBottom: '0.5rem' }}>
                  {t('planPrice')}
                </div>
                <div style={{ fontSize: '1.2rem', color: '#9ca3af', textDecoration: 'line-through', marginBottom: '0.5rem' }}>
                  {t('planValue')}
                </div>
                <div style={{ fontSize: '1.1rem', color: '#fbbf24', fontWeight: 'bold' }}>
                  {t('planSavings')}
                </div>
              </div>
              
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'white' }}>
                  {language === 'en' ? 'What\'s Included:' : language === 'es' ? 'Qué está incluido:' : 'O que está incluído:'}
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', maxWidth: '400px', margin: '0 auto' }}>
                  {translations.planFeatures[language].map((feature, index) => (
                    <li key={index} style={{ 
                      padding: '0.5rem 0', 
                      color: '#d1d5db',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <span style={{ color: '#10b981', marginRight: '0.75rem' }}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <Link href="/plan">
                <button style={{
                  padding: '1rem 2rem',
                  border: 'none',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)',
                  transition: 'all 0.2s'
                }}>
                  {t('getPlanButton')}
                </button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer style={{ 
          textAlign: 'center', 
          padding: '2rem 0', 
          borderTop: '1px solid #e5e7eb',
          marginTop: '3rem'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '0 2rem'
          }}>
            <div className="footer-brand" style={{
              fontSize: '1.8rem',
              fontWeight: 900,
              marginBottom: '0.5rem'
            }}>
              CuratePortal
            </div>
            <p style={{ color: '#9ca3af', marginBottom: '1rem', fontSize: '0.9rem' }}>
              {t('footerTagline')}
            </p>
            <div style={{ color: '#6b7280', fontSize: '0.8rem' }}>
              © 2025 CuratePortal LLC. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
