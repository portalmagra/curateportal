// CLAUDE: Layout principal - versão mais completa com CSS
import './globals.css'

export const metadata = {
  title: 'CuratePortal - AI-Powered Health Product Curation',
  description: 'Discover personalized Amazon products for your health and wellness needs. Free AI analysis, curated products, and 30-day nutrition plans.',
  keywords: 'wellness, health, supplements, Amazon, AI, personalized analysis, nutrition, fitness',
  
  // Open Graph / Facebook / WhatsApp
  openGraph: {
    title: 'CuratePortal - AI-Powered Health Product Curation',
    description: 'Discover personalized Amazon products for your health and wellness needs. Free AI analysis, curated products, and 30-day nutrition plans.',
    url: 'https://curateportal.com',
    siteName: 'CuratePortal',
    images: [
      {
        url: 'https://curateportal.com/images/og/curateportal-og.jpg',
        width: 1200,
        height: 630,
        alt: 'CuratePortal - AI-Powered Health Product Curation',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  
  // Twitter Cards
  twitter: {
    card: 'summary_large_image',
    title: 'CuratePortal - AI-Powered Health Product Curation',
    description: 'Discover personalized Amazon products for your health and wellness needs.',
    images: ['https://curateportal.com/images/og/curateportal-og.jpg'],
    creator: '@curateportal',
    site: '@curateportal',
  },
  
  // Meta tags adicionais para WhatsApp
  other: {
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:type': 'image/jpeg',
    'og:image:alt': 'CuratePortal - AI-Powered Health Product Curation',
    
    // WhatsApp específico
    'og:image:secure_url': 'https://curateportal.com/images/og/curateportal-og.jpg',
    
    // Informações da empresa
    'og:site_name': 'CuratePortal',
    'og:locale': 'en_US',
    'og:type': 'website',
    
    // Informações de contato
    'og:phone_number': '+1 7862535032',
    'og:country_name': 'United States',
    
    // SEO adicional
    'robots': 'index, follow',
    'author': 'CuratePortal',
    'copyright': '© 2025 CuratePortal LLC. All rights reserved.',
  },
  
  // Manifest para PWA
  manifest: '/manifest.json',
  
  // Ícones
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
    apple: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
  
  // Viewport e configurações mobile
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  
  // Cores do tema
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#22c55e' },
    { media: '(prefers-color-scheme: dark)', color: '#16a34a' },
  ],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#3b82f6',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="CuratePortal" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
