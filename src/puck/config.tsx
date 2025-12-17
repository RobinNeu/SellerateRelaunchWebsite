import type { Config } from '@measured/puck'
import type { ReactNode } from 'react'

import { Aurora } from '../components/Aurora/Aurora'
import { Footer } from '../components/Footer/Footer'
import { Header } from '../components/Header/Header'
import { HeroSection, type HeroSectionProps } from '../components/HeroSection/HeroSection'
import { ShredderSection, type ShredderSectionProps } from '../components/ShredderSection/ShredderSection'
import { ListenSection, type ListenSectionProps } from '../components/ListenSection/ListenSection'
import { SystemSection, type SystemSectionProps } from '../components/SystemSection/SystemSection'
import { TeamSection, type TeamSectionProps } from '../components/TeamSection/TeamSection'
import { ProcessSection, type ProcessSectionProps } from '../components/ProcessSection/ProcessSection'
import { EvidenceSection, type EvidenceSectionProps } from '../components/EvidenceSection/EvidenceSection'
import { ProofSection, type ProofSectionProps } from '../components/ProofSection/ProofSection'
import { ResourcesSection, type ResourcesSectionProps } from '../components/ResourcesSection/ResourcesSection'
import { ChecklistSection, type ChecklistSectionProps } from '../components/ChecklistSection/ChecklistSection'

export const puckConfig: Config = {
  root: {
    label: 'Seite (Layout)',
    fields: {},
    defaultProps: {},
    render: ({ children }: { children: ReactNode }) => {
      return (
        <>
          <div className="aurora-global">
            <Aurora
              colorStops={['#00E1FF', '#7C5CFF', '#FF4EA3']}
              blend={0.5}
              amplitude={1.0}
              speed={0.5}
            />
          </div>
          <Header />
          <main className="main-container">{children}</main>
          <Footer />
        </>
      )
    },
  },
  categories: {
    sellerate: {
      title: 'Sellerate Sektionen',
      components: [
        'HeroSection',
        'ShredderSection',
        'ListenSection',
        'SystemSection',
        'TeamSection',
        'ProcessSection',
        'EvidenceSection',
        'ProofSection',
        'ResourcesSection',
        'ChecklistSection',
      ],
    },
    content: {
      title: 'Inhalte',
      components: ['Heading', 'Text'],
    },
  },
  components: {
    Heading: {
      label: 'Überschrift',
      fields: {
        text: { type: 'text' },
        level: {
          type: 'select',
          options: [
            { label: 'H1', value: 'h1' },
            { label: 'H2', value: 'h2' },
            { label: 'H3', value: 'h3' },
          ],
        },
      },
      defaultProps: { text: 'Überschrift', level: 'h2' },
      render: (props) => {
        const { text, level } = props as { text?: string; level?: 'h1' | 'h2' | 'h3' }
        const Tag = (level ?? 'h2') as 'h1' | 'h2' | 'h3'
        return <Tag style={{ margin: '0 0 12px' }}>{text}</Tag>
      },
    },
    Text: {
      label: 'Text',
      fields: { text: { type: 'textarea' } },
      defaultProps: { text: 'Text...' },
      render: (props) => {
        const { text } = props as { text?: string }
        return <p style={{ margin: '0 0 16px', opacity: 0.9 }}>{text}</p>
      },
    },
    HeroSection: {
      label: 'Hero',
      fields: {
        headlinePrefix: { type: 'text', label: 'Headline (Prefix)' },
        headlineHighlight: { type: 'text', label: 'Headline (Highlight)' },
        headlineSuffix: { type: 'text', label: 'Headline (Suffix)' },
        subheadline: { type: 'textarea', label: 'Subheadline' },
        ctaLabel: { type: 'text', label: 'CTA Label' },
        imageSrc: { type: 'text', label: 'Bild (Src)' },
        imageAlt: { type: 'text', label: 'Bild (Alt)' },
        metricValue: { type: 'text', label: 'Metric Wert' },
        metricLabel: { type: 'text', label: 'Metric Label' },
      },
      defaultProps: {
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
      } satisfies HeroSectionProps,
      render: (props) => <HeroSection {...(props as HeroSectionProps)} />,
    },
    ShredderSection: {
      label: 'Mission',
      fields: {
        sectionId: { type: 'text', label: 'Anker (id)' },
        title: { type: 'text', label: 'Titel' },
        body: { type: 'textarea', label: 'Text' },
      },
      defaultProps: {
        sectionId: 'mission',
        title: 'Wir mögen Agenturen auch nicht.',
        body: 'Viele Agenturen hinterlassen Chaos. Nervige Skripte und aggressives Verhalten schaden Ihrer Marke. Wir glauben daran, dass Vertrieb sich gut anfühlen darf – für beide Seiten.',
      } satisfies ShredderSectionProps,
      render: (props) => <ShredderSection {...(props as ShredderSectionProps)} />,
    },
    ListenSection: {
      label: 'Anhören',
      fields: {
        sectionId: { type: 'text', label: 'Anker (id)' },
        title: { type: 'text', label: 'Titel' },
        text: { type: 'textarea', label: 'Text' },
        audioSrc: { type: 'text', label: 'Audio (Src)' },
        phoneImageSrc: { type: 'text', label: 'Telefonbild (Src)' },
        phoneImageAlt: { type: 'text', label: 'Telefonbild (Alt)' },
        labelPlay: { type: 'text', label: 'Label (Play)' },
        labelPause: { type: 'text', label: 'Label (Pause)' },
        labelMissing: { type: 'text', label: 'Label (Fehlt)' },
        hintText: { type: 'textarea', label: 'Hinweistext (wenn Audio fehlt)' },
      },
      defaultProps: {
        sectionId: 'listen',
        title: 'Hören Sie doch mal rein',
        text: '5 spezialisierte Seller, damit wir auf Augenhöhe mit Entscheidern sprechen können.',
        audioSrc: '/demo.mp3',
        phoneImageSrc: '/phone.png',
        phoneImageAlt: 'Telefon',
        labelPlay: 'Abspielen',
        labelPause: 'Pause',
        labelMissing: 'MP3 fehlt noch',
        hintText: 'Upload die MP3 bitte nach /public (z.B. demo.mp3) – dann spielt sie hier automatisch ab.',
      } satisfies ListenSectionProps,
      render: (props) => <ListenSection {...(props as ListenSectionProps)} />,
    },
    SystemSection: {
      label: 'System',
      fields: {
        sectionId: { type: 'text', label: 'Anker (id)' },
        sectionTitle: { type: 'text', label: 'Titel' },
        pipelineTitle: { type: 'text', label: 'Kachel: Pipeline Titel' },
        pipelineText: { type: 'textarea', label: 'Kachel: Pipeline Text' },
        compassTitle: { type: 'text', label: 'Kachel: Kompass Titel' },
        compassSubtitle: { type: 'text', label: 'Kachel: Kompass Subtitle' },
        matchLabel: { type: 'text', label: 'Kachel: Match Label' },
        compassIntroText: { type: 'textarea', label: 'Kachel: Intro Text' },
        successTitle: { type: 'text', label: 'Erfolg: Titel' },
        successText: { type: 'text', label: 'Erfolg: Text' },
      },
      defaultProps: {
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
      } satisfies SystemSectionProps,
      render: (props) => <SystemSection {...(props as SystemSectionProps)} />,
    },
    TeamSection: {
      label: 'Team',
      fields: {
        sectionId: { type: 'text', label: 'Anker (id)' },
        title: { type: 'text', label: 'Titel' },
        primaryCtaLabel: { type: 'text', label: 'Button: Primär Label' },
        primaryCtaHref: { type: 'text', label: 'Button: Primär Link' },
        linkedinLabel: { type: 'text', label: 'Button: LinkedIn Label' },
        members: {
          type: 'array',
          label: 'Teammitglieder',
          arrayFields: {
            name: { type: 'text', label: 'Name' },
            position: { type: 'text', label: 'Rolle' },
            description: { type: 'textarea', label: 'Beschreibung' },
            linkedinUrl: { type: 'text', label: 'LinkedIn URL' },
            image: { type: 'text', label: 'Bild (Src)' },
          },
          defaultItemProps: { name: '', position: '', description: '', linkedinUrl: '', image: '' },
          getItemSummary: (item) => item.name || 'Neues Teammitglied',
        },
      },
      defaultProps: {
        sectionId: 'team',
        title: 'Das Team',
        primaryCtaLabel: 'Termin buchen',
        primaryCtaHref: '#contact',
        linkedinLabel: 'LinkedIn',
        members: [
          {
            name: 'Kami Sango',
            position: 'SDR',
            description: 'Spezialist für qualifizierte Erstgespräche und Lead-Generierung.',
            linkedinUrl: '#',
            image: '/kami.jpg',
          },
          {
            name: 'Kevin Hildebrandt',
            position: 'SDR',
            description: 'Experte für B2B-Akquise und Kundenqualifizierung.',
            linkedinUrl: '#',
            image: '/kevin.jpg',
          },
          {
            name: 'Robert Girardi',
            position: 'SDR',
            description: 'Fokus auf strategische Kundenansprache und Terminbuchung.',
            linkedinUrl: '#',
            image: '/robert.jpg',
          },
          {
            name: 'Robin Neu-Breitmayer',
            position: 'Marketing',
            description: 'Verantwortlich für Brand Awareness und Marketing-Strategien.',
            linkedinUrl: '#',
            image: '/robin.jpg',
          },
          {
            name: 'Christian Kaizik',
            position: 'Geschäftsführung',
            description: 'Visionär für agile Sales Validation und Vertriebsinnovation.',
            linkedinUrl: '#',
            image: '/christian.jpg',
          },
          {
            name: 'Richard Karpe',
            position: 'SDR',
            description: 'Profi für Signal-basierte Akquise und Peer-to-Peer Outreach.',
            linkedinUrl: '#',
            image: '/richard.jpg',
          },
          {
            name: 'Tariq Baig',
            position: 'IT-Guy',
            description: 'Technischer Experte für Systeme und Automatisierung.',
            linkedinUrl: '#',
            image: '/tariq.jpg',
          },
          {
            name: 'Kathrin Kaizik',
            position: 'Projektmanagerin',
            description: 'Koordinierung von Projekten und Kundenbetreuung.',
            linkedinUrl: '#',
            image: '/katrin.jpg',
          },
          {
            name: 'Natalia Hoffmann',
            position: 'Sales Consultant',
            description: 'Beratung für optimale Vertriebsprozesse und Strategien.',
            linkedinUrl: '#',
            image: '',
          },
        ],
      } satisfies TeamSectionProps,
      render: (props) => <TeamSection {...(props as TeamSectionProps)} />,
    },
    ProcessSection: {
      label: 'Prozess',
      fields: {
        sectionId: { type: 'text', label: 'Anker (id)' },
        title: { type: 'text', label: 'Titel' },
        paragraph: { type: 'textarea', label: 'Einleitung' },
        steps: {
          type: 'array',
          label: 'Schritte',
          arrayFields: {
            number: { type: 'text', label: 'Nummer' },
            title: { type: 'text', label: 'Titel' },
            text: { type: 'textarea', label: 'Text' },
            imageSrc: { type: 'text', label: 'Bild (Src)' },
            imageAlt: { type: 'text', label: 'Bild (Alt)' },
          },
          defaultItemProps: { number: '', title: '', text: '', imageSrc: '', imageAlt: '' },
          getItemSummary: (item) => `${item.number || ''} ${item.title || 'Neuer Schritt'}`.trim(),
        },
      },
      defaultProps: {
        sectionId: 'process',
        title: 'So arbeiten wir zusammen',
        paragraph:
          'Ein klarer Sprint vom Kaltkontakt zum validierten Erstgespräch. Ohne Theater, ohne 30-Seiten-Pitchdeck. Vier Schritte, die Ihr Vertriebsteam sofort versteht.',
        steps: [
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
          },
        ],
      } satisfies ProcessSectionProps,
      render: (props) => <ProcessSection {...(props as ProcessSectionProps)} />,
    },
    EvidenceSection: {
      label: 'Evidenz',
      fields: {
        sectionId: { type: 'text', label: 'Anker (id)' },
        sectionTitle: { type: 'text', label: 'Titel' },
        badge: { type: 'text', label: 'Badge' },
        caseTitle: { type: 'text', label: 'Case Titel' },
        caseText: { type: 'textarea', label: 'Case Text' },
        metricValue: { type: 'text', label: 'Metric Wert' },
        metricLabel: { type: 'text', label: 'Metric Label' },
      },
      defaultProps: {
        sectionId: 'usecases',
        sectionTitle: 'Use Cases',
        badge: 'Case Study',
        caseTitle: 'Maschinenbauer aus Niederbayern',
        caseText:
          'Der Vertrieb war gut besetzt, aber nicht durchgehend ausgelastet. Gemeinsam haben wir eine Zielkundenliste aufgebaut und Signale über Dealfront definiert. Wir sprechen neue Fertigungsleiter an, die in den letzten 90 Tagen ihren Job in der Lebensmittelindustrie begonnen haben. So legen wir für diesen Kunden im Schnitt ein zusätzliches valides Erstgespräch pro Woche oben auf die Pipeline.',
        metricValue: '+1',
        metricLabel: 'valides Erstgespräch pro Woche',
      } satisfies EvidenceSectionProps,
      render: (props) => <EvidenceSection {...(props as EvidenceSectionProps)} />,
    },
    ProofSection: {
      label: 'Beweise',
      fields: {
        sectionId: { type: 'text', label: 'Anker (id)' },
        imageSrc: { type: 'text', label: 'Bild (Src)' },
        imageAlt: { type: 'text', label: 'Bild (Alt)' },
        quote: { type: 'textarea', label: 'Zitat' },
        paragraph: { type: 'textarea', label: 'Text' },
        signature: { type: 'text', label: 'Signatur' },
      },
      defaultProps: {
        sectionId: 'proof',
        imageSrc: '/christian2.jpg',
        imageAlt: 'Geschäftsführer',
        quote: '"Wir wollen beweisen, dass Akquise auch angenehm sein kann."',
        paragraph:
          'Unser Anspruch: Wenn wir jemanden kontaktieren, soll sich das Gespräch für die Person lohnen. Egal ob sie kauft oder nicht. Das ist der Sellerate Standard.',
        signature: 'Christian Kaizik, Geschäftsführer Sellerate',
      } satisfies ProofSectionProps,
      render: (props) => <ProofSection {...(props as ProofSectionProps)} />,
    },
    ResourcesSection: {
      label: 'Ressourcen',
      fields: {
        sectionId: { type: 'text', label: 'Anker (id)' },
        title: { type: 'text', label: 'Titel' },
        hint: { type: 'text', label: 'Hinweis' },
        comingSoonLabel: { type: 'text', label: 'Footer Label' },
        resources: {
          type: 'array',
          label: 'Karten',
          arrayFields: {
            badge: { type: 'text', label: 'Badge' },
            title: { type: 'text', label: 'Titel' },
            text: { type: 'textarea', label: 'Text' },
            authorName: { type: 'text', label: 'Autor' },
            authorImage: { type: 'text', label: 'Autor Bild (Src)' },
          },
          defaultItemProps: { badge: '', title: '', text: '', authorName: '', authorImage: '' },
          getItemSummary: (item) => item.title || 'Neue Karte',
        },
      },
      defaultProps: {
        sectionId: 'resources',
        title: 'Blog und Ressourcen',
        hint: 'Demnächst verfügbar',
        comingSoonLabel: 'Kommt bald',
        resources: [
          {
            badge: 'Artikel',
            title: 'Was ein valides Erstgespräch wirklich ausmacht',
            text: 'Ein kurzer Leitfaden, wie Sie Ihre Pipeline von "interessantem Smalltalk" auf messbare, vertriebsrelevante Gespräche umstellen.',
            authorName: 'Kami Sango',
            authorImage: '/kami.jpg',
          },
          {
            badge: 'Guide',
            title: 'Signal-basierter Vertrieb für B2B',
            text: 'Wie Sie Jobwechsel, Standorterweiterungen und strategische Initiativen nutzen, um im richtigen Moment anzurufen.',
            authorName: 'Robin Neu-Breitmayer',
            authorImage: '/robin.jpg',
          },
          {
            badge: 'Playbook',
            title: 'Peer-to-Peer statt Skript-Schule',
            text: 'Wie Ihre Fachleute ohne Verkaufsbühne überzeugender sind als jedes Callcenter.',
            authorName: 'Robert Girardi',
            authorImage: '/robert.jpg',
          },
        ],
      } satisfies ResourcesSectionProps,
      render: (props) => <ResourcesSection {...(props as ResourcesSectionProps)} />,
    },
    ChecklistSection: {
      label: 'Checkliste',
      fields: {
        sectionId: { type: 'text', label: 'Anker (id)' },
        headline: { type: 'text', label: 'Headline' },
        subheadline: { type: 'textarea', label: 'Subheadline' },
        items: {
          type: 'array',
          label: 'Punkte',
          arrayFields: {
            id: { type: 'text', label: 'ID' },
            text: { type: 'text', label: 'Text' },
          },
          defaultItemProps: { id: '', text: '' },
          getItemSummary: (item) => item.text || 'Neuer Punkt',
        },
        ctaLabel: { type: 'text', label: 'CTA Label' },
      },
      defaultProps: {
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
      } satisfies ChecklistSectionProps,
      render: (props) => <ChecklistSection {...(props as ChecklistSectionProps)} />,
    },
  },
}


