import { useState, useEffect } from 'react'

interface Signal {
  txt: string
  time: string
}

const allSignals = [
  'Neuer CMO bei Maschinenbau AG',
  'Neuer Fertigungsleiter Lebensmittelwerk NRW',
  'Standorterweiterung in Sachsen angekündigt',
  'Neuer Head of Sales DACH bei SaaS-Anbieter',
  'Investitionsmeldung für neue Produktionslinie',
  'Neue Werke in Polen und Tschechien geplant',
  'Neue Werkleitung im Automotive-Zulieferer',
  'Strategiewechsel Richtung Eigenmarken',
  'Neue Digitalisierungsinitiative im Konzern',
  'Neuer Geschäftsführer im Familienunternehmen',
  'Greenfield-Projekt für neues Werk',
  'Neue Abfüllanlage für Getränkekonzern',
  'Neuer Leiter Instandhaltung Food-Produktion',
  'Standortschließung und Verlagerung angekündigt',
  'Neue Rolle VP Operations Europa',
  'M&A-Gerüchte im Mittelstand',
  'Neue Kooperation mit Handelsketten',
  'Neuer CIO mit Industrie-Fokus',
  'Eröffnung Logistikzentrum in Bayern',
  'Neuer Leiter Supply Chain in Österreich',
  'Restrukturierung Vertrieb Chemiekonzern',
  'Neuer VP Engineering bei Tech-Startup',
  'Expansionspläne Osteuropa angekündigt',
  'Neuer CEO im Mittelständler Metallbau',
  'Digital Transformation Officer ernannt',
  'Neues Werk für E-Mobilität geplant',
  'Neuer Leiter Einkauf Pharma-Unternehmen',
  'Fusion zweier Zulieferer bestätigt',
  'Neuer Head of Product bei B2B-SaaS',
  'Kapazitätserweiterung Verpackungsindustrie',
  'Neuer Standort in der Schweiz eröffnet',
  'Chief Revenue Officer Position besetzt',
  'Neue Partnerschaft mit Logistikdienstleister',
  'Neuer Leiter Qualitätsmanagement Food',
  'Internationalisierung Richtung USA',
  'Neuer Managing Director DACH Region'
]

export const useSignalFeed = () => {
  const [signals, setSignals] = useState<Signal[]>([
    { txt: 'Neuer CMO bei Maschinenbau AG', time: '2m' },
    { txt: 'Neuer Fertigungsleiter Lebensmittelwerk NRW', time: '5m' },
    { txt: 'Standorterweiterung in Sachsen angekündigt', time: '12m' },
    { txt: 'Investitionsmeldung für neue Produktionslinie', time: '24m' },
    { txt: 'Neue Werke in Polen und Tschechien geplant', time: '45m' },
    { txt: 'Neuer Head of Sales DACH bei SaaS-Anbieter', time: '52m' },
    { txt: 'Digital Transformation Officer ernannt', time: '1h' },
    { txt: 'Neuer CEO im Mittelständler Metallbau', time: '1.5h' },
    { txt: 'Restrukturierung Vertrieb Chemiekonzern', time: '2h' },
    { txt: 'Neue Rolle VP Operations Europa', time: '3h' }
  ])

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>

    const updateFeed = () => {
      setSignals(prev => {
        const availableSignals = allSignals.filter(
          s => !prev.some(ds => ds.txt === s)
        )
        const randomSig = availableSignals.length
          ? availableSignals[Math.floor(Math.random() * availableSignals.length)]
          : allSignals[0]

        const updated = [
          { txt: randomSig, time: 'jetzt' },
          ...prev.map((sig, index) => {
            if (index > 0) {
              if (sig.time.includes('m')) {
                const current = parseInt(sig.time, 10)
                if (!isNaN(current)) {
                  return { ...sig, time: `${current + Math.floor(Math.random() * 3) + 1}m` }
                }
              } else if (sig.time === 'jetzt') {
                return { ...sig, time: '1m' }
              }
            }
            return sig
          })
        ]

        return updated.slice(0, 12)
      })

      const randomDelay = Math.random() * (5000 - 2000) + 2000
      timeoutId = setTimeout(updateFeed, randomDelay)
    }

    const initialDelay = Math.random() * (5000 - 2000) + 2000
    timeoutId = setTimeout(updateFeed, initialDelay)

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  return signals
}

