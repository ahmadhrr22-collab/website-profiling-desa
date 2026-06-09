'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Landmark } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavLink {
  label: string
  href: string
}

const navLinks: NavLink[] = [
  { label: 'Beranda', href: '/' },
  { label: 'Profil Desa', href: '/profil-desa' },
  { label: 'UMKM & Wisata', href: '/umkm-wisata' },
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
    <header className="sticky top-0 z-50 w-full bg-primary text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Title */}
          <Link href="/" className="flex items-center gap-3 group" onClick={closeMenu}>
            <div className="p-2 bg-secondary rounded-lg group-hover:bg-accent transition-colors">
              <Landmark className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white leading-tight">
                Desa Gongseng
              </h1>
              <p className="text-xs text-light font-medium tracking-wide">
                Kab. Jombang, Jawa Timur
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200 hover:bg-secondary/40 hover:text-white',
                    isActive
                      ? 'bg-secondary text-white shadow-sm'
                      : 'text-light hover:text-white'
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
              className="inline-flex items-center justify-center p-2 rounded-lg text-light hover:text-white hover:bg-secondary/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-white transition-colors"
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
          'lg:hidden fixed inset-x-0 top-[64px] sm:top-[80px] bg-primary border-t border-secondary/20 shadow-xl transition-all duration-300 ease-in-out transform origin-top',
          isOpen ? 'opacity-100 scale-y-100 h-auto' : 'opacity-0 scale-y-0 h-0 overflow-hidden pointer-events-none'
        )}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={cn(
                  'block px-4 py-3 rounded-lg text-base font-semibold transition-all duration-200',
                  isActive
                    ? 'bg-secondary text-white'
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
