// Assistant Configuration
export const ASSISTANT_CONFIG = {
  // OpenAI API Keys (from environment variables)
  ANALYSIS_API_KEY: process.env.OPENAI_ANALYSIS_API_KEY || '',
  PLAN_API_KEY: process.env.OPENAI_PLAN_API_KEY || '',
  
  // Assistant IDs
  ASSISTANT_ANALYSIS_ID: 'asst_s34utD3a2vqAHEnDoHIJing1',
  ASSISTANT_PLAN_ID: 'asst_s34utD3a2vqAHEnDoHIJing1',
  
  // Amazon Configuration
  AMAZON_AFFILIATE_TAG: 'portalsolutio-20',
  AMAZON_DOMAIN: 'amazon.com'
}

// Function to get OpenAI client
export function getOpenAIClient(apiKey) {
  // Only require OpenAI at runtime, not during build
  if (typeof window !== 'undefined') {
    throw new Error('OpenAI client can only be used on server side')
  }
  
  const OpenAI = require('openai')
  return new OpenAI({
    apiKey: apiKey
  })
}

// Function to call Assistant 1 (Analysis + Sales)
export async function callAnalysisAssistant(userData, language = 'en') {
  if (!ASSISTANT_CONFIG.ANALYSIS_API_KEY) {
    return {
      success: false,
      error: 'OpenAI Analysis API key not configured'
    }
  }

  const openai = getOpenAIClient(ASSISTANT_CONFIG.ANALYSIS_API_KEY)
  
  try {
    const thread = await openai.beta.threads.create()
    
    const message = await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: `Analyze this user data and provide:
1. Health analysis based on their responses
2. Personalized Amazon product recommendations
3. Sales pitch for 30-day personalized plan
4. All content in ${language === 'en' ? 'English' : 'Spanish'}

User Data: ${JSON.stringify(userData)}`
    })
    
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: ASSISTANT_CONFIG.ASSISTANT_ANALYSIS_ID
    })
    
    if (!run || !run.id) {
      throw new Error('Failed to create run')
    }
    
    // Wait for completion
    let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id)
    while (runStatus.status !== 'completed') {
      await new Promise(resolve => setTimeout(resolve, 1000))
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id)
    }
    
    const messages = await openai.beta.threads.messages.list(thread.id)
    const lastMessage = messages.data[0]
    
    return {
      success: true,
      analysis: lastMessage.content[0].text.value,
      threadId: thread.id
    }
  } catch (error) {
    console.error('Error calling analysis assistant:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

// Function to call Assistant 2 (Plan Delivery)
export async function callPlanAssistant(userData, language = 'en') {
  if (!ASSISTANT_CONFIG.PLAN_API_KEY) {
    return {
      success: false,
      error: 'OpenAI Plan API key not configured'
    }
  }

  const openai = getOpenAIClient(ASSISTANT_CONFIG.PLAN_API_KEY)
  
  try {
    const thread = await openai.beta.threads.create()
    
    const message = await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: `Create a detailed 30-day personalized health plan based on this user data:
1. Daily routines and schedules
2. Specific recommendations
3. Progress tracking
4. All content in ${language === 'en' ? 'English' : 'Spanish'}

User Data: ${JSON.stringify(userData)}`
    })
    
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: ASSISTANT_CONFIG.ASSISTANT_PLAN_ID
    })
    
    if (!run || !run.id) {
      throw new Error('Failed to create run')
    }
    
    // Wait for completion
    let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id)
    while (runStatus.status !== 'completed') {
      await new Promise(resolve => setTimeout(resolve, 1000))
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id)
    }
    
    const messages = await openai.beta.threads.messages.list(thread.id)
    const lastMessage = messages.data[0]
    
    return {
      success: true,
      plan: lastMessage.content[0].text.value,
      threadId: thread.id
    }
  } catch (error) {
    console.error('Error calling plan assistant:', error)
    return {
      success: false,
      error: error.message
    }
  }
}
