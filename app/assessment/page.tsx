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
    additionalInfo: ''
  })
  const [loading, setLoading] = useState(false)
  
  const t = (key: keyof typeof translations) => translations[key]?.[language] || translations[key]?.en || key
  
  const handleAnswer = (question: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [question]: answer }))
  }
  
  const nextStep = () => {
    if (currentStep < 4) {
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
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      // Redirect to results page
      window.location.href = '/plan'
    }, 2000)
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
            width: `${(currentStep / 4) * 100}%`, 
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
          
          {currentStep < 4 ? (
            <button
              onClick={nextStep}
              disabled={!answers.goal && currentStep === 1 || !answers.energy && currentStep === 2 || !answers.challenge && currentStep === 3}
              style={{
                padding: '0.75rem 1.5rem',
                border: 'none',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                color: 'white',
                cursor: 'pointer',
                fontSize: '1rem',
                opacity: (!answers.goal && currentStep === 1 || !answers.energy && currentStep === 2 || !answers.challenge && currentStep === 3) ? 0.5 : 1
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
