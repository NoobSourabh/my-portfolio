'use client'

import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const intro = 'I build modern frontend experiences that are easy to use, fast to load, and simple to maintain.'
const highlighted = 'The goal is simple: turn ideas into clear, accessible interfaces that feel great on every screen.'

function Words({ children }) {
  return children.split(/(\s+)/).map((part, index) => (
    /^\s+$/.test(part)
      ? part
      : <span className="intro-word" key={`${part}-${index}`}>{part}</span>
  ))
}

export default function ScrollIntro() {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    gsap.registerPlugin(ScrollTrigger)
    const context = gsap.context(() => {
      const firstWords = section.querySelectorAll('[data-intro-line="plain"] .intro-word')
      const highlightedWords = section.querySelectorAll('[data-intro-line="highlight"] .intro-word')
      const highlightSweep = section.querySelector('.highlight-sweep')

      section.dataset.revealActive = 'true'
      gsap.set([...firstWords, ...highlightedWords], { autoAlpha: 0, yPercent: 35 })
      gsap.set(highlightSweep, { backgroundSize: '0% 70%' })

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 76%',
          once: true,
        },
      })

      timeline.to(firstWords, {
        autoAlpha: 1,
        yPercent: 0,
        duration: 0.42,
        ease: 'power2.out',
        stagger: 0.035,
      })
      timeline.to(highlightSweep, {
        backgroundSize: '100% 70%',
        duration: 1.05,
        ease: 'power1.inOut',
      }, '>-0.08')
      timeline.to(highlightedWords, {
        autoAlpha: 1,
        yPercent: 0,
        duration: 0.38,
        ease: 'power2.out',
        stagger: 0.055,
      }, '<')
    }, section)

    return () => context.revert()
  }, [])

  return (
    <div className="scroll-intro" ref={sectionRef}>
      <p className="statement" data-intro-line="plain"><Words>{intro}</Words></p>
      <p className="statement statement-highlight" data-intro-line="highlight"><span className="highlight-sweep"><Words>{highlighted}</Words></span></p>
    </div>
  )
}
