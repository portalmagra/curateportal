'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type Language = 'en' | 'es' | 'pt'

interface HeaderProps {
  language?: Language
  onLanguageChange?: (lang: Language) => void
}

export default function Header({ language = 'en', onLanguageChange }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()

  // Detectar se é mobile
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleLanguageChange = (lang: Language) => {
    if (onLanguageChange) {
      onLanguageChange(lang)
    }
  }

  const isActivePage = (path: string) => pathname === path

  return (
    <header style={{
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      padding: isMobile ? '0.5rem 0' : '1rem 0',
      borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: isMobile ? '0 1rem' : '0 2rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: isMobile ? '1rem' : '2rem'
        }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: isMobile ? '0.6rem' : '0.8rem',
              flexShrink: 0,
              cursor: 'pointer'
            }}>
              <div style={{
                width: isMobile ? '36px' : '40px',
                height: isMobile ? '36px' : '40px',
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 900,
                fontSize: isMobile ? '1.1rem' : '1.2rem'
              }}>
                C
              </div>
              <span style={{
                fontSize: isMobile ? '1.3rem' : '1.5rem',
                fontWeight: 900,
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                CuratePortal
              </span>
            </div>
          </Link>

          {/* Navegação Principal - Desktop */}
          {!isMobile && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: isMobile ? '1rem' : '1.5rem'
            }}>
              <Link href="/assessment" style={{ textDecoration: 'none' }}>
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: isMobile ? '0.4rem' : '0.5rem',
                  padding: isMobile ? '0.5rem 1rem' : '0.6rem 1.2rem',
                  background: isActivePage('/assessment') ? 'linear-gradient(135deg, #f97316, #ea580c)' : 'transparent',
                  color: isActivePage('/assessment') ? 'white' : '#6b7280',
                  border: isActivePage('/assessment') ? 'none' : '1px solid #e5e7eb',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: isMobile ? '0.8rem' : '0.9rem',
                  fontWeight: isActivePage('/assessment') ? 600 : 500,
                  transition: 'all 0.3s ease'
                }}>
                  <span>🧠</span>
                  <span>Health Assessment</span>
                </button>
              </Link>

              <Link href="/amazon" style={{ textDecoration: 'none' }}>
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: isMobile ? '0.4rem' : '0.5rem',
                  padding: isMobile ? '0.5rem 1rem' : '0.6rem 1.2rem',
                  background: isActivePage('/amazon') ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)' : 'transparent',
                  color: isActivePage('/amazon') ? 'white' : '#6b7280',
                  border: isActivePage('/amazon') ? 'none' : '1px solid #e5e7eb',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: isMobile ? '0.8rem' : '0.9rem',
                  fontWeight: isActivePage('/amazon') ? 600 : 500,
                  transition: 'all 0.3s ease'
                }}>
                  <span>🛍️</span>
                  <span>Smart Search</span>
                </button>
              </Link>

              <Link href="/plan" style={{ textDecoration: 'none' }}>
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: isMobile ? '0.4rem' : '0.5rem',
                  padding: isMobile ? '0.5rem 1rem' : '0.6rem 1.2rem',
                  background: isActivePage('/plan') ? 'linear-gradient(135deg, #3b82f6, #1e40af)' : 'transparent',
                  color: isActivePage('/plan') ? 'white' : '#6b7280',
                  border: isActivePage('/plan') ? 'none' : '1px solid #e5e7eb',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: isMobile ? '0.8rem' : '0.9rem',
                  fontWeight: isActivePage('/plan') ? 600 : 500,
                  transition: 'all 0.3s ease'
                }}>
                  <span>📋</span>
                  <span>30-Day Plan</span>
                </button>
              </Link>
            </div>
          )}

          {/* Idioma - Desktop */}
          {!isMobile && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: isMobile ? '0.6rem' : '0.8rem'
            }}>
              <span style={{ color: '#6b7280', fontSize: isMobile ? '0.8rem' : '0.9rem', fontWeight: 500 }}>Idioma:</span>
              <div style={{ display: 'flex', gap: isMobile ? '0.2rem' : '0.3rem' }}>
                {[
                  { code: 'en' as const, flag: '🇺🇸', label: 'EN', href: '/assessment' },
                  { code: 'es' as const, flag: '🇪🇸', label: 'ES', href: '/assessment' },
                  { code: 'pt' as const, flag: '🇧🇷', label: 'PT', href: '/assessment' }
                ].map(lang => (
                  <Link key={lang.code} href={lang.href} style={{ textDecoration: 'none' }}>
                    <button
                      onClick={() => handleLanguageChange(lang.code)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: isMobile ? '0.2rem' : '0.3rem',
                        padding: isMobile ? '0.3rem 0.6rem' : '0.4rem 0.8rem',
                        background: language === lang.code ? 'linear-gradient(135deg, #3b82f6, #1e40af)' : 'transparent',
                        color: language === lang.code ? 'white' : '#6b7280',
                        border: language === lang.code ? 'none' : '1px solid #e5e7eb',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontSize: isMobile ? '0.7rem' : '0.8rem',
                        fontWeight: language === lang.code ? 600 : 400,
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Hamburger Menu Mobile */}
          {isMobile && (
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem'
              }}
            >
              <div style={{
                width: '20px',
                height: '2px',
                background: '#6b7280',
                transition: 'all 0.3s ease'
              }}></div>
              <div style={{
                width: '20px',
                height: '2px',
                background: '#6b7280',
                transition: 'all 0.3s ease'
              }}></div>
              <div style={{
                width: '20px',
                height: '2px',
                background: '#6b7280',
                transition: 'all 0.3s ease'
              }}></div>
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobile && isMobileMenuOpen && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            padding: '1rem 0',
            borderTop: '1px solid #e5e7eb',
            marginTop: '1rem'
          }}>
            {/* Navegação Mobile */}
            <Link href="/analise" style={{ textDecoration: 'none' }}>
              <button style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.8rem',
                background: isActivePage('/analise') ? 'linear-gradient(135deg, #f97316, #ea580c)' : 'transparent',
                color: isActivePage('/analise') ? 'white' : '#6b7280',
                border: isActivePage('/analise') ? 'none' : '1px solid #e5e7eb',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: isActivePage('/analise') ? 600 : 500
              }}>
                <span>🧠</span>
                <span>AI Analysis</span>
              </button>
            </Link>

            <Link href="/amazon" style={{ textDecoration: 'none' }}>
              <button style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.8rem',
                background: isActivePage('/amazon') ? 'linear-gradient(135deg, #3b82f6, #1e40af)' : 'transparent',
                color: isActivePage('/amazon') ? 'white' : '#6b7280',
                border: isActivePage('/amazon') ? 'none' : '1px solid #e5e7eb',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: isActivePage('/amazon') ? 600 : 500
              }}>
                <span>🛍️</span>
                <span>Products</span>
              </button>
            </Link>

            <Link href="/avaliacao" style={{ textDecoration: 'none' }}>
              <button style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.8rem',
                background: isActivePage('/avaliacao') ? 'linear-gradient(135deg, #3b82f6, #1e40af)' : 'transparent',
                color: isActivePage('/avaliacao') ? 'white' : '#6b7280',
                border: isActivePage('/avaliacao') ? 'none' : '1px solid #e5e7eb',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: isActivePage('/avaliacao') ? 600 : 500
              }}>
                <span>🎯</span>
                <span>Assessment</span>
              </button>
            </Link>

            {/* Idioma Mobile */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              padding: '1rem 0',
              borderTop: '1px solid #e5e7eb'
            }}>
              <span style={{ 
                color: '#6b7280', 
                fontSize: '0.9rem', 
                fontWeight: 500,
                textAlign: 'center'
              }}>
                Idioma:
              </span>
              <div style={{ 
                display: 'flex', 
                gap: '0.5rem',
                justifyContent: 'center'
              }}>
                {[
                  { code: 'en' as const, flag: '🇺🇸', label: 'EN', href: '/assessment' },
                  { code: 'es' as const, flag: '🇪🇸', label: 'ES', href: '/assessment' },
                  { code: 'pt' as const, flag: '🇧🇷', label: 'PT', href: '/assessment' }
                ].map(lang => (
                  <Link key={lang.code} href={lang.href} style={{ textDecoration: 'none' }}>
                    <button
                      onClick={() => handleLanguageChange(lang.code)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        padding: '0.6rem 1rem',
                        background: language === lang.code ? 'linear-gradient(135deg, #3b82f6, #1e40af)' : 'transparent',
                        color: language === lang.code ? 'white' : '#6b7280',
                        border: language === lang.code ? 'none' : '1px solid #e5e7eb',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: language === lang.code ? 600 : 400,
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
