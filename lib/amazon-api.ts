import * as crypto from 'crypto';

// === Amazon Product Advertising API v5 Configuration ===
const AWS_ACCESS_KEY = process.env.AMAZON_ACCESS_KEY_ID!;
const AWS_SECRET_KEY = process.env.AMAZON_SECRET_ACCESS_KEY!;
const ASSOCIATE_TAG = 'portalsolutio-20';
const AWS_REGION = 'us-east-1';
const SERVICE = 'ProductAdvertisingAPI';
const HOST = 'webservices.amazon.com';
const URI = '/paapi5/searchitems';
const ENDPOINT = `https://${HOST}${URI}`;

// Validação de credenciais
const CREDENTIALS_VALID = !!(
  AWS_ACCESS_KEY && 
  AWS_ACCESS_KEY !== 'undefined' && 
  AWS_ACCESS_KEY.length >= 20 &&
  AWS_SECRET_KEY && 
  AWS_SECRET_KEY !== 'undefined' &&
  AWS_SECRET_KEY.length >= 40
);

// Debug apenas em desenvolvimento
if (process.env.NODE_ENV === 'development') {
  console.log('🔐 Amazon API Status:', {
    credentialsValid: CREDENTIALS_VALID,
    associateTag: ASSOCIATE_TAG,
    endpoint: ENDPOINT,
    accessKeyLength: AWS_ACCESS_KEY?.length || 0,
    secretKeyLength: AWS_SECRET_KEY?.length || 0,
    hasAccessKey: !!AWS_ACCESS_KEY,
    hasSecretKey: !!AWS_SECRET_KEY
  });
}

// === AWS Signature V4 Utility Functions ===
function hmac(key: crypto.BinaryLike | crypto.KeyObject, data: string | Buffer) {
  return crypto.createHmac('sha256', key).update(data).digest();
}

function sha256Hex(data: string | Buffer) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

function getSigningKey(secretKey: string, dateStamp: string, region: string, service: string) {
  const kDate = hmac('AWS4' + secretKey, dateStamp);
  const kRegion = hmac(kDate, region);
  const kService = hmac(kRegion, service);
  const kSigning = hmac(kService, 'aws4_request');
  return kSigning;
}

function buildCanonicalRequest(method: string, uri: string, queryString: string, headers: Record<string,string>, payloadHash: string) {
  const sortedHeaderKeys = Object.keys(headers).map(k => k.toLowerCase()).sort();
  const canonicalHeaders = sortedHeaderKeys.map(k => `${k}:${headers[k].trim()}\n`).join('');
  const signedHeaders = sortedHeaderKeys.join(';');
  return [
    method,
    uri,
    queryString,
    canonicalHeaders,
    signedHeaders,
    payloadHash
  ].join('\n');
}

function buildStringToSign(amzDate: string, dateStamp: string, region: string, service: string, canonicalRequest: string) {
  const algorithm = 'AWS4-HMAC-SHA256';
  const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
  const hashedCanonicalRequest = sha256Hex(canonicalRequest);
  return [
    algorithm,
    amzDate,
    credentialScope,
    hashedCanonicalRequest
  ].join('\n');
}

function buildAuthHeader(accessKey: string, dateStamp: string, region: string, service: string, signedHeaders: string, signature: string) {
  const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
  return `AWS4-HMAC-SHA256 Credential=${accessKey}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;
}

// === Tipos ===
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

interface SearchOptions {
  minRating?: number;
  preferBestSellers?: boolean;
  preferAmazonChoice?: boolean;
  sortBy?: 'Featured' | 'Price:LowToHigh' | 'Price:HighToLow' | 'AvgCustomerReviews' | 'NewestArrivals';
}

// === Busca Otimizada na API da Amazon ===
async function searchAmazonAPI(
  query: string, 
  maxResults: number,
  options: SearchOptions = {}
): Promise<AmazonProduct[]> {
  
  if (!CREDENTIALS_VALID) {
    console.warn('⚠️ API credentials invalid, skipping API call');
    return [];
  }

  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
  const dateStamp = amzDate.slice(0, 8);

  // Otimizar query para melhores resultados
  const optimizedQuery = query
    .replace(/supplement/gi, '') // Amazon já entende que é suplemento
    .replace(/\s+/g, ' ')
    .trim();

  const payloadObj = {
    Keywords: optimizedQuery,
    Resources: [
      'Images.Primary.Large',
      'ItemInfo.Title',
      'ItemInfo.Features',
      'ItemInfo.ProductInfo',
      'Offers.Listings.Price',
      'BrowseNodeInfo',
      'CustomerReviews'
    ],
    PartnerTag: ASSOCIATE_TAG,
    PartnerType: 'Associates',
    Marketplace: 'www.amazon.com',
    ItemCount: Math.min(maxResults * 2, 10), // Pegar mais para filtrar
    SearchIndex: 'HealthPersonalCare',
    SortBy: options.sortBy || 'Featured',
    MinReviewsRating: options.minRating || 4.0
  };
  
  const payload = JSON.stringify(payloadObj);
  const payloadHash = sha256Hex(payload);

  const headers: Record<string,string> = {
    'content-type': 'application/json; charset=utf-8',
    'host': HOST,
    'x-amz-target': 'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.SearchItems', // CORRIGIDO
    'x-amz-date': amzDate,
    'x-amz-content-sha256': payloadHash,
  };

  const canonicalRequest = buildCanonicalRequest('POST', URI, '', headers, payloadHash);
  const stringToSign = buildStringToSign(amzDate, dateStamp, AWS_REGION, SERVICE, canonicalRequest);
  const signingKey = getSigningKey(AWS_SECRET_KEY, dateStamp, AWS_REGION, SERVICE);
  const signature = crypto.createHmac('sha256', signingKey).update(stringToSign).digest('hex');
  
  const signedHeaders = Object.keys(headers).sort().join(';');
  const authorization = buildAuthHeader(AWS_ACCESS_KEY, dateStamp, AWS_REGION, SERVICE, signedHeaders, signature);

  console.log(`🔎 Amazon API Search: "${optimizedQuery}" (max: ${maxResults})`);
  
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        ...headers,
        'Authorization': authorization,
      },
      body: payload,
    });

    const text = await res.text();
    
    if (!res.ok) {
      console.error(`❌ API Error ${res.status}:`, text.substring(0, 100));
      return [];
    }

    const data = JSON.parse(text);
    
    if (!data.SearchResult?.Items?.length) {
      console.log('📭 No products found for this query');
      return [];
    }

    console.log(`📦 Found ${data.SearchResult.Items.length} products`);

    // Processar e filtrar produtos
    const products = data.SearchResult.Items.map((item: any) => {
      const asin = item.ASIN;
      let url = item.DetailPageURL || `https://www.amazon.com/dp/${asin}`;
      
      // Garantir tag de afiliado
      if (!url.includes('tag=')) {
        url = url.includes('?') ? `${url}&tag=${ASSOCIATE_TAG}` : `${url}?tag=${ASSOCIATE_TAG}`;
      }

      return {
        name: item.ItemInfo?.Title?.DisplayValue || 'Product',
        asin,
        price: item.Offers?.Listings?.[0]?.Price?.DisplayAmount || '$29.99',
        rating: item.CustomerReviews?.StarRating?.Value || 4.0,
        imageUrl: item.Images?.Primary?.Large?.URL || '',
        detailPageURL: url,
        isValid: true,
        isBestSeller: item.BrowseNodeInfo?.WebsiteSalesRank?.Rank <= 100,
        isAmazonChoice: item.ItemInfo?.ProductInfo?.IsAmazonChoice || false,
        reviewCount: item.CustomerReviews?.Count || 0
      };
    });

    // Filtrar por qualidade
    let filteredProducts = products.filter((p: AmazonProduct) => p.rating >= (options.minRating || 4.0));
    
    // Priorizar bestsellers e Amazon's Choice
    if (options.preferBestSellers || options.preferAmazonChoice) {
      filteredProducts.sort((a: AmazonProduct, b: AmazonProduct) => {
        if (a.isBestSeller && !b.isBestSeller) return -1;
        if (!a.isBestSeller && b.isBestSeller) return 1;
        if (a.isAmazonChoice && !b.isAmazonChoice) return -1;
        if (!a.isAmazonChoice && b.isAmazonChoice) return 1;
        return b.rating - a.rating;
      });
    }

    return filteredProducts.slice(0, maxResults);
    
  } catch (error) {
    console.error('❌ API request failed:', error);
    return [];
  }
}

// === Validação de URL de Produto ===
async function validateProductUrl(url: string): Promise<boolean> {
  try {
    // Usar HEAD request para verificar se URL existe
    const response = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: AbortSignal.timeout(3000) // Timeout de 3 segundos
    });
    
    return response.ok || response.status === 301 || response.status === 302;
  } catch {
    return false;
  }
}

// === Gerador de Queries Inteligentes ===
function generateIntelligentQueries(baseQuery: string): string[] {
  const queries: string[] = [
    baseQuery,
    `${baseQuery} bestseller`,
    `${baseQuery} amazon choice`,
    `${baseQuery} top rated`,
    `${baseQuery} most wished`,
    `${baseQuery} premium quality`
  ];
  
  // Adicionar variações sem marca específica
  const cleanQuery = baseQuery.replace(/\b\d+mg\b|\b\d+mcg\b|\b\d+iu\b/gi, '').trim();
  if (cleanQuery !== baseQuery) {
    queries.push(cleanQuery);
  }
  
  return Array.from(new Set(queries)); // Remover duplicatas
}

// === Função Principal de Busca com Curadoria ===
export async function searchAmazonProducts(
  query: string, 
  maxResults: number = 6
): Promise<AmazonProduct[]> {
  
  console.log('🎯 Starting Intelligent Product Curation');
  console.log(`📝 Query: "${query}" | Target: ${maxResults} products`);
  
  let curatedProducts: AmazonProduct[] = [];
  const processedASINs = new Set<string>();
  
  // 1. BUSCA PRINCIPAL - Com filtros de qualidade
  if (CREDENTIALS_VALID) {
    const intelligentQueries = generateIntelligentQueries(query);
    
    for (const searchQuery of intelligentQueries) {
      if (curatedProducts.length >= maxResults) break;
      
      console.log(`🔍 Searching: "${searchQuery}"`);
      
      const products = await searchAmazonAPI(searchQuery, maxResults - curatedProducts.length, {
        minRating: 4.0,
        preferBestSellers: true,
        preferAmazonChoice: true,
        sortBy: 'Featured'
      });
      
      // Adicionar apenas produtos únicos
      for (const product of products) {
        if (!processedASINs.has(product.asin)) {
          processedASINs.add(product.asin);
          curatedProducts.push(product);
        }
      }
      
      if (curatedProducts.length >= maxResults) {
        break;
      }
    }
  }
  
  // 2. BUSCA GENÉRICA - Se ainda precisa mais produtos
  if (CREDENTIALS_VALID && curatedProducts.length < maxResults) {
    console.log(`📊 Need ${maxResults - curatedProducts.length} more products, searching bestsellers...`);
    
    const genericQueries = [
      'women multivitamin bestseller',
      'immunity support top rated',
      'energy supplement amazon choice',
      'wellness supplement women',
      'daily vitamin bestseller'
    ];
    
    for (const genericQuery of genericQueries) {
      if (curatedProducts.length >= maxResults) break;
      
      const products = await searchAmazonAPI(genericQuery, 2, {
        minRating: 4.2,
        preferBestSellers: true,
        sortBy: 'AvgCustomerReviews'
      });
      
      for (const product of products) {
        if (!processedASINs.has(product.asin)) {
          processedASINs.add(product.asin);
          curatedProducts.push(product);
          if (curatedProducts.length >= maxResults) break;
        }
      }
    }
  }
  
  // 3. VALIDAÇÃO - Verificar URLs válidas (opcional, pode ser lento)
  if (process.env.VALIDATE_URLS === 'true' && curatedProducts.length > 0) {
    console.log('🔗 Validating product URLs...');
    
    const validationPromises = curatedProducts.map(async (product) => {
      product.isValid = await validateProductUrl(product.detailPageURL);
      return product;
    });
    
    curatedProducts = await Promise.all(validationPromises);
    
    // Filtrar apenas válidos
    const validProducts = curatedProducts.filter(p => p.isValid);
    
    if (validProducts.length < curatedProducts.length) {
      console.log(`⚠️ Removed ${curatedProducts.length - validProducts.length} invalid products`);
      curatedProducts = validProducts;
    }
  }
  
  // 4. FALLBACK FINAL - Link de busca se nada funcionar
  if (curatedProducts.length === 0) {
    console.log('❗ No products found, creating search fallback');
    
    // Criar links de busca genéricos como último recurso
    const fallbackSearches = [
      'multivitamin women',
      'vitamin d3',
      'omega 3',
      'magnesium',
      'probiotic',
      'vitamin c'
    ];
    
    curatedProducts = fallbackSearches.slice(0, maxResults).map((term, index) => ({
      name: `Search for ${term} supplements`,
      asin: `SEARCH${index}`,
      price: 'View prices',
      rating: 0,
      imageUrl: '',
      detailPageURL: `https://www.amazon.com/s?k=${encodeURIComponent(term + ' supplement')}&tag=${ASSOCIATE_TAG}`,
      isValid: true
    }));
  }
  
  // 5. ORDENAÇÃO FINAL - Melhores primeiro
  curatedProducts.sort((a, b) => {
    // Priorizar produtos reais sobre buscas
    if (a.asin.startsWith('SEARCH') && !b.asin.startsWith('SEARCH')) return 1;
    if (!a.asin.startsWith('SEARCH') && b.asin.startsWith('SEARCH')) return -1;
    
    // Priorizar bestsellers
    if (a.isBestSeller && !b.isBestSeller) return -1;
    if (!a.isBestSeller && b.isBestSeller) return 1;
    
    // Depois por rating
    return (b.rating || 0) - (a.rating || 0);
  });
  
  // 6. GARANTIR QUANTIDADE SOLICITADA
  const finalProducts = curatedProducts.slice(0, maxResults);
  
  console.log('✅ Curation complete:', {
    requested: maxResults,
    delivered: finalProducts.length,
    realProducts: finalProducts.filter(p => !p.asin.startsWith('SEARCH')).length,
    searchLinks: finalProducts.filter(p => p.asin.startsWith('SEARCH')).length
  });
  
  return finalProducts;
}

// === Função auxiliar para URLs ===
export function generateAmazonUrl(asin: string): string {
  return `https://www.amazon.com/dp/${asin}?tag=${ASSOCIATE_TAG}`;
}

// === Função para buscar produto específico por ASIN ===
export async function getProductByASIN(asin: string): Promise<AmazonProduct | null> {
  try {
    console.log(`🔍 Buscando produto específico por ASIN: ${asin}`);
    
    if (!CREDENTIALS_VALID) {
      console.log('❌ Credenciais da Amazon não válidas');
      return null;
    }

    // Buscar diretamente pelo ASIN usando a API
    const now = new Date();
    const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
    const dateStamp = amzDate.slice(0, 8);

    const payloadObj = {
      ItemIds: [asin],
      Resources: [
        'Images.Primary.Large',
        'ItemInfo.Title',
        'ItemInfo.Features',
        'ItemInfo.ProductInfo',
        'Offers.Listings.Price',
        'BrowseNodeInfo',
        'CustomerReviews'
      ],
      PartnerTag: ASSOCIATE_TAG,
      PartnerType: 'Associates',
      Marketplace: 'www.amazon.com'
    };
    
    const payload = JSON.stringify(payloadObj);
    const payloadHash = sha256Hex(payload);

    const headers: Record<string,string> = {
      'content-type': 'application/json; charset=utf-8',
      'host': HOST,
      'x-amz-target': 'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.GetItems',
      'x-amz-date': amzDate,
      'x-amz-content-sha256': payloadHash,
    };

    const getItemsUri = '/paapi5/getitems';
    const canonicalRequest = buildCanonicalRequest('POST', getItemsUri, '', headers, payloadHash);
    const stringToSign = buildStringToSign(amzDate, dateStamp, AWS_REGION, SERVICE, canonicalRequest);
    const signingKey = getSigningKey(AWS_SECRET_KEY, dateStamp, AWS_REGION, SERVICE);
    const signature = crypto.createHmac('sha256', signingKey).update(stringToSign).digest('hex');
    
    const signedHeaders = Object.keys(headers).sort().join(';');
    const authorization = buildAuthHeader(AWS_ACCESS_KEY, dateStamp, AWS_REGION, SERVICE, signedHeaders, signature);

    console.log(`🔎 Amazon API GetItems: ASIN ${asin}`);
    
    const res = await fetch(`https://${HOST}${getItemsUri}`, {
      method: 'POST',
      headers: {
        ...headers,
        'Authorization': authorization,
      },
      body: payload,
    });

    const text = await res.text();
    
    if (!res.ok) {
      console.error(`❌ GetItems API Error ${res.status}:`, text.substring(0, 100));
      // Fallback para busca por texto
      return await searchAmazonAPI(asin, 1, {
        minRating: 0,
        preferBestSellers: false,
        preferAmazonChoice: false
      }).then(products => products[0] || null);
    }

    const data = JSON.parse(text);
    
    if (!data.ItemsResult?.Items?.length) {
      console.log('📭 No product found for this ASIN');
      // Fallback para busca por texto
      return await searchAmazonAPI(asin, 1, {
        minRating: 0,
        preferBestSellers: false,
        preferAmazonChoice: false
      }).then(products => products[0] || null);
    }

    const item = data.ItemsResult.Items[0];
    console.log(`📦 Found product by ASIN: ${item.ASIN}`);

    // Processar dados do produto
    const product: AmazonProduct = {
      name: item.ItemInfo?.Title?.DisplayValue || 'Product',
      asin: item.ASIN,
      price: item.Offers?.Listings?.[0]?.Price?.DisplayAmount || '$29.99',
      rating: item.CustomerReviews?.StarRating?.Value || 4.0,
      imageUrl: item.Images?.Primary?.Large?.URL || '',
      detailPageURL: `https://www.amazon.com/dp/${item.ASIN}?tag=${ASSOCIATE_TAG}`,
      isValid: true,
      isBestSeller: item.BrowseNodeInfo?.WebsiteSalesRank?.Rank <= 100,
      isAmazonChoice: item.ItemInfo?.ProductInfo?.IsAmazonChoice || false,
      reviewCount: item.CustomerReviews?.Count || 0
    };

    console.log('✅ Product found by ASIN:', product);
    return product;
    
  } catch (error) {
    console.error('❌ Erro ao buscar produto por ASIN:', error);
    // Fallback para busca por texto
    try {
      return await searchAmazonAPI(asin, 1, {
        minRating: 0,
        preferBestSellers: false,
        preferAmazonChoice: false
      }).then(products => products[0] || null);
    } catch (fallbackError) {
      console.error('❌ Fallback também falhou:', fallbackError);
      return null;
    }
  }
}

// === Função de busca especializada por categoria ===
export async function searchCategoryProducts(
  category: 'energy' | 'sleep' | 'immunity' | 'beauty' | 'stress' | 'digestion',
  maxResults: number = 3
): Promise<AmazonProduct[]> {
  
  const categoryQueries = {
    energy: [
      'vitamin b12 methylcobalamin energy',
      'coq10 ubiquinol energy',
      'iron bisglycinate women'
    ],
    sleep: [
      'melatonin 5mg time release',
      'magnesium glycinate sleep',
      'l-theanine 200mg calm'
    ],
    immunity: [
      'vitamin c liposomal 1000mg',
      'zinc picolinate 30mg',
      'elderberry immune support'
    ],
    beauty: [
      'collagen peptides type 1 3',
      'biotin 10000mcg hair skin',
      'hyaluronic acid supplement'
    ],
    stress: [
      'ashwagandha ksm66 600mg',
      'rhodiola rosea adaptogen',
      'gaba supplement 750mg'
    ],
    digestion: [
      'probiotic 50 billion cfu women',
      'digestive enzymes complete',
      'psyllium husk fiber'
    ]
  };
  
  const queries = categoryQueries[category] || [];
  let products: AmazonProduct[] = [];
  
  for (const query of queries) {
    if (products.length >= maxResults) break;
    
    const results = await searchAmazonProducts(query, 1);
    if (results.length > 0 && !results[0].asin.startsWith('SEARCH')) {
      products.push(results[0]);
    }
  }
  
  return products;
}