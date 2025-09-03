'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function ResultadosPage() {
  const [analysisResults, setAnalysisResults] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()

  useEffect(() => {
    const loadResults = async () => {
      try {
        // Pegar dados da URL
        const answers = searchParams.get('answers')
        const comments = searchParams.get('comments')
        
        if (answers) {
          const parsedAnswers = JSON.parse(decodeURIComponent(answers))
          
          // Chamar API de análise
          const response = await fetch('/api/ai-analysis', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              answers: parsedAnswers,
              comments: comments || ''
            })
          })

          if (response.ok) {
            const results = await response.json()
            console.log('🤖 Resultados da API:', results)
            setAnalysisResults(results)
          }
        }
      } catch (error) {
        console.error('Erro ao carregar resultados:', error)
      } finally {
        setLoading(false)
      }
    }

    loadResults()
  }, [searchParams])

  // Função para buscar produtos na Amazon
  const searchOnAmazon = (searchTerms: string) => {
    const encodedSearch = encodeURIComponent(searchTerms)
    const amazonUrl = `https://www.amazon.com/s?k=${encodedSearch}&tag=portalsolutio-20&rh=n%3A3760901%2Cp_85%3A2470955011%2Cp_72%3A1248879011&s=review-rank`
    window.open(amazonUrl, '_blank')
  }

  // Função para compartilhar
  const shareResults = () => {
    const url = window.location.href
    const text = `Acabei de fazer minha avaliação personalizada no MeuPortalFit! 🎯 Confira os resultados: ${url}`
    
    if (navigator.share) {
      navigator.share({
        title: 'Minha Avaliação Personalizada - MeuPortalFit',
        text: text,
        url: url
      })
    } else {
      // Fallback para copiar link
      navigator.clipboard.writeText(url).then(() => {
        alert('Link copiado para a área de transferência!')
      })
    }
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f0fdf4 0%, #eff6ff 50%, #f0f9ff 100%)'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '2rem'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '4px solid #e5e7eb',
            borderTop: '4px solid #22c55e',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p style={{
            color: '#6b7280',
            fontSize: '1.1rem'
          }}>
            Analisando seus dados...
          </p>
        </div>
      </div>
    )
  }

  return (
    <main style={{ position: 'relative', overflow: 'hidden', background: 'white' }}>
      {/* Header */}
      <header style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '1rem 0',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexShrink: 0 }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #22c55e, #3b82f6)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 900,
                fontSize: '1.2rem'
              }}>
                M
              </div>
              <span style={{
                fontSize: '1.5rem',
                fontWeight: 900,
                background: 'linear-gradient(135deg, #22c55e, #3b82f6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                MeuPortalFit
              </span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <a href="/analise" style={{ textDecoration: 'none' }}>
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.6rem 1.2rem',
                  background: 'transparent',
                  color: '#6b7280',
                  border: '1px solid #e5e7eb',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  transition: 'all 0.3s ease'
                }}>
                  <span>🧠</span>
                  <span>Análise IA</span>
                </button>
              </a>
              <a href="/produtos" style={{ textDecoration: 'none' }}>
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.6rem 1.2rem',
                  background: 'transparent',
                  color: '#6b7280',
                  border: '1px solid #e5e7eb',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  transition: 'all 0.3s ease'
                }}>
                  <span>🛍️</span>
                  <span>Produtos</span>
                </button>
              </a>
              <a href="/suporte" style={{ textDecoration: 'none' }}>
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.6rem 1.2rem',
                  background: 'transparent',
                  color: '#6b7280',
                  border: '1px solid #e5e7eb',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  transition: 'all 0.3s ease'
                }}>
                  <span>💬</span>
                  <span>Suporte</span>
                </button>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Mais Compacto */}
      <section style={{
        background: 'linear-gradient(135deg, #f0fdf4 0%, #eff6ff 50%, #f0f9ff 100%)',
        padding: '1.5rem 0',
        position: 'relative',
        overflow: 'hidden',
        minHeight: 'auto'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem', position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <h1 style={{
            fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: '0.5rem',
            color: '#1f2937',
            whiteSpace: 'pre-line'
          }}>
            <span style={{ background: 'linear-gradient(135deg, #22c55e, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Avaliação Gratuita feita por Inteligência Artificial
            </span>
          </h1>
        </div>
      </section>

      {/* Results Section */}
      <section style={{ background: 'white', padding: '1.5rem 0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
          {analysisResults && (
            <>
              {/* Análise Personalizada */}
              <div style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                marginBottom: '1.5rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                textAlign: 'left'
              }}>
                <h3 style={{
                  fontSize: '1.4rem',
                  color: '#1e293b',
                  marginBottom: '1rem',
                  fontWeight: 'bold'
                }}>
                  🤖 Análise Personalizada
                </h3>
                
                <div style={{
                  fontSize: '1rem',
                  color: '#374151',
                  lineHeight: '1.6',
                  marginBottom: '1rem'
                }}>
                  {analysisResults?.analysis}
                </div>
              </div>

              {/* Produtos Recomendados */}
              {analysisResults?.products && analysisResults.products.length > 0 && (
                <div style={{
                  backgroundColor: 'white',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  marginBottom: '1.5rem',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }}>
                  <h3 style={{
                    fontSize: '1.4rem',
                    color: '#1e293b',
                    marginBottom: '1.5rem',
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}>
                    🛍️ Produtos Recomendados para Você
                  </h3>
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1rem'
                  }}>
                    {analysisResults.products.map((product: any, index: number) => (
                      <div key={index} style={{
                        border: '2px solid #e0f2e9',
                        borderRadius: '12px',
                        padding: '1.2rem',
                        backgroundColor: '#f8fafc',
                        transition: 'all 0.3s ease'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '1rem'
                        }}>
                          <span style={{
                            fontSize: '1.5rem',
                            marginRight: '0.8rem'
                          }}>
                            🛍️
                          </span>
                          <div>
                            <h4 style={{
                              fontSize: '1rem',
                              color: '#1e293b',
                              fontWeight: '600',
                              marginBottom: '0.5rem'
                            }}>
                              {product.name}
                            </h4>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '1rem'
                            }}>
                              <span style={{
                                color: '#059669',
                                fontWeight: '600'
                              }}>
                                {product.price}
                              </span>
                              <span style={{
                                color: '#f59e0b',
                                fontWeight: '500'
                              }}>
                                ⭐ {product.rating}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <p style={{
                          fontSize: '0.9rem',
                          color: '#64748b',
                          lineHeight: '1.5',
                          marginBottom: '1rem'
                        }}>
                          {product.description}
                        </p>
                        
                        <p style={{
                          fontSize: '0.85rem',
                          color: '#059669',
                          marginBottom: '1rem',
                          fontStyle: 'italic',
                          backgroundColor: '#f0fdf4',
                          padding: '0.6rem',
                          borderRadius: '8px',
                          border: '1px solid #bbf7d0'
                        }}>
                          💡 {product.whyPerfect}
                        </p>
                        
                        <button onClick={() => searchOnAmazon(product.searchTerms)} style={{
                          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                          color: 'white',
                          padding: '0.7rem 1.2rem',
                          border: 'none',
                          borderRadius: '25px',
                          fontSize: '0.85rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          width: '100%'
                        }}>
                          🔍 Buscar na Amazon
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Próximos Passos */}
              <div style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                marginBottom: '1.5rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <h3 style={{
                  fontSize: '1.4rem',
                  color: '#1e293b',
                  marginBottom: '1rem',
                  fontWeight: 'bold'
                }}>
                  🚀 Próximos Passos
                </h3>
                
                <div style={{
                  fontSize: '1rem',
                  color: '#374151',
                  lineHeight: '1.6',
                  marginBottom: '1.5rem'
                }}>
                  {analysisResults?.nextSteps}
                </div>

                <div style={{
                  fontSize: '0.9rem',
                  color: '#059669',
                  fontStyle: 'italic',
                  marginBottom: '1.5rem',
                  backgroundColor: '#f0fdf4',
                  padding: '1rem',
                  borderRadius: '12px',
                  border: '2px solid #bbf7d0'
                }}>
                  💝 {analysisResults?.motivationalMessage}
                </div>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.8rem',
                  alignItems: 'center'
                }}>
                  <button onClick={shareResults} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.8rem 1.5rem',
                    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '25px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}>
                    📤 Compartilhar
                  </button>

                  <a href="https://wa.me/17862535032?text=Olá! Acabei de fazer minha avaliação personalizada no MeuPortalFit e gostaria de agendar uma consulta personalizada por $10." target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <button style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.8rem 1.5rem',
                      background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '25px',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}>
                      ✨ Avaliação Personalizada ($10)
                    </button>
                  </a>

                  <a href="/" style={{ textDecoration: 'none' }}>
                    <button style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.8rem 1.5rem',
                      background: 'transparent',
                      color: '#6b7280',
                      border: '1px solid #e5e7eb',
                      borderRadius: '25px',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}>
                      🏠 Voltar ao Início
                    </button>
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#1f2937', color: 'white', padding: '1rem 0', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
          <p style={{ color: '#9ca3af', fontSize: '0.8rem' }}>
            Avaliação personalizada para brasileiros nos EUA
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  )
}
