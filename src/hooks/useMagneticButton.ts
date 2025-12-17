import { useEffect, RefObject } from 'react'

export const useMagneticButton = (ref: RefObject<HTMLElement>, strength = 0.25) => {
  useEffect(() => {
    const btn = ref.current
    if (!btn) return

    const closestArea =
      (btn.closest('.hero-section') as HTMLElement | null) ??
      (btn.closest('.checklist-section') as HTMLElement | null)

    const area: Document | HTMLElement = closestArea ?? document

    const handleMove = (evt: Event) => {
      const e = evt as globalThis.MouseEvent
      const rect = btn.getBoundingClientRect()
      const btnCenterX = rect.left + rect.width / 2
      const btnCenterY = rect.top + rect.height / 2
      const deltaX = e.clientX - btnCenterX
      const deltaY = e.clientY - btnCenterY
      const maxDist = 60
      const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      const clamped = Math.min(dist, maxDist)
      const ratio = dist === 0 ? 0 : clamped / dist
      const moveX = deltaX * ratio * strength
      const moveY = deltaY * ratio * strength
      btn.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`
    }

    const reset = () => {
      btn.style.transform = 'translate3d(0,0,0)'
    }

    area.addEventListener('mousemove', handleMove)
    area.addEventListener('mouseleave', reset)

    return () => {
      area.removeEventListener('mousemove', handleMove)
      area.removeEventListener('mouseleave', reset)
    }
  }, [ref, strength])
}

