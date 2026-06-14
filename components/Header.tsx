'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { navItems } from '@/data/site'

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-white/70 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-black text-[#FF8FB1] hover:opacity-80 transition-opacity"
        >
          戦闘妖精ぱいんちゃん
        </Link>

        {/* デスクトップナビ */}
        <nav className="hidden md:flex gap-1">
          {navItems.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                  active
                    ? 'bg-[#FFD93D] text-gray-800 shadow-sm'
                    : 'text-gray-600 hover:bg-[#FFD93D]/40 hover:text-gray-800'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* モバイル ハンバーガー */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-[#FFD93D]/30 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="メニューを開く"
        >
          <span
            className={`block w-5 h-0.5 bg-gray-600 transition-all duration-200 ${
              open ? 'rotate-45 translate-y-1.5' : ''
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-gray-600 my-1 transition-all duration-200 ${
              open ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-gray-600 transition-all duration-200 ${
              open ? '-rotate-45 -translate-y-1.5' : ''
            }`}
          />
        </button>
      </div>

      {/* モバイルメニュー */}
      {open && (
        <nav className="md:hidden bg-white/95 border-t border-[#FFD93D]/30 px-4 py-3 flex flex-col gap-1">
          {navItems.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  active ? 'bg-[#FFD93D] text-gray-800' : 'text-gray-600 hover:bg-[#FFD93D]/20'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      )}
    </header>
  )
}
