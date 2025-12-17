import { useRef, useState } from 'react'
import { Button } from '../Button/Button'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import './ChecklistSection.css'

export interface ChecklistItem {
  id: string
  text: string
}

export interface ChecklistSectionProps {
  sectionId?: string
  headline?: string
  subheadline?: string
  items?: ChecklistItem[]
  ctaLabel?: string
}

const defaultChecklistProps: Required<ChecklistSectionProps> = {
  sectionId: 'contact',
  headline: 'Wir haben drei konkrete Ideen für Ihren Vertrieb.',
  subheadline:
    'Nehmen Sie sich 30 Minuten Zeit und wir zeigen Ihnen, was wir für Sie umsetzen würden. Prüfen Sie kurz, ob die folgenden Punkte auf Sie zutreffen.',
  items: [
    { id: '1', text: 'Ein Termin ist für uns mehr als 200 € wert.' },
    { id: '2', text: 'Wir haben ein Vertriebsteam, das wir besser auslasten möchten.' },
    { id: '3', text: 'Wir sind bereit, mehr als 3.000 € pro Monat zu investieren.' },
  ],
  ctaLabel: 'Okay, zeigen Sie mir die 3 Ideen',
}

export const ChecklistSection = (props: ChecklistSectionProps) => {
  const { sectionId, headline, subheadline, items, ctaLabel } = {
    ...defaultChecklistProps,
    ...props,
  }

  const safeItems: ChecklistItem[] = (items ?? []).map((item, index) => ({
    id: item?.id?.length ? item.id : String(index + 1),
    text: item?.text ?? '',
  }))

  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())
  const listRef = useRef<HTMLDivElement>(null)

  useScrollReveal(listRef, 0.2)

  const handleCheck = (id: string) => {
    setCheckedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const allChecked = safeItems.length > 0 && safeItems.length === checkedItems.size

  return (
    <section id={sectionId} className="checklist-section">
      <div className="final-cta-glow"></div>
      <h2 className="final-cta-headline">{headline}</h2>
      <p className="final-cta-subheadline">{subheadline}</p>

      <div ref={listRef} className="checklist-container">
        {safeItems.map((item) => (
          <label
            key={item.id}
            className={`checklist-item ${checkedItems.has(item.id) ? 'is-checked' : ''}`}
          >
            <input
              type="checkbox"
              className="checklist-input"
              checked={checkedItems.has(item.id)}
              onChange={() => handleCheck(item.id)}
            />
            <span className="checklist-checkbox" aria-hidden="true">
              <svg className="checklist-check" viewBox="0 0 24 24">
                <path
                  d="M20 6L9 17l-5-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="checklist-text">{item.text}</span>
          </label>
        ))}
      </div>

      <div className={`checklist-cta-container ${allChecked ? 'visible' : ''}`}>
        <Button size="large" magnetic>
          {ctaLabel}
        </Button>
      </div>
    </section>
  )
}

