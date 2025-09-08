'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '../components/Header'

type Language = 'en' | 'es' | 'pt'

const translations = {
  pageTitle: { 
    en: 'Health Assessment', 
    es: 'Evaluación de Salud',
    pt: 'Avaliação de Saúde'
  },
  heroTitle: { 
    en: 'Get Your Personalized\nHealth Analysis', 
    es: 'Obtén tu Análisis de\nSalud Personalizado',
    pt: 'Obtenha sua Análise de\nSaúde Personalizada'
  },
  heroSubtitle: { 
    en: 'Answer a few simple questions and get AI-powered recommendations for your wellness journey', 
    es: 'Responde algunas preguntas simples y obtén recomendaciones impulsadas por IA para tu viaje de bienestar',
    pt: 'Responda algumas perguntas simples e obtenha recomendações baseadas em IA para sua jornada de bem-estar'
  },
  
  // Questions
  question1: { 
    en: 'What is your primary health goal?', 
    es: '¿Cuál es tu objetivo principal de salud?',
    pt: 'Qual é seu objetivo principal de saúde?'
  },
  question2: { 
    en: 'How would you describe your current energy levels?', 
    es: '¿Cómo describirías tus niveles actuales de energía?',
    pt: 'Como você descreveria seus níveis atuais de energia?'
  },
  question3: { 
    en: 'What is your biggest health challenge?', 
    es: '¿Cuál es tu mayor desafío de salud?',
    pt: 'Qual é seu maior desafio de saúde?'
  },
  question4: { 
    en: 'How often do you experience stress or anxiety?', 
    es: '¿Con qué frecuencia experimentas estrés o ansiedad?',
    pt: 'Com que frequência você experimenta estresse ou ansiedade?'
  },
  question5: { 
    en: 'How would you rate your sleep quality?', 
    es: '¿Cómo calificarías la calidad de tu sueño?',
    pt: 'Como você classificaria a qualidade do seu sono?'
  },
  question6: { 
    en: 'Do you currently take any supplements or medications?', 
    es: '¿Actualmente tomas algún suplemento o medicamento?',
    pt: 'Você atualmente toma algum suplemento ou medicamento?'
  },
  question7: { 
    en: 'What is your biggest concern about your health?', 
    es: '¿Cuál es tu mayor preocupación sobre tu salud?',
    pt: 'Qual é sua maior preocupação sobre sua saúde?'
  },
  question8: { 
    en: 'How important is it for you to have a personalized health plan?', 
    es: '¿Qué tan importante es para ti tener un plan de salud personalizado?',
    pt: 'Quão importante é para você ter um plano de saúde personalizado?'
  },
  question9: { 
    en: 'Tell us more about your specific needs:', 
    es: 'Cuéntanos más sobre tus necesidades específicas:',
    pt: 'Conte-nos mais sobre suas necessidades específicas:'
  },
  
  // Options
  goals: {
    en: ['Weight Management', 'Energy & Focus', 'Sleep Quality', 'Immune Support', 'Digestive Health', 'Stress Management'],
    es: ['Control de Peso', 'Energía y Concentración', 'Calidad del Sueño', 'Soporte Inmune', 'Salud Digestiva', 'Manejo del Estrés'],
    pt: ['Controle de Peso', 'Energia e Foco', 'Qualidade do Sono', 'Suporte Imune', 'Saúde Digestiva', 'Controle do Estresse']
  },
  energyLevels: {
    en: ['Very Low', 'Low', 'Moderate', 'Good', 'Excellent'],
    es: ['Muy Bajo', 'Bajo', 'Moderado', 'Bueno', 'Excelente'],
    pt: ['Muito Baixo', 'Baixo', 'Moderado', 'Bom', 'Excelente']
  },
  challenges: {
    en: ['Lack of Energy', 'Poor Sleep', 'Stress & Anxiety', 'Digestive Issues', 'Weight Management', 'Immune System'],
    es: ['Falta de Energía', 'Sueño Pobre', 'Estrés y Ansiedad', 'Problemas Digestivos', 'Control de Peso', 'Sistema Inmune'],
    pt: ['Falta de Energia', 'Sono Ruim', 'Estresse e Ansiedade', 'Problemas Digestivos', 'Controle de Peso', 'Sistema Imune']
  },
  stressFrequency: {
    en: ['Daily', 'Several times a week', 'Weekly', 'Occasionally', 'Rarely'],
    es: ['Diariamente', 'Varias veces por semana', 'Semanalmente', 'Ocasionalmente', 'Raramente'],
    pt: ['Diariamente', 'Várias vezes por semana', 'Semanalmente', 'Ocasionalmente', 'Raramente']
  },
  sleepQuality: {
    en: ['Poor - Wake up tired', 'Fair - Some rest', 'Good - Well rested', 'Excellent - Energized'],
    es: ['Pobre - Me despierto cansado', 'Regular - Algo de descanso', 'Bueno - Bien descansado', 'Excelente - Energizado'],
    pt: ['Ruim - Acordo cansado', 'Regular - Algum descanso', 'Bom - Bem descansado', 'Excelente - Energizado']
  },
  supplements: {
    en: ['Yes, multiple supplements', 'Yes, 1-2 supplements', 'No, but interested', 'No, not interested'],
    es: ['Sí, múltiples suplementos', 'Sí, 1-2 suplementos', 'No, pero interesado', 'No, no interesado'],
    pt: ['Sim, múltiplos suplementos', 'Sim, 1-2 suplementos', 'Não, mas interessado', 'Não, não interessado']
  },
  healthConcerns: {
    en: ['Long-term health', 'Immediate symptoms', 'Prevention', 'Performance', 'Aging', 'Chronic conditions'],
    es: ['Salud a largo plazo', 'Síntomas inmediatos', 'Prevención', 'Rendimiento', 'Envejecimiento', 'Condiciones crónicas'],
    pt: ['Saúde a longo prazo', 'Sintomas imediatos', 'Prevenção', 'Performance', 'Envelhecimento', 'Condições crônicas']
  },
  planImportance: {
    en: ['Very Important', 'Important', 'Somewhat Important', 'Not Important'],
    es: ['Muy Importante', 'Importante', 'Algo Importante', 'No Importante'],
    pt: ['Muito Importante', 'Importante', 'Um Pouco Importante', 'Não Importante']
  },
  
  // Buttons
  nextButton: { 
    en: 'Next Question', 
    es: 'Siguiente Pregunta',
    pt: 'Próxima Pergunta'
  },
  submitButton: { 
    en: 'Get My Analysis', 
    es: 'Obtener Mi Análisis',
    pt: 'Obter Minha Análise'
  },
  backButton: { 
    en: 'Previous', 
    es: 'Anterior',
    pt: 'Anterior'
  },
  
  // Loading
  analyzing: { 
    en: 'Analyzing your responses...', 
    es: 'Analizando tus respuestas...',
    pt: 'Analisando suas respostas...'
  },
  
  // Footer
  footerTagline: { 
    en: 'Your personalized wellness portal', 
    es: 'Tu portal personalizado de bienestar',
    pt: 'Seu portal personalizado de bem-estar'
  }
}

export default function AssessmentPage() {
  const [language, setLanguage] = useState<Language>('en')
  const [currentStep, setCurrentStep] = useState(1)
  const [answers, setAnswers] = useState({
    goal: '',
    energy: '',
    challenge: '',
    stress: '',
    sleep: '',
    supplements: '',
    concern: '',
    planImportance: '',
    additionalInfo: ''
  })
  const [loading, setLoading] = useState(false)
  
  const t = (key: keyof typeof translations) => translations[key]?.[language] || translations[key]?.en || key
  
  const handleAnswer = (question: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [question]: answer }))
  }
  
  const nextStep = () => {
    if (currentStep < 9) {
      setCurrentStep(currentStep + 1)
    }
  }
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }
  
  const submitAssessment = async () => {
    setLoading(true)
    
    try {
      // Send assessment data to API
      const response = await fetch('/api/assessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answers,
          language
        })
      })
      
      if (response.ok) {
        const data = await response.json()
        // Store answers in localStorage for results page
        localStorage.setItem('assessmentAnswers', JSON.stringify(answers))
        localStorage.setItem('assessmentLanguage', language)
        // Redirect to results page with assessment ID
        window.location.href = `/results?assessmentId=${data.assessmentId}`
      } else {
        // Fallback: store answers and redirect to results
        localStorage.setItem('assessmentAnswers', JSON.stringify(answers))
        localStorage.setItem('assessmentLanguage', language)
        window.location.href = '/results'
      }
    } catch (error) {
      console.error('Assessment submission error:', error)
      // Fallback: store answers and redirect to results
      localStorage.setItem('assessmentAnswers', JSON.stringify(answers))
      localStorage.setItem('assessmentLanguage', language)
      window.location.href = '/results'
    } finally {
      setLoading(false)
    }
  }
  
  const renderQuestion = () => {
    switch (currentStep) {
      case 1:
        return (
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: '#1f2937' }}>
              {t('question1')}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              {translations.goals[language].map((goal, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer('goal', goal)}
                  style={{
                    padding: '1rem',
                    border: answers.goal === goal ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                    borderRadius: '12px',
                    background: answers.goal === goal ? '#eff6ff' : 'white',
                    color: answers.goal === goal ? '#1d4ed8' : '#374151',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {goal}
                </button>
              ))}
            </div>
          </div>
        )
      
      case 2:
        return (
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: '#1f2937' }}>
              {t('question2')}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {translations.energyLevels[language].map((level, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer('energy', level)}
                  style={{
                    padding: '1rem',
                    border: answers.energy === level ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                    borderRadius: '12px',
                    background: answers.energy === level ? '#eff6ff' : 'white',
                    color: answers.energy === level ? '#1d4ed8' : '#374151',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        )
      
      case 3:
        return (
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: '#1f2937' }}>
              {t('question3')}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              {translations.challenges[language].map((challenge, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer('challenge', challenge)}
                  style={{
                    padding: '1rem',
                    border: answers.challenge === challenge ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                    borderRadius: '12px',
                    background: answers.challenge === challenge ? '#eff6ff' : 'white',
                    color: answers.challenge === challenge ? '#1d4ed8' : '#374151',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {challenge}
                </button>
              ))}
            </div>
          </div>
        )
      
      case 4:
        return (
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: '#1f2937' }}>
              {t('question4')}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {translations.stressFrequency[language].map((level, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer('stress', level)}
                  style={{
                    padding: '1rem',
                    border: answers.stress === level ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                    borderRadius: '12px',
                    background: answers.stress === level ? '#eff6ff' : 'white',
                    color: answers.stress === level ? '#1d4ed8' : '#374151',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        )
      
      case 5:
        return (
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: '#1f2937' }}>
              {t('question5')}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {translations.sleepQuality[language].map((quality, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer('sleep', quality)}
                  style={{
                    padding: '1rem',
                    border: answers.sleep === quality ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                    borderRadius: '12px',
                    background: answers.sleep === quality ? '#eff6ff' : 'white',
                    color: answers.sleep === quality ? '#1d4ed8' : '#374151',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {quality}
                </button>
              ))}
            </div>
          </div>
        )
      
      case 6:
        return (
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: '#1f2937' }}>
              {t('question6')}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {translations.supplements[language].map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer('supplements', option)}
                  style={{
                    padding: '1rem',
                    border: answers.supplements === option ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                    borderRadius: '12px',
                    background: answers.supplements === option ? '#eff6ff' : 'white',
                    color: answers.supplements === option ? '#1d4ed8' : '#374151',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )
      
      case 7:
        return (
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: '#1f2937' }}>
              {t('question7')}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              {translations.healthConcerns[language].map((concern, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer('concern', concern)}
                  style={{
                    padding: '1rem',
                    border: answers.concern === concern ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                    borderRadius: '12px',
                    background: answers.concern === concern ? '#eff6ff' : 'white',
                    color: answers.concern === concern ? '#1d4ed8' : '#374151',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {concern}
                </button>
              ))}
            </div>
          </div>
        )
      
      case 8:
        return (
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: '#1f2937' }}>
              {t('question8')}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {translations.planImportance[language].map((importance, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer('planImportance', importance)}
                  style={{
                    padding: '1rem',
                    border: answers.planImportance === importance ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                    borderRadius: '12px',
                    background: answers.planImportance === importance ? '#eff6ff' : 'white',
                    color: answers.planImportance === importance ? '#1d4ed8' : '#374151',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {importance}
                </button>
              ))}
            </div>
          </div>
        )
      
      case 9:
        return (
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: '#1f2937' }}>
              {t('question9')}
            </h2>
            <textarea
              value={answers.additionalInfo}
              onChange={(e) => handleAnswer('additionalInfo', e.target.value)}
              placeholder={language === 'en' ? 'Tell us more about your specific needs, lifestyle, or any other information that might help us provide better recommendations...' : 
                         language === 'es' ? 'Cuéntanos más sobre tus necesidades específicas, estilo de vida, o cualquier otra información que pueda ayudarnos a proporcionar mejores recomendaciones...' :
                         'Conte-nos mais sobre suas necessidades específicas, estilo de vida, ou qualquer outra informação que possa nos ajudar a fornecer melhores recomendações...'}
              style={{
                width: '100%',
                height: '150px',
                padding: '1rem',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '1rem',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
            />
          </div>
        )
      
      default:
        return null
    }
  }
  
  if (loading) {
    return (
      <>
        <Header language={language} onLanguageChange={setLanguage} />
        <main style={{ padding: '2rem', textAlign: 'center', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🤖</div>
            <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1f2937' }}>
              {t('analyzing')}
            </h1>
            <div style={{ width: '50px', height: '50px', border: '3px solid #e5e7eb', borderTop: '3px solid #3b82f6', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
          </div>
        </main>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </>
    )
  }
  
  return (
    <>
      <Header language={language} onLanguageChange={setLanguage} />
      <main style={{ padding: '2rem', minHeight: '80vh' }}>
        {/* Hero Section */}
        <section style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            marginBottom: '1rem', 
            color: '#1f2937',
            whiteSpace: 'pre-line'
          }}>
            {t('heroTitle')}
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
            {t('heroSubtitle')}
          </p>
        </section>
        
        {/* Progress Bar */}
        <div style={{ maxWidth: '600px', margin: '0 auto 3rem', background: '#f3f4f6', borderRadius: '10px', padding: '4px' }}>
          <div style={{ 
            width: `${(currentStep / 9) * 100}%`, 
            height: '8px', 
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', 
            borderRadius: '6px',
            transition: 'width 0.3s ease'
          }}></div>
        </div>
        
        {/* Question */}
        {renderQuestion()}
        
        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '600px', margin: '3rem auto 0', gap: '1rem' }}>
          {currentStep > 1 && (
            <button
              onClick={prevStep}
              style={{
                padding: '0.75rem 1.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                background: 'white',
                color: '#374151',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              {t('backButton')}
            </button>
          )}
          
          <div style={{ flex: 1 }}></div>
          
          {currentStep < 9 ? (
            <button
              onClick={nextStep}
              disabled={
                (currentStep === 1 && !answers.goal) ||
                (currentStep === 2 && !answers.energy) ||
                (currentStep === 3 && !answers.challenge) ||
                (currentStep === 4 && !answers.stress) ||
                (currentStep === 5 && !answers.sleep) ||
                (currentStep === 6 && !answers.supplements) ||
                (currentStep === 7 && !answers.concern) ||
                (currentStep === 8 && !answers.planImportance)
              }
              style={{
                padding: '0.75rem 1.5rem',
                border: 'none',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                color: 'white',
                cursor: 'pointer',
                fontSize: '1rem',
                opacity: (
                  (currentStep === 1 && !answers.goal) ||
                  (currentStep === 2 && !answers.energy) ||
                  (currentStep === 3 && !answers.challenge) ||
                  (currentStep === 4 && !answers.stress) ||
                  (currentStep === 5 && !answers.sleep) ||
                  (currentStep === 6 && !answers.supplements) ||
                  (currentStep === 7 && !answers.concern) ||
                  (currentStep === 8 && !answers.planImportance)
                ) ? 0.5 : 1
              }}
            >
              {t('nextButton')}
            </button>
          ) : (
            <button
              onClick={submitAssessment}
              style={{
                padding: '0.75rem 1.5rem',
                border: 'none',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              {t('submitButton')}
            </button>
          )}
        </div>
      </main>
    </>
  )
}
