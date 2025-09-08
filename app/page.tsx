'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from './components/Header'

type Language = 'en' | 'es' | 'pt'

const content = {
  headline1: { pt: 'Buy Right and Save', es: 'Compra Bien y Ahorra', en: 'Buy Right and Save' },
  headline2: { pt: 'Discover the Products', es: 'Descubre los Productos', en: 'Discover the Products' },
  headline3: { pt: 'Perfect for Your Health', es: 'Perfecto para tu Salud', en: 'Perfect for Your Health' },
  selectLanguage: { pt: 'Choose your language:', es: 'Elige tu idioma:', en: 'Choose your language:' },
  trustText: { pt: '+5,000+ Americans trust CuratePortal', es: '+5,000+ Americanos confían en CuratePortal', en: '+5,000+ Americans trust CuratePortal' },
  
  // Seção "Como Funciona"
  howItWorksTitle: { pt: 'Get Your Personalized Health Plan', es: 'Obtén tu Plan de Salud Personalizado', en: 'Get Your Personalized Health Plan' },
  step1Title: { pt: 'AI Analysis', es: 'Análisis con IA', en: 'AI Analysis' },
  step1Desc: { 
    pt: 'Simple questions that guide your wellness. Free and personalized.',
    es: 'Preguntas simples que dirigen tu bienestar. Gratis y personalizado.',
    en: 'Simple questions that guide your wellness. Free and personalized.'
  },
  step2Title: { pt: 'Curated Products', es: 'Productos Curados', en: 'Curated Products' },
  step2Desc: { 
    pt: 'Your best choices - quality and price. Without spending anything for it.',
    es: 'Tus mejores opciones - calidad y precio. Sin gastar nada por esto.',
    en: 'Your best choices - quality and price. Without spending anything for it.'
  },
  step3Title: { pt: '30-Day Nutrition Plan', es: 'Plan de Nutrición de 30 Días', en: '30-Day Nutrition Plan' },
  step3Desc: { 
    pt: 'AI-generated 30-day nutrition plan. Personalized and scientific.',
    es: 'Plan de nutrición de 30 días generado por IA. Personalizado y científico.',
    en: 'AI-generated 30-day nutrition plan. Personalized and scientific.'
  },
  
  // Seção de Depoimentos
  testimonialsTitle: { pt: 'O que nossos usuários dizem', es: 'Lo que dicen nuestros usuarios', en: 'What our users say' },
  testimonials: {
    pt: [
      { initials: 'MR', name: 'Maria Rodriguez', location: 'Orlando, FL', text: '"Incrível! Encontrei exatamente os suplementos que precisava. A IA acertou em cheio minhas necessidades."' },
      { initials: 'JS', name: 'João Silva', location: 'Miami, FL', text: '"A análise da IA é impressionante. Finalmente achei o que funciona para mim!"' },
      { initials: 'AR', name: 'Ana Rodrigues', location: 'New York, NY', text: '"Como enfermeira, fiquei impressionada com a precisão das recomendações."' }
    ],
    es: [
      { initials: 'CR', name: 'Carmen Rodriguez', location: 'Los Angeles, CA', text: '"¡Increíble! Encontré exactamente los productos que mi familia necesitaba."' },
      { initials: 'MG', name: 'Miguel González', location: 'Houston, TX', text: '"El análisis cultural es perfecto. Realmente entienden nuestras necesidades."' },
      { initials: 'LM', name: 'Lucia Morales', location: 'Phoenix, AZ', text: '"Como madre, me encanta que piensen en toda la familia."' }
    ],
    en: [
      { initials: 'JS', name: 'Jennifer Smith', location: 'San Francisco, CA', text: '"The AI recommendations are spot-on. Science-backed products I can trust."' },
      { initials: 'MJ', name: 'Michael Johnson', location: 'Denver, CO', text: '"Finally, a quiz that understands my performance goals. Excellent results!"' },
      { initials: 'SR', name: 'Sarah Roberts', location: 'Seattle, WA', text: '"Love how thorough the analysis is. Found products I never knew I needed."' }
    ]
  },
  
  // Seção Final CTA
  finalCtaTitle: { 
    pt: 'Pronto para Descobrir os\nProdutos Ideais para Você?',
    es: 'Listo para Descubrir los\nProductos Ideales para Ti?',
    en: 'Ready to Discover the\nPerfect Products for You?'
  },
  finalCtaText: { 
    pt: 'Junte-se a milhares que já descobriram os produtos de saúde perfeitos com nosso quiz inteligente.',
    es: 'Únete a miles que ya descubrieron los productos de salud perfectos con nuestro quiz inteligente.',
    en: 'Join thousands who have already discovered perfect health products with our smart quiz.'
  },
  finalCtaButton: { pt: 'Descobrir Meus Produtos Agora', es: 'Descubrir Mis Productos Ahora', en: 'Discover My Products Now' },
  finalBenefits: { 
    pt: '✅ 100% Gratuito • ⚡ 2-3 Minutos • 🔒 Dados Seguros',
    es: '✅ 100% Gratis • ⚡ 2-3 Minutos • 🔒 Datos Seguros',
    en: '✅ 100% Free • ⚡ 2-3 Minutes • 🔒 Secure Data'
  },
  
  // Estatísticas
  stats: {
    pt: [
      { number: '15.000', label: 'Pessoas Atendidas' },
      { number: '4.9/5', label: 'Avaliação Média' },
      { number: '$12M+', label: 'Economizado pelos Usuários' },
      { number: '8.500', label: 'Avaliações 5 Estrelas' }
    ],
    es: [
      { number: '18.500', label: 'Latinos Atendidos' },
      { number: '4.8/5', label: 'Calificación Promedio' },
      { number: '$15M+', label: 'Ahorrado por Usuarios' },
      { number: '9.200', label: 'Reseñas 5 Estrellas' }
    ],
    en: [
      { number: '25.000', label: 'Americans Served' },
      { number: '4.9/5', label: 'Average Rating' },
      { number: '$20M+', label: 'Saved by Users' },
      { number: '12.800', label: '5-Star Reviews' }
    ]
  },
  
  // Footer
  footerTagline: { pt: 'Seu portal personalizado para wellness', es: 'Tu portal personalizado para bienestar', en: 'Your personalized wellness portal' },
  footerCopyright: { 
    pt: '© 2025 Portal Solutions LLC. Todos os direitos reservados.',
    es: '© 2025 Portal Solutions LLC. Todos los derechos reservados.',
    en: '© 2025 Portal Solutions LLC. All rights reserved.'
  }
}

export default function HomePage() {
  const [language, setLanguage] = useState<Language>('en')
  const t = (key: keyof typeof content): string => {
    const value = content[key]?.[language] || content[key]?.en || key
    return typeof value === 'string' ? value : String(value)
  }

  return (
    <>
      <style jsx global>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) scale(1); 
          }
          50% { 
            transform: translateY(-20px) scale(1.1); 
          }
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #22c55e, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: #22c55e !important;
        }
        
        .stat-number {
          background: linear-gradient(135deg, #22c55e, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: #22c55e !important;
        }
        
        .footer-brand {
          background: linear-gradient(135deg, #22c55e, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: #22c55e !important;
        }
      `}</style>

      <main style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Header Unificado */}
        <Header language={language} onLanguageChange={setLanguage} />

        {/* Hero Section - ULTRA-COMPACTO */}
        <section style={{
          background: 'linear-gradient(135deg, #f0fdf4 0%, #eff6ff 50%, #f0f9ff 100%)',
          padding: '0.5rem 0',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Animated Blobs Compactos */}
          <div style={{
            position: 'absolute',
            top: '5%',
            left: '5%',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #22c55e, #3b82f6)',
            filter: 'blur(25px)',
            opacity: 0.2,
            animation: 'float 8s ease-in-out infinite',
            zIndex: 1
          }}></div>
          <div style={{
            position: 'absolute',
            top: '10%',
            right: '10%',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
            filter: 'blur(25px)',
            opacity: 0.2,
            animation: 'float 8s ease-in-out infinite 2s',
            zIndex: 1
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '10%',
            left: '20%',
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #06b6d4, #22c55e)',
            filter: 'blur(25px)',
            opacity: 0.2,
            animation: 'float 8s ease-in-out infinite 4s',
            zIndex: 1
          }}></div>

          <div style={{
            maxWidth: '1200px',
            width: '100%',
            margin: '0 auto',
            padding: '0 2rem',
            position: 'relative',
            zIndex: 10,
            textAlign: 'center'
          }}>
            {/* Trust Badge Compacto */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '40px',
              padding: '0.4rem 1rem',
              marginBottom: '0.5rem',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
              fontWeight: 600,
              color: '#1f2937',
              gap: '0.4rem',
              fontSize: '0.7rem'
            }}>
              <span>🛡️</span>
              <span>{t('trustText')}</span>
              <span>⭐⭐⭐⭐⭐</span>
            </div>

            {/* Main Title Compacto - REMOVIDO */}
            {/* <div style={{ marginBottom: '1rem' }}>
              <h1 style={{
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                color: '#1f2937',
                marginBottom: '0'
              }}>
                <div className="gradient-text" style={{
                  display: 'inline-block',
                  marginBottom: '0.5rem'
                }}>{t('headline1')}</div>
                <div style={{ marginBottom: '0.5rem' }}>{t('headline2')}</div>
                <div className="gradient-text" style={{
                  display: 'inline-block'
                }}>{t('headline3')}</div>
              </h1>
            </div> */}

            {/* TRÊS TÓPICOS GIGANTES E CHAMATIVOS */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1rem',
              maxWidth: '1000px',
              margin: '0 auto 1rem'
            }}>
              {/* 1. ANÁLISE IA - VERDE SUAVE */}
              <Link href="/assessment" style={{ textDecoration: 'none' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  borderRadius: '25px',
                  padding: '1.5rem 1.5rem',
                  textAlign: 'center',
                  color: 'white',
                  boxShadow: '0 20px 40px rgba(16, 185, 129, 0.25)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  border: '3px solid rgba(255, 255, 255, 0.2)',
                  position: 'relative',
                  overflow: 'hidden'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)'
                  e.currentTarget.style.boxShadow = '0 30px 60px rgba(16, 185, 129, 0.35)'
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)'
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(16, 185, 129, 0.25)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.5rem'
                  }}>
                    <div style={{
                      fontSize: '2rem',
                      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
                    }}>🧠</div>
                    <h2 style={{
                      fontSize: '1.4rem',
                      fontWeight: 900,
                      marginBottom: '0',
                      textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}>Health Assessment</h2>
                  </div>
                  <p style={{
                    fontSize: '1rem',
                    opacity: 0.95,
                    lineHeight: 1.5,
                    marginBottom: '1.5rem'
                  }}>
                    Simple questions that guide your wellness. Free and personalized.
                  </p>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '20px',
                    padding: '0.8rem 1.5rem',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    backdropFilter: 'blur(10px)'
                  }}>
                    🚀 START NOW
                  </div>
                </div>
              </Link>

              {/* 2. PRODUTOS - AZUL SUAVE */}
              <Link href="/produtos" style={{ textDecoration: 'none' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #2563eb, #1e40af)',
                  borderRadius: '25px',
                  padding: '1.5rem 1.5rem',
                  textAlign: 'center',
                  color: 'white',
                  boxShadow: '0 20px 40px rgba(37, 99, 235, 0.25)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  border: '3px solid rgba(255, 255, 255, 0.2)',
                  position: 'relative',
                  overflow: 'hidden'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)'
                  e.currentTarget.style.boxShadow = '0 30px 60px rgba(37, 99, 235, 0.35)'
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)'
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(37, 99, 235, 0.25)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.5rem'
                  }}>
                    <div style={{
                      fontSize: '2rem',
                      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
                    }}>🛍️</div>
                    <h2 style={{
                      fontSize: '1.4rem',
                      fontWeight: 900,
                      marginBottom: '0',
                      textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}>Smart Amazon Search</h2>
                  </div>
                  <p style={{
                    fontSize: '1rem',
                    opacity: 0.95,
                    lineHeight: 1.5,
                    marginBottom: '1.5rem'
                  }}>
                    Your best choices - quality and price. Without spending anything for it.
                  </p>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '20px',
                    padding: '0.8rem 1.5rem',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    backdropFilter: 'blur(10px)'
                  }}>
                    🔍 VIEW PRODUCTS
                  </div>
                </div>
              </Link>

              {/* 3. AVALIAÇÃO - ROXO SUAVE */}
              <Link href="/plan" style={{ textDecoration: 'none' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                  borderRadius: '25px',
                  padding: '1.5rem 1.5rem',
                  textAlign: 'center',
                  color: 'white',
                  boxShadow: '0 20px 40px rgba(124, 58, 237, 0.25)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  border: '3px solid rgba(255, 255, 255, 0.2)',
                  position: 'relative',
                  overflow: 'hidden'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)'
                  e.currentTarget.style.boxShadow = '0 30px 60px rgba(124, 58, 237, 0.35)'
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)'
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(124, 58, 237, 0.25)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.5rem'
                  }}>
                    <div style={{
                      fontSize: '2rem',
                      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
                    }}>📋</div>
                    <h2 style={{
                      fontSize: '1.4rem',
                      fontWeight: 900,
                      marginBottom: '0',
                      textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}>30-Day Wellness Plan</h2>
                  </div>
                  <p style={{
                    fontSize: '1rem',
                    opacity: 0.95,
                    lineHeight: 1.5,
                    marginBottom: '1.5rem'
                  }}>
                    AI-generated 30-day nutrition plan. Personalized and scientific.
                  </p>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '20px',
                    padding: '0.8rem 1.5rem',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    backdropFilter: 'blur(10px)'
                  }}>
                    📋 VIEW PLAN
                  </div>
                </div>
              </Link>
            </div>

            {/* Descrição Pequena */}
            <p style={{
              color: '#6b7280',
              fontSize: '0.9rem',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              {/* smallText content removed as per new_code */}
            </p>
          </div>
        </section>


        {/* Testimonials */}
        <section style={{ background: '#f9fafb', padding: '5rem 0' }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 2rem',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: 900,
              marginBottom: '3rem',
              color: '#1f2937'
            }}>
              What our <span className="gradient-text">users</span> say
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
              marginBottom: '3rem'
            }}>
              {/* Depoimentos dos usuários */}
              <div style={{
                background: 'white',
                borderRadius: '15px',
                padding: '2rem',
                boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <p style={{
                  fontSize: '1rem',
                  color: '#4b5563',
                  lineHeight: 1.6,
                  marginBottom: '1rem'
                }}>
                  "Incrível! Encontrei exatamente os suplementos que precisava. A IA acertou em cheio minhas necessidades."
                </p>
                <p style={{
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: '#1f2937'
                }}>
                  Maria Rodriguez
                </p>
                <p style={{
                  fontSize: '0.8rem',
                  color: '#6b7280'
                }}>
                  Orlando, FL
                </p>
              </div>
            </div>

            {/* Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1.5rem',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              {/* Estatísticas */}
              <div style={{
                textAlign: 'center',
                padding: '1.5rem 1rem',
                borderRadius: '15px',
                background: '#f0fdf4',
                border: '1px solid #e0f2e9'
              }}>
                <p style={{
                  fontSize: '2.5rem',
                  fontWeight: 900,
                  color: '#22c55e',
                  marginBottom: '0.5rem'
                }}>
                  2.847
                </p>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#6b7280'
                }}>
                  Americans Served
                </p>
              </div>
              
              <div style={{
                textAlign: 'center',
                padding: '1.5rem 1rem',
                borderRadius: '15px',
                background: '#f0fdf4',
                border: '1px solid #e0f2e9'
              }}>
                <p style={{
                  fontSize: '2.5rem',
                  fontWeight: 900,
                  color: '#22c55e',
                  marginBottom: '0.5rem'
                }}>
                  4.9/5
                </p>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#6b7280'
                }}>
                  Average Rating
                </p>
              </div>
              
              <div style={{
                textAlign: 'center',
                padding: '1.5rem 1rem',
                borderRadius: '15px',
                background: '#f0fdf4',
                border: '1px solid #e0f2e9'
              }}>
                <p style={{
                  fontSize: '2.5rem',
                  fontWeight: 900,
                  color: '#22c55e',
                  marginBottom: '0.5rem'
                }}>
                  $2M+
                </p>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#6b7280'
                }}>
                  Saved by Users
                </p>
              </div>
              
              <div style={{
                textAlign: 'center',
                padding: '1.5rem 1rem',
                borderRadius: '15px',
                background: '#f0fdf4',
                border: '1px solid #e0f2e9'
              }}>
                <p style={{
                  fontSize: '2.5rem',
                  fontWeight: 900,
                  color: '#22c55e',
                  marginBottom: '0.5rem'
                }}>
                  1.243
                </p>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#6b7280'
                }}>
                  5-Star Reviews
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Como Funciona a Análise IA */}
        <section style={{
          background: 'linear-gradient(135deg, #f0fdf4, #ecfdf5)',
          color: '#1f2937',
          padding: '3rem 0',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '0 2rem'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 4vw, 2rem)',
              fontWeight: 900,
              marginBottom: '1rem',
              lineHeight: 1.2
            }}>
              🧠 How Our AI Analysis Works
            </h2>
            <p style={{
              fontSize: '1.1rem',
              marginBottom: '2rem',
              opacity: 0.95,
              lineHeight: 1.5
            }}>
              Our artificial intelligence asks strategic questions to understand your specific needs. 
              In just a few minutes, you receive personalized recommendations based on your routine, goals, and unique profile.
            </p>
            
            <div style={{ marginBottom: '1rem' }}>
              <Link href="/assessment" style={{ textDecoration: 'none' }}>
                <button style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: 700,
                  padding: '1rem 2rem',
                  border: 'none',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 25px rgba(34, 197, 94, 0.3)'
                }}>
                  <span>🚀</span>
                  Start AI Analysis
                </button>
              </Link>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '2rem',
              flexWrap: 'wrap',
              marginTop: '1.5rem'
            }}>
              <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>✅ 100% Free</span>
              <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>⚡ 2-3 Minutes</span>
              <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>🔒 Secure Data</span>
            </div>
          </div>
        </section>

        {/* Como Funciona os Produtos */}
        <section style={{
          background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
          color: '#1f2937',
          padding: '3rem 0',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '0 2rem'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 4vw, 2rem)',
              fontWeight: 900,
              marginBottom: '1rem',
              lineHeight: 1.2
            }}>
              🛍️ How Our Smart Product Selection Works
            </h2>
            <p style={{
              fontSize: '1.1rem',
              marginBottom: '1rem',
              opacity: 0.95,
              lineHeight: 1.5
            }}>
              You can do a smart search directly on Amazon or choose pre-selected products in our categories. 
              We always follow our philosophy:
            </p>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '2rem',
              padding: '1rem',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '15px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1rem',
                fontWeight: 600
              }}>
                <span style={{ fontSize: '1.2rem' }}>🥇</span>
                <span><strong>1st Quality</strong></span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1rem',
                fontWeight: 600
              }}>
                <span style={{ fontSize: '1.2rem' }}>🏆</span>
                <span><strong>2nd Brand Credibility</strong></span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1rem',
                fontWeight: 600
              }}>
                <span style={{ fontSize: '1.2rem' }}>💰</span>
                <span><strong>3rd Best Price</strong></span>
              </div>
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <Link href="/produtos" style={{ textDecoration: 'none' }}>
                <button style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: 700,
                  padding: '1rem 2rem',
                  border: 'none',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)'
                }}>
                  <span>🔍</span>
                  View Selected Products
                </button>
              </Link>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '2rem',
              flexWrap: 'wrap',
              marginTop: '1.5rem'
            }}>
              <span style={{ fontSize: '0.9rem', opacity: 0.9 }}>🛒 Sem Custo Adicional</span>
              <span style={{ fontSize: '0.9rem', opacity: 0.9 }}>🎯 Orientação Especializada</span>
              <span style={{ fontSize: '0.9rem', opacity: 0.9 }}>⭐ Produtos Curados</span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{
          background: '#1f2937',
          color: 'white',
          padding: '2.5rem 0',
          textAlign: 'center'
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
              {t('footerCopyright')}
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
