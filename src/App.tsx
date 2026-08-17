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
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
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
