import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import EngineSection from './components/EngineSection'
import CodeToWorld from './components/CodeToWorld'
import BattlefieldSection from './components/BattlefieldSection'
import TeamSection from './components/TeamSection'
import TechArtSection from './components/TechArtSection'
import FinalSection from './components/FinalSection'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lenis = new Lenis({
      // Short easing keeps the tactile smoothness without visibly trailing the wheel.
      duration: reduceMotion ? 0 : 0.95,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const onTick = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    const refresh = () => ScrollTrigger.refresh()
    requestAnimationFrame(refresh)
    document.fonts?.ready.then(refresh)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(onTick)
    }
  }, [])

  return (
    <div style={{ background: '#080808', color: '#e8e0d0' }}>
      <Navbar />
      <Hero />
      <EngineSection />
      <CodeToWorld />
      <BattlefieldSection />
      <TeamSection />
      <TechArtSection />
      <FinalSection />
    </div>
  )
}
