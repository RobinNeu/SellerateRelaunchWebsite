import { useState, useEffect } from 'react'
import { GlassPanel } from '../GlassPanel/GlassPanel'
import { PipelineCalculator } from '../PipelineCalculator/PipelineCalculator'
import { SignalRadar } from '../SignalRadar/SignalRadar'
import './SystemSection.css'

// Sellerate's actual values
const SELLERATE_VALUES = {
  speed: 80,
  delegation: 50,
  ambiguity: 90,
  conflict: 60
}

const TOLERANCE = 15 // How close they need to be to "match"

interface SliderConfig {
  id: keyof typeof SELLERATE_VALUES
  label: string
  leftLabel: string
  rightLabel: string
}

const sliders: SliderConfig[] = [
  {
    id: 'speed',
    label: 'Perfektionismus vs. Schnelligkeit',
    leftLabel: 'Perfektionismus',
    rightLabel: 'Schnelligkeit'
  },
  {
    id: 'delegation',
    label: 'Grad der Selbstbeteiligung',
    leftLabel: 'Mitarbeiten',
    rightLabel: 'Abgeben'
  },
  {
    id: 'ambiguity',
    label: 'Toleranz für Unklarheit',
    leftLabel: 'Klare Specs',
    rightLabel: 'Gut mit Ambiguität'
  },
  {
    id: 'conflict',
    label: 'Konfliktstil',
    leftLabel: 'Direkt/Offen',
    rightLabel: 'Moderiert'
  }
]

export interface SystemSectionProps {
  sectionId?: string
  sectionTitle?: string
  pipelineTitle?: string
  pipelineText?: string
  compassTitle?: string
  compassSubtitle?: string
  matchLabel?: string
  compassIntroText?: string
  successTitle?: string
  successText?: string
}

const defaultSystemProps: Required<SystemSectionProps> = {
  sectionId: 'system',
  sectionTitle: 'Sellerate Betriebssystem',
  pipelineTitle: 'Pipeline Velocity Rechner',
  pipelineText:
    'Ein kleines Rechentool, das zeigt, wie sich mehr valide Erstgespräche direkt auf Ihre Pipeline auswirken.',
  compassTitle: 'Kultur-Kompass',
  compassSubtitle: 'Passen wir zusammen?',
  matchLabel: 'Match',
  compassIntroText:
    'Stellen Sie die Regler ein und finden Sie heraus, ob unsere Arbeitsweise zu Ihnen passt.',
  successTitle: 'Perfekt!',
  successText: 'Unsere Arbeitsweisen passen zusammen. Zeit für ein Gespräch?',
}

export const SystemSection = (props: SystemSectionProps) => {
  const {
    sectionId,
    sectionTitle,
    pipelineTitle,
    pipelineText,
    compassTitle,
    compassSubtitle,
    matchLabel,
    compassIntroText,
    successTitle,
    successText,
  } = { ...defaultSystemProps, ...props }
  const [values, setValues] = useState({
    speed: 50,
    delegation: 50,
    ambiguity: 50,
    conflict: 50
  })
  const [matchScore, setMatchScore] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    // Calculate how close they are to Sellerate's values
    let totalDiff = 0
    const keys = Object.keys(SELLERATE_VALUES) as (keyof typeof SELLERATE_VALUES)[]
    
    keys.forEach(key => {
      const diff = Math.abs(values[key] - SELLERATE_VALUES[key])
      totalDiff += diff
    })

    // Convert to a match percentage (0-100)
    const maxDiff = 100 * keys.length // Maximum possible difference
    const score = Math.round(100 - (totalDiff / maxDiff) * 100)
    setMatchScore(score)

    // Check if all values are within tolerance
    const allMatch = keys.every(key => 
      Math.abs(values[key] - SELLERATE_VALUES[key]) <= TOLERANCE
    )
    setShowSuccess(allMatch)
  }, [values])

  const handleSliderChange = (id: keyof typeof SELLERATE_VALUES, value: number) => {
    setValues(prev => ({ ...prev, [id]: value }))
  }

  return (
    <section id={sectionId} className="system-section">
      <div className="section-header">
        <h2 className="section-title">{sectionTitle}</h2>
      </div>

      <div className="bento-grid">
        <div className="bento-column bento-column-signal">
          <GlassPanel className="bento-item signal-radar-card">
            <SignalRadar />
          </GlassPanel>
        </div>

        <div className="bento-column">
          <GlassPanel className="bento-item">
            <h3 className="bento-item-subtitle">{pipelineTitle}</h3>
            <p className="bento-item-text" style={{ marginBottom: '1rem' }}>
              {pipelineText}
            </p>
            <PipelineCalculator />
          </GlassPanel>

          <GlassPanel className={`bento-item compatibility-card ${showSuccess ? 'is-matched' : ''}`}>
            <div className="compatibility-header">
              <div>
                <h3 className="bento-item-subtitle">{compassTitle}</h3>
                <h4 className="bento-item-title small">{compassSubtitle}</h4>
              </div>
              <div className={`match-indicator ${showSuccess ? 'is-success' : ''}`}>
                <span className="match-score">{matchScore}%</span>
                <span className="match-label">{matchLabel}</span>
              </div>
            </div>
            
            <p className="bento-item-text" style={{ marginBottom: '1.25rem' }}>
              {compassIntroText}
            </p>

            <div className="compatibility-sliders">
              {sliders.map(slider => (
                <div key={slider.id} className="compat-slider">
                  <div className="compat-slider-header">
                    <span className="compat-slider-label">{slider.label}</span>
                  </div>
                  <div className="compat-slider-track-wrapper">
                    <span className="compat-slider-end-label">{slider.leftLabel}</span>
                    <div className="compat-slider-track">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={values[slider.id]}
                        onChange={(e) => handleSliderChange(slider.id, parseInt(e.target.value))}
                        className="compat-slider-input"
                      />
                      <div 
                        className="compat-slider-fill" 
                        style={{ width: `${values[slider.id]}%` }}
                      />
                      <div 
                        className="compat-slider-thumb"
                        style={{ left: `${values[slider.id]}%` }}
                      />
                      <div 
                        className="compat-slider-target"
                        style={{ left: `${SELLERATE_VALUES[slider.id]}%` }}
                        title="Sellerate"
                      />
                    </div>
                    <span className="compat-slider-end-label">{slider.rightLabel}</span>
                  </div>
                </div>
              ))}
            </div>

            {showSuccess && (
              <div className="compatibility-success">
                <div className="success-icon">🎯</div>
                <div className="success-text">
                  <strong>{successTitle}</strong> {successText}
                </div>
              </div>
            )}
          </GlassPanel>
        </div>
      </div>
    </section>
  )
}
