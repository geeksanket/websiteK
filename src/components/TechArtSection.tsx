import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function TechArtSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const [merge, setMerge] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=75vh',
        pin: pinRef.current,
        scrub: 0.4,
        onUpdate: (self) => setMerge(self.progress),
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const techX = -120 * (1 - merge)
  const artX = 120 * (1 - merge)
  const centerOpacity = merge

  return (
    <section ref={containerRef} style={{ minHeight: '100vh', background: '#060605' }}>
      <div
        ref={pinRef}
        className="relative flex flex-col items-center justify-center overflow-hidden"
        style={{ height: '100vh' }}
      >
        <div className="absolute inset-0 grid-overlay opacity-30" />

        <div className="absolute top-12 left-8 md:left-16">
          <span className="font-mono-label text-xs tracking-[0.3em]" style={{ color: 'rgba(201,168,76,0.3)' }}>
            SECTION 05 // CONVERGENCE
          </span>
        </div>

        <div className="w-full max-w-6xl mx-auto px-8 relative">
          <div className="flex items-center justify-center gap-0 relative" style={{ height: 320 }}>
            {/* Tech side */}
            <div
              className="absolute flex flex-col items-end"
              style={{
                right: '50%',
                marginRight: merge > 0.5 ? `${(merge - 0.5) * 80}px` : '40px',
                transform: `translateX(${techX}px)`,
                transition: 'transform 0.05s',
                opacity: 0.4 + merge * 0.6,
              }}
            >
              <div className="font-display font-bold tracking-[0.3em] text-right" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: 'rgba(201,168,76,0.9)' }}>
                TECH
              </div>
              <div className="font-mono-label text-xs tracking-[0.2em] text-right mt-2" style={{ color: 'rgba(201,168,76,0.5)' }}>
                ENGINE // CODE // SYSTEMS
              </div>
              {/* Tech SVG */}
              <svg width="160" height="120" viewBox="0 0 160 120" className="mt-4 opacity-70">
                <rect x="10" y="10" width="140" height="100" fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="0.7" strokeDasharray="4 2" />
                {[30, 50, 70, 90].map(y => (
                  <line key={y} x1="10" y1={y} x2="150" y2={y} stroke="rgba(201,168,76,0.1)" strokeWidth="0.4" />
                ))}
                {[30, 60, 90, 120].map(x => (
                  <line key={x} x1={x} y1="10" x2={x} y2="110" stroke="rgba(201,168,76,0.1)" strokeWidth="0.4" />
                ))}
                <text x="80" y="60" textAnchor="middle" fill="rgba(201,168,76,0.5)" fontSize="10" fontFamily="JetBrains Mono">render()</text>
                <text x="80" y="75" textAnchor="middle" fill="rgba(201,168,76,0.3)" fontSize="8" fontFamily="JetBrains Mono">physics(dt)</text>
              </svg>
            </div>

            {/* Center merge symbol */}
            <div
              className="absolute flex flex-col items-center"
              style={{ opacity: centerOpacity, transform: `scale(${0.6 + merge * 0.4})` }}
            >
              <div
                className="font-display font-bold tracking-widest text-center"
                style={{ fontSize: 'clamp(1.2rem, 2.5vw, 2rem)', color: 'var(--gold)' }}
              >
                PROJECT<br />KURUKSHETRA
              </div>
              <div className="mt-4" style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, var(--gold), transparent)' }} />
              <div className="font-mono-label text-[10px] tracking-widest mt-2" style={{ color: 'rgba(201,168,76,0.4)' }}>
                FULLY ASSEMBLED
              </div>
            </div>

            {/* Art side */}
            <div
              className="absolute flex flex-col items-start"
              style={{
                left: '50%',
                marginLeft: merge > 0.5 ? `${(merge - 0.5) * 80}px` : '40px',
                transform: `translateX(${artX}px)`,
                transition: 'transform 0.05s',
                opacity: 0.4 + merge * 0.6,
              }}
            >
              <div className="font-display font-bold tracking-[0.3em]" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: 'rgba(201,168,76,0.9)' }}>
                ART
              </div>
              <div className="font-mono-label text-xs tracking-[0.2em] mt-2" style={{ color: 'rgba(201,168,76,0.5)' }}>
                VISION // CRAFT // WORLD
              </div>
              {/* Art SVG */}
              <svg width="160" height="120" viewBox="0 0 160 120" className="mt-4 opacity-70">
                <defs>
                  <linearGradient id="art-g" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(139,105,20,0.4)" />
                    <stop offset="100%" stopColor="rgba(201,168,76,0.1)" />
                  </linearGradient>
                </defs>
                <ellipse cx="80" cy="60" rx="60" ry="45" fill="url(#art-g)" stroke="rgba(201,168,76,0.3)" strokeWidth="0.8" />
                <ellipse cx="80" cy="60" rx="35" ry="25" fill="none" stroke="rgba(201,168,76,0.2)" strokeWidth="0.6" />
                <circle cx="80" cy="60" r="6" fill="rgba(201,168,76,0.6)" />
              </svg>
            </div>
          </div>

          {/* Bottom merge equation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className="font-mono-label text-xs tracking-widest" style={{ color: `rgba(201,168,76,${0.3 + merge * 0.4})` }}>TECH</span>
            <span className="font-mono-label text-xs" style={{ color: 'rgba(201,168,76,0.3)' }}>+</span>
            <span className="font-mono-label text-xs tracking-widest" style={{ color: `rgba(201,168,76,${0.3 + merge * 0.4})` }}>ART</span>
            <span className="font-mono-label text-xs" style={{ color: 'rgba(201,168,76,0.3)' }}>=</span>
            <span
              className="font-display font-bold tracking-widest"
              style={{ color: 'var(--gold)', opacity: centerOpacity, fontSize: '0.9rem' }}
            >
              PROJECT KURUKSHETRA
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
