import './ShredderSection.css'
import { ScrollReveal } from '../ScrollReveal/ScrollReveal'

export interface ShredderSectionProps {
  sectionId?: string
  title?: string
  body?: string
}

const defaultShredderProps: Required<ShredderSectionProps> = {
  sectionId: 'mission',
  title: 'Wir mögen Agenturen auch nicht.',
  body: 'Viele Agenturen hinterlassen Chaos. Nervige Skripte und aggressives Verhalten schaden Ihrer Marke. Wir glauben daran, dass Vertrieb sich gut anfühlen darf – für beide Seiten.',
}

export const ShredderSection = (props: ShredderSectionProps) => {
  const { sectionId, title, body } = { ...defaultShredderProps, ...props }

  return (
    <section id={sectionId} className="shredder-section">
      <div className="shredder-full">
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={5}
          blurStrength={10}
          containerClassName="shredder-reveal-title"
        >
          {title}
        </ScrollReveal>

        <ScrollReveal
          baseOpacity={0.08}
          enableBlur={true}
          baseRotation={3}
          blurStrength={8}
          containerClassName="shredder-reveal-body"
          textClassName="shredder-reveal-body-text"
        >
          {body}
        </ScrollReveal>
      </div>
    </section>
  )
}
