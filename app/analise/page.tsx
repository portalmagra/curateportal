'use client'

import { useState, useEffect } from 'react'

// Traduções
const translations = {
  // Headers e Títulos
  pageTitle: { pt: 'Avaliação Personalizada', es: 'Evaluación Personalizada', en: 'Personalized Evaluation' },
  heroTitle: { 
    pt: 'Sua Avaliação\nPersonalizada', 
    es: 'Tu Evaluación\nPersonalizada', 
    en: 'Your Personalized\nEvaluation' 
  },
  heroSubtitle: { 
    pt: 'Avaliação gratuita feita por Inteligência Artificial', 
    es: 'Evaluación gratuita hecha por Inteligencia Artificial', 
    en: 'Free evaluation made by Artificial Intelligence' 
  },
  
  // Navegação
  backToHome: { pt: '← Voltar para home', es: '← Volver a inicio', en: '← Back to home' },
  
  // Progresso
  progressText: { pt: '', es: '', en: '' },
  progressOf: { pt: 'de', es: 'de', en: 'of' },
  
  // Perguntas Estratégicas com Gatilhos Mentais
  question1: { 
    pt: 'Qual seu maior desafio de saúde nos EUA? (Selecione o que mais te incomoda)', 
    es: '¿Cuál es tu mayor desafío de salud en USA? (Selecciona lo que más te molesta)', 
    en: 'What is your biggest health challenge in the USA? (Select what bothers you most)' 
  },
  question2: { 
    pt: 'Qual sua faixa etária e estilo de vida?', 
    es: '¿Cuál es tu rango de edad y estilo de vida?', 
    en: 'What is your age range and lifestyle?' 
  },
  question3: { 
    pt: 'Qual seu objetivo principal? (Seja específico)', 
    es: '¿Cuál es tu objetivo principal? (Sé específico)', 
    en: 'What is your main goal? (Be specific)' 
  },
  question4: { 
    pt: 'Como é sua rotina atual? (Honestidade é fundamental)', 
    es: '¿Cómo es tu rutina actual? (La honestidad es fundamental)', 
    en: 'How is your current routine? (Honesty is fundamental)' 
  },
  question5: { 
    pt: 'Quantas vezes você tentou e falhou? (Não se culpe)', 
    es: '¿Cuántas veces has intentado y fallado? (No te culpes)', 
    en: 'How many times have you tried and failed? (Don\'t blame yourself)' 
  },
  question7: { 
    pt: 'Em quanto tempo você quer ver resultados?', 
    es: '¿En cuánto tiempo quieres ver resultados?', 
    en: 'How soon do you want to see results?' 
  },
  question8: { 
    pt: 'O que você está disposto a fazer AGORA para mudar?', 
    es: '¿Qué estás dispuesto a hacer AHORA para cambiar?', 
    en: 'What are you willing to do NOW to change?' 
  },
  
  // Respostas Estratégicas com Gatilhos Mentais
  answer1a: { pt: 'Manter energia durante o dia todo (Sempre cansado)', es: 'Mantener energía durante todo el día (Siempre cansado)', en: 'Maintain energy throughout the day (Always tired)' },
  answer1b: { pt: 'Melhorar a qualidade do sono (Insônia frequente)', es: 'Mejorar la calidad del sueño (Insomnio frecuente)', en: 'Improve sleep quality (Frequent insomnia)' },
  answer1c: { pt: 'Controlar o peso (Já tentou de tudo)', es: 'Controlar el peso (Ya intentaste de todo)', en: 'Control weight (Tried everything already)' },
  answer1d: { pt: 'Fortalecer o sistema imunológico (Sempre doente)', es: 'Fortalecer el sistema inmunológico (Siempre enfermo)', en: 'Strengthen immune system (Always sick)' },
  
  answer2a: { pt: '18-25 anos (Vida agitada, muita energia)', es: '18-25 años (Vida agitada, mucha energía)', en: '18-25 years (Busy life, lots of energy)' },
  answer2b: { pt: '26-35 anos (Carreira em ascensão, estresse)', es: '26-35 años (Carrera en ascenso, estrés)', en: '26-35 years (Rising career, stress)' },
  answer2c: { pt: '36-45 anos (Equilíbrio família-trabalho)', es: '36-45 años (Equilibrio familia-trabajo)', en: '36-45 years (Family-work balance)' },
  answer2d: { pt: '46+ anos (Foco em qualidade de vida)', es: '46+ años (Enfoque en calidad de vida)', en: '46+ years (Focus on quality of life)' },
  
  answer3a: { pt: 'Perder peso (Já tentou dietas sem sucesso)', es: 'Perder peso (Ya intentaste dietas sin éxito)', en: 'Lose weight (Tried diets without success)' },
  answer3b: { pt: 'Ganhar massa muscular (Quer se sentir forte)', es: 'Ganar masa muscular (Quieres sentirte fuerte)', en: 'Gain muscle mass (Want to feel strong)' },
  answer3c: { pt: 'Melhorar o bem-estar geral (Quer mais qualidade de vida)', es: 'Mejorar el bienestar general (Quieres más calidad de vida)', en: 'Improve general well-being (Want better quality of life)' },
  answer3d: { pt: 'Aumentar a performance (Quer ser melhor em tudo)', es: 'Aumentar el rendimiento (Quieres ser mejor en todo)', en: 'Increase performance (Want to be better at everything)' },
  
  answer4a: { pt: 'Rotina caótica (Sem horários fixos)', es: 'Rutina caótica (Sin horarios fijos)', en: 'Chaotic routine (No fixed schedules)' },
  answer4b: { pt: 'Rotina rígida (Muito trabalho, pouco tempo)', es: 'Rutina rígida (Mucho trabajo, poco tiempo)', en: 'Rigid routine (Lots of work, little time)' },
  answer4c: { pt: 'Rotina equilibrada (Tenta manter hábitos)', es: 'Rutina equilibrada (Intenta mantener hábitos)', en: 'Balanced routine (Tries to maintain habits)' },
  answer4d: { pt: 'Rotina flexível (Adapta-se às mudanças)', es: 'Rutina flexible (Se adapta a los cambios)', en: 'Flexible routine (Adapts to changes)' },
  
  answer5a: { pt: '1-2 vezes (Ainda acredita)', es: '1-2 veces (Aún cree)', en: '1-2 times (Still believes)' },
  answer5b: { pt: '3-5 vezes (Frustrado mas persistente)', es: '3-5 veces (Frustrado pero persistente)', en: '3-5 times (Frustrated but persistent)' },
  answer5c: { pt: '6-10 vezes (Quase desistindo)', es: '6-10 veces (Casi desistiendo)', en: '6-10 times (Almost giving up)' },
  answer5d: { pt: '10+ vezes (Precisa de ajuda especializada)', es: '10+ veces (Necesita ayuda especializada)', en: '10+ times (Needs specialized help)' },
  
  answer7a: { pt: '1-2 semanas (Resultados rápidos)', es: '1-2 semanas (Resultados rápidos)', en: '1-2 weeks (Quick results)' },
  answer7b: { pt: '1 mês (Mudança visível)', es: '1 mes (Cambio visible)', en: '1 month (Visible change)' },
  answer7c: { pt: '3 meses (Transformação real)', es: '3 meses (Transformación real)', en: '3 months (Real transformation)' },
  answer7d: { pt: '6 meses (Mudança permanente)', es: '6 meses (Cambio permanente)', en: '6 months (Permanent change)' },
  
  answer8a: { pt: 'Mudar hábitos alimentares (Começar hoje)', es: 'Cambiar hábitos alimentarios (Empezar hoy)', en: 'Change eating habits (Start today)' },
  answer8b: { pt: 'Adicionar exercícios (Sem desculpas)', es: 'Agregar ejercicios (Sin excusas)', en: 'Add exercises (No excuses)' },
  answer8c: { pt: 'Suplementação inteligente (Apoio científico)', es: 'Suplementación inteligente (Apoyo científico)', en: 'Smart supplementation (Scientific support)' },
  answer8d: { pt: 'Tudo junto (Transformação completa)', es: 'Todo junto (Transformación completa)', en: 'Everything together (Complete transformation)' },
  
  // Botões
  nextButton: { pt: 'Próxima Pergunta', es: 'Siguiente Pregunta', en: 'Next Question' },
  startAnalysis: { pt: 'Começar Análise', es: 'Comenzar Análisis', en: 'Start Analysis' },
  seeResults: { pt: '🎯 Ver Resultados', es: '🎯 Ver Resultados', en: '🎯 See Results' },
  
  // Comentários
  additionalInfo: { pt: 'Informações Adicionais (Opcional)', es: 'Información Adicional (Opcional)', en: 'Additional Information (Optional)' },
  additionalInfoPlaceholder: { pt: 'Conte-nos mais sobre seus objetivos, rotina, ou qualquer informação que possa ajudar na análise...', es: 'Cuéntanos más sobre tus objetivos, rutina, o cualquier información que pueda ayudar en el análisis...', en: 'Tell us more about your goals, routine, or any information that might help in the analysis...' },
  
  // Footer
  footerText: { pt: 'Avaliação personalizada para brasileiros nos EUA', es: 'Evaluación personalizada para brasileños en USA', en: 'Personalized evaluation for Brazilians in the USA' }
}

export default function AnalisePage() {
  const [language, setLanguage] = useState('pt')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ [key: string]: string }>({})
  const [comments, setComments] = useState('')
  const [showComments, setShowComments] = useState(false)

  const t = (key: string) => {
    const translation = translations[key as keyof typeof translations]
    if (translation && typeof translation === 'object' && language in translation) {
      return translation[language as keyof typeof translation]
    }
    return key
  }

  // Perguntas estratégicas
  const questions = [
    { id: '1', text: t('question1'), answers: ['a', 'b', 'c', 'd'] },
    { id: '2', text: t('question2'), answers: ['a', 'b', 'c', 'd'] },
    { id: '3', text: t('question3'), answers: ['a', 'b', 'c', 'd'] },
    { id: '4', text: t('question4'), answers: ['a', 'b', 'c', 'd'] },
    { id: '5', text: t('question5'), answers: ['a', 'b', 'c', 'd'] },
    { id: '7', text: t('question7'), answers: ['a', 'b', 'c', 'd'] },
    { id: '8', text: t('question8'), answers: ['a', 'b', 'c', 'd'] }
  ]

  // Detectar mobile
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  // Função para analisar o perfil do usuário com GPT-3.5
  const analyzeProfile = async () => {
    console.log('🔍 analyzeProfile com GPT-3.5 chamada!')
    console.log('📝 Respostas:', answers)
    console.log('💬 Comentários:', comments)
    console.log('🌍 Idioma:', language)
    

    
    try {
      // Chamar API do GPT-3.5
      const response = await fetch('/api/ai-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answers,
          comments,
          language
        }),
      });

      if (!response.ok) {
        throw new Error('Erro na API');
      }

      const aiResults = await response.json();
      console.log('🤖 Resultados do GPT-3.5:', aiResults);

      // Redirecionar para a página de resultados
      const answersParam = encodeURIComponent(JSON.stringify(answers));
      const commentsParam = encodeURIComponent(comments);
      const resultsUrl = `/resultados?answers=${answersParam}&comments=${commentsParam}`;
      
      // Abrir em nova aba
      window.open(resultsUrl, '_blank');
      
      console.log('🚀 Redirecionando para:', resultsUrl);
      
    } catch (error) {
      console.error('❌ Erro na análise GPT-3.5:', error);
      alert('Erro na análise. Tente novamente.');
    }
  }

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }))
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      setShowComments(true)
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      setShowComments(true)
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const handleStartOver = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setComments('')
    setShowComments(false)
  }

  return (
    <>
      <main style={{ position: 'relative', overflow: 'hidden', background: 'white' }}>
        {/* Header */}
        <header style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          padding: '1rem 0',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          position: 'sticky',
          top: 0,
          zIndex: 1000
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexShrink: 0 }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #22c55e, #3b82f6)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 900,
                  fontSize: '1.2rem'
                }}>
                  M
                </div>
                <span style={{
                  fontSize: '1.5rem',
                  fontWeight: 900,
                  background: 'linear-gradient(135deg, #22c55e, #3b82f6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  MeuPortalFit
                </span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <a href="/produtos" style={{ textDecoration: 'none' }}>
                  <button style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.6rem 1.2rem',
                    background: 'transparent',
                    color: '#6b7280',
                    border: '1px solid #e5e7eb',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    transition: 'all 0.3s ease'
                  }}>
                    <span>🛍️</span>
                    <span>Produtos</span>
                  </button>
                </a>
                <a href="/suporte" style={{ textDecoration: 'none' }}>
                  <button style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.6rem 1.2rem',
                    background: 'transparent',
                    color: '#6b7280',
                    border: '1px solid #e5e7eb',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    transition: 'all 0.3s ease'
                  }}>
                    <span>💬</span>
                    <span>Suporte</span>
                  </button>
                </a>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <span style={{ color: '#6b7280', fontSize: '0.9rem', fontWeight: 500 }}>Idioma:</span>
                  <div style={{ display: 'flex', gap: '0.3rem' }}>
                    <button
                      onClick={() => setLanguage('pt')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        padding: '0.4rem 0.8rem',
                        background: language === 'pt' ? 'linear-gradient(135deg, #22c55e, #3b82f6)' : 'transparent',
                        color: language === 'pt' ? 'white' : '#6b7280',
                        border: language === 'pt' ? 'none' : '1px solid #e5e7eb',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        fontWeight: language === 'pt' ? 600 : 400,
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <span>🇧🇷</span>
                      <span>PT</span>
                    </button>
                    <button
                      onClick={() => setLanguage('es')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        padding: '0.4rem 0.8rem',
                        background: language === 'es' ? 'linear-gradient(135deg, #22c55e, #3b82f6)' : 'transparent',
                        color: language === 'es' ? 'white' : '#6b7280',
                        border: language === 'es' ? 'none' : '1px solid #e5e7eb',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        fontWeight: language === 'es' ? 600 : 400,
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <span>🇪🇸</span>
                      <span>ES</span>
                    </button>
                    <button
                      onClick={() => setLanguage('en')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        padding: '0.4rem 0.8rem',
                        background: language === 'en' ? 'linear-gradient(135deg, #22c55e, #3b82f6)' : 'transparent',
                        color: language === 'en' ? 'white' : '#6b7280',
                        border: language === 'en' ? 'none' : '1px solid #e5e7eb',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        fontWeight: language === 'en' ? 600 : 400,
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <span>🇺🇸</span>
                      <span>EN</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section style={{
          background: 'linear-gradient(135deg, #f0fdf4 0%, #eff6ff 50%, #f0f9ff 100%)',
          padding: '2rem 0',
          position: 'relative',
          overflow: 'hidden',
          minHeight: 'auto'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem', position: 'relative', zIndex: 10, textAlign: 'center' }}>
            <h1 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: '1rem',
              color: '#1f2937',
              whiteSpace: 'pre-line'
            }}>
              <span style={{ background: 'linear-gradient(135deg, #22c55e, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Avaliação Gratuita
              </span>
              <br />
              <span style={{ color: '#3b82f6' }}>feita por Inteligência Artificial</span>
            </h1>
          </div>
        </section>

        {/* Quiz Section */}
        <section style={{ background: 'white', padding: '2rem 0' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
            {!showComments ? (
              <div>
                {/* Progress Bar */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: currentQuestion === 0 ? '1rem' : '2rem',
                  padding: currentQuestion === 0 ? '0.5rem' : '1rem',
                  background: '#f8fafc',
                  borderRadius: '12px',
                  border: '2px solid #e0f2e9'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <div style={{
                      width: currentQuestion === 0 ? '30px' : '40px',
                      height: currentQuestion === 0 ? '30px' : '40px',
                      background: 'linear-gradient(135deg, #22c55e, #3b82f6)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 900,
                      fontSize: currentQuestion === 0 ? '0.9rem' : '1.2rem'
                    }}>
                      {currentQuestion + 1}
                    </div>
                    <div>
                      <div style={{
                        fontSize: currentQuestion === 0 ? '0.9rem' : '1.1rem',
                        fontWeight: 600,
                        color: '#1e293b'
                      }}>
                        {currentQuestion + 1} {t('progressOf')} {questions.length}
                      </div>
                      <div style={{
                        fontSize: currentQuestion === 0 ? '0.8rem' : '0.9rem',
                        color: '#6b7280'
                      }}>
                        {Math.round(((currentQuestion + 1) / questions.length) * 100)}% completo
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleStartOver}
                    style={{
                      padding: '0.5rem 1rem',
                      background: 'transparent',
                      color: '#6b7280',
                      border: '1px solid #e5e7eb',
                      borderRadius: '20px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    🔄 Recomeçar
                  </button>
                </div>

                {/* Question */}
                <div style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '12px',
                  marginBottom: '2rem',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  border: '3px solid #e0f2e9'
                }}>
                  <h2 style={{
                    fontSize: isMobile ? '1.3rem' : '1.6rem',
                    color: '#1e293b',
                    marginBottom: '2rem',
                    fontWeight: 'bold',
                    lineHeight: '1.4'
                  }}>
                    {questions[currentQuestion].text}
                  </h2>
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                    gap: '1rem'
                  }}>
                    {questions[currentQuestion].answers.map((answer) => (
                      <button
                        key={answer}
                        onClick={() => handleAnswer(questions[currentQuestion].id, answer)}
                        style={{
                          padding: '1.5rem',
                          background: answers[questions[currentQuestion].id] === answer ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'white',
                          color: answers[questions[currentQuestion].id] === answer ? 'white' : '#1e293b',
                          border: answers[questions[currentQuestion].id] === answer ? 'none' : '2px solid #e0f2e9',
                          borderRadius: '12px',
                          cursor: 'pointer',
                          fontSize: '1rem',
                          fontWeight: 500,
                          textAlign: 'left',
                          transition: 'all 0.3s ease',
                          boxShadow: answers[questions[currentQuestion].id] === answer ? '0 8px 25px rgba(34, 197, 94, 0.3)' : '0 2px 10px rgba(0,0,0,0.1)'
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem'
                        }}>
                          <div style={{
                            width: '30px',
                            height: '30px',
                            background: answers[questions[currentQuestion].id] === answer ? 'rgba(255,255,255,0.2)' : '#f0fdf4',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            fontSize: '1.1rem'
                          }}>
                            {answer.toUpperCase()}
                          </div>
                          <span style={{ lineHeight: '1.4' }}>
                            {t(`answer${questions[currentQuestion].id}${answer}`)}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Navigation */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <button
                    onClick={handleBack}
                    disabled={currentQuestion === 0}
                    style={{
                      padding: '1rem 2rem',
                      background: currentQuestion === 0 ? '#f3f4f6' : 'linear-gradient(135deg, #6b7280, #4b5563)',
                      color: currentQuestion === 0 ? '#9ca3af' : 'white',
                      border: 'none',
                      borderRadius: '25px',
                      cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer',
                      fontSize: '1rem',
                      fontWeight: 600,
                      transition: 'all 0.3s ease',
                      opacity: currentQuestion === 0 ? 0.5 : 1
                    }}
                  >
                    ← Anterior
                  </button>
                  
                  <button
                    onClick={handleNext}
                    disabled={!answers[questions[currentQuestion].id]}
                    style={{
                      padding: '1rem 2rem',
                      background: !answers[questions[currentQuestion].id] ? '#f3f4f6' : 'linear-gradient(135deg, #22c55e, #16a34a)',
                      color: !answers[questions[currentQuestion].id] ? '#9ca3af' : 'white',
                      border: 'none',
                      borderRadius: '25px',
                      cursor: !answers[questions[currentQuestion].id] ? 'not-allowed' : 'pointer',
                      fontSize: '1rem',
                      fontWeight: 600,
                      transition: 'all 0.3s ease',
                      opacity: !answers[questions[currentQuestion].id] ? 0.5 : 1
                    }}
                  >
                    {currentQuestion === questions.length - 1 ? t('seeResults') : t('nextButton')}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {/* Additional Information */}
                <div style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '12px',
                  marginBottom: '2rem',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  border: '3px solid #e0f2e9'
                }}>
                  <h2 style={{
                    fontSize: isMobile ? '1.4rem' : '1.6rem',
                    color: '#1e293b',
                    marginBottom: '1.5rem',
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}>
                    {t('additionalInfo')}
                  </h2>
                  
                  <textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder={t('additionalInfoPlaceholder')}
                    style={{
                      width: '100%',
                      minHeight: '120px',
                      padding: '1rem',
                      border: '2px solid #e0f2e9',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                      lineHeight: '1.5'
                    }}
                  />
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '2rem'
                  }}>
                    <button
                      onClick={analyzeProfile}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '1rem 2rem',
                        background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '25px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: 600,
                        transition: 'all 0.3s ease',
                        boxShadow: '0 10px 25px rgba(34, 197, 94, 0.4)'
                      }}
                    >
                      {t('seeResults')}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Footer Compacto */}
        <footer style={{
          background: '#1f2937',
          color: 'white',
          padding: '1.5rem 0',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '0 1rem'
          }}>
            <p style={{ color: '#9ca3af', fontSize: '0.8rem' }}>
              {t('footerText')}
            </p>
          </div>
        </footer>
      </main>
    </>
  )
}
