import React from 'react'
import Image from 'next/image'
import { LucideIcon } from 'lucide-react'

interface PageHeroProps {
  badge: string
  title: string
  description: string
  icon?: LucideIcon
}

export function PageHero({ badge, title, description, icon: Icon }: PageHeroProps) {
  return (
    <section className="relative bg-emerald-950 py-16 sm:py-20 text-center text-white overflow-hidden border-b border-emerald-900/60">
      {/* Background Scenic Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg-village.jpg"
          alt="Latar Belakang Pemandangan Desa Gongseng"
          fill
          className="object-cover opacity-30 mix-blend-luminosity"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/90 via-emerald-950/85 to-emerald-950/95" />
      </div>

      {/* Decorative Radial Lighting */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top,rgba(52,211,153,0.15),transparent_70%)] pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-extrabold text-emerald-300 bg-emerald-900/80 border border-emerald-700/60 uppercase tracking-widest shadow-xs">
          {Icon && <Icon className="w-3.5 h-3.5" />}
          {badge}
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-md leading-tight">
          {title}
        </h1>
        <p className="text-emerald-100/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-normal">
          {description}
        </p>
      </div>
    </section>
  )
}
