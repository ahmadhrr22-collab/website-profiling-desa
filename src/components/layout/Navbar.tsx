'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavLink {
  label: string
  href: string
}

const navLinks: NavLink[] = [
  { label: 'Beranda', href: '/' },
  { label: 'Profil Desa', href: '/profil-desa' },
  { label: 'Potensi & Pertanian', href: '/potensi-pertanian' },
  { label: 'Galeri', href: '/galeri' },
  { label: 'Perangkat Desa', href: '/perangkat-desa' },
  { label: 'Layanan & Informasi', href: '/layanan-informasi' },
]

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-primary/95 backdrop-blur-md text-white shadow-md border-b border-secondary/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Title */}
          <Link href="/" className="flex items-center gap-3 group" onClick={closeMenu}>
            <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-white p-0.5 flex items-center justify-center border border-emerald-400/30 shadow-sm shrink-0 group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/images/logo-kabupaten-jombang.jpg"
                alt="Logo Kabupaten Jombang"
                width={36}
                height={36}
                className="object-contain"
                priority
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-white leading-tight group-hover:text-emerald-300 transition-colors">
                  Desa Gongseng
                </h1>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-emerald-300 bg-emerald-900/80 border border-emerald-700/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Aktif
                </span>
              </div>
              <p className="text-xs text-light/80 font-medium tracking-wide">
                Kec. Megaluh, Kab. Jombang
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-emerald-950/40 p-1.5 rounded-full border border-emerald-800/40">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300',
                    isActive
                      ? 'bg-secondary text-white shadow-md font-bold'
                      : 'text-light/90 hover:text-white hover:bg-secondary/30'
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-xl text-light hover:text-white hover:bg-secondary/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-white transition-colors"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Buka menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={cn(
          'lg:hidden fixed inset-x-0 top-[64px] sm:top-[80px] bg-primary/98 backdrop-blur-lg border-t border-secondary/20 shadow-2xl transition-all duration-300 ease-in-out transform origin-top',
          isOpen ? 'opacity-100 scale-y-100 h-auto' : 'opacity-0 scale-y-0 h-0 overflow-hidden pointer-events-none'
        )}
        id="mobile-menu"
      >
        <div className="px-3 pt-3 pb-5 space-y-1.5 sm:px-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={cn(
                  'block px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200',
                  isActive
                    ? 'bg-secondary text-white font-bold shadow-sm'
                    : 'text-light hover:bg-secondary/35 hover:text-white'
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      </div>
    </header>
  )
}

export default Navbar
