import { useSignalFeed } from '../../hooks/useSignalFeed'
import './SignalRadar.css'

export const SignalRadar = () => {
  const signals = useSignalFeed()

  return (
    <div className="signal-radar-card">
      <div className="signal-radar-header">
        <div>
          <div className="bento-item-subtitle">Signalradar</div>
          <h3 className="bento-item-title small">Der richtige Moment für den Anruf</h3>
        </div>
        <div className="live-indicator"></div>
      </div>
      <p className="bento-item-text" style={{ marginBottom: '0.75rem' }}>
        Wir beobachten Signale im Markt. Neue Rollen, Strategiewechsel und Expansionen.
        So melden wir uns dann, wenn Ihr Thema gerade auf dem Tisch liegt.
      </p>
      <div className="signal-feed">
        {signals.map((sig, i) => {
          const opacity = Math.max(0.3, 1 - (i * 0.08))
          return (
            <div key={`${sig.txt}-${i}`} className="signal-item" style={{ opacity }}>
              <span className="signal-text">{sig.txt}</span>
              <span className="signal-time">{sig.time}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
