import { useEffect, useMemo, useRef, useState } from 'react'
import './ListenSection.css'

export interface ListenSectionProps {
  sectionId?: string
  title?: string
  text?: string
  /** Public path, z.B. "/demo.mp3" */
  audioSrc?: string
  phoneImageSrc?: string
  phoneImageAlt?: string
  labelPlay?: string
  labelPause?: string
  labelMissing?: string
  hintText?: string
}

const defaultListenProps: Required<ListenSectionProps> = {
  sectionId: 'listen',
  title: 'Hören Sie doch mal rein',
  text: '5 spezialisierte Seller, damit wir auf Augenhöhe mit Entscheidern sprechen können.',
  audioSrc: '/demo.mp3',
  phoneImageSrc: '/phone.png',
  phoneImageAlt: 'Telefon',
  labelPlay: 'Abspielen',
  labelPause: 'Pause',
  labelMissing: 'MP3 fehlt noch',
  hintText:
    'Upload die MP3 bitte nach /public (z.B. demo.mp3) – dann spielt sie hier automatisch ab.',
}

export const ListenSection = (props: ListenSectionProps) => {
  const {
    sectionId,
    title,
    text,
    audioSrc,
    phoneImageSrc,
    phoneImageAlt,
    labelPlay,
    labelPause,
    labelMissing,
    hintText,
  } = { ...defaultListenProps, ...props }
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasError, setHasError] = useState(false)

  const label = useMemo(() => {
    if (hasError) return labelMissing
    return isPlaying ? labelPause : labelPlay
  }, [hasError, isPlaying, labelMissing, labelPause, labelPlay])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    const onEnded = () => setIsPlaying(false)
    const onError = () => setHasError(true)

    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('error', onError)

    return () => {
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('error', onError)
    }
  }, [])

  const togglePlayback = async () => {
    const audio = audioRef.current
    if (!audio || hasError) return

    try {
      if (audio.paused) {
        await audio.play()
      } else {
        audio.pause()
      }
    } catch {
      setHasError(true)
    }
  }

  return (
    <section id={sectionId} className="listen-section">
      <div className="listen-layout">
        <button
          type="button"
          className={`listen-phone ${isPlaying ? 'is-playing' : ''} ${hasError ? 'has-error' : ''}`}
          onClick={togglePlayback}
          aria-label={label}
        >
          <img className="listen-phone-image" src={phoneImageSrc} alt={phoneImageAlt} />
          <span className="listen-overlay" aria-hidden="true" />
          <span className="listen-chip" aria-hidden="true">
            {label}
          </span>
        </button>

        <div className="listen-copy">
          <h2 className="listen-title">{title}</h2>
          <p className="listen-text">{text}</p>
          {hasError && (
            <p className="listen-hint">
              {hintText}
            </p>
          )}
        </div>
      </div>

      <audio ref={audioRef} preload="none" src={audioSrc} />
    </section>
  )
}


