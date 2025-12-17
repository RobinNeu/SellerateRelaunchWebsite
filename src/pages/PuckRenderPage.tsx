import { Link } from 'react-router-dom'
import { Render } from '@measured/puck'

import { puckConfig } from '../puck/config'
import { loadPuckData } from '../puck/storage'

export function PuckRenderPage() {
  const data = loadPuckData()

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
        <strong>Puck Render</strong>
        <span style={{ opacity: 0.65 }}>|</span>
        <Link to="/editor" style={{ color: 'inherit', opacity: 0.85 }}>
          Editor
        </Link>
        <Link to="/" style={{ color: 'inherit', opacity: 0.85 }}>
          Landingpage
        </Link>
      </div>

      {!data ? (
        <div style={{ padding: 24, opacity: 0.85 }}>
          Keine Puck-Daten gefunden. Öffne zuerst den <Link to="/editor">Editor</Link> und klicke
          „Publish“.
        </div>
      ) : (
        <Render config={puckConfig} data={data} />
      )}
    </div>
  )
}


