import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ENGINE_SYSTEMS = [
  {
    id: 'RENDERING',
    label: '01 // RENDERING',
    desc: 'Draw calls dispatched. Depth buffer allocated. Rasterizer online.',
    color: 'rgba(201,168,76,1)',
    visual: 'wireframe',
  },
  {
    id: 'TEXTURES',
    label: '02 // TEXTURES',
    desc: 'UV maps unwrapped. Albedo, normal and roughness channels loaded.',
    color: 'rgba(201,168,76,1)',
    visual: 'texture',
  },
  {
    id: 'PHYSICS',
    label: '03 // PHYSICS',
    desc: 'Rigid body solver initialized. Collision broadphase active.',
    color: 'rgba(201,168,76,1)',
    visual: 'collision',
  },
  {
    id: 'GAME LOGIC',
    label: '04 // GAME LOGIC',
    desc: 'Entity-component system ready. State machine executing.',
    color: 'rgba(201,168,76,1)',
    visual: 'logic',
  },
  {
    id: 'ENGINE READY',
    label: '05 // ENGINE',
    desc: 'All subsystems nominal. Scene graph fully instantiated.',
    color: 'rgba(201,168,76,1)',
    visual: 'complete',
  },
]

function EngineVisual({ type, active }: { type: string; active: boolean }) {
  const svgSize = 200

  if (type === 'wireframe') return (
    <svg width={svgSize} height={svgSize} viewBox="0 0 200 200" style={{ opacity: active ? 1 : 0.15, transition: 'opacity 0.8s' }}>
      <rect x="40" y="40" width="120" height="120" fill="none" stroke="rgba(201,168,76,0.7)" strokeWidth="0.8" strokeDasharray="4 2" />
      <polygon points="100,20 180,80 180,160 100,180 20,160 20,80" fill="none" stroke="rgba(201,168,76,0.4)" strokeWidth="0.6" />
      <line x1="40" y1="40" x2="100" y2="20" stroke="rgba(201,168,76,0.3)" strokeWidth="0.5" />
      <line x1="160" y1="40" x2="180" y2="80" stroke="rgba(201,168,76,0.3)" strokeWidth="0.5" />
      <line x1="40" y1="160" x2="20" y2="160" stroke="rgba(201,168,76,0.3)" strokeWidth="0.5" />
      <line x1="160" y1="160" x2="180" y2="160" stroke="rgba(201,168,76,0.3)" strokeWidth="0.5" />
      {[60, 80, 100, 120, 140].map(x => (
        <line key={x} x1={x} y1="40" x2={x} y2="160" stroke="rgba(201,168,76,0.12)" strokeWidth="0.4" />
      ))}
      {[60, 80, 100, 120, 140].map(y => (
        <line key={y} x1="40" y1={y} x2="160" y2={y} stroke="rgba(201,168,76,0.12)" strokeWidth="0.4" />
      ))}
      <circle cx="100" cy="100" r="3" fill="rgba(201,168,76,0.8)" />
      {active && <circle cx="100" cy="100" r="3" fill="none" stroke="rgba(201,168,76,0.5)" strokeWidth="1">
        <animate attributeName="r" from="3" to="30" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.8" to="0" dur="2s" repeatCount="indefinite" />
      </circle>}
    </svg>
  )

  if (type === 'texture') return (
    <svg width={svgSize} height={svgSize} viewBox="0 0 200 200" style={{ opacity: active ? 1 : 0.15, transition: 'opacity 0.8s' }}>
      <defs>
        <linearGradient id="tex-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(139,105,20,0.6)" />
          <stop offset="100%" stopColor="rgba(201,168,76,0.2)" />
        </linearGradient>
      </defs>
      <rect x="40" y="40" width="120" height="120" fill="url(#tex-grad)" stroke="rgba(201,168,76,0.5)" strokeWidth="0.8" />
      {active && Array.from({ length: 6 }, (_, i) => (
        <rect key={i} x={40 + i * 20} y="40" width="20" height="120"
          fill={`rgba(201,168,76,${0.02 + i * 0.025})`} />
      ))}
      <text x="100" y="107" textAnchor="middle" fill="rgba(201,168,76,0.5)" fontSize="9" fontFamily="JetBrains Mono">ALBEDO</text>
      <text x="100" y="118" textAnchor="middle" fill="rgba(201,168,76,0.3)" fontSize="8" fontFamily="JetBrains Mono">512x512</text>
    </svg>
  )

  if (type === 'collision') return (
    <svg width={svgSize} height={svgSize} viewBox="0 0 200 200" style={{ opacity: active ? 1 : 0.15, transition: 'opacity 0.8s' }}>
      <rect x="40" y="40" width="120" height="120" fill="none" stroke="rgba(201,168,76,0.2)" strokeWidth="0.6" />
      <rect x="55" y="70" width="40" height="50" fill="rgba(201,168,76,0.06)" stroke="rgba(201,168,76,0.8)" strokeWidth="1" strokeDasharray="3 2" />
      <rect x="105" y="60" width="40" height="50" fill="rgba(201,168,76,0.06)" stroke="rgba(201,168,76,0.8)" strokeWidth="1" strokeDasharray="3 2" />
      <line x1="95" y1="95" x2="105" y2="85" stroke="#ff6b35" strokeWidth="1.5" markerEnd="url(#arrow)" />
      <line x1="115" y1="85" x2="105" y2="95" stroke="#ff6b35" strokeWidth="1.5" />
      <text x="75" y="140" textAnchor="middle" fill="rgba(201,168,76,0.4)" fontSize="7" fontFamily="JetBrains Mono">AABB</text>
      <text x="125" y="125" textAnchor="middle" fill="rgba(201,168,76,0.4)" fontSize="7" fontFamily="JetBrains Mono">AABB</text>
      {active && <circle cx="100" cy="90" r="5" fill="none" stroke="#ff6b35" strokeWidth="1">
        <animate attributeName="r" from="5" to="20" dur="1s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="1" to="0" dur="1s" repeatCount="indefinite" />
      </circle>}
    </svg>
  )

  if (type === 'logic') return (
    <svg width={svgSize} height={svgSize} viewBox="0 0 200 200" style={{ opacity: active ? 1 : 0.15, transition: 'opacity 0.8s' }}>
      {[['INPUT', 30, 60], ['STATE', 30, 100], ['PHYSICS', 30, 140]].map(([label, x, y]) => (
        <g key={label as string}>
          <rect x={x as number} y={(y as number) - 10} width="55" height="20" fill="rgba(201,168,76,0.08)" stroke="rgba(201,168,76,0.5)" strokeWidth="0.7" />
          <text x={(x as number) + 27} y={(y as number) + 4} textAnchor="middle" fill="rgba(201,168,76,0.7)" fontSize="7" fontFamily="JetBrains Mono">{label as string}</text>
          {active && <line x1={(x as number) + 55} y1={y as number} x2="130" y2="100" stroke="rgba(201,168,76,0.3)" strokeWidth="0.6" strokeDasharray="2 2">
            <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="1.5s" repeatCount="indefinite" />
          </line>}
        </g>
      ))}
      <rect x="130" y="88" width="45" height="24" fill="rgba(201,168,76,0.15)" stroke="rgba(201,168,76,0.9)" strokeWidth="0.8" />
      <text x="152" y="102" textAnchor="middle" fill="rgba(201,168,76,0.9)" fontSize="7" fontFamily="JetBrains Mono">ENTITY</text>
    </svg>
  )

  // complete
  return (
    <svg width={svgSize} height={svgSize} viewBox="0 0 200 200" style={{ opacity: active ? 1 : 0.15, transition: 'opacity 0.8s' }}>
      <defs>
        <radialGradient id="complete-glow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="rgba(201,168,76,0.3)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="70" fill="url(#complete-glow)" />
      <polygon points="100,30 170,70 170,130 100,170 30,130 30,70" fill="none" stroke="rgba(201,168,76,0.6)" strokeWidth="0.8" />
      <polygon points="100,50 150,80 150,120 100,150 50,120 50,80" fill="none" stroke="rgba(201,168,76,0.4)" strokeWidth="0.6" />
      <circle cx="100" cy="100" r="10" fill="rgba(201,168,76,0.8)" />
      <text x="100" y="190" textAnchor="middle" fill="rgba(201,168,76,0.6)" fontSize="8" fontFamily="JetBrains Mono">ALL SYSTEMS ONLINE</text>
      {active && <circle cx="100" cy="100" r="10" fill="none" stroke="rgba(201,168,76,0.5)" strokeWidth="1">
        <animate attributeName="r" from="10" to="70" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.8" to="0" dur="3s" repeatCount="indefinite" />
      </circle>}
    </svg>
  )
}

export default function EngineSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(-1)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        // Preserve the cinematic, pinned build-up without the original long hold.
        end: `+=${ENGINE_SYSTEMS.length * 60}vh`,
        pin: pinRef.current,
        scrub: 0.35,
        onUpdate: (self) => {
          const idx = Math.floor(self.progress * ENGINE_SYSTEMS.length)
          setActiveIndex(Math.min(idx, ENGINE_SYSTEMS.length - 1))
          if (progressRef.current) {
            progressRef.current.style.transform = `scaleY(${self.progress})`
          }
        },
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const active = ENGINE_SYSTEMS[activeIndex] ?? null

  return (
    <section
      ref={containerRef}
      id="engine"
      style={{ minHeight: '100vh' }}
    >
      <div
        ref={pinRef}
        className="flex flex-col items-start justify-center relative overflow-hidden"
        style={{ height: '100vh', background: '#080808' }}
      >
        <div className="absolute inset-0 grid-overlay opacity-60" />

        {/* Vertical progress bar */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[2px]"
          style={{ background: 'rgba(201,168,76,0.1)' }}
        >
          <div
            ref={progressRef}
            className="w-full"
            style={{ background: 'var(--gold)', height: '100%', transform: 'scaleY(0)', transformOrigin: 'top', willChange: 'transform' }}
          />
        </div>

        <div className="w-full max-w-7xl mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div>
            <div className="mb-6">
              <span className="font-mono-label text-xs tracking-[0.3em]" style={{ color: 'rgba(201,168,76,0.4)' }}>
                SECTION 01
              </span>
            </div>
            <h2
              className="font-display font-bold leading-tight mb-6"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'var(--foreground)' }}
            >
              BUILT FROM<br />
              <span style={{ color: 'var(--gold)' }}>THE GROUND UP.</span>
            </h2>
            <p className="text-base leading-relaxed mb-12" style={{ color: 'rgba(232,224,208,0.5)', maxWidth: 420 }}>
              Project Kurukshetra isn't only a game. We're building the technology behind it.
            </p>

            {/* System list */}
            <div className="space-y-4">
              {ENGINE_SYSTEMS.map((sys, i) => (
                <div
                  key={sys.id}
                  className="flex items-center gap-4 transition-all duration-500"
                  style={{ opacity: i <= activeIndex ? 1 : 0.2 }}
                >
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0 transition-all duration-300"
                    style={{
                      background: i <= activeIndex ? 'var(--gold)' : 'rgba(201,168,76,0.2)',
                      boxShadow: i <= activeIndex ? '0 0 8px rgba(201,168,76,0.5)' : 'none',
                    }}
                  />
                  <span
                    className="font-mono-label text-xs tracking-[0.2em]"
                    style={{ color: i <= activeIndex ? 'var(--gold)' : 'rgba(201,168,76,0.3)' }}
                  >
                    {sys.id}
                  </span>
                  {i === activeIndex && (
                    <span className="font-mono-label text-[10px] tracking-widest" style={{ color: 'rgba(201,168,76,0.5)' }}>
                      ▶ ONLINE
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: visual */}
          <div className="flex flex-col items-center">
            {/* Engine visual */}
            <div className="relative" style={{ width: 200, height: 200 }}>
              {ENGINE_SYSTEMS.map((sys, i) => (
                <div key={sys.id} className="absolute inset-0" style={{ opacity: i === activeIndex ? 1 : 0, transition: 'opacity 0.6s' }}>
                  <EngineVisual type={sys.visual} active={i === activeIndex} />
                </div>
              ))}
              {activeIndex === -1 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-mono-label text-xs tracking-widest" style={{ color: 'rgba(201,168,76,0.3)' }}>STANDBY</span>
                </div>
              )}
            </div>

            {/* System description */}
            <div
              className="mt-8 text-center font-mono-label text-xs leading-relaxed"
              style={{ color: 'rgba(201,168,76,0.5)', maxWidth: 240, minHeight: 48 }}
            >
              {active?.desc ?? ''}
            </div>

            {/* Active system label */}
            {active && (
              <div
                className="mt-4 font-display font-bold tracking-[0.3em]"
                style={{ fontSize: '1.1rem', color: 'var(--gold)', letterSpacing: '0.3em' }}
              >
                {active.label}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
