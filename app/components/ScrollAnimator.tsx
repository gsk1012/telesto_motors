'use client'

import { useEffect } from 'react'

export default function ScrollAnimator() {
  useEffect(() => {
    const els = document.querySelectorAll('.animate-on-scroll')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            el.style.animationDelay = el.dataset.delay ?? '0s'
            el.classList.add('animate-fade-up')
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.12 }
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return null
}
