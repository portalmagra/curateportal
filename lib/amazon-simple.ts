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

// Generate personalized products based on specific answers
function generatePersonalizedProducts(answers: any, language: string): AmazonProduct[] {
  const { goal, energy, challenge, stress, sleep, supplements, concern, planImportance } = answers;
  const products: AmazonProduct[] = [];
  
  // Create a unique seed based on answers for consistent randomization
  const seed = JSON.stringify(answers).split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  // Weight Management + Low Energy + Immune System
  if (goal.includes('Weight') && energy === 'Low' && challenge.includes('Immune')) {
    const weightImmuneProducts = {
      en: [
        'green tea extract weight loss',
        'vitamin c immune support',
        'probiotics weight management',
        'omega 3 fish oil',
        'protein powder weight loss',
        'turmeric curcumin immune'
      ],
      es: [
        'extracto té verde pérdida peso',
        'vitamina c soporte inmune',
        'probióticos control peso',
        'aceite pescado omega 3',
        'proteína en polvo pérdida peso',
        'cúrcuma curcumina inmune'
      ],
      pt: [
        'extrato chá verde perda peso',
        'vitamina c suporte imune',
        'probióticos controle peso',
        'óleo peixe ômega 3',
        'proteína pó perda peso',
        'açafrão curcumina imune'
      ]
    };
    const queries = weightImmuneProducts[language as keyof typeof weightImmuneProducts] || weightImmuneProducts.en;
    products.push(...generateAmazonSearchUrls(queries));
  }
  
  // High Stress + Poor Sleep
  else if (stress === 'Daily' && sleep.includes('Poor')) {
    const stressSleepProducts = {
      en: [
        'magnesium stress relief',
        'melatonin sleep aid',
        'ashwagandha stress',
        'valerian root sleep',
        'l-theanine anxiety',
        'chamomile tea sleep'
      ],
      es: [
        'magnesio alivio estrés',
        'melatonina ayuda sueño',
        'ashwagandha estrés',
        'raíz valeriana sueño',
        'l-teanina ansiedad',
        'té manzanilla sueño'
      ],
      pt: [
        'magnésio alívio estresse',
        'melatonina ajuda sono',
        'ashwagandha estresse',
        'raiz valeriana sono',
        'l-teanina ansiedade',
        'chá camomila sono'
      ]
    };
    const queries = stressSleepProducts[language as keyof typeof stressSleepProducts] || stressSleepProducts.en;
    products.push(...generateAmazonSearchUrls(queries));
  }
  
  // Energy + Supplements Interested
  else if (energy === 'Low' && supplements.includes('Yes')) {
    const energySupplementsProducts = {
      en: [
        'b12 energy supplement',
        'iron deficiency energy',
        'coq10 energy support',
        'rhodiola energy',
        'b complex energy',
        'vitamin d energy'
      ],
      es: [
        'b12 energía suplemento',
        'hierro deficiencia energía',
        'coq10 soporte energía',
        'rhodiola energía',
        'complejo b energía',
        'vitamina d energía'
      ],
      pt: [
        'b12 energia suplemento',
        'ferro deficiência energia',
        'coq10 suporte energia',
        'rhodiola energia',
        'complexo b energia',
        'vitamina d energia'
      ]
    };
    const queries = energySupplementsProducts[language as keyof typeof energySupplementsProducts] || energySupplementsProducts.en;
    products.push(...generateAmazonSearchUrls(queries));
  }
  
  // Chronic Conditions + Plan Important
  else if (concern.includes('Chronic') && planImportance === 'Very Important') {
    const chronicConditionsProducts = {
      en: [
        'anti-inflammatory supplements',
        'antioxidant complex',
        'omega 3 heart health',
        'vitamin d3 immune',
        'probiotics gut health',
        'turmeric inflammation'
      ],
      es: [
        'suplementos antiinflamatorios',
        'complejo antioxidante',
        'omega 3 salud corazón',
        'vitamina d3 inmune',
        'probióticos salud intestinal',
        'cúrcuma inflamación'
      ],
      pt: [
        'suplementos antiinflamatórios',
        'complexo antioxidante',
        'ômega 3 saúde coração',
        'vitamina d3 imune',
        'probióticos saúde intestinal',
        'açafrão inflamação'
      ]
    };
    const queries = chronicConditionsProducts[language as keyof typeof chronicConditionsProducts] || chronicConditionsProducts.en;
    products.push(...generateAmazonSearchUrls(queries));
  }
  
  // Excellent Sleep + High Energy
  else if (sleep.includes('Excellent') && energy === 'High') {
    const maintenanceProducts = {
      en: [
        'multivitamin maintenance',
        'omega 3 maintenance',
        'probiotics maintenance',
        'vitamin d3 maintenance',
        'magnesium maintenance',
        'antioxidant maintenance'
      ],
      es: [
        'multivitamínico mantenimiento',
        'omega 3 mantenimiento',
        'probióticos mantenimiento',
        'vitamina d3 mantenimiento',
        'magnesio mantenimiento',
        'antioxidante mantenimiento'
      ],
      pt: [
        'multivitamínico manutenção',
        'ômega 3 manutenção',
        'probióticos manutenção',
        'vitamina d3 manutenção',
        'magnésio manutenção',
        'antioxidante manutenção'
      ]
    };
    const queries = maintenanceProducts[language as keyof typeof maintenanceProducts] || maintenanceProducts.en;
    products.push(...generateAmazonSearchUrls(queries));
  }
  
  return products;
}

// Main function to generate products based on assessment
export function generateProductsFromAssessment(answers: any, language: string): AmazonProduct[] {
  const { goal, energy, challenge, stress, sleep, supplements, concern } = answers;
  let categories: string[] = [];
  
  console.log('🔍 Analyzing assessment answers:', { goal, energy, challenge, stress, sleep, concern });
  
  // First, try to generate personalized products based on specific combinations
  let products = generatePersonalizedProducts(answers, language);
  console.log('🎯 Generated personalized products:', products.length);
  
  // If we don't have enough personalized products, fall back to category-based approach
  if (products.length < 6) {
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
    
    if (uniqueCategories.length > 0) {
      const categoryProducts = generateCategoryProducts(uniqueCategories, language);
      products.push(...categoryProducts);
      console.log('🎯 Generated category products:', categoryProducts.length);
      
      // If we still don't have enough products, generate more from the same categories
      if (products.length < 6 && uniqueCategories.length > 0) {
        const additionalProducts = generateAdditionalProductsFromCategories(uniqueCategories, language, products.length);
        products.push(...additionalProducts);
        console.log('🔄 Added additional category products. Total:', products.length);
      }
    }
  }
  
  // Only add general products if we still don't have enough
  if (products.length < 6) {
    const generalProducts = generateGeneralProducts(language);
    products.push(...generalProducts.slice(0, 6 - products.length));
    console.log('📊 Added general products. Total:', products.length);
  }
  
  // Shuffle products to add variety
  const shuffledProducts = products.sort(() => Math.random() - 0.5);
  
  return shuffledProducts.slice(0, 6);
}
