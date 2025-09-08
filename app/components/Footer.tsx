import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Navigation',
      links: [
        { name: '🏠 Home', href: '/' },
        { name: '🧠 Health Assessment', href: '/assessment' },
        { name: '🛍️ Smart Search', href: '/produtos' },
        { name: '📋 30-Day Plan', href: '/plan' },
      ]
    },
    {
      title: 'Wellness Categories',
      links: [
        { name: '⚡ Energy & Focus', href: '/produtos/energia' },
        { name: '🌙 Sleep Quality', href: '/produtos/sono' },
        { name: '🛡️ Immune Support', href: '/produtos/imunidade' },
        { name: '⚖️ Hormonal Balance', href: '/produtos/hormonal' },
        { name: '🔥 Weight Management', href: '/produtos/emagrecimento' },
        { name: '💝 Sexual Wellness', href: '/produtos/afrodisiaco' },
      ]
    },
    {
      title: 'Support',
      links: [
        { name: '❓ FAQ', href: '/faq' },
        { name: '📧 Contact', href: '/contact' },
        { name: '🔒 Privacy Policy', href: '/privacy' },
        { name: '📋 Terms of Service', href: '/terms' },
      ]
    }
  ]

  return (
    <footer style={{
      background: '#111827',
      color: 'white',
      padding: '3rem 0'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        {/* Main Footer Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                marginBottom: '1rem',
                color: '#f9fafb'
              }}>
                {section.title}
              </h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex} style={{ marginBottom: '0.5rem' }}>
                    <Link href={link.href} style={{
                      color: '#d1d5db',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'color 0.2s ease'
                    }}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Brand Section */}
        <div style={{
          borderTop: '1px solid #374151',
          paddingTop: '2rem',
          textAlign: 'center'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            marginBottom: '1rem'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'white'
            }}>
              C
            </div>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              margin: 0,
              color: '#f9fafb'
            }}>
              CuratePortal
            </h2>
          </div>
          
          <p style={{
            color: '#9ca3af',
            fontSize: '0.9rem',
            marginBottom: '1rem',
            maxWidth: '600px',
            margin: '0 auto 1rem'
          }}>
            Your personalized wellness portal. AI-powered health assessments, curated Amazon products, and 30-day nutrition plans designed for Americans.
          </p>

          {/* Social Links */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            <a href="#" style={{
              color: '#9ca3af',
              fontSize: '1.5rem',
              textDecoration: 'none',
              transition: 'color 0.2s ease'
            }}>
              📧
            </a>
            <a href="#" style={{
              color: '#9ca3af',
              fontSize: '1.5rem',
              textDecoration: 'none',
              transition: 'color 0.2s ease'
            }}>
              📱
            </a>
            <a href="#" style={{
              color: '#9ca3af',
              fontSize: '1.5rem',
              textDecoration: 'none',
              transition: 'color 0.2s ease'
            }}>
              💬
            </a>
          </div>

          {/* Copyright */}
          <p style={{
            color: '#6b7280',
            fontSize: '0.8rem',
            margin: 0
          }}>
            © {currentYear} CuratePortal LLC. All rights reserved. Made for Americans, by Americans.
          </p>
        </div>
      </div>
    </footer>
  )
}