import { Button } from '../Button/Button'
import './HeroSection.css'

export interface HeroSectionProps {
  headlinePrefix?: string
  headlineHighlight?: string
  headlineSuffix?: string
  subheadline?: string
  ctaLabel?: string
  imageSrc?: string
  imageAlt?: string
  metricValue?: string
  metricLabel?: string
}

const defaultHeroProps: Required<HeroSectionProps> = {
  headlinePrefix: 'Erstgespräche für Ihren ',
  headlineHighlight: 'Vertrieb.',
  headlineSuffix: '',
  subheadline:
    'Keine nervigen Skripte, keine Spam-Mails, nur echte Gespräche mit Menschen, die Ihr Produkt brauchen könnten. Wir finden sie, qualifizieren sie und liefern Ihnen validierte Termine.',
  ctaLabel: 'Quatsch mit Christian',
  imageSrc: '/hero.jpg',
  imageAlt: 'Sellerate Team',
  metricValue: '+12',
  metricLabel: 'Valide Erstgespräche / Monat',
}

export const HeroSection = (props: HeroSectionProps) => {
  const {
    headlinePrefix,
    headlineHighlight,
    headlineSuffix,
    subheadline,
    ctaLabel,
    imageSrc,
    imageAlt,
    metricValue,
    metricLabel,
  } = { ...defaultHeroProps, ...props }

  return (
    <section className="hero-section">
      <div className="hero-layout">
        <div className="hero-copy">
          <h1 className="hero-headline">
            {headlinePrefix}
            <span className="text-gradient">{headlineHighlight}</span>
            {headlineSuffix}
          </h1>
          <p className="hero-subheadline">{subheadline}</p>
          <div className="hero-cta">
            <Button magnetic>{ctaLabel}</Button>
          </div>
        </div>
        <div className="hero-visual">
          <img 
            src={imageSrc} 
            alt={imageAlt} 
            className="hero-image"
          />
          <div className="hero-image-overlay">
            <div className="hero-metric">
              <span className="hero-metric-value">{metricValue}</span>
              <span className="hero-metric-label">{metricLabel}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
