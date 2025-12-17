import { GlassPanel } from '../GlassPanel/GlassPanel'
import './EvidenceSection.css'

export interface EvidenceSectionProps {
  sectionId?: string
  sectionTitle?: string
  badge?: string
  caseTitle?: string
  caseText?: string
  metricValue?: string
  metricLabel?: string
}

const defaultEvidenceProps: Required<EvidenceSectionProps> = {
  sectionId: 'usecases',
  sectionTitle: 'Use Cases',
  badge: 'Case Study',
  caseTitle: 'Maschinenbauer aus Niederbayern',
  caseText:
    'Der Vertrieb war gut besetzt, aber nicht durchgehend ausgelastet. Gemeinsam haben wir eine Zielkundenliste aufgebaut und Signale über Dealfront definiert. Wir sprechen neue Fertigungsleiter an, die in den letzten 90 Tagen ihren Job in der Lebensmittelindustrie begonnen haben. So legen wir für diesen Kunden im Schnitt ein zusätzliches valides Erstgespräch pro Woche oben auf die Pipeline.',
  metricValue: '+1',
  metricLabel: 'valides Erstgespräch pro Woche',
}

export const EvidenceSection = (props: EvidenceSectionProps) => {
  const { sectionId, sectionTitle, badge, caseTitle, caseText, metricValue, metricLabel } = {
    ...defaultEvidenceProps,
    ...props,
  }
  return (
    <section id={sectionId} className="evidence-section">
      <div className="section-header">
        <h2 className="section-title">{sectionTitle}</h2>
      </div>
      <GlassPanel className="case-study-container">
        <div className="case-study-bg"></div>
        <div className="case-study-content">
          <div className="case-study-badge">{badge}</div>
          <h3 className="case-study-title">{caseTitle}</h3>
          <p className="case-study-text">
            {caseText}
          </p>
        </div>
        <div className="case-study-metric">
          <span className="metric-value">{metricValue}</span>
          <span className="metric-label">{metricLabel}</span>
        </div>
      </GlassPanel>
    </section>
  )
}

