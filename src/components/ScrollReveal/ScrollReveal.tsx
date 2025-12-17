import { useLayoutEffect, useMemo, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import './ScrollReveal.css'

gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealProps {
  children: string
  scrollContainerRef?: React.RefObject<HTMLElement>
  enableBlur?: boolean
  baseOpacity?: number
  baseRotation?: number
  blurStrength?: number
  containerClassName?: string
  textClassName?: string
  rotationEnd?: string
  wordAnimationEnd?: string
}

export const ScrollReveal = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  rotationEnd,
  wordAnimationEnd
}: ScrollRevealProps) => {
  const containerRef = useRef<HTMLHeadingElement | null>(null)

  const splitText = useMemo(() => {
    return children.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word
      return (
        <span className="word" key={index}>
          {word}
        </span>
      )
    })
  }, [children])

  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return

    const scroller =
      scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window

    const ctx = gsap.context(() => {
      // Für kurze Elemente (z.B. 1 Zeile Headline) ist "bottom bottom" oft zu kurz und wirkt wie ein Pop-in.
      // Deshalb nutzen wir defaultmäßig eine relative End-Range (+=N), die sich an der Elementhöhe orientiert.
      const elHeight = Math.max(1, el.clientHeight || 1)
      const rotationEndResolved =
        rotationEnd ?? `+=${Math.max(260, Math.round(elHeight * 1.6))}`
      const wordEndResolved =
        wordAnimationEnd ?? `+=${Math.max(420, Math.round(elHeight * 3.2))}`

      gsap.fromTo(
        el,
        { transformOrigin: '0% 50%', rotate: baseRotation },
        {
          ease: 'none',
          rotate: 0,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top 92%',
            end: rotationEndResolved,
            scrub: 0.8
          }
        }
      )

      const wordElements = el.querySelectorAll<HTMLElement>('.word')

      gsap.fromTo(
        wordElements,
        { opacity: baseOpacity, willChange: 'opacity' },
        {
          ease: 'none',
          opacity: 1,
          stagger: 0.045,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top 92%',
            end: wordEndResolved,
            scrub: 0.9
          }
        }
      )

      if (enableBlur) {
        gsap.fromTo(
          wordElements,
          { filter: `blur(${blurStrength}px)` },
          {
            ease: 'none',
            filter: 'blur(0px)',
            stagger: 0.045,
            scrollTrigger: {
              trigger: el,
              scroller,
              start: 'top 92%',
              end: wordEndResolved,
              scrub: 0.9
            }
          }
        )
      }
    }, el)

    return () => {
      ctx.revert()
    }
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength])

  return (
    <h2 ref={containerRef} className={`scroll-reveal ${containerClassName}`.trim()}>
      <p className={`scroll-reveal-text ${textClassName}`.trim()}>{splitText}</p>
    </h2>
  )
}


