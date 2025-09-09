'use client'

import { useState, useEffect } from 'react'
import Header from '../components/Header'

interface DayPlan {
  day: number
  title: string
  meals: {
    breakfast: string
    snack: string
    lunch: string
    dinner: string
  }
  tasks: string[]
  tips: string[]
  supplements: string[]
}

export default function PWAPage() {
  const [language, setLanguage] = useState<'en' | 'es' | 'pt'>('en')
  const [currentDay, setCurrentDay] = useState(1)
  const [isInstalled, setIsInstalled] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  // Helper function to get day title
  const getDayTitle = (day: number, lang: string = 'en'): string => {
    if (day <= 7) {
      return lang === 'es' ? 'Preparación' : lang === 'pt' ? 'Preparação' : 'Preparation'
    } else if (day <= 14) {
      return lang === 'es' ? 'Implementación' : lang === 'pt' ? 'Implementação' : 'Implementation'
    } else if (day <= 21) {
      return lang === 'es' ? 'Optimización' : lang === 'pt' ? 'Otimização' : 'Optimization'
    } else {
      return lang === 'es' ? 'Consolidación' : lang === 'pt' ? 'Consolidação' : 'Consolidation'
    }
  }

  // Sample 30-day plan data
  const planData: DayPlan[] = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    title: language === 'en' ? `Day ${i + 1} - ${getDayTitle(i + 1)}` :
           language === 'es' ? `Día ${i + 1} - ${getDayTitle(i + 1, 'es')}` :
           `Dia ${i + 1} - ${getDayTitle(i + 1, 'pt')}`,
    meals: {
      breakfast: language === 'en' ? 'Green smoothie with spinach, banana, and protein powder' :
                language === 'es' ? 'Batido verde con espinacas, plátano y proteína en polvo' :
                'Vitamina verde com espinafre, banana e proteína em pó',
      snack: language === 'en' ? 'Handful of almonds and an apple' :
             language === 'es' ? 'Puñado de almendras y una manzana' :
             'Punhado de amêndoas e uma maçã',
      lunch: language === 'en' ? 'Grilled chicken salad with mixed vegetables' :
             language === 'es' ? 'Ensalada de pollo a la plancha con vegetales mixtos' :
             'Salada de frango grelhado com vegetais mistos',
      dinner: language === 'en' ? 'Baked salmon with quinoa and steamed broccoli' :
             language === 'es' ? 'Salmón al horno con quinoa y brócoli al vapor' :
             'Salmão assado com quinoa e brócolis no vapor'
    },
    tasks: [
      language === 'en' ? 'Drink 8 glasses of water' :
      language === 'es' ? 'Beber 8 vasos de agua' :
      'Beber 8 copos de água',
      language === 'en' ? 'Take morning supplements' :
      language === 'es' ? 'Tomar suplementos matutinos' :
      'Tomar suplementos matinais',
      language === 'en' ? '30 minutes of light exercise' :
      language === 'es' ? '30 minutos de ejercicio ligero' :
      '30 minutos de exercício leve'
    ],
    tips: [
      language === 'en' ? 'Focus on whole, unprocessed foods today' :
      language === 'es' ? 'Enfócate en alimentos enteros y sin procesar hoy' :
      'Foque em alimentos integrais e não processados hoje',
      language === 'en' ? 'Listen to your body\'s hunger cues' :
      language === 'es' ? 'Escucha las señales de hambre de tu cuerpo' :
      'Escute os sinais de fome do seu corpo'
    ],
    supplements: [
      language === 'en' ? 'Multivitamin (morning)' :
      language === 'es' ? 'Multivitamínico (mañana)' :
      'Multivitamínico (manhã)',
      language === 'en' ? 'Omega-3 (evening)' :
      language === 'es' ? 'Omega-3 (noche)' :
      'Ômega-3 (noite)'
    ]
  }))

  // PWA Installation
  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration)
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError)
        })
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const installApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      console.log(`User response to the install prompt: ${outcome}`)
      setDeferredPrompt(null)
    }
  }

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission()
      if (permission === 'granted') {
        // Send test notification
        new Notification('CuratePortal', {
          body: 'Welcome to your 30-day wellness journey!',
          icon: '/icon-192x192.png'
        })
      }
    }
  }

  const currentPlan = planData[currentDay - 1]

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)' }}>
      <Header language={language} onLanguageChange={setLanguage} />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {/* PWA Installation Banner */}
        {!isInstalled && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '12px',
            padding: '1rem',
            marginBottom: '2rem',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ color: '#1f2937', marginBottom: '0.5rem' }}>
              {language === 'en' ? 'Install CuratePortal App' :
               language === 'es' ? 'Instalar App CuratePortal' :
               'Instalar App CuratePortal'}
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
              {language === 'en' ? 'Get daily notifications and access your plan offline' :
               language === 'es' ? 'Recibe notificaciones diarias y accede a tu plan sin conexión' :
               'Receba notificações diárias e acesse seu plano offline'}
            </p>
            <button
              onClick={installApp}
              style={{
                background: 'linear-gradient(135deg, #f97316, #ea580c)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                marginRight: '1rem'
              }}
            >
              {language === 'en' ? 'Install App' :
               language === 'es' ? 'Instalar App' :
               'Instalar App'}
            </button>
            <button
              onClick={requestNotificationPermission}
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #1e40af)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              {language === 'en' ? 'Enable Notifications' :
               language === 'es' ? 'Activar Notificaciones' :
               'Ativar Notificações'}
            </button>
          </div>
        )}

        {/* Day Selector */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{ color: '#1f2937', marginBottom: '1rem', textAlign: 'center' }}>
            {language === 'en' ? '30-Day Wellness Plan' :
             language === 'es' ? 'Plan de Bienestar de 30 Días' :
             'Plano de Bem-estar de 30 Dias'}
          </h2>
          
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <select
              value={currentDay}
              onChange={(e) => setCurrentDay(Number(e.target.value))}
              style={{
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '1rem',
                background: 'white',
                minWidth: '200px'
              }}
            >
              {Array.from({ length: 30 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {language === 'en' ? `Day ${i + 1}` :
                   language === 'es' ? `Día ${i + 1}` :
                   `Dia ${i + 1}`}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Daily Plan Content */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ color: '#1f2937', marginBottom: '1.5rem', textAlign: 'center' }}>
            {currentPlan.title}
          </h3>

          {/* Meals Section */}
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ color: '#374151', marginBottom: '1rem', borderBottom: '2px solid #f97316', paddingBottom: '0.5rem' }}>
              {language === 'en' ? 'Daily Meals' :
               language === 'es' ? 'Comidas Diarias' :
               'Refeições Diárias'}
            </h4>
            
            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
              {Object.entries(currentPlan.meals).map(([meal, description]) => (
                <div key={meal} style={{
                  background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
                  padding: '1rem',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb'
                }}>
                  <h5 style={{ color: '#1f2937', marginBottom: '0.5rem', textTransform: 'capitalize' }}>
                    {language === 'en' ? meal :
                     language === 'es' ? (meal === 'breakfast' ? 'Desayuno' : meal === 'lunch' ? 'Almuerzo' : meal === 'dinner' ? 'Cena' : 'Snack') :
                     (meal === 'breakfast' ? 'Café da Manhã' : meal === 'lunch' ? 'Almoço' : meal === 'dinner' ? 'Jantar' : 'Lanche')}
                  </h5>
                  <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>{description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tasks Section */}
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ color: '#374151', marginBottom: '1rem', borderBottom: '2px solid #3b82f6', paddingBottom: '0.5rem' }}>
              {language === 'en' ? 'Daily Tasks' :
               language === 'es' ? 'Tareas Diarias' :
               'Tarefas Diárias'}
            </h4>
            
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              {currentPlan.tasks.map((task, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.75rem',
                  background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)',
                  borderRadius: '8px',
                  border: '1px solid #bae6fd'
                }}>
                  <span style={{ color: '#3b82f6', marginRight: '0.75rem', fontSize: '1.2rem' }}>✓</span>
                  <span style={{ color: '#1e40af' }}>{task}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tips Section */}
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ color: '#374151', marginBottom: '1rem', borderBottom: '2px solid #10b981', paddingBottom: '0.5rem' }}>
              {language === 'en' ? 'Daily Tips' :
               language === 'es' ? 'Consejos Diarios' :
               'Dicas Diárias'}
            </h4>
            
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              {currentPlan.tips.map((tip, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.75rem',
                  background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
                  borderRadius: '8px',
                  border: '1px solid #bbf7d0'
                }}>
                  <span style={{ color: '#10b981', marginRight: '0.75rem', fontSize: '1.2rem' }}>💡</span>
                  <span style={{ color: '#166534' }}>{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Supplements Section */}
          <div>
            <h4 style={{ color: '#374151', marginBottom: '1rem', borderBottom: '2px solid #8b5cf6', paddingBottom: '0.5rem' }}>
              {language === 'en' ? 'Supplements' :
               language === 'es' ? 'Suplementos' :
               'Suplementos'}
            </h4>
            
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              {currentPlan.supplements.map((supplement, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.75rem',
                  background: 'linear-gradient(135deg, #faf5ff, #f3e8ff)',
                  borderRadius: '8px',
                  border: '1px solid #d8b4fe'
                }}>
                  <span style={{ color: '#8b5cf6', marginRight: '0.75rem', fontSize: '1.2rem' }}>💊</span>
                  <span style={{ color: '#6b21a8' }}>{supplement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
