import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { answers, language } = await request.json()
    
    // Generate a unique assessment ID
    const assessmentId = `assessment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // Store assessment data (in a real app, you'd save this to a database)
    const assessmentData = {
      id: assessmentId,
      answers,
      language,
      timestamp: new Date().toISOString(),
      status: 'completed'
    }
    
    // Generate AI analysis based on answers
    const analysis = generateAnalysis(answers, language)
    
    return NextResponse.json({
      success: true,
      assessmentId,
      analysis,
      message: 'Assessment submitted successfully'
    })
    
  } catch (error) {
    console.error('Assessment API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process assessment' },
      { status: 500 }
    )
  }
}

function generateAnalysis(answers: any, language: string) {
  const { goal, energy, challenge, stress, sleep, supplements, concern, planImportance } = answers
  
  // Generate personalized analysis based on responses
  let analysis = {
    summary: '',
    recommendations: [],
    priorityAreas: [],
    riskFactors: [],
    nextSteps: []
  }
  
  if (language === 'en') {
    // English analysis
    analysis.summary = `Based on your responses, our AI analysis reveals that your primary health goal is ${goal.toLowerCase()}. You're currently experiencing ${energy.toLowerCase()} energy levels, with ${challenge.toLowerCase()} being your biggest challenge. Your stress frequency is ${stress.toLowerCase()}, and your sleep quality is ${sleep.toLowerCase()}. This indicates a need for targeted interventions in multiple areas.`
    
    // Generate recommendations based on responses
    if (goal.includes('Weight')) {
      analysis.recommendations.push('Focus on metabolic optimization and sustainable weight management')
      analysis.priorityAreas.push('Nutrition planning and portion control')
    }
    if (goal.includes('Energy')) {
      analysis.recommendations.push('Address underlying energy depletion causes')
      analysis.priorityAreas.push('Sleep optimization and stress management')
    }
    if (goal.includes('Sleep')) {
      analysis.recommendations.push('Implement comprehensive sleep hygiene protocol')
      analysis.priorityAreas.push('Circadian rhythm regulation')
    }
    if (goal.includes('Stress')) {
      analysis.recommendations.push('Develop stress resilience and coping strategies')
      analysis.priorityAreas.push('Mindfulness and relaxation techniques')
    }
    if (goal.includes('Immune')) {
      analysis.recommendations.push('Strengthen immune system through targeted nutrition')
      analysis.priorityAreas.push('Immune-supporting supplements and lifestyle')
    }
    if (goal.includes('Digestive')) {
      analysis.recommendations.push('Optimize gut health and digestive function')
      analysis.priorityAreas.push('Probiotics and digestive enzymes')
    }
    
    // Add stress-specific recommendations
    if (stress === 'Daily' || stress === 'Several times a week') {
      analysis.recommendations.push('Implement daily stress management routine')
      analysis.riskFactors.push('High stress levels may impact overall health')
    }
    
    // Add sleep-specific recommendations
    if (sleep.includes('Poor') || sleep.includes('Fair')) {
      analysis.recommendations.push('Prioritize sleep quality improvement')
      analysis.riskFactors.push('Poor sleep may be affecting energy and recovery')
    }
    
    // Add supplement recommendations
    if (supplements === 'No, but interested' || supplements === 'No, not interested') {
      analysis.recommendations.push('Consider targeted supplement protocol')
      analysis.nextSteps.push('Consult with health professional about supplement needs')
    }
    
    analysis.nextSteps.push('Start with highest priority area for maximum impact')
    analysis.nextSteps.push('Track progress weekly to adjust approach')
    analysis.nextSteps.push('Consider comprehensive 30-day plan for systematic improvement')
    
  } else if (language === 'es') {
    // Spanish analysis
    analysis.summary = `Basado en tus respuestas, nuestro análisis de IA revela que tu objetivo principal de salud es ${goal.toLowerCase()}. Actualmente experimentas niveles de energía ${energy.toLowerCase()}, con ${challenge.toLowerCase()} siendo tu mayor desafío. Tu frecuencia de estrés es ${stress.toLowerCase()}, y tu calidad de sueño es ${sleep.toLowerCase()}. Esto indica la necesidad de intervenciones específicas en múltiples áreas.`
    
    // Similar logic for Spanish recommendations...
    analysis.recommendations.push('Enfócate en optimización metabólica y manejo sostenible del peso')
    analysis.recommendations.push('Implementa protocolo integral de higiene del sueño')
    analysis.recommendations.push('Desarrolla estrategias de resiliencia al estrés')
    analysis.priorityAreas.push('Planificación nutricional y control de porciones')
    analysis.priorityAreas.push('Regulación del ritmo circadiano')
    analysis.nextSteps.push('Comienza con el área de mayor prioridad para máximo impacto')
    
  } else {
    // Portuguese analysis
    analysis.summary = `Baseado em suas respostas, nossa análise de IA revela que seu objetivo principal de saúde é ${goal.toLowerCase()}. Você está atualmente experimentando níveis de energia ${energy.toLowerCase()}, com ${challenge.toLowerCase()} sendo seu maior desafio. Sua frequência de estresse é ${stress.toLowerCase()}, e sua qualidade de sono é ${sleep.toLowerCase()}. Isso indica a necessidade de intervenções específicas em múltiplas áreas.`
    
    analysis.recommendations.push('Foque na otimização metabólica e controle sustentável de peso')
    analysis.recommendations.push('Implemente protocolo abrangente de higiene do sono')
    analysis.recommendations.push('Desenvolva estratégias de resiliência ao estresse')
    analysis.priorityAreas.push('Planejamento nutricional e controle de porções')
    analysis.priorityAreas.push('Regulação do ritmo circadiano')
    analysis.nextSteps.push('Comece com a área de maior prioridade para máximo impacto')
  }
  
  return analysis
}
