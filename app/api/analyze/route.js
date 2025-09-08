import { callAnalysisAssistant } from '@/lib/assistant-config'

export async function POST(request) {
  try {
    const { userData, language = 'en' } = await request.json()
    
    if (!userData) {
      return Response.json({ error: 'User data is required' }, { status: 400 })
    }
    
    const result = await callAnalysisAssistant(userData, language)
    
    if (result.success) {
      return Response.json({
        success: true,
        analysis: result.analysis,
        threadId: result.threadId
      })
    } else {
      return Response.json({ error: result.error }, { status: 500 })
    }
  } catch (error) {
    console.error('API Error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
