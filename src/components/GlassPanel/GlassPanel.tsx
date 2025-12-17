import { ReactNode, forwardRef, CSSProperties } from 'react'
import './GlassPanel.css'

interface GlassPanelProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  style?: CSSProperties
}

export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ children, className = '', onClick, style }, ref) => {
    return (
      <div ref={ref} className={`glass-panel ${className}`} onClick={onClick} style={style}>
        {children}
      </div>
    )
  }
)

GlassPanel.displayName = 'GlassPanel'

