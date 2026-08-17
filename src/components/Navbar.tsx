import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Navbar() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    let lastY = 0
    const onScroll = () => {
      const y = window.scrollY
      if (ref.current) {
        ref.current.style.opacity = y > 80 ? (y < lastY ? '1' : '0') : '1'
        ref.current.style.transform = y > 80 && y > lastY ? 'translateY(-100%)' : 'translateY(0)'
      }
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      ref={ref}
      className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300"
      style={{ borderBottom: '1px solid rgba(201,168,76,0.08)' }}
    >
      <div
        className="flex items-center justify-between px-8 py-4"
        style={{ background: 'linear-gradient(to bottom, rgba(8,8,8,0.95), transparent)' }}
      >
        <span className="font-display text-sm font-bold tracking-[0.2em] text-[var(--gold)]">
          PROJECT KURUKSHETRA
        </span>
        <div className="flex items-center gap-8">
          {['ENGINE', 'GAME', 'TEAM'].map(item => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="font-mono-label text-xs tracking-[0.18em] transition-colors duration-200"
              style={{ color: 'rgba(201,168,76,0.5)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(201,168,76,0.5)')}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
