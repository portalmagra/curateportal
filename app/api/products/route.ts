import { NextRequest, NextResponse } from 'next/server'
import { generateProductsFromAssessment } from '../../../lib/amazon-simple'

export async function POST(request: NextRequest) {
  try {
    const { answers, language } = await request.json()
    
    console.log('🛍️ Generating Amazon products based on assessment:', answers)
    
    // Generate product recommendations based on user responses using simplified approach
    const rawProducts = generateProductsFromAssessment(answers, language)
    const formattedProducts = formatProductsForFrontend(rawProducts, language)
    
    console.log('✅ Generated products:', formattedProducts.length)
    
    return NextResponse.json({
      success: true,
      products: formattedProducts,
      message: 'Products generated successfully from Amazon search URLs'
    })
    
  } catch (error) {
    console.error('Products API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate products' },
      { status: 500 }
    )
  }
}

function formatProductsForFrontend(products: any[], language: string) {
  return products.map((product, index) => ({
    id: index + 1,
    name: product.name,
    price: product.price,
    rating: product.rating,
    image: product.imageUrl || `https://via.placeholder.com/200x200/10b981/ffffff?text=${product.name.split(' ')[0]}`,
    link: product.detailPageURL,
    description: generateProductDescription(product.name, language),
    asin: product.asin,
    isBestSeller: product.isBestSeller,
    isAmazonChoice: product.isAmazonChoice,
    reviewCount: product.reviewCount
  }))
}

function generateProductDescription(productName: string, language: string): string {
  const name = productName.toLowerCase()
  
  if (name.includes('multivitamin')) {
    return language === 'en' ? 'Essential vitamins and minerals for overall health' :
           language === 'es' ? 'Vitaminas y minerales esenciales para la salud general' :
           'Vitaminas e minerais essenciais para a saúde geral'
  }
  
  if (name.includes('omega') || name.includes('fish oil')) {
    return language === 'en' ? 'High-quality fish oil for heart and brain health' :
           language === 'es' ? 'Aceite de pescado de alta calidad para la salud del corazón y cerebro' :
           'Óleo de peixe de alta qualidade para saúde do coração e cérebro'
  }
  
  if (name.includes('melatonin') || name.includes('sleep')) {
    return language === 'en' ? 'Natural sleep aid for better rest and recovery' :
           language === 'es' ? 'Ayuda natural para el sueño para mejor descanso y recuperación' :
           'Auxílio natural para o sono para melhor descanso e recuperação'
  }
  
  if (name.includes('ashwagandha') || name.includes('stress')) {
    return language === 'en' ? 'Adaptogenic herb for stress management and relaxation' :
           language === 'es' ? 'Hierba adaptogénica para el manejo del estrés y relajación' :
           'Erva adaptogênica para gerenciamento de estresse e relaxamento'
  }
  
  if (name.includes('vitamin c') || name.includes('immune')) {
    return language === 'en' ? 'High-potency vitamin C for immune system support' :
           language === 'es' ? 'Vitamina C de alta potencia para el soporte del sistema inmune' :
           'Vitamina C de alta potência para suporte do sistema imune'
  }
  
  if (name.includes('probiotic') || name.includes('digestive')) {
    return language === 'en' ? 'Beneficial bacteria for gut health and digestion' :
           language === 'es' ? 'Bacterias beneficiosas para la salud intestinal y digestión' :
           'Bactérias benéficas para saúde intestinal e digestão'
  }
  
  if (name.includes('b12') || name.includes('energy')) {
    return language === 'en' ? 'Essential B vitamins for energy production' :
           language === 'es' ? 'Vitaminas B esenciales para la producción de energía' :
           'Vitaminas B essenciais para produção de energia'
  }
  
  // Default description
  return language === 'en' ? 'High-quality supplement for your wellness journey' :
         language === 'es' ? 'Suplemento de alta calidad para tu viaje de bienestar' :
         'Suplemento de alta qualidade para sua jornada de bem-estar'
}

function generateFallbackProducts(language: string) {
  return [
    {
      id: 1,
      name: language === 'en' ? 'Multivitamin Complex' : 
            language === 'es' ? 'Complejo Multivitamínico' : 
            'Complexo Multivitamínico',
      price: '$24.99',
      rating: 4.8,
      image: 'https://via.placeholder.com/200x200/10b981/ffffff?text=Multivitamin',
      link: `https://amazon.com/s?k=multivitamin+women&tag=portalsolutio-20`,
      description: language === 'en' ? 'Essential vitamins and minerals for overall health' :
                  language === 'es' ? 'Vitaminas y minerales esenciales para la salud general' :
                  'Vitaminas e minerais essenciais para a saúde geral'
    },
    {
      id: 2,
      name: language === 'en' ? 'Omega-3 Fish Oil' : 
            language === 'es' ? 'Aceite de Pescado Omega-3' : 
            'Óleo de Peixe Ômega-3',
      price: '$18.99',
      rating: 4.9,
      image: 'https://via.placeholder.com/200x200/3b82f6/ffffff?text=Omega-3',
      link: `https://amazon.com/s?k=omega+3+fish+oil&tag=portalsolutio-20`,
      description: language === 'en' ? 'High-quality fish oil for heart and brain health' :
                  language === 'es' ? 'Aceite de pescado de alta calidad para la salud del corazón y cerebro' :
                  'Óleo de peixe de alta qualidade para saúde do coração e cérebro'
    }
  ]
}
