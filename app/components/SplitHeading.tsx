'use client'

import { useEffect, useRef, useState } from 'react'

/*
 * Woord-voor-woord reveal (zoals morgeninternet.nl): elk woord komt van
 * onderin (translateY 100%) met een overshoot/veer-easing naar zijn plek,
 * licht na elkaar gestaggerd. `lines` renderen als losse blokregels zodat
 * bestaande handmatige <br/>-opmaak vervangen kan worden.
 */
interface SplitHeadingProps {
  lines: string[]
  as?: 'h1' | 'h2' | 'h3'
  className?: string
  lineClassName?: string
  /** Extern gestuurde zichtbaarheid (bv. één trigger voor een hele sectie met
   * meerdere koppen). Laat weg voor het standaardgedrag: eigen IntersectionObserver. */
  revealed?: boolean
}

export default function SplitHeading({ lines, as: Tag = 'h2', className = '', lineClassName = '', revealed }: SplitHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null)
  const [ownVisible, setOwnVisible] = useState(false)
  const visible = revealed ?? ownVisible

  useEffect(() => {
    if (revealed !== undefined) return
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOwnVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0, rootMargin: '0px 0px -20% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [revealed])

  let wordIndex = 0

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, li) => (
        <span key={li} className={`block ${lineClassName}`}>
          {line.split(' ').map((word, wi) => {
            const i = wordIndex++
            return (
              <span
                key={wi}
                className="inline-block"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(100%)',
                  transition: `opacity 2s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.05}s, transform 2s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.05}s`,
                }}
              >
                {word}
                {wi < line.split(' ').length - 1 ? ' ' : ''}
              </span>
            )
          })}
        </span>
      ))}
    </Tag>
  )
}
