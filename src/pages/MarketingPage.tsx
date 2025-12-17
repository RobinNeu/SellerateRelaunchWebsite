import { Aurora } from '../components/Aurora/Aurora'
import { Header } from '../components/Header/Header'
import { HeroSection } from '../components/HeroSection/HeroSection'
import { ShredderSection } from '../components/ShredderSection/ShredderSection'
import { ListenSection } from '../components/ListenSection/ListenSection'
import { SystemSection } from '../components/SystemSection/SystemSection'
import { TeamSection } from '../components/TeamSection/TeamSection'
import { ProcessSection } from '../components/ProcessSection/ProcessSection'
import { EvidenceSection } from '../components/EvidenceSection/EvidenceSection'
import { ProofSection } from '../components/ProofSection/ProofSection'
import { ResourcesSection } from '../components/ResourcesSection/ResourcesSection'
import { ChecklistSection } from '../components/ChecklistSection/ChecklistSection'
import { Footer } from '../components/Footer/Footer'

export function MarketingPage() {
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
      <main className="main-container">
        <HeroSection />
        <ShredderSection />
        <ListenSection />
        <SystemSection />
        <TeamSection />
        <ProcessSection />
        <EvidenceSection />
        <ProofSection />
        <ResourcesSection />
        <ChecklistSection />
      </main>
      <Footer />
    </>
  )
}


