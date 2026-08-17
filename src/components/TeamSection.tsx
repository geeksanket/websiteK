import { useState } from 'react'

const TECH_TEAM = [
  { name: 'Viral', codename: 'Virus', role: 'Engine Development' },
  { name: 'Gauri', codename: 'IDK', role: 'Systems Architecture' },
  { name: 'Sanket', codename: 'Supra', role: 'Core Technology' },
]

const ART_TEAM = [
  { name: 'Darshana', codename: 'Darshanova', role: 'Visual Design' },
  { name: 'Neel', codename: 'Corporate', role: 'Art Direction' },
]

function TechCard({ member }: { member: typeof TECH_TEAM[0] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative overflow-hidden cursor-pointer transition-all duration-400"
      style={{
        border: `1px solid ${hovered ? 'rgba(201,168,76,0.5)' : 'rgba(201,168,76,0.12)'}`,
        background: hovered ? 'rgba(20,18,10,0.9)' : 'rgba(12,12,12,0.8)',
        padding: '28px 24px',
        transition: 'border-color 0.3s, background 0.3s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-50" />

      {/* Corner bracket */}
      <div className="absolute top-3 left-3 w-4 h-4" style={{
        borderLeft: '1px solid rgba(201,168,76,0.5)',
        borderTop: '1px solid rgba(201,168,76,0.5)',
        opacity: hovered ? 1 : 0.3,
        transition: 'opacity 0.3s',
      }} />
      <div className="absolute bottom-3 right-3 w-4 h-4" style={{
        borderRight: '1px solid rgba(201,168,76,0.5)',
        borderBottom: '1px solid rgba(201,168,76,0.5)',
        opacity: hovered ? 1 : 0.3,
        transition: 'opacity 0.3s',
      }} />

      <div className="relative">
        {/* Codename (always visible) */}
        <div
          className="font-display font-bold tracking-[0.2em] mb-1 transition-all duration-300"
          style={{
            fontSize: '1.4rem',
            color: hovered ? 'rgba(201,168,76,0.4)' : 'var(--gold)',
          }}
        >
          {member.codename}
        </div>

        {/* Real name (on hover) */}
        <div
          className="font-display font-bold tracking-widest transition-all duration-300"
          style={{
            fontSize: '1.1rem',
            color: 'var(--foreground)',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(8px)',
          }}
        >
          {member.name}
        </div>

        {/* Role */}
        <div
          className="font-mono-label text-[10px] tracking-[0.2em] mt-3"
          style={{ color: 'rgba(201,168,76,0.4)' }}
        >
          {member.role}
        </div>

        {/* Code fragment decoration */}
        <div
          className="mt-5 font-mono-label text-[9px] leading-relaxed transition-all duration-500"
          style={{
            color: 'rgba(201,168,76,0.2)',
            opacity: hovered ? 0.8 : 0.3,
          }}
        >
          {'> init_module("'}{member.name.toLowerCase()}{'");'}<br />
          {'> status: ONLINE'}
        </div>
      </div>
    </div>
  )
}

function ArtCard({ member }: { member: typeof ART_TEAM[0] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative overflow-hidden cursor-pointer"
      style={{
        border: `1px solid ${hovered ? 'rgba(201,168,76,0.5)' : 'rgba(201,168,76,0.1)'}`,
        background: 'rgba(12,10,5,0.8)',
        padding: '28px 24px',
        transition: 'border-color 0.3s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Diagonal brush stroke decoration */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: hovered ? 0.15 : 0.06, transition: 'opacity 0.4s' }}>
        <line x1="0" y1="100%" x2="100%" y2="0" stroke="rgba(201,168,76,1)" strokeWidth="40" />
      </svg>

      <div className="relative">
        <div
          className="font-display font-bold tracking-[0.2em] mb-1 transition-all duration-300"
          style={{
            fontSize: '1.4rem',
            color: hovered ? 'rgba(201,168,76,0.4)' : 'var(--gold)',
          }}
        >
          {member.codename}
        </div>
        <div
          className="font-display font-bold tracking-widest transition-all duration-300"
          style={{
            fontSize: '1.1rem',
            color: 'var(--foreground)',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(8px)',
          }}
        >
          {member.name}
        </div>
        <div className="font-mono-label text-[10px] tracking-[0.2em] mt-3" style={{ color: 'rgba(201,168,76,0.4)' }}>
          {member.role}
        </div>

        <div
          className="mt-5 font-mono-label text-[9px] leading-relaxed"
          style={{ color: 'rgba(201,168,76,0.2)', opacity: hovered ? 0.8 : 0.3, transition: 'opacity 0.4s' }}
        >
          palette: #c9a84c<br />
          {'brush: active // canvas_open'}
        </div>
      </div>
    </div>
  )
}

export default function TeamSection() {
  return (
    <section id="team" className="relative" style={{ background: '#080808', padding: '120px 0' }}>
      <div className="absolute inset-0 grid-overlay opacity-30" />

      <div className="relative w-full max-w-7xl mx-auto px-8 md:px-16">
        {/* Header */}
        <div className="mb-20">
          <span className="font-mono-label text-xs tracking-[0.3em] block mb-4" style={{ color: 'rgba(201,168,76,0.35)' }}>
            SECTION 04
          </span>
          <h2
            className="font-display font-bold leading-none"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', color: 'var(--foreground)' }}
          >
            THE<br />
            <span style={{ color: 'var(--gold)' }}>TEAM</span>
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Tech Team */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div style={{ width: 30, height: 1, background: 'var(--gold)' }} />
              <span className="font-mono-label text-xs tracking-[0.3em]" style={{ color: 'var(--gold)' }}>
                TECH TEAM
              </span>
              <span className="font-mono-label text-[10px]" style={{ color: 'rgba(201,168,76,0.35)' }}>
                // ENGINE & CODE
              </span>
            </div>
            <div className="flex flex-col gap-4">
              {TECH_TEAM.map(m => <TechCard key={m.name} member={m} />)}
            </div>
          </div>

          {/* Art Team */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div style={{ width: 30, height: 1, background: 'var(--gold)' }} />
              <span className="font-mono-label text-xs tracking-[0.3em]" style={{ color: 'var(--gold)' }}>
                ART TEAM
              </span>
              <span className="font-mono-label text-[10px]" style={{ color: 'rgba(201,168,76,0.35)' }}>
                // VISION & CRAFT
              </span>
            </div>
            <div className="flex flex-col gap-4">
              {ART_TEAM.map(m => <ArtCard key={m.name} member={m} />)}
            </div>

            {/* Spacer with decoration */}
            <div
              className="mt-4 p-6"
              style={{ border: '1px dashed rgba(201,168,76,0.1)', background: 'rgba(10,8,3,0.3)' }}
            >
              <span className="font-mono-label text-[10px] tracking-widest" style={{ color: 'rgba(201,168,76,0.2)' }}>
                // MORE TO COME
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
