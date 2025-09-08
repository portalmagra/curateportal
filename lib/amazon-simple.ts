// Simplified Amazon API implementation
import * as crypto from 'crypto';

const AWS_ACCESS_KEY = process.env.AMAZON_ACCESS_KEY_ID!;
const AWS_SECRET_KEY = process.env.AMAZON_SECRET_ACCESS_KEY!;
const ASSOCIATE_TAG = process.env.AMAZON_ASSOCIATE_TAG || 'portalsolutio-20';
const AWS_REGION = 'us-east-1';
const SERVICE = 'ProductAdvertisingAPI';
const HOST = 'webservices.amazon.com';

interface AmazonProduct {
  name: string;
  asin: string;
  price: string;
  rating: number;
  imageUrl: string;
  detailPageURL: string;
  isValid?: boolean;
  isBestSeller?: boolean;
  isAmazonChoice?: boolean;
  reviewCount?: number;
}

// Generate Amazon search URLs as fallback
export function generateAmazonSearchUrls(queries: string[]): AmazonProduct[] {
  return queries.map((query, index) => ({
    name: `Search for ${query} supplements`,
    asin: `SEARCH${index}`,
    price: 'View prices',
    rating: 0,
    imageUrl: '',
    detailPageURL: `https://www.amazon.com/s?k=${encodeURIComponent(query + ' supplement')}&tag=${ASSOCIATE_TAG}`,
    isValid: true,
    isBestSeller: false,
    isAmazonChoice: false,
    reviewCount: 0
  }));
}

// Generate additional products from the same categories
function generateAdditionalProductsFromCategories(categories: string[], language: string, currentCount: number): AmazonProduct[] {
  const products: AmazonProduct[] = [];
  
  const additionalMappings = {
    energy: {
      en: ['vitamin b complex', 'iron supplement', 'coenzyme q10'],
      es: ['vitamina b complejo', 'hierro suplemento', 'coenzima q10'],
      pt: ['vitamina b complexo', 'ferro suplemento', 'coenzima q10']
    },
    sleep: {
      en: ['valerian root', 'chamomile tea', 'magnesium glycinate'],
      es: ['raíz valeriana', 'té manzanilla', 'magnesio glicinato'],
      pt: ['raiz valeriana', 'chá camomila', 'magnésio glicinato']
    },
    stress: {
      en: ['rhodiola rosea', 'l-theanine', 'passionflower'],
      es: ['rhodiola rosea', 'l-teanina', 'pasionaria'],
      pt: ['rhodiola rosea', 'l-teanina', 'maracujá']
    },
    immunity: {
      en: ['elderberry extract', 'zinc supplement', 'echinacea'],
      es: ['extracto saúco', 'zinc suplemento', 'equinácea'],
      pt: ['extrato sabugueiro', 'zinco suplemento', 'equinácea']
    },
    digestion: {
      en: ['digestive enzymes', 'ginger root', 'fiber supplement'],
      es: ['enzimas digestivas', 'raíz jengibre', 'fibra suplemento'],
      pt: ['enzimas digestivas', 'raiz gengibre', 'fibra suplemento']
    },
    weight: {
      en: ['green coffee bean', 'garcinia cambogia', 'apple cider vinegar'],
      es: ['grano café verde', 'garcinia cambogia', 'vinagre manzana'],
      pt: ['grão café verde', 'garcinia cambogia', 'vinagre maçã']
    }
  };
  
  let productIndex = currentCount;
  
  // Generate additional products from each category
  categories.forEach(category => {
    if (productIndex >= 6) return;
    
    const categoryProducts = additionalMappings[category as keyof typeof additionalMappings]?.[language as keyof typeof additionalMappings.energy] || 
                           additionalMappings[category as keyof typeof additionalMappings]?.en || 
                           [`${category} supplement`];
    
    categoryProducts.forEach(product => {
      if (productIndex >= 6) return;
      
      products.push({
        name: product,
        asin: `ADDITIONAL${productIndex}`,
        price: 'View prices',
        rating: 4.5,
        imageUrl: '',
        detailPageURL: `https://www.amazon.com/s?k=${encodeURIComponent(product + ' supplement')}&tag=${ASSOCIATE_TAG}`,
        isValid: true,
        isBestSeller: false,
        isAmazonChoice: false,
        reviewCount: 0
      });
      
      productIndex++;
    });
  });
  
  return products;
}

// Generate specific product URLs based on categories
export function generateCategoryProducts(categories: string[], language: string): AmazonProduct[] {
  const products: AmazonProduct[] = [];
  
  const categoryMappings = {
    energy: {
      en: 'vitamin b12 energy supplement',
      es: 'vitamina b12 energia suplemento',
      pt: 'vitamina b12 energia suplemento'
    },
    sleep: {
      en: 'melatonin sleep supplement',
      es: 'melatonina sueño suplemento',
      pt: 'melatonina sono suplemento'
    },
    stress: {
      en: 'ashwagandha stress relief',
      es: 'ashwagandha alivio estrés',
      pt: 'ashwagandha alívio estresse'
    },
    immunity: {
      en: 'vitamin c immune support',
      es: 'vitamina c soporte inmune',
      pt: 'vitamina c suporte imune'
    },
    digestion: {
      en: 'probiotic digestive health',
      es: 'probiótico salud digestiva',
      pt: 'probiótico saúde digestiva'
    },
    weight: {
      en: 'green tea weight management',
      es: 'té verde control peso',
      pt: 'chá verde controle peso'
    }
  };
  
  categories.forEach((category, index) => {
    if (index >= 6) return; // Limit to 6 products
    
    const query = categoryMappings[category as keyof typeof categoryMappings]?.[language as keyof typeof categoryMappings.energy] || 
                  categoryMappings[category as keyof typeof categoryMappings]?.en || 
                  `${category} supplement`;
    
    products.push({
      name: query.replace(' supplement', '').replace(' suplemento', '').replace(' suplemento', ''),
      asin: `CATEGORY${index}`,
      price: 'View prices',
      rating: 4.5,
      imageUrl: '',
      detailPageURL: `https://www.amazon.com/s?k=${encodeURIComponent(query)}&tag=${ASSOCIATE_TAG}`,
      isValid: true,
      isBestSeller: false,
      isAmazonChoice: false,
      reviewCount: 0
    });
  });
  
  return products;
}

// Generate general wellness products
export function generateGeneralProducts(language: string): AmazonProduct[] {
  const generalQueries = {
    en: [
      'multivitamin women',
      'omega 3 fish oil',
      'vitamin d3',
      'magnesium supplement',
      'probiotic women',
      'collagen supplement'
    ],
    es: [
      'multivitamínico mujeres',
      'omega 3 aceite pescado',
      'vitamina d3',
      'magnesio suplemento',
      'probiótico mujeres',
      'colágeno suplemento'
    ],
    pt: [
      'multivitamínico mulheres',
      'omega 3 óleo peixe',
      'vitamina d3',
      'magnésio suplemento',
      'probiótico mulheres',
      'colágeno suplemento'
    ]
  };
  
  const queries = generalQueries[language as keyof typeof generalQueries] || generalQueries.en;
  
  return queries.slice(0, 6).map((query, index) => ({
    name: query,
    asin: `GENERAL${index}`,
    price: 'View prices',
    rating: 4.5,
    imageUrl: '',
    detailPageURL: `https://www.amazon.com/s?k=${encodeURIComponent(query + ' supplement')}&tag=${ASSOCIATE_TAG}`,
    isValid: true,
    isBestSeller: false,
    isAmazonChoice: false,
    reviewCount: 0
  }));
}

// Main function to generate products based on assessment
export function generateProductsFromAssessment(answers: any, language: string): AmazonProduct[] {
  const { goal, energy, challenge, stress, sleep, supplements, concern } = answers;
  let categories: string[] = [];
  
  console.log('🔍 Analyzing assessment answers:', { goal, energy, challenge, stress, sleep, concern });
  
  // Analyze goal
  if (goal.includes('Weight') || goal.includes('Peso')) {
    categories.push('weight');
  }
  if (goal.includes('Energy') || goal.includes('Energía') || goal.includes('Energia')) {
    categories.push('energy');
  }
  if (goal.includes('Sleep') || goal.includes('Sueño') || goal.includes('Sono')) {
    categories.push('sleep');
  }
  if (goal.includes('Stress') || goal.includes('Estrés') || goal.includes('Estresse')) {
    categories.push('stress');
  }
  if (goal.includes('Immune') || goal.includes('Inmune') || goal.includes('Imune')) {
    categories.push('immunity');
  }
  if (goal.includes('Digestive') || goal.includes('Digestiva') || goal.includes('Digestivo')) {
    categories.push('digestion');
  }
  
  // Analyze challenge
  if (challenge.includes('Energy') || challenge.includes('Energía') || challenge.includes('Energia')) {
    categories.push('energy');
  }
  if (challenge.includes('Sleep') || challenge.includes('Sueño') || challenge.includes('Sono')) {
    categories.push('sleep');
  }
  if (challenge.includes('Stress') || challenge.includes('Estrés') || challenge.includes('Estresse')) {
    categories.push('stress');
  }
  if (challenge.includes('Digestive') || challenge.includes('Digestiva') || challenge.includes('Digestivo')) {
    categories.push('digestion');
  }
  
  // Analyze stress frequency
  if (stress === 'Daily' || stress === 'Several times a week') {
    categories.push('stress');
  }
  
  // Analyze sleep quality
  if (sleep.includes('Poor') || sleep.includes('Fair')) {
    categories.push('sleep');
  }
  
  // Remove duplicates
  const uniqueCategories = [...new Set(categories)];
  console.log('📋 Identified categories:', uniqueCategories);
  
  // Generate products based on categories
  let products: AmazonProduct[] = [];
  
  if (uniqueCategories.length > 0) {
    products = generateCategoryProducts(uniqueCategories, language);
    console.log('🎯 Generated category products:', products.length);
    
    // If we have specific categories but not enough products, generate more from the same categories
    if (products.length < 6 && uniqueCategories.length > 0) {
      // Generate additional products from the same categories
      const additionalProducts = generateAdditionalProductsFromCategories(uniqueCategories, language, products.length);
      products.push(...additionalProducts);
      console.log('🔄 Added additional category products. Total:', products.length);
    }
  }
  
  // Only add general products if we still don't have enough
  if (products.length < 6) {
    const generalProducts = generateGeneralProducts(language);
    products.push(...generalProducts.slice(0, 6 - products.length));
    console.log('📊 Added general products. Total:', products.length);
  }
  
  return products.slice(0, 6);
}
