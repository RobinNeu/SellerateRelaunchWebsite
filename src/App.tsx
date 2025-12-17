import { Navigate, Route, Routes } from 'react-router-dom'

import { MarketingPage } from './pages/MarketingPage'
import { PuckEditorPage } from './pages/PuckEditorPage'
import { PuckRenderPage } from './pages/PuckRenderPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MarketingPage />} />
      <Route path="/editor" element={<PuckEditorPage />} />
      <Route path="/page" element={<PuckRenderPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
