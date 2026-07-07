'use client'

/*
 * Cross-browser parallax for a full-bleed section image. The image is scaled
 * up to create headroom, then drifted vertically based on how far its section
 * has travelled through the viewport. Runs a rAF loop only while the section is
 * on screen (started/stopped by an IntersectionObserver), writes the transform
 * straight to the DOM (no React state), and collapses to a static, slightly
 * zoomed image under prefers-reduced-motion.
 */

import { useEffect, useRef } from 'react'
import Image from 'next/image'

interface ParallaxImageProps {
  src: string
  alt: string
  sizes?: string
  priority?: boolean
  className?: string
  /** Zoom applied to create drift headroom. Lower = less zoomed-in. */
  scale?: number
  /** Max drift as a fraction of the element height. Keep <= (scale - 1) / 2 so edges never show. */
  strength?: number
}

export default function ParallaxImage({
  src,
  alt,
  sizes = '100vw',
  priority,
  className = 'object-cover object-center',
  scale = 1.12,
  strength = 0.05,
}: ParallaxImageProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const inner = innerRef.current
    if (!wrap || !inner) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    let running = false

    const update = () => {
      const rect = wrap.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      // -1 when the section sits below the viewport, +1 when above, 0 when centred.
      const denom = vh / 2 + rect.height / 2
      const progress = Math.max(-1, Math.min(1, (rect.top + rect.height / 2 - vh / 2) / denom))
      const y = -progress * strength * rect.height
      inner.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(${scale})`
      raf = requestAnimationFrame(update)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true
          raf = requestAnimationFrame(update)
        } else if (!entry.isIntersecting && running) {
          running = false
          cancelAnimationFrame(raf)
        }
      },
      { threshold: 0 },
    )
    io.observe(wrap)

    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [strength, scale])

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden">
      <div
        ref={innerRef}
        className="absolute inset-0 will-change-transform"
        style={{ transform: `scale(${scale})` }}
      >
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className={className} />
      </div>
    </div>
  )
}
