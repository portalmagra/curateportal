'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '../components/Header'

type Language = 'en' | 'es'

type UserData = {
  age: number
  gender: string
  goals: string[]
  currentRoutine: string
  sleepHours: number
  stressLevel: string
  diet: string
  exercise: string
  supplements: string
  budget: string
}

type Product = {
  name: string
  price: string
  rating: number
  link: string
  asin: string
}

const translations = {
  pageTitle: { en: 'Your Personalized Wellness Plan', es: 'Tu Plan de Bienestar Personalizado' },
  heroTitle: { 
    en: 'Your AI-Generated\nWellness Plan', 
    es: 'Tu Plan de Bienestar\nGenerado por IA'
  },
  heroSubtitle: { 
    en: 'Based on your assessment, here\'s your personalized 30-day wellness plan', 
    es: 'Basado en tu evaluación, aquí está tu plan de bienestar personalizado de 30 días'
  },
  
  analysisTitle: { en: 'AI Health Analysis', es: 'Análisis de Salud con IA' },
  recommendationsTitle: { en: 'Personalized Recommendations', es: 'Recomendaciones Personalizadas' },
  productsTitle: { en: 'Curated Amazon Products', es: 'Productos Amazon Curados' },
  timelineTitle: { en: '30-Day Implementation Timeline', es: 'Cronograma de Implementación de 30 Días' },
  
  week1: { en: 'Week 1: Foundation', es: 'Semana 1: Fundación' },
  week2: { en: 'Week 2: Building', es: 'Semana 2: Construcción' },
  week3: { en: 'Week 3: Optimization', es: 'Semana 3: Optimización' },
  week4: { en: 'Week 4: Mastery', es: 'Semana 4: Maestría' },
  
  getStartedButton: { en: 'Get Started Today', es: 'Comenzar Hoy' },
  downloadPlanButton: { en: 'Download Plan', es: 'Descargar Plan' },
  shareButton: { en: 'Share Results', es: 'Compartir Resultados' },
  
  footerTagline: { en: 'Your personalized wellness portal', es: 'Tu portal personalizado de bienestar' },
  footerCopyright: { 
    en: '© 2025 CuratePortal LLC. All rights reserved.',
    es: '© 2025 CuratePortal LLC. Todos los derechos reservados.'
  }
}

export default function PlanPage() {
  const [language, setLanguage] = useState<Language>('en')
  const [analysis, setAnalysis] = useState('')
  const [recommendations, setRecommendations] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  
  const t = (key: keyof typeof translations) => translations[key]?.[language] || translations[key]?.en || key

  useEffect(() => {
    // Simular dados do usuário (em produção viria do assessment)
    const userData = {
      age: 35,
      gender: 'female',
      goals: ['weight_loss', 'better_sleep', 'stress_reduction'],
      currentRoutine: 'sedentary',
      sleepHours: 6,
      stressLevel: 'high',
      diet: 'mixed',
      exercise: 'minimal',
      supplements: 'none',
      budget: 'moderate'
    }
    
    // Chamar a assistente para análise
    callAnalysisAPI(userData)
  }, [language])
  
  const callAnalysisAPI = async (userData: UserData) => {
    try {
      setLoading(true)
      
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userData,
          language
        })
      })
      
      const result = await response.json()
      
      if (result.success) {
        // Parse da resposta da assistente
        const assistantResponse = result.analysis
        
        // Extrair análise
        setAnalysis(assistantResponse.split('RECOMMENDATIONS:')[0] || assistantResponse)
        
        // Extrair recomendações
        const recommendationsPart = assistantResponse.split('RECOMMENDATIONS:')[1]
        if (recommendationsPart) {
          setRecommendations(recommendationsPart.split('PRODUCTS:')[0] || recommendationsPart)
        }
      } else {
        // Fallback em caso de erro
        setAnalysis(language === 'en' 
          ? `Based on your assessment, our AI analysis reveals that you're experiencing sleep difficulties and seeking better energy levels. Your symptoms suggest a need for targeted nutritional support and lifestyle modifications. The analysis indicates that a comprehensive approach combining specific supplements, dietary adjustments, and stress management techniques will be most effective for your unique situation.`
          : `Basado en tu evaluación, nuestro análisis de IA revela que estás experimentando dificultades para dormir y buscando mejores niveles de energía. Tus síntomas sugieren la necesidad de soporte nutricional específico y modificaciones en el estilo de vida. El análisis indica que un enfoque integral que combine suplementos específicos, ajustes dietéticos y técnicas de manejo del estrés será más efectivo para tu situación única.`
        )
        
        setRecommendations(language === 'en'
          ? `**Morning Routine**: Start with a protein-rich breakfast and 15 minutes of gentle stretching\n**Supplement Protocol**: Take targeted supplements with meals for better absorption\n**Hydration**: Increase water intake to 8-10 glasses daily\n**Sleep Optimization**: Establish a consistent bedtime routine and limit screen time 1 hour before bed\n**Stress Management**: Practice 10 minutes of deep breathing or meditation daily\n**Exercise**: Incorporate 30 minutes of moderate activity 4-5 times per week`
          : `**Rutina Matutina**: Comienza con un desayuno rico en proteínas y 15 minutos de estiramiento suave\n**Protocolo de Suplementos**: Toma suplementos específicos con las comidas para mejor absorción\n**Hidratación**: Aumenta la ingesta de agua a 8-10 vasos diarios\n**Optimización del Sueño**: Establece una rutina consistente de sueño y limita el tiempo de pantalla 1 hora antes de dormir\n**Manejo del Estrés**: Practica 10 minutos de respiración profunda o meditación diaria\n**Ejercicio**: Incorpora 30 minutos de actividad moderada 4-5 veces por semana`
        )
      }
      
      // Produtos simulados (em produção viria da assistente)
      setProducts([
        { 
          name: 'Multivitamin Complex', 
          price: '$24.99', 
          rating: 4.8, 
          link: 'https://www.amazon.com/dp/B08N5WRWNW?tag=portalsolutio-20&linkCode=ogi&th=1&psc=1',
          asin: 'B08N5WRWNW'
        },
        { 
          name: 'Omega-3 Fish Oil', 
          price: '$18.99', 
          rating: 4.9, 
          link: 'https://www.amazon.com/dp/B07QK2ZQZQ?tag=portalsolutio-20&linkCode=ogi&th=1&psc=1',
          asin: 'B07QK2ZQZQ'
        },
        { 
          name: 'Probiotic Supplement', 
          price: '$32.99', 
          rating: 4.7, 
          link: 'https://www.amazon.com/dp/B08N5WRWNW?tag=portalsolutio-20&linkCode=ogi&th=1&psc=1',
          asin: 'B08N5WRWNW'
        }
      ])
      
      setLoading(false)
    } catch (error) {
      console.error('Error calling analysis API:', error)
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <Header language={language} setLanguage={setLanguage} />
      
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
        color: 'white',
        padding: '4rem 0',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 900,
            marginBottom: '1rem',
            lineHeight: 1.2,
            whiteSpace: 'pre-line'
          }}>
            {t('heroTitle')}
          </h1>
          <p style={{
            fontSize: '1.2rem',
            marginBottom: '2rem',
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            {t('heroSubtitle')}
          </p>
        </div>
      </section>

      {/* Loading State */}
      {loading && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '4rem 0',
          background: 'white',
          margin: '2rem',
          borderRadius: '20px',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem',
              animation: 'spin 2s linear infinite'
            }}>
              🧠
            </div>
            <p style={{
              fontSize: '1.2rem',
              color: '#6b7280',
              fontWeight: 600
            }}>
              {language === 'en' ? 'AI is analyzing your data...' : 'La IA está analizando tus datos...'}
            </p>
          </div>
        </div>
      )}

      {/* Results Content */}
      {!loading && (
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '2rem'
        }}>
          {/* AI Analysis */}
          <section style={{
            background: 'white',
            borderRadius: '20px',
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: 700,
              marginBottom: '1rem',
              color: '#1f2937',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              🧠 {t('analysisTitle')}
            </h2>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: 1.6,
              color: '#4b5563'
            }}>
              {analysis}
            </p>
          </section>

          {/* Recommendations */}
          <section style={{
            background: 'white',
            borderRadius: '20px',
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: 700,
              marginBottom: '1rem',
              color: '#1f2937',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              📋 {t('recommendationsTitle')}
            </h2>
            <div style={{
              fontSize: '1.1rem',
              lineHeight: 1.6,
              color: '#4b5563',
              whiteSpace: 'pre-line'
            }}>
              {recommendations}
            </div>
          </section>

          {/* Amazon Products */}
          <section style={{
            background: 'white',
            borderRadius: '20px',
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: 700,
              marginBottom: '1.5rem',
              color: '#1f2937',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              🛍️ {t('productsTitle')}
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}>
              {products.map((product, index) => (
                <div key={index} style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '15px',
                  padding: '1.5rem',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)'
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)'
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <div style={{
                      fontSize: '2rem',
                      width: '60px',
                      height: '60px',
                      background: '#f3f4f6',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      💊
                    </div>
                    <div>
                      <h3 style={{
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        marginBottom: '0.25rem',
                        color: '#1f2937'
                      }}>
                        {product.name}
                      </h3>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <span style={{
                          fontSize: '1.2rem',
                          fontWeight: 700,
                          color: '#059669'
                        }}>
                          {product.price}
                        </span>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}>
                          <span style={{ color: '#f59e0b' }}>⭐</span>
                          <span style={{
                            fontSize: '0.9rem',
                            color: '#6b7280'
                          }}>
                            {product.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <a 
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'block',
                      background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                      color: 'white',
                      textAlign: 'center',
                      padding: '0.75rem 1rem',
                      borderRadius: '10px',
                      textDecoration: 'none',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {language === 'en' ? 'View on Amazon' : 'Ver en Amazon'}
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section style={{
            background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
            borderRadius: '20px',
            padding: '2rem',
            textAlign: 'center',
            border: '2px solid #f59e0b'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              marginBottom: '1rem',
              color: '#92400e'
            }}>
              🎯 {language === 'en' ? 'Ready to Transform Your Health?' : '¿Listo para Transformar tu Salud?'}
            </h3>
            <p style={{
              fontSize: '1.1rem',
              color: '#92400e',
              marginBottom: '1.5rem',
              lineHeight: 1.5
            }}>
              {language === 'en' 
                ? 'Get your complete personalized 30-day wellness plan with daily guidance, progress tracking, and expert support.'
                : 'Obtén tu plan completo de bienestar personalizado de 30 días con orientación diaria, seguimiento de progreso y soporte experto.'
              }
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button style={{
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                color: 'white',
                padding: '1rem 2rem',
                border: 'none',
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 25px rgba(245, 158, 11, 0.3)'
              }}>
                🚀 {language === 'en' ? 'Get My Plan' : 'Obtener Mi Plan'}
              </button>
              <button style={{
                background: 'white',
                color: '#92400e',
                padding: '1rem 2rem',
                border: '2px solid #f59e0b',
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                📱 {language === 'en' ? 'Download App' : 'Descargar App'}
              </button>
            </div>
          </section>
        </div>
      )}

      {/* Footer */}
      <footer style={{
        background: '#1f2937',
        color: 'white',
        padding: '2.5rem 0',
        textAlign: 'center',
        marginTop: '4rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            marginBottom: '1rem',
            color: '#6366f1'
          }}>
            CuratePortal
          </h3>
          <p style={{
            fontSize: '1rem',
            color: '#9ca3af',
            marginBottom: '1rem'
          }}>
            {t('footerTagline')}
          </p>
          <p style={{
            fontSize: '0.9rem',
            color: '#6b7280'
          }}>
            {t('footerCopyright')}
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
