import { useState } from 'react'

type TeamMember = {
  name: string
  codename?: string
  role: string
  contact: {
    email: string
    github: string
    linkedin: string
  }
}

// Add real contact details here. Empty fields intentionally render as non-links.
const TECH_TEAM: TeamMember[] = [
  { name: 'Viral', codename: 'Virus', role: 'Tech / Programming', contact: { email: '', github: '', linkedin: '' } },
  { name: 'Gauri', codename: 'IDK', role: 'Tech / Programming', contact: { email: '', github: '', linkedin: '' } },
  { name: 'Sanket', codename: 'Supra', role: 'Tech / Programming', contact: { email: '', github: '', linkedin: '' } },
]

const ART_TEAM: TeamMember[] = [
  { name: 'Darshana', codename: 'Darshanova', role: 'Art', contact: { email: '', github: '', linkedin: '' } },
  { name: 'Neel', role: 'Art', contact: { email: '', github: '', linkedin: '' } },
]

function ContactArea({ contact }: { contact: TeamMember['contact'] }) {
  const channels = [
    { label: 'EMAIL', value: contact.email, href: contact.email ? `mailto:${contact.email}` : '' },
    { label: 'GITHUB', value: contact.github, href: contact.github },
    { label: 'LINKEDIN', value: contact.linkedin, href: contact.linkedin },
  ]

  return (
    <div className="mt-5 pt-4 flex flex-wrap gap-x-4 gap-y-2" style={{ borderTop: '1px solid rgba(201,168,76,0.1)' }}>
      {channels.map(channel => channel.href ? (
        <a key={channel.label} href={channel.href} target="_blank" rel="noreferrer" className="font-mono-label text-[9px] tracking-widest" style={{ color: 'rgba(201,168,76,0.6)' }}>
          {channel.label}
        </a>
      ) : null)}
      {!channels.some(channel => channel.href) && (
        <span className="font-mono-label text-[9px] tracking-widest" style={{ color: 'rgba(201,168,76,0.25)' }}>
          CONTACT // ADD DETAILS
        </span>
      )}
    </div>
  )
}

function TechCard({ member }: { member: TeamMember }) {
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
        {member.codename && <div
          className="font-display font-bold tracking-[0.2em] mb-1 transition-all duration-300"
          style={{ fontSize: '1.4rem', color: hovered ? 'rgba(201,168,76,0.4)' : 'var(--gold)' }}
        >{member.codename}</div>}

        {/* Real name (on hover) */}
        <div
          className="font-display font-bold tracking-widest transition-all duration-300"
          style={{
            fontSize: '1.1rem',
            color: 'var(--foreground)',
            opacity: 1,
            transform: 'translateY(0)',
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
        <ContactArea contact={member.contact} />
      </div>
    </div>
  )
}

function ArtCard({ member }: { member: TeamMember }) {
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
        {member.codename && <div
          className="font-display font-bold tracking-[0.2em] mb-1 transition-all duration-300"
          style={{
            fontSize: '1.4rem',
            color: hovered ? 'rgba(201,168,76,0.4)' : 'var(--gold)',
          }}
        >
          {member.codename}
        </div>}
        <div
          className="font-display font-bold tracking-widest transition-all duration-300"
          style={{
            fontSize: '1.1rem',
            color: 'var(--foreground)',
            opacity: 1,
            transform: 'translateY(0)',
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
        <ContactArea contact={member.contact} />
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
