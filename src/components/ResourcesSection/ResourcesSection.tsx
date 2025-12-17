import { GlassPanel } from '../GlassPanel/GlassPanel'
import './ResourcesSection.css'

export interface Resource {
  badge: string
  title: string
  text: string
  authorName: string
  authorImage: string
}

const defaultResources: Resource[] = [
  {
    badge: 'Artikel',
    title: 'Was ein valides Erstgespräch wirklich ausmacht',
    text: 'Ein kurzer Leitfaden, wie Sie Ihre Pipeline von "interessantem Smalltalk" auf messbare, vertriebsrelevante Gespräche umstellen.',
    authorName: 'Kami Sango',
    authorImage: '/kami.jpg'
  },
  {
    badge: 'Guide',
    title: 'Signal-basierter Vertrieb für B2B',
    text: 'Wie Sie Jobwechsel, Standorterweiterungen und strategische Initiativen nutzen, um im richtigen Moment anzurufen.',
    authorName: 'Robin Neu-Breitmayer',
    authorImage: '/robin.jpg'
  },
  {
    badge: 'Playbook',
    title: 'Peer-to-Peer statt Skript-Schule',
    text: 'Wie Ihre Fachleute ohne Verkaufsbühne überzeugender sind als jedes Callcenter.',
    authorName: 'Robert Girardi',
    authorImage: '/robert.jpg'
  }
]

export interface ResourcesSectionProps {
  sectionId?: string
  title?: string
  hint?: string
  resources?: Resource[]
  comingSoonLabel?: string
}

const defaultResourcesProps: Required<ResourcesSectionProps> = {
  sectionId: 'resources',
  title: 'Blog und Ressourcen',
  hint: 'Demnächst verfügbar',
  resources: defaultResources,
  comingSoonLabel: 'Kommt bald',
}

export const ResourcesSection = (props: ResourcesSectionProps) => {
  const { sectionId, title, hint, resources, comingSoonLabel } = {
    ...defaultResourcesProps,
    ...props,
  }
  const safeResources = resources ?? []
  return (
    <section className="resources-section" id={sectionId}>
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        <span className="section-header-hint">{hint}</span>
      </div>
      <div className="resources-grid">
        {safeResources.map((resource, index) => (
          <GlassPanel key={index} className="resource-card">
            <span className="resource-badge">{resource.badge}</span>
            <h3 className="resource-title">{resource.title}</h3>
            <p className="resource-text">{resource.text}</p>
            <div className="resource-footer">
              <div className="resource-author">
                <img
                  className="resource-author-avatar"
                  src={resource.authorImage}
                  alt={resource.authorName}
                  loading="lazy"
                />
                <span className="resource-author-name">{resource.authorName}</span>
              </div>
              <div className="resource-link">{comingSoonLabel}</div>
            </div>
          </GlassPanel>
        ))}
      </div>
    </section>
  )
}

