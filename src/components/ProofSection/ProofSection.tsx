import { GlassPanel } from '../GlassPanel/GlassPanel'
import './ProofSection.css'

export interface ProofSectionProps {
  sectionId?: string
  imageSrc?: string
  imageAlt?: string
  quote?: string
  paragraph?: string
  signature?: string
}

const defaultProofProps: Required<ProofSectionProps> = {
  sectionId: 'proof',
  imageSrc: '/christian2.jpg',
  imageAlt: 'Geschäftsführer',
  quote: '"Wir wollen beweisen, dass Akquise auch angenehm sein kann."',
  paragraph:
    'Unser Anspruch: Wenn wir jemanden kontaktieren, soll sich das Gespräch für die Person lohnen. Egal ob sie kauft oder nicht. Das ist der Sellerate Standard.',
  signature: 'Christian Kaizik, Geschäftsführer Sellerate',
}

export const ProofSection = (props: ProofSectionProps) => {
  const { sectionId, imageSrc, imageAlt, quote, paragraph, signature } = {
    ...defaultProofProps,
    ...props,
  }
  return (
    <section id={sectionId} className="proof-section">
      <GlassPanel className="proof-card">
        <img
          className="proof-card-image"
          src={imageSrc}
          alt={imageAlt}
          loading="lazy"
        />
      </GlassPanel>
      <div className="proof-text">
        <h2 className="section-title">{quote}</h2>
        <p className="section-paragraph large">
          {paragraph}
        </p>
        <div className="principles-divider">
          <svg className="principles-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .5l9 9-9 9-9-9 9-9z" />
          </svg>
          <span className="principles-text">{signature}</span>
        </div>
      </div>
    </section>
  )
}

