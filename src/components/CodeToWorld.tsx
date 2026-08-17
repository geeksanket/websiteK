import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STAGES = [
  { id: 'CODE', label: 'CODE', sub: 'Source compiled. Symbols resolved.' },
  { id: 'ENGINE', label: 'ENGINE', sub: 'Runtime initialized. Scene graph built.' },
  { id: 'GEOMETRY', label: 'GEOMETRY', sub: 'Vertices uploaded. Mesh instantiated.' },
  { id: 'LIGHT', label: 'LIGHTING', sub: 'Shadow maps computed. Probes sampled.' },
  { id: 'GAME', label: 'GAME', sub: 'World live. Players connected.' },
]

function StageVisual({ stageIndex }: { stageIndex: number }) {
  const w = 320
  const h = 240
  const progress = (stageIndex + 1) / STAGES.length

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      {/* Base wireframe — always shown */}
      <rect x="60" y="40" width="200" height="160" fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="0.6" strokeDasharray="4 2" />
      <line x1="160" y1="40" x2="160" y2="200" stroke="rgba(201,168,76,0.15)" strokeWidth="0.4" />
      <line x1="60" y1="120" x2="260" y2="120" stroke="rgba(201,168,76,0.15)" strokeWidth="0.4" />
      <polygon points="110,50 210,50 250,120 210,190 110,190 70,120" fill="none" stroke="rgba(201,168,76,0.25)" strokeWidth="0.6" />

      {/* Stage 1+: geometry fill */}
      {stageIndex >= 1 && (
        <polygon
          points="110,50 210,50 250,120 210,190 110,190 70,120"
          fill={`rgba(30,22,8,${0.4 + progress * 0.4})`}
          stroke="rgba(201,168,76,0.5)"
          strokeWidth="0.8"
        />
      )}

      {/* Stage 2+: mesh detail */}
      {stageIndex >= 2 && (
        <>
          <line x1="110" y1="50" x2="160" y2="120" stroke="rgba(201,168,76,0.2)" strokeWidth="0.5" />
          <line x1="210" y1="50" x2="160" y2="120" stroke="rgba(201,168,76,0.2)" strokeWidth="0.5" />
          <line x1="250" y1="120" x2="160" y2="120" stroke="rgba(201,168,76,0.2)" strokeWidth="0.5" />
          <line x1="210" y1="190" x2="160" y2="120" stroke="rgba(201,168,76,0.2)" strokeWidth="0.5" />
          <line x1="110" y1="190" x2="160" y2="120" stroke="rgba(201,168,76,0.2)" strokeWidth="0.5" />
          <line x1="70" y1="120" x2="160" y2="120" stroke="rgba(201,168,76,0.2)" strokeWidth="0.5" />
        </>
      )}

      {/* Stage 3+: lighting glow */}
      {stageIndex >= 3 && (
        <>
          <defs>
            <radialGradient id="light-glow" cx="38%" cy="35%">
              <stop offset="0%" stopColor="rgba(255,220,120,0.25)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <polygon
            points="110,50 210,50 250,120 210,190 110,190 70,120"
            fill="url(#light-glow)"
          />
          <circle cx="100" cy="60" r="4" fill="rgba(255,220,120,0.8)" />
          <line x1="100" y1="60" x2="160" y2="120" stroke="rgba(255,220,120,0.15)" strokeWidth="0.6" />
        </>
      )}

      {/* Stage 4: complete scene indicator */}
      {stageIndex >= 4 && (
        <>
          <text x="160" y="228" textAnchor="middle" fill="rgba(201,168,76,0.7)" fontSize="9" fontFamily="JetBrains Mono">SCENE RENDERED</text>
          <circle cx="160" cy="120" r="6" fill="rgba(201,168,76,0.9)">
            <animate attributeName="r" values="6;12;6" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2s" repeatCount="indefinite" />
          </circle>
        </>
      )}
    </svg>
  )
}

export default function CodeToWorld() {
  const containerRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const [stageIndex, setStageIndex] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        // No pin spacer: this section should flow straight into the battlefield.
        end: 'bottom top',
        pin: false,
        scrub: 1,
        onUpdate: (self) => {
          const idx = Math.floor(self.progress * STAGES.length)
          setStageIndex(Math.min(idx, STAGES.length - 1))
        },
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      style={{ minHeight: '100vh', background: '#050505' }}
    >
      <div
        ref={pinRef}
        className="relative flex flex-col items-center justify-center overflow-hidden"
        style={{ height: '100vh' }}
      >
        <div className="absolute inset-0 grid-overlay opacity-40" />

        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(139,105,20,0.07) 0%, transparent 70%)',
          }}
        />

        {/* Section label */}
        <div className="absolute top-12 left-8 md:left-16">
          <span className="font-mono-label text-xs tracking-[0.3em]" style={{ color: 'rgba(201,168,76,0.3)' }}>
            SECTION 02 // FROM CODE TO WORLD
          </span>
        </div>

        <div className="w-full max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Pipeline flow */}
          <div className="flex flex-col gap-1">
            <h2
              className="font-display font-bold leading-none mb-8"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: 'var(--foreground)' }}
            >
              CODE →<br />
              <span style={{ color: 'var(--gold)' }}>ENGINE →</span><br />
              GAME
            </h2>

            {/* Pipeline steps */}
            <div className="flex flex-col relative">
              <div
                className="absolute left-[7px] top-3 bottom-3 w-px"
                style={{ background: 'linear-gradient(to bottom, var(--gold), rgba(201,168,76,0.1))' }}
              />
              {STAGES.map((s, i) => (
                <div key={s.id} className="flex items-start gap-5 py-3 transition-all duration-500">
                  <div
                    className="w-4 h-4 rounded-full border flex-shrink-0 mt-0.5 transition-all duration-400 relative z-10"
                    style={{
                      background: i <= stageIndex ? 'var(--gold)' : 'rgba(8,8,8,1)',
                      borderColor: i <= stageIndex ? 'var(--gold)' : 'rgba(201,168,76,0.25)',
                      boxShadow: i <= stageIndex ? '0 0 10px rgba(201,168,76,0.5)' : 'none',
                    }}
                  />
                  <div style={{ opacity: i <= stageIndex ? 1 : 0.25, transition: 'opacity 0.5s' }}>
                    <div className="font-display font-bold tracking-widest text-sm" style={{ color: 'var(--gold)' }}>{s.label}</div>
                    <div className="font-mono-label text-[11px] mt-0.5" style={{ color: 'rgba(232,224,208,0.4)' }}>{s.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SVG stage visual */}
          <div className="flex flex-col items-center justify-center">
            <div
              className="relative p-6"
              style={{ border: '1px solid rgba(201,168,76,0.12)', background: 'rgba(15,15,15,0.8)' }}
            >
              <div className="absolute top-3 left-3 font-mono-label text-[9px] tracking-widest" style={{ color: 'rgba(201,168,76,0.3)' }}>
                ENGINE // SCENE PREVIEW
              </div>
              <div className="mt-4">
                <StageVisual stageIndex={stageIndex} />
              </div>
              <div className="absolute bottom-3 right-3 font-mono-label text-[9px]" style={{ color: 'rgba(201,168,76,0.3)' }}>
                {STAGES[stageIndex]?.id ?? '—'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
