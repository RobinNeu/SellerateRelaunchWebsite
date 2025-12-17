import { useRef, useState, useEffect } from 'react'
import { GlassPanel } from '../GlassPanel/GlassPanel'
import './ProcessSection.css'

export interface ProcessStep {
  number: string
  title: string
  text: string
  imageSrc: string
  imageAlt: string
}

const defaultSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Setup und Hypothesen',
    text: 'Wir definieren gemeinsam Zielkunden, Nutzenversprechen und Kanäle. Daraus entsteht eine fokussierte Lead-Liste, mit der wir den Sprint starten.',
    imageSrc: '/image/step1.jpg',
    imageAlt: 'Schritt 1: Setup und Hypothesen',
  },
  {
    number: '02',
    title: 'Signale und Timing',
    text: 'Wir beobachten relevante Signale im Markt. Zum Beispiel neue Rollen, Werke oder Initiativen. So melden wir uns dann, wenn Ihr Thema wirklich Relevanz hat.',
    imageSrc: '/image/step2.jpg',
    imageAlt: 'Schritt 2: Signale und Timing',
  },
  {
    number: '03',
    title: 'Peer-to-Peer Outreach',
    text: 'Wir kontaktieren Ihre Wunschkunden mit kurzen, respektvollen Nachrichten und Anrufen. Ziel ist ein qualifiziertes Erstgespräch, kein Druckverkauf.',
    imageSrc: '/image/step3.jpg',
    imageAlt: 'Schritt 3: Peer-to-Peer Outreach',
  },
  {
    number: '04',
    title: 'Feedback und Validierung',
    text: 'Am Ende des Sprints haben Sie klare Learnings, echte Termine und ein Bild, welche Zielgruppen und Pitches tragen. Diese Basis können wir gemeinsam skalieren.',
    imageSrc: '/image/step4.jpg',
    imageAlt: 'Schritt 4: Feedback und Validierung',
  }
]

export interface ProcessSectionProps {
  sectionId?: string
  title?: string
  paragraph?: string
  steps?: ProcessStep[]
}

const defaultProcessProps: Required<ProcessSectionProps> = {
  sectionId: 'process',
  title: 'So arbeiten wir zusammen',
  paragraph:
    'Ein klarer Sprint vom Kaltkontakt zum validierten Erstgespräch. Ohne Theater, ohne 30-Seiten-Pitchdeck. Vier Schritte, die Ihr Vertriebsteam sofort versteht.',
  steps: defaultSteps,
}

export const ProcessSection = (props: ProcessSectionProps) => {
  const { sectionId, title, paragraph, steps } = { ...defaultProcessProps, ...props }
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const cards = container.querySelectorAll('.process-text-card')
      const windowHeight = window.innerHeight

      let newActiveIndex = 0
      
      cards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect()
        const cardCenter = cardRect.top + cardRect.height / 2
        const viewportCenter = windowHeight / 2

        // Card is considered active when its center is near the viewport center
        if (cardCenter < viewportCenter + 100) {
          newActiveIndex = index
        }
      })

      setActiveIndex(newActiveIndex)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id={sectionId} className="process-section">
      <div className="process-header">
        <h2 className="section-title">{title}</h2>
        <p className="section-paragraph">{paragraph}</p>
      </div>

      <div className="process-sticky-container" ref={containerRef}>
        {/* Left: Scrolling Text Content */}
        <div className="process-text-column">
          {steps.map((step, index) => (
            <div 
              key={step.number} 
              className={`process-text-card ${activeIndex === index ? 'is-active' : ''}`}
            >
              <GlassPanel className="process-card">
                <div className="process-card-number">{step.number}</div>
                <h3 className="process-card-title">{step.title}</h3>
                <p className="process-card-text">{step.text}</p>
              </GlassPanel>
            </div>
          ))}
        </div>

        {/* Right: Sticky Visual */}
        <div className="process-visual-column">
          <div className="process-visual-sticky">
            <GlassPanel className="process-visual-card">
              {steps.map((step, index) => (
                <div 
                  key={step.number}
                  className={`process-visual-wrapper ${activeIndex === index ? 'is-active' : ''}`}
                >
                  <img
                    src={step.imageSrc}
                    alt={step.imageAlt}
                    className="process-step-image"
                  />
                </div>
              ))}
            </GlassPanel>
          </div>
        </div>
      </div>
    </section>
  )
}
