import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Puck, type Data } from '@measured/puck'

import { puckConfig } from '../puck/config'
import { clearPuckData, loadPuckData, savePuckData } from '../puck/storage'

const defaultData: Data = {
  content: [
    {
      type: 'HeroSection',
      props: {
        id: 'hero',
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
      },
    },
    {
      type: 'ShredderSection',
      props: {
        id: 'mission',
        sectionId: 'mission',
        title: 'Wir mögen Agenturen auch nicht.',
        body: 'Viele Agenturen hinterlassen Chaos. Nervige Skripte und aggressives Verhalten schaden Ihrer Marke. Wir glauben daran, dass Vertrieb sich gut anfühlen darf – für beide Seiten.',
      },
    },
    {
      type: 'ListenSection',
      props: {
        id: 'anhoeren',
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
      },
    },
    {
      type: 'SystemSection',
      props: {
        id: 'system',
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
      },
    },
    {
      type: 'TeamSection',
      props: {
        id: 'team',
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
      },
    },
    {
      type: 'ProcessSection',
      props: {
        id: 'prozess',
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
      },
    },
    {
      type: 'EvidenceSection',
      props: {
        id: 'evidenz',
        sectionId: 'usecases',
        sectionTitle: 'Use Cases',
        badge: 'Case Study',
        caseTitle: 'Maschinenbauer aus Niederbayern',
        caseText:
          'Der Vertrieb war gut besetzt, aber nicht durchgehend ausgelastet. Gemeinsam haben wir eine Zielkundenliste aufgebaut und Signale über Dealfront definiert. Wir sprechen neue Fertigungsleiter an, die in den letzten 90 Tagen ihren Job in der Lebensmittelindustrie begonnen haben. So legen wir für diesen Kunden im Schnitt ein zusätzliches valides Erstgespräch pro Woche oben auf die Pipeline.',
        metricValue: '+1',
        metricLabel: 'valides Erstgespräch pro Woche',
      },
    },
    {
      type: 'ProofSection',
      props: {
        id: 'beweise',
        sectionId: 'proof',
        imageSrc: '/christian2.jpg',
        imageAlt: 'Geschäftsführer',
        quote: '"Wir wollen beweisen, dass Akquise auch angenehm sein kann."',
        paragraph:
          'Unser Anspruch: Wenn wir jemanden kontaktieren, soll sich das Gespräch für die Person lohnen. Egal ob sie kauft oder nicht. Das ist der Sellerate Standard.',
        signature: 'Christian Kaizik, Geschäftsführer Sellerate',
      },
    },
    {
      type: 'ResourcesSection',
      props: {
        id: 'ressourcen',
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
      },
    },
    {
      type: 'ChecklistSection',
      props: {
        id: 'checkliste',
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
      },
    },
  ],
  root: { props: {} },
}

export function PuckEditorPage() {
  const initial = useMemo(() => loadPuckData() ?? defaultData, [])
  const [data, setData] = useState<Data>(initial)

  return (
    <div style={{ minHeight: '100vh' }}>
      <div
        style={{
          display: 'flex',
          gap: 12,
          alignItems: 'center',
          padding: 12,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(0,0,0,0.35)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <strong>Puck Editor</strong>
        <span style={{ opacity: 0.65 }}>|</span>
        <Link to="/" style={{ color: 'inherit', opacity: 0.85 }}>
          Landingpage
        </Link>
        <Link to="/page" style={{ color: 'inherit', opacity: 0.85 }}>
          Vorschau/Render
        </Link>
        <button
          type="button"
          onClick={() => {
            clearPuckData()
            setData(defaultData)
          }}
          style={{
            marginLeft: 8,
            padding: '6px 10px',
            borderRadius: 10,
            border: '1px solid rgba(255,255,255,0.15)',
            background: 'rgba(255,255,255,0.06)',
            color: 'inherit',
            cursor: 'pointer',
          }}
          title="Löscht localStorage und setzt die Seite auf Default zurück"
        >
          Reset
        </button>
        <span style={{ marginLeft: 'auto', opacity: 0.65 }}>
          Speichert aktuell in localStorage
        </span>
      </div>
      <Puck
        config={puckConfig}
        data={data}
        onChange={(next) => setData(next)}
        onPublish={(published) => {
          savePuckData(published)
          setData(published)
        }}
      />
    </div>
  )
}


