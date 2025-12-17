import { useEffect, RefObject } from 'react'

export const useScrollReveal = (ref: RefObject<HTMLElement>, threshold = 0.4) => {
  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [ref, threshold])
}

