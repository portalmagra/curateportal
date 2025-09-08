export async function POST(request) {
  try {
    const { userData, language = 'en' } = await request.json()
    
    if (!userData) {
      return Response.json({ error: 'User data is required' }, { status: 400 })
    }
    
    // Dynamic import to avoid build-time execution
    const { callPlanAssistant } = await import('@/lib/assistant-config')
    
    const result = await callPlanAssistant(userData, language)
    
    if (result.success) {
      return Response.json({
        success: true,
        plan: result.plan,
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
