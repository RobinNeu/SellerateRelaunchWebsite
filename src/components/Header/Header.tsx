import { useState, useRef } from 'react'
import { 
  IconHome, 
  IconBulb, 
  IconTools, 
  IconPackage, 
  IconUsers,
  IconMessageCircle
} from '@tabler/icons-react'
import { 
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react"
import './Header.css'

type NavItem = { label: string; desc: string; href?: string }
type NavCard = { title: string; items: NavItem[] }

const navCards: NavCard[] = [
  {
    title: 'Home',
    items: [
      { label: 'Hero', desc: '„Vertrieb beginnt nicht beim ersten Kontakt – sondern bei Klarheit."', href: '#top' },
      { label: 'Sales Readiness Test', desc: 'CTA: Klarheit prüfen und Lücken erkennen', href: '#contact' },
      { label: 'Vorvertriebs-Tools', desc: 'ICP, Value Props, Angebote vorbereiten', href: '#tools' },
      { label: 'Produktisierte Sales-Services', desc: 'Outbound, Inbound, Closing-Pakete', href: '#services' },
      { label: 'Case Studies', desc: 'Erfolge & Beispiele', href: '#cases' }
    ]
  },
  {
    title: 'Warum SELLERATE',
    items: [
      { label: 'Unser Ansatz', desc: 'Vertrieb beginnt vor dem Vertrieb. Automatisierung & Klarheit.', href: '#approach' },
      { label: 'Probleme, die wir lösen', desc: 'Zielgruppe, Value Proposition, Angebot, Prozess, Pipeline', href: '#problems' },
      { label: 'Unsere Methode', desc: 'Discovery → Vorbereitung → Validierung → Skalierung', href: '#method' }
    ]
  },
  {
    title: 'Tools & Pre-Sales Engine™',
    items: [
      { label: 'Zielgruppen & Markt', desc: 'ICP Scanner, Potenzialanalyse, Buyer Personas', href: '#tools-market' },
      { label: 'Positionierung & Messaging', desc: 'Value Prop Generator, One-Liner, Stress Test', href: '#tools-messaging' },
      { label: 'Angebot & Pricing', desc: 'Offer-Clarity, Pricing-Check, Wettbewerbs-Analyse', href: '#tools-offer' },
      { label: 'Vertriebsprozess', desc: 'Readiness Score, Lead-Qualifizierung, Journey Heatmap', href: '#tools-process' },
      { label: 'Kreativ & Conversion', desc: 'Cold Message Builder, Pitch Simulator, LP-Analyse', href: '#tools-creative' }
    ]
  },
  {
    title: 'Services (produktisiert)',
    items: [
      { label: 'Outbound Services', desc: 'CallStarter/Pro/Enterprise · SocialConnect · OutboundMailer', href: '#services-outbound' },
      { label: 'Inbound Services', desc: 'AdStarter/Pro/Scale · PageBoost Pakete', href: '#services-inbound' },
      { label: 'Vertrieb & Closing', desc: 'Sales Assistant, DealCloser, Pipeline Pro, Sales Ops', href: '#services-closing' },
      { label: 'Kreative & Messaging', desc: 'Cold Message Rewrite, Pitch Deck Fix, Offer Repackaging', href: '#services-creative' }
    ]
  },
  {
    title: 'Team',
    items: [
      { label: 'Mission & Team', desc: 'Warum wir bauen, wer liefert', href: '#team' },
      { label: 'Presse & Jobs', desc: 'Profile, Medien, offene Rollen', href: '#about' },
      { label: 'Kontakt', desc: 'Erstgespräch oder Readiness-Test', href: '#contact' }
    ]
  }
]

interface DockItemConfig {
  id: string
  title: string
  icon: React.ReactNode
  href: string
}

const dockItems: DockItemConfig[] = [
  { id: 'home', title: 'Home', icon: <IconHome />, href: '#top' },
  { id: 'why', title: 'Warum Sellerate', icon: <IconBulb />, href: '#mission' },
  { id: 'tools', title: 'Tools', icon: <IconTools />, href: '#system' },
  { id: 'services', title: 'Services', icon: <IconPackage />, href: '#process' },
  { id: 'team', title: 'Team', icon: <IconUsers />, href: '#team' },
  { id: 'contact', title: 'Kontakt', icon: <IconMessageCircle />, href: '#contact' }
]

const getCardsForDockItem = (id: string): NavCard[] => {
  switch (id) {
    case 'home':
      return navCards.filter((c) => c.title.toLowerCase().startsWith('home'))
    case 'why':
      return navCards.filter((c) => c.title.toLowerCase().includes('warum'))
    case 'tools':
      return navCards.filter((c) => c.title.toLowerCase().startsWith('tools'))
    case 'services':
      return navCards.filter((c) => c.title.toLowerCase().startsWith('services'))
    case 'team':
      return navCards.filter((c) => c.title.toLowerCase().includes('team'))
    default:
      return []
  }
}

function DockIcon({
  mouseX,
  item,
  onHover,
  isActive,
}: {
  mouseX: MotionValue
  item: DockItemConfig
  onHover: (id: string | null) => void
  isActive: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  const widthTransform = useTransform(distance, [-150, 0, 150], [48, 72, 48])
  const heightTransform = useTransform(distance, [-150, 0, 150], [48, 72, 48])
  const widthTransformIcon = useTransform(distance, [-150, 0, 150], [22, 32, 22])
  const heightTransformIcon = useTransform(distance, [-150, 0, 150], [22, 32, 22])

  const width = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 })
  const height = useSpring(heightTransform, { mass: 0.1, stiffness: 150, damping: 12 })
  const widthIcon = useSpring(widthTransformIcon, { mass: 0.1, stiffness: 150, damping: 12 })
  const heightIcon = useSpring(heightTransformIcon, { mass: 0.1, stiffness: 150, damping: 12 })

  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      style={{ width, height }}
      onMouseEnter={() => {
        setHovered(true)
        onHover(item.id)
      }}
      onMouseLeave={() => setHovered(false)}
      className={`dock-icon ${isActive ? 'is-active' : ''}`}
    >
      <motion.div
        style={{ width: widthIcon, height: heightIcon }}
        className="dock-icon-inner"
      >
        {item.icon}
      </motion.div>
      <span className={`dock-icon-label ${hovered || isActive ? 'is-visible' : ''}`}>
        {item.title}
      </span>
    </motion.div>
  )
}

export const Header = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const mouseX = useMotionValue(Infinity)
  const headerRef = useRef<HTMLDivElement>(null)

  const activeCards = activeItem ? getCardsForDockItem(activeItem) : []

  const handleMouseLeave = () => {
    setIsMenuOpen(false)
    setActiveItem(null)
    mouseX.set(Infinity)
  }

  return (
    <header 
      className="dock-header" 
      ref={headerRef}
      onMouseLeave={handleMouseLeave}
    >
      {/* Logo */}
      <a href="#top" className="dock-logo">
        <img src="/logo.png" alt="Sellerate" className="dock-logo-img" />
      </a>

      {/* Dock Container */}
      <div className="dock-container">
        <motion.div
          className="dock-bar"
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
        >
          {dockItems.map((item) => (
            <DockIcon
              key={item.id}
              mouseX={mouseX}
              item={item}
              onHover={(id) => {
                setActiveItem(id)
                setIsMenuOpen(id !== 'contact' && id !== null)
              }}
              isActive={activeItem === item.id}
            />
          ))}
        </motion.div>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isMenuOpen && activeCards.length > 0 && (
            <motion.div
              className="dock-dropdown"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="dock-dropdown-inner">
                {activeCards.map((card) => (
                  <div key={card.title} className="dock-dropdown-section">
                    <h3 className="dock-dropdown-title">{card.title}</h3>
                    <ul className="dock-dropdown-list">
                      {card.items.map((item) => (
                        <li key={item.label}>
                          <a href={item.href || '#'} className="dock-dropdown-link">
                            <span className="dock-dropdown-label">{item.label}</span>
                            <span className="dock-dropdown-desc">{item.desc}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
