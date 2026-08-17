import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TECH_NODES = ['CODE', 'ENGINE', 'SYSTEMS']
const ART_NODES = ['VISION', 'CRAFT', 'WORLD']

export default function TechArtSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=130vh',
        pin: pinRef.current,
        scrub: 0.65,
        onUpdate: self => setProgress(current => Math.abs(current - self.progress) < 0.002 ? current : self.progress),
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const approach = 1 - progress
  const phase = progress < 0.34 ? 'BLUEPRINT' : progress < 0.72 ? 'SYNCHRONIZE' : 'WORLD FORGED'

  return (
    <section ref={containerRef} style={{ minHeight: '100vh', background: '#060605' }}>
      <div ref={pinRef} className="relative flex items-center overflow-hidden" style={{ height: '100vh' }}>
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 50%, rgba(201,168,76,${0.04 + progress * 0.12}), transparent 42%)` }} />

        <div className="absolute top-12 left-8 md:left-16">
          <span className="font-mono-label text-xs tracking-[0.3em]" style={{ color: 'rgba(201,168,76,0.3)' }}>SECTION 05 // CONVERGENCE</span>
        </div>
        <div className="absolute top-12 right-8 md:right-16 font-mono-label text-[10px] tracking-[0.25em]" style={{ color: 'rgba(201,168,76,0.35)' }}>{phase}</div>

        <div className="relative w-full max-w-6xl mx-auto px-8" style={{ height: 390 }}>
          <div className="absolute top-1/2 left-1/2" style={{ width: 'min(46vw, 430px)', height: 1, transform: `translate(-50%, -50%) scaleX(${progress})`, transformOrigin: 'center', background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />

          <div className="absolute flex flex-col items-end" style={{ right: '52%', top: '50%', transform: `translate(${(-190 * approach).toFixed(1)}px, -50%)`, opacity: 0.35 + progress * 0.65, willChange: 'transform, opacity' }}>
            <div className="font-display font-bold tracking-[0.3em] text-right" style={{ fontSize: 'clamp(1.7rem, 4vw, 3.5rem)', color: 'var(--gold)' }}>TECH</div>
            <div className="font-mono-label text-[10px] tracking-[0.2em] mt-2" style={{ color: 'rgba(201,168,76,0.45)' }}>ENGINE // CODE // SYSTEMS</div>
            <div className="mt-7 flex flex-col items-end gap-2">
              {TECH_NODES.map((node, index) => <span key={node} className="font-mono-label text-[10px] tracking-widest px-3 py-2" style={{ border: '1px solid rgba(201,168,76,0.2)', color: 'rgba(201,168,76,0.65)', opacity: Math.min(1, progress * 2.5 - index * 0.18) }}>{node}</span>)}
            </div>
          </div>

          <div className="absolute flex flex-col items-start" style={{ left: '52%', top: '50%', transform: `translate(${(190 * approach).toFixed(1)}px, -50%)`, opacity: 0.35 + progress * 0.65, willChange: 'transform, opacity' }}>
            <div className="font-display font-bold tracking-[0.3em]" style={{ fontSize: 'clamp(1.7rem, 4vw, 3.5rem)', color: 'var(--gold)' }}>ART</div>
            <div className="font-mono-label text-[10px] tracking-[0.2em] mt-2" style={{ color: 'rgba(201,168,76,0.45)' }}>VISION // CRAFT // WORLD</div>
            <div className="mt-7 flex flex-col items-start gap-2">
              {ART_NODES.map((node, index) => <span key={node} className="font-mono-label text-[10px] tracking-widest px-3 py-2" style={{ border: '1px solid rgba(201,168,76,0.2)', color: 'rgba(201,168,76,0.65)', opacity: Math.min(1, progress * 2.5 - index * 0.18) }}>{node}</span>)}
            </div>
          </div>

          <div className="absolute top-1/2 left-1/2 flex flex-col items-center" style={{ transform: `translate(-50%, -50%) scale(${0.55 + progress * 0.45})`, opacity: Math.max(0, (progress - 0.18) * 1.5), willChange: 'transform, opacity' }}>
            <svg width="180" height="180" viewBox="0 0 180 180" aria-hidden="true">
              <circle cx="90" cy="90" r="72" fill="rgba(201,168,76,0.03)" stroke="rgba(201,168,76,0.25)" strokeWidth="1" strokeDasharray="5 7" transform={`rotate(${progress * 180} 90 90)`} />
              <circle cx="90" cy="90" r="51" fill="none" stroke="rgba(201,168,76,0.45)" strokeWidth="1" transform={`rotate(${-progress * 240} 90 90)`} />
              <path d="M90 51 L124 70 L124 110 L90 129 L56 110 L56 70 Z" fill="rgba(201,168,76,0.1)" stroke="rgba(201,168,76,0.8)" strokeWidth="1" />
              <circle cx="90" cy="90" r={5 + progress * 8} fill="rgba(201,168,76,0.85)" />
            </svg>
            <div className="font-display font-bold tracking-[0.2em] text-center mt-1" style={{ color: 'var(--foreground)', fontSize: 'clamp(1rem, 2vw, 1.45rem)' }}>PROJECT<br /><span style={{ color: 'var(--gold)' }}>KURUKSHETRA</span></div>
          </div>
        </div>

        <div className="absolute bottom-12 left-8 right-8 md:left-16 md:right-16">
          <div style={{ height: 1, background: 'rgba(201,168,76,0.16)' }}><div style={{ width: `${progress * 100}%`, height: '100%', background: 'var(--gold)', transition: 'width 0.08s linear' }} /></div>
          <div className="flex justify-between mt-3 font-mono-label text-[9px] tracking-widest" style={{ color: 'rgba(201,168,76,0.35)' }}><span>TECH</span><span>CONVERGENCE</span><span>ART</span></div>
        </div>
      </div>
    </section>
  )
}
