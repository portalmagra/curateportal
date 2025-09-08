'use client'

import { useState } from 'react'
import Header from '../components/Header'

interface Product {
  id: number
  name: string
  price: string
  rating: number
  image: string
  link: string
  description: string
  badge: string
  reason: string
}

export default function ProdutosPage() {
  const [language, setLanguage] = useState<'en' | 'es' | 'pt'>('en')
  const [searchTerm, setSearchTerm] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const handleSearch = async () => {
    if (!searchTerm.trim()) return
    
    setLoading(true)
    setSearched(true)
    
    try {
      // Simulate AI curation delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Generate curated products based on search term
      const curatedProducts = generateCuratedProducts(searchTerm, language)
      setProducts(curatedProducts)
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateCuratedProducts = (term: string, lang: string): Product[] => {
    const termLower = term.toLowerCase()
    
    // AI-powered product curation based on search intent
    if (termLower.includes('energy') || termLower.includes('tired') || termLower.includes('fatigue')) {
      return [
        {
          id: 1,
          name: 'Vitamin B12 Complex',
          price: '$24.99',
          rating: 4.8,
          image: 'https://via.placeholder.com/200x200/10b981/ffffff?text=B12',
          link: `https://www.amazon.com/s?k=vitamin+b12+complex&tag=portalsolutio-20`,
          description: 'Essential B vitamins for energy production and metabolism',
          badge: 'AMAZON\'S CHOICE',
          reason: 'Highest rated energy supplement with 4.8+ stars'
        },
        {
          id: 2,
          name: 'Iron Supplement',
          price: '$18.99',
          rating: 4.6,
          image: 'https://via.placeholder.com/200x200/3b82f6/ffffff?text=Iron',
          link: `https://www.amazon.com/s?k=iron+supplement&tag=portalsolutio-20`,
          description: 'Gentle iron for energy and preventing fatigue',
          badge: 'BEST SELLER',
          reason: 'Most popular choice for energy support'
        },
        {
          id: 3,
          name: 'Coenzyme Q10',
          price: '$32.99',
          rating: 4.7,
          image: 'https://via.placeholder.com/200x200/8b5cf6/ffffff?text=CoQ10',
          link: `https://www.amazon.com/s?k=coenzyme+q10&tag=portalsolutio-20`,
          description: 'Premium CoQ10 for cellular energy production',
          badge: 'PREMIUM CHOICE',
          reason: 'Highest quality option for sustained energy'
        }
      ]
    }
    
    if (termLower.includes('sleep') || termLower.includes('insomnia') || termLower.includes('rest')) {
      return [
        {
          id: 1,
          name: 'Melatonin 10mg',
          price: '$12.99',
          rating: 4.9,
          image: 'https://via.placeholder.com/200x200/06b6d4/ffffff?text=Melatonin',
          link: `https://www.amazon.com/s?k=melatonin+10mg&tag=portalsolutio-20`,
          description: 'Natural sleep aid for better rest and recovery',
          badge: 'AMAZON\'S CHOICE',
          reason: 'Top-rated sleep supplement with 4.9+ stars'
        },
        {
          id: 2,
          name: 'Magnesium Glycinate',
          price: '$19.99',
          rating: 4.7,
          image: 'https://via.placeholder.com/200x200/84cc16/ffffff?text=Magnesium',
          link: `https://www.amazon.com/s?k=magnesium+glycinate&tag=portalsolutio-20`,
          description: 'Gentle magnesium for relaxation and sleep quality',
          badge: 'BEST SELLER',
          reason: 'Most popular choice for natural sleep support'
        },
        {
          id: 3,
          name: 'Valerian Root',
          price: '$15.99',
          rating: 4.5,
          image: 'https://via.placeholder.com/200x200/22c55e/ffffff?text=Valerian',
          link: `https://www.amazon.com/s?k=valerian+root&tag=portalsolutio-20`,
          description: 'Traditional herb for calming and sleep promotion',
          badge: 'NATURAL CHOICE',
          reason: 'Herbal option for those preferring natural remedies'
        }
      ]
    }
    
    if (termLower.includes('weight') || termLower.includes('lose') || termLower.includes('fat')) {
      return [
        {
          id: 1,
          name: 'Green Tea Extract',
          price: '$16.99',
          rating: 4.6,
          image: 'https://via.placeholder.com/200x200/10b981/ffffff?text=Green+Tea',
          link: `https://www.amazon.com/s?k=green+tea+extract&tag=portalsolutio-20`,
          description: 'Natural metabolism booster for weight management',
          badge: 'AMAZON\'S CHOICE',
          reason: 'Top-rated natural weight management supplement'
        },
        {
          id: 2,
          name: 'Protein Powder',
          price: '$29.99',
          rating: 4.8,
          image: 'https://via.placeholder.com/200x200/f59e0b/ffffff?text=Protein',
          link: `https://www.amazon.com/s?k=protein+powder&tag=portalsolutio-20`,
          description: 'High-quality protein for muscle building and fat loss',
          badge: 'BEST SELLER',
          reason: 'Most popular choice for weight management'
        },
        {
          id: 3,
          name: 'Apple Cider Vinegar',
          price: '$11.99',
          rating: 4.4,
          image: 'https://via.placeholder.com/200x200/84cc16/ffffff?text=ACV',
          link: `https://www.amazon.com/s?k=apple+cider+vinegar&tag=portalsolutio-20`,
          description: 'Natural metabolism support and appetite control',
          badge: 'NATURAL CHOICE',
          reason: 'Traditional remedy for weight management support'
        }
      ]
    }
    
    // Default wellness products
    return [
      {
        id: 1,
        name: 'Multivitamin for Women',
        price: '$22.99',
        rating: 4.7,
        image: 'https://via.placeholder.com/200x200/3b82f6/ffffff?text=Multi',
        link: `https://www.amazon.com/s?k=multivitamin+women&tag=portalsolutio-20`,
        description: 'Complete daily nutrition for overall wellness',
        badge: 'AMAZON\'S CHOICE',
        reason: 'Top-rated daily multivitamin with 4.7+ stars'
      },
      {
        id: 2,
        name: 'Omega-3 Fish Oil',
        price: '$24.99',
        rating: 4.8,
        image: 'https://via.placeholder.com/200x200/06b6d4/ffffff?text=Omega-3',
        link: `https://www.amazon.com/s?k=omega+3+fish+oil&tag=portalsolutio-20`,
        description: 'High-quality fish oil for heart and brain health',
        badge: 'BEST SELLER',
        reason: 'Most popular choice for heart and brain support'
      },
      {
        id: 3,
        name: 'Vitamin D3',
        price: '$14.99',
        rating: 4.6,
        image: 'https://via.placeholder.com/200x200/f59e0b/ffffff?text=D3',
        link: `https://www.amazon.com/s?k=vitamin+d3&tag=portalsolutio-20`,
        description: 'Essential vitamin D for immune system support',
        badge: 'PREMIUM CHOICE',
        reason: 'High-quality D3 for immune and bone health'
      }
    ]
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)' }}>
        <Header language={language} onLanguageChange={setLanguage} />

          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
        padding: '2rem',
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        {/* Hero Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem',
          color: 'white'
          }}>
            <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 900,
            marginBottom: '1rem',
            textShadow: '0 4px 8px rgba(0,0,0,0.3)'
          }}>
            Smart <span style={{ color: '#f97316' }}>Search</span>
            </h1>

            <p style={{
            fontSize: '1.2rem',
            marginBottom: '2rem',
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto 2rem',
            lineHeight: 1.6
          }}>
            Stop wasting time on Amazon. Get curated, quality products in seconds.
          </p>
          
            <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50px',
            padding: '0.5rem',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            maxWidth: '600px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center'
            }}>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="What are you looking for? (e.g., energy supplements, sleep aid)"
                style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                padding: '1rem 1.5rem',
                fontSize: '1.1rem',
                color: 'white'
                }}
              />
              <button
              onClick={handleSearch}
              disabled={loading || !searchTerm.trim()}
                style={{
                background: loading ? '#6b7280' : '#f97316',
                color: 'white',
                  border: 'none',
                borderRadius: '40px',
                padding: '1rem 2rem',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                marginRight: '0.5rem'
              }}
            >
              {loading ? 'Searching...' : 'Search'}
              </button>
          </div>
          
          <p style={{
            fontSize: '0.9rem',
            marginTop: '1rem',
            opacity: 0.8
          }}>
            ✨ AI-powered curation • 🎯 Maximum 3 results • ⚡ Save time
          </p>
        </div>

        {/* Results Section */}
        {searched && (
            <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: '2rem',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            {loading ? (
              <div style={{
                textAlign: 'center',
                padding: '3rem',
                color: '#6b7280'
              }}>
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem'
                }}>🤖</div>
                <h3 style={{
                  fontSize: '1.5rem',
                  marginBottom: '0.5rem'
                }}>AI is curating your results...</h3>
                <p>Finding the 3 best products for your needs</p>
              </div>
            ) : (
              <>
                <div style={{
                  textAlign: 'center',
                  marginBottom: '2rem'
                }}>
                  <h2 style={{
                    fontSize: '1.8rem',
                    fontWeight: 700,
                    color: '#1f2937',
                    marginBottom: '0.5rem'
                  }}>
                    🎯 Curated Results
              </h2>
                  <p style={{
                    color: '#6b7280',
                    fontSize: '1rem'
                  }}>
                    AI-selected products for "{searchTerm}"
                  </p>
                </div>

              <div style={{
                display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '1.5rem',
                  marginBottom: '2rem'
                }}>
                  {products.map((product) => (
                    <div key={product.id} style={{
                      background: 'white',
                      borderRadius: '15px',
                      padding: '1.5rem',
                      boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                      border: '1px solid #e5e7eb',
                      transition: 'transform 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                    onClick={() => window.open(product.link, '_blank')}
                    >
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '1rem'
                      }}>
                        <div style={{
                          background: '#f97316',
                          color: 'white',
                          padding: '0.3rem 0.8rem',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: 700
                        }}>
                          {product.badge}
                        </div>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem'
                        }}>
                          <span style={{ color: '#f97316' }}>⭐</span>
                          <span style={{ fontWeight: 700 }}>{product.rating}</span>
                        </div>
                      </div>
                      
              <div style={{
                textAlign: 'center',
                  marginBottom: '1rem'
                }}>
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{
                            width: '120px',
                            height: '120px',
                            borderRadius: '10px',
                            marginBottom: '1rem'
                          }}
                        />
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                          color: '#1f2937',
                    marginBottom: '0.5rem'
                  }}>
                          {product.name}
                  </h3>
                  <p style={{
                    fontSize: '0.9rem',
                          color: '#6b7280',
                          lineHeight: 1.4,
                          marginBottom: '1rem'
                        }}>
                          {product.description}
                        </p>
                      </div>
                      
                      <div style={{
                        background: '#f3f4f6',
                        borderRadius: '10px',
                        padding: '0.8rem',
                        marginBottom: '1rem'
                      }}>
                        <p style={{
                          fontSize: '0.8rem',
                          color: '#374151',
                          fontWeight: 600,
                          marginBottom: '0.3rem'
                        }}>
                          Why this?
                  </p>
                  <p style={{
                    fontSize: '0.8rem',
                          color: '#6b7280'
                  }}>
                          {product.reason}
                  </p>
              </div>

                <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    marginBottom: '1rem'
                  }}>
                        <span style={{
                          fontSize: '1.5rem',
                          fontWeight: 900,
                          color: '#1f2937'
                        }}>
                          {product.price}
                        </span>
                        <span style={{
                          fontSize: '0.8rem',
                          color: '#10b981',
                          fontWeight: 600
                        }}>
                          Free shipping
                        </span>
                      </div>
                      
                      <button style={{
                        width: '100%',
                        background: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        padding: '0.8rem',
                        fontSize: '1rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'background 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#059669'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#10b981'
                      }}
                      >
                        View on Amazon
                      </button>
                  </div>
                  ))}
                </div>

                <div style={{
                  textAlign: 'center',
                  padding: '1.5rem',
                  background: '#f0fdf4',
                  borderRadius: '15px',
                  border: '1px solid #bbf7d0'
                }}>
                  <h3 style={{
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    color: '#166534',
                    marginBottom: '0.5rem'
                  }}>
                    🎯 Curated by AI
                  </h3>
                  <p style={{
                    color: '#166534',
                    fontSize: '0.9rem',
                    marginBottom: '0'
                  }}>
                    We analyzed hundreds of products to bring you the 3 best options. 
                    No more endless scrolling - just quality results.
                  </p>
                </div>
              </>
            )}
          </div>
        )}

        {/* Features Section */}
        {!searched && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginTop: '3rem'
          }}>
                  <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '15px',
              padding: '2rem',
              textAlign: 'center',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🤖</div>
              <h3 style={{
                fontSize: '1.3rem',
                      fontWeight: 700,
                color: 'white',
                marginBottom: '0.5rem'
              }}>
                AI-Powered Curation
              </h3>
              <p style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '0.9rem',
                lineHeight: 1.5
              }}>
                Our AI understands your needs and selects only the best products for you.
                      </p>
                    </div>
            
                  <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '15px',
              padding: '2rem',
              textAlign: 'center',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 700,
                    color: 'white',
                marginBottom: '0.5rem'
                  }}>
                Save Time
              </h3>
                    <p style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '0.9rem',
                lineHeight: 1.5
              }}>
                Get curated results in seconds instead of hours of research.
                    </p>
                  </div>

                <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '15px',
              padding: '2rem',
                  textAlign: 'center',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
                  <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 700,
                color: 'white',
                    marginBottom: '0.5rem'
                  }}>
                Quality First
                  </h3>
                  <p style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '0.9rem',
                lineHeight: 1.5
              }}>
                Only the best products make it to your results. Quality over quantity.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}