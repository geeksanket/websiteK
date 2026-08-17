import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PARTICLES = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 1.5 + 0.4,
  opacity: Math.random() * 0.6 + 0.1,
  duration: Math.random() * 4 + 3,
  delay: Math.random() * 5,
}))

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const cameraRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 40,
        duration: 1.8,
        ease: 'power3.out',
        delay: 0.4,
      })
      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 20,
        duration: 1.4,
        ease: 'power2.out',
        delay: 1.0,
      })
      gsap.from(scrollIndicatorRef.current, {
        opacity: 0,
        duration: 1,
        delay: 2.2,
      })

      // Scroll-driven: title recedes, camera moves forward
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
          pin: false,
        },
      })

      tl.to(titleRef.current, { y: -120, opacity: 0, scale: 0.88, duration: 1 }, 0)
        .to(subtitleRef.current, { y: -60, opacity: 0, duration: 0.7 }, 0)
        .to(cameraRef.current, { scale: 1.18, duration: 1 }, 0)
        .to(gridRef.current, { opacity: 1, duration: 1 }, 0.3)
        .to(overlayRef.current, { opacity: 0.85, duration: 1 }, 0.5)
        .to(scrollIndicatorRef.current, { opacity: 0, duration: 0.3 }, 0)

    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: '100vh' }}
    >
      {/* Atmospheric background */}
      <div
        ref={cameraRef}
        className="absolute inset-0 will-change-transform"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 60%, rgba(139, 105, 20, 0.12) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 30% 80%, rgba(80, 50, 10, 0.15) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 70% 20%, rgba(60, 40, 8, 0.1) 0%, transparent 60%),
            #080808
          `,
        }}
      >
        {/* Particles */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.7 }}>
          {PARTICLES.map(p => (
            <circle
              key={p.id}
              cx={`${p.x}%`}
              cy={`${p.y}%`}
              r={p.size}
              fill="rgba(201,168,76,0.6)"
              opacity={p.opacity}
            >
              <animate
                attributeName="opacity"
                values={`${p.opacity};${p.opacity * 0.2};${p.opacity}`}
                dur={`${p.duration}s`}
                begin={`${p.delay}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="cy"
                values={`${p.y}%;${p.y - 1.5}%;${p.y}%`}
                dur={`${p.duration * 1.3}s`}
                begin={`${p.delay}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </svg>

        {/* Horizon line */}
        <div
          className="absolute w-full"
          style={{
            top: '62%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.3) 30%, rgba(201,168,76,0.6) 50%, rgba(201,168,76,0.3) 70%, transparent)',
          }}
        />

        {/* Ground perspective lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.12 }}>
          {[-6, -4, -2, 0, 2, 4, 6].map((i, idx) => (
            <line
              key={idx}
              x1={`${50 + i * 7}%`} y1="62%"
              x2={`${50 + i * 50}%`} y2="100%"
              stroke="rgba(201,168,76,0.8)"
              strokeWidth="0.5"
            />
          ))}
          {[0.68, 0.74, 0.81, 0.88, 0.95].map((y, idx) => (
            <line
              key={`h${idx}`}
              x1="0%" y1={`${y * 100}%`}
              x2="100%" y2={`${y * 100}%`}
              stroke="rgba(201,168,76,0.5)"
              strokeWidth="0.4"
            />
          ))}
        </svg>
      </div>

      {/* Technical grid overlay (revealed on scroll) */}
      <div
        ref={gridRef}
        className="absolute inset-0 grid-overlay pointer-events-none"
        style={{ opacity: 0 }}
      />

      {/* Dark overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0,
          background: 'linear-gradient(to bottom, rgba(8,8,8,0.3), rgba(8,8,8,0.95))',
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Decorative top rule */}
        <div className="flex items-center gap-4 mb-10">
          <div style={{ width: 60, height: 1, background: 'linear-gradient(to right, transparent, var(--gold))' }} />
          <span className="font-mono-label text-[10px] tracking-[0.3em]" style={{ color: 'rgba(201,168,76,0.5)' }}>
            ALPHA BUILD
          </span>
          <div style={{ width: 60, height: 1, background: 'linear-gradient(to left, transparent, var(--gold))' }} />
        </div>

        <div ref={titleRef} className="text-center will-change-transform">
          <h1
            className="font-display font-bold leading-none tracking-widest"
            style={{
              fontSize: 'clamp(3rem, 10vw, 9rem)',
              color: 'var(--foreground)',
              textShadow: '0 0 80px rgba(201,168,76,0.15)',
            }}
          >
            PROJECT
          </h1>
          <h1
            className="font-display font-bold leading-none"
            style={{
              fontSize: 'clamp(3rem, 10vw, 9rem)',
              letterSpacing: '0.12em',
              color: 'var(--gold)',
              textShadow: '0 0 120px rgba(201,168,76,0.35)',
            }}
          >
            KURUKSHETRA
          </h1>
        </div>

        <div ref={subtitleRef} className="mt-8 text-center will-change-transform">
          <p
            className="font-mono-label text-sm tracking-[0.25em] uppercase"
            style={{ color: 'rgba(232,224,208,0.45)' }}
          >
            A PvP game powered by an engine built from the ground up.
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="font-mono-label text-[10px] tracking-[0.25em]" style={{ color: 'rgba(201,168,76,0.4)' }}>
          SCROLL
        </span>
        <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, rgba(201,168,76,0.5), transparent)' }} />
      </div>
    </section>
  )
}
