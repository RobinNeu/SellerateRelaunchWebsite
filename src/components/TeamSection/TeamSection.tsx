import { Button } from '../Button/Button'
import { GlassPanel } from '../GlassPanel/GlassPanel'
import './TeamSection.css'

export interface TeamMember {
  name: string
  position: string
  description: string
  linkedinUrl?: string
  image?: string
}

const defaultTeamMembers: TeamMember[] = [
  {
    name: 'Kami Sango',
    position: 'SDR',
    description: 'Spezialist für qualifizierte Erstgespräche und Lead-Generierung.',
    linkedinUrl: '#',
    image: '/kami.jpg'
  },
  {
    name: 'Kevin Hildebrandt',
    position: 'SDR',
    description: 'Experte für B2B-Akquise und Kundenqualifizierung.',
    linkedinUrl: '#',
    image: '/kevin.jpg'
  },
  {
    name: 'Robert Girardi',
    position: 'SDR',
    description: 'Fokus auf strategische Kundenansprache und Terminbuchung.',
    linkedinUrl: '#',
    image: '/robert.jpg'
  },
  {
    name: 'Robin Neu-Breitmayer',
    position: 'Marketing',
    description: 'Verantwortlich für Brand Awareness und Marketing-Strategien.',
    linkedinUrl: '#',
    image: '/robin.jpg'
  },
  {
    name: 'Christian Kaizik',
    position: 'Geschäftsführung',
    description: 'Visionär für agile Sales Validation und Vertriebsinnovation.',
    linkedinUrl: '#',
    image: '/christian.jpg'
  },
  {
    name: 'Richard Karpe',
    position: 'SDR',
    description: 'Profi für Signal-basierte Akquise und Peer-to-Peer Outreach.',
    linkedinUrl: '#',
    image: '/richard.jpg'
  },
  {
    name: 'Tariq Baig',
    position: 'IT-Guy',
    description: 'Technischer Experte für Systeme und Automatisierung.',
    linkedinUrl: '#',
    image: '/tariq.jpg'
  },
  {
    name: 'Kathrin Kaizik',
    position: 'Projektmanagerin',
    description: 'Koordinierung von Projekten und Kundenbetreuung.',
    linkedinUrl: '#',
    image: '/katrin.jpg'
  },
  {
    name: 'Natalia Hoffmann',
    position: 'Sales Consultant',
    description: 'Beratung für optimale Vertriebsprozesse und Strategien.',
    linkedinUrl: '#'
  }
]

export interface TeamSectionProps {
  sectionId?: string
  title?: string
  members?: TeamMember[]
  primaryCtaLabel?: string
  primaryCtaHref?: string
  linkedinLabel?: string
}

const defaultTeamProps: Required<TeamSectionProps> = {
  sectionId: 'team',
  title: 'Das Team',
  members: defaultTeamMembers,
  primaryCtaLabel: 'Termin buchen',
  primaryCtaHref: '#contact',
  linkedinLabel: 'LinkedIn',
}

export const TeamSection = (props: TeamSectionProps) => {
  const { sectionId, title, members, primaryCtaLabel, primaryCtaHref, linkedinLabel } = {
    ...defaultTeamProps,
    ...props,
  }

  const safeMembers = members ?? []
  const scrollingMembers = [...safeMembers, ...safeMembers]

  return (
    <section id={sectionId} className="team-section">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
      </div>

      <div className="team-slider-wrapper">
        <div className="team-slider-track">
          {scrollingMembers.map((member, index) => (
            <GlassPanel key={`${member.name}-${index}`} className="team-member-card">
              <div className="team-member-content">
                <div className="team-member-avatar">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="team-member-photo" />
                  ) : (
                    <div className="team-member-initials">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                </div>
                <h3 className="team-member-name">{member.name}</h3>
                <p className="team-member-position">{member.position}</p>
                <p className="team-member-description">{member.description}</p>
                <div className="team-member-actions">
                  <Button 
                    variant="primary" 
                    onClick={() => (window.location.href = primaryCtaHref)}
                  >
                    {primaryCtaLabel}
                  </Button>
                  {member.linkedinUrl && (
                    <Button 
                      variant="secondary"
                      onClick={() => window.open(member.linkedinUrl, '_blank')}
                    >
                      {linkedinLabel}
                    </Button>
                  )}
                </div>
              </div>
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  )
}

