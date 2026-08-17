import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PANELS = [
  {
    label: 'COMBAT SYSTEM',
    tag: 'PvP // CORE',
    text: 'Real-time player-versus-player combat. Every decision matters.',
    accent: 'rgba(201,168,76,0.8)',
  },
  {
    label: 'BATTLEFIELD',
    tag: 'ENVIRONMENT',
    text: 'Dynamic arenas built for competitive play. Terrain, obstacles, strategy.',
    accent: 'rgba(201,168,76,0.6)',
  },
  {
    label: 'CHARACTERS',
    tag: 'PLACEHOLDER',
    text: 'Distinct archetypes. Unique abilities. Art in progress.',
    accent: 'rgba(201,168,76,0.4)',
  },
  {
    label: 'MATCH FLOW',
    tag: 'GAME LOOP',
    text: 'From lobby to battle. Every match a new confrontation.',
    accent: 'rgba(201,168,76,0.7)',
  },
]

function PanelVisual({ index }: { index: number }) {
  if (index === 0) return (
    <svg width="100%" height="100%" viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice">
      <rect width="300" height="200" fill="rgba(10,8,3,0.8)" />
      <circle cx="100" cy="100" r="25" fill="none" stroke="rgba(201,168,76,0.6)" strokeWidth="1" strokeDasharray="4 2" />
      <circle cx="200" cy="100" r="25" fill="none" stroke="rgba(201,168,76,0.6)" strokeWidth="1" strokeDasharray="4 2" />
      <line x1="125" y1="100" x2="175" y2="100" stroke="#ff6b35" strokeWidth="1.5" />
      <polygon points="170,96 178,100 170,104" fill="#ff6b35" />
      <text x="100" y="148" textAnchor="middle" fill="rgba(201,168,76,0.5)" fontSize="8" fontFamily="JetBrains Mono">PLAYER A</text>
      <text x="200" y="148" textAnchor="middle" fill="rgba(201,168,76,0.5)" fontSize="8" fontFamily="JetBrains Mono">PLAYER B</text>
    </svg>
  )
  if (index === 1) return (
    <svg width="100%" height="100%" viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice">
      <rect width="300" height="200" fill="rgba(8,8,6,0.8)" />
      {[0, 40, 80, 120, 160, 200, 240, 280].map(x => (
        <line key={x} x1={x} y1="0" x2={x + 40} y2="200" stroke="rgba(201,168,76,0.05)" strokeWidth="0.5" />
      ))}
      {[0, 50, 100, 150, 200].map(y => (
        <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="rgba(201,168,76,0.05)" strokeWidth="0.5" />
      ))}
      <rect x="20" y="60" width="60" height="80" fill="rgba(201,168,76,0.06)" stroke="rgba(201,168,76,0.3)" strokeWidth="0.8" />
      <rect x="220" y="40" width="50" height="100" fill="rgba(201,168,76,0.06)" stroke="rgba(201,168,76,0.3)" strokeWidth="0.8" />
      <rect x="130" y="80" width="40" height="60" fill="rgba(201,168,76,0.04)" stroke="rgba(201,168,76,0.2)" strokeWidth="0.6" />
      <text x="150" y="190" textAnchor="middle" fill="rgba(201,168,76,0.3)" fontSize="8" fontFamily="JetBrains Mono">MAP_ALPHA // TOP-DOWN</text>
    </svg>
  )
  if (index === 2) return (
    <svg width="100%" height="100%" viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice">
      <rect width="300" height="200" fill="rgba(8,8,8,0.8)" />
      <ellipse cx="90" cy="110" rx="30" ry="50" fill="none" stroke="rgba(201,168,76,0.4)" strokeWidth="0.8" strokeDasharray="3 2" />
      <ellipse cx="210" cy="110" rx="30" ry="50" fill="none" stroke="rgba(201,168,76,0.4)" strokeWidth="0.8" strokeDasharray="3 2" />
      <text x="90" y="175" textAnchor="middle" fill="rgba(201,168,76,0.4)" fontSize="8" fontFamily="JetBrains Mono">CHAR_A</text>
      <text x="210" y="175" textAnchor="middle" fill="rgba(201,168,76,0.4)" fontSize="8" fontFamily="JetBrains Mono">CHAR_B</text>
      <text x="150" y="50" textAnchor="middle" fill="rgba(201,168,76,0.25)" fontSize="9" fontFamily="JetBrains Mono">ART // IN PROGRESS</text>
    </svg>
  )
  return (
    <svg width="100%" height="100%" viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice">
      <rect width="300" height="200" fill="rgba(8,8,8,0.8)" />
      {['LOBBY', 'LOAD', 'BATTLE', 'RESULT'].map((s, i) => (
        <g key={s}>
          <rect x={20 + i * 68} y="80" width="55" height="30" fill="rgba(201,168,76,0.06)" stroke="rgba(201,168,76,0.4)" strokeWidth="0.7" />
          <text x={47 + i * 68} y="99" textAnchor="middle" fill="rgba(201,168,76,0.7)" fontSize="8" fontFamily="JetBrains Mono">{s}</text>
          {i < 3 && <line x1={75 + i * 68} y1="95" x2={88 + i * 68} y2="95" stroke="rgba(201,168,76,0.3)" strokeWidth="0.8" />}
        </g>
      ))}
      <text x="150" y="150" textAnchor="middle" fill="rgba(201,168,76,0.3)" fontSize="8" fontFamily="JetBrains Mono">MATCH // GAME LOOP</text>
    </svg>
  )
}

export default function BattlefieldSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = trackRef.current
      const container = containerRef.current
      const heading = headingRef.current
      if (!panels || !container || !heading) return

      // The panels only have the space not occupied by the fixed heading.
      // On mobile the heading overlays the track, so the full viewport is usable.
      const getTravel = () => {
        const headingOverlaysTrack = getComputedStyle(heading).position === 'absolute'
        const availableWidth = container.clientWidth - (headingOverlaysTrack ? 0 : heading.offsetWidth)
        return Math.max(0, panels.scrollWidth - availableWidth)
      }

      gsap.to(panels, {
        x: () => -getTravel(),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          // Release precisely when the right edge of the final panel reaches the viewport edge.
          end: () => `+=${getTravel()}`,
          scrub: 0.65,
          pin: true,
          invalidateOnRefresh: true,
        },
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} id="game" style={{ overflow: 'hidden' }}>
      <div className="battlefield-frame flex items-center" style={{ height: '100vh', overflow: 'hidden' }}>
        {/* Sticky heading */}
        <div
          ref={headingRef}
          className="battlefield-heading flex-shrink-0 flex flex-col justify-center px-10 md:px-16 relative z-10"
          style={{ width: 'clamp(260px, 28vw, 380px)', height: '100vh', borderRight: '1px solid rgba(201,168,76,0.08)', background: '#080808' }}
        >
          <div className="absolute inset-0 grid-overlay opacity-30" />
          <div className="relative">
            <span className="font-mono-label text-xs tracking-[0.3em] block mb-6" style={{ color: 'rgba(201,168,76,0.35)' }}>
              SECTION 03
            </span>
            <h2
              className="font-display font-bold leading-none"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--foreground)' }}
            >
              THE<br />
              <span style={{ color: 'var(--gold)' }}>BATTLE-<br />FIELD</span>
            </h2>
            <p className="mt-6 text-sm leading-relaxed" style={{ color: 'rgba(232,224,208,0.4)' }}>
              A PvP game where every match becomes a new battle.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <div className="w-6 h-px" style={{ background: 'var(--gold)' }} />
              <span className="font-mono-label text-[10px] tracking-widest" style={{ color: 'rgba(201,168,76,0.4)' }}>
                SCROLL →
              </span>
            </div>
          </div>
        </div>

        {/* Horizontal scrolling panels */}
        <div
          ref={trackRef}
          className="horizontal-track battlefield-track flex"
          style={{ height: '100vh' }}
        >
          {PANELS.map((panel, i) => (
            <div
              key={panel.label}
              className="battlefield-panel relative flex-shrink-0 flex flex-col justify-end overflow-hidden"
              style={{ width: 'clamp(280px, 38vw, 480px)', height: '100vh', borderRight: '1px solid rgba(201,168,76,0.08)' }}
            >
              {/* Visual fill */}
              <div className="absolute inset-0">
                <PanelVisual index={i} />
              </div>

              {/* Overlay gradient */}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.3) 60%, transparent 100%)' }}
              />

              {/* Content */}
              <div className="relative p-8">
                <div className="font-mono-label text-[10px] tracking-[0.25em] mb-3" style={{ color: 'rgba(201,168,76,0.4)' }}>
                  {panel.tag}
                </div>
                <div
                  className="font-display font-bold tracking-wider mb-3"
                  style={{ fontSize: '1.6rem', color: panel.accent }}
                >
                  {panel.label}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(232,224,208,0.5)', maxWidth: 280 }}>
                  {panel.text}
                </p>
              </div>

              {/* Panel number */}
              <div
                className="absolute top-6 right-6 font-mono-label text-[10px] tracking-widest"
                style={{ color: 'rgba(201,168,76,0.2)' }}
              >
                0{i + 1}
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  )
}
