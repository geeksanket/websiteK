import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PARTICLES_FINAL = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 1.2 + 0.3,
  opacity: Math.random() * 0.5 + 0.1,
  dur: Math.random() * 5 + 3,
  delay: Math.random() * 6,
}))

export default function FinalSection() {
  const titleRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1.4,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        },
      })
      gsap.from(taglineRef.current, {
        opacity: 0,
        y: 30,
        duration: 1.2,
        ease: 'power2.out',
        delay: 0.5,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        },
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <>
      <section
        ref={containerRef}
        className="relative flex flex-col items-center justify-center overflow-hidden"
        style={{ minHeight: '100vh', background: '#080808' }}
      >
        {/* Particles */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {PARTICLES_FINAL.map(p => (
            <circle key={p.id} cx={`${p.x}%`} cy={`${p.y}%`} r={p.size} fill="rgba(201,168,76,0.6)" opacity={p.opacity}>
              <animate attributeName="opacity" values={`${p.opacity};${p.opacity * 0.2};${p.opacity}`} dur={`${p.dur}s`} begin={`${p.delay}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </svg>

        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(139,105,20,0.12) 0%, transparent 70%)' }}
        />

        {/* Perspective horizon lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.08 }}>
          {[-6, -4, -2, 0, 2, 4, 6].map((i, idx) => (
            <line key={idx} x1={`${50 + i * 7}%`} y1="55%" x2={`${50 + i * 55}%`} y2="100%" stroke="rgba(201,168,76,1)" strokeWidth="0.5" />
          ))}
        </svg>

        {/* Top decoration */}
        <div className="flex items-center gap-6 mb-12">
          <div style={{ width: 80, height: 1, background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.4))' }} />
          <span className="font-mono-label text-[10px] tracking-[0.35em]" style={{ color: 'rgba(201,168,76,0.35)' }}>
            FINAL TRANSMISSION
          </span>
          <div style={{ width: 80, height: 1, background: 'linear-gradient(to left, transparent, rgba(201,168,76,0.4))' }} />
        </div>

        <div ref={titleRef} className="text-center mb-10">
          <h2
            className="font-display font-bold leading-none tracking-widest"
            style={{ fontSize: 'clamp(2.5rem, 9vw, 8rem)', color: 'var(--foreground)' }}
          >
            PROJECT
          </h2>
          <h2
            className="font-display font-bold leading-none"
            style={{ fontSize: 'clamp(2.5rem, 9vw, 8rem)', letterSpacing: '0.1em', color: 'var(--gold)', textShadow: '0 0 100px rgba(201,168,76,0.25)' }}
          >
            KURUKSHETRA
          </h2>
        </div>

        <div ref={taglineRef} className="text-center">
          <p
            className="font-mono-label tracking-[0.2em]"
            style={{ fontSize: 'clamp(0.7rem, 1.5vw, 1rem)', color: 'rgba(232,224,208,0.4)' }}
          >
            Built from code.&nbsp;&nbsp;Shaped by art.&nbsp;&nbsp;Made for battle.
          </p>
        </div>

        {/* Bottom rule */}
        <div className="absolute bottom-0 left-0 right-0" style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.2), transparent)' }} />
      </section>

      {/* Footer */}
      <footer
        className="relative flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-8 gap-4"
        style={{ background: '#050505', borderTop: '1px solid rgba(201,168,76,0.06)' }}
      >
        <span className="font-display font-bold tracking-[0.2em] text-sm" style={{ color: 'rgba(201,168,76,0.4)' }}>
          PROJECT KURUKSHETRA
        </span>
        <div className="flex items-center gap-6">
          <span className="font-mono-label text-[10px] tracking-widest" style={{ color: 'rgba(201,168,76,0.2)' }}>
            TECH TEAM // VIRAL · GAURI · SANKET
          </span>
          <span className="font-mono-label text-[10px] tracking-widest" style={{ color: 'rgba(201,168,76,0.2)' }}>
            ART TEAM // DARSHANA · NEEL
          </span>
        </div>
        <span className="font-mono-label text-[10px] tracking-widest" style={{ color: 'rgba(201,168,76,0.15)' }}>
          ALPHA BUILD // {new Date().getFullYear()}
        </span>
      </footer>
    </>
  )
}
