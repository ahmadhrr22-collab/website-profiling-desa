import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { HeroBeranda, Media } from '@/payload-types'
import { ArrowRight } from 'lucide-react'

interface HeroSectionProps {
  data?: HeroBeranda | null
}

export function HeroSection({ data }: HeroSectionProps) {
  // Setup fallback data
  const tagline = data?.tagline || 'Desa Gongseng Go Digital!'
  const deskripsi = data?.deskripsi || 'Portal resmi pelayanan dan pusat informasi digital Desa Gongseng, Kec. Megaluh, Kab. Jombang, Jawa Timur.'
  
  let bgUrl = '/images/hero-default.jpg' // Static placeholder
  if (data?.fotoHero && typeof data.fotoHero === 'object' && 'url' in data.fotoHero) {
    bgUrl = data.fotoHero.url || bgUrl
  }

  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-gray-950">
      {/* Background Image with zoom animation */}
      <div className="absolute inset-0 w-full h-full select-none pointer-events-none">
        <Image
          src={bgUrl}
          alt="Latar Belakang Desa Gongseng"
          fill
          priority
          className="object-cover object-center opacity-85 scale-105 animate-subtle-zoom"
          sizes="100vw"
        />
        {/* Soft overlay and gradient to blend background smoothly */}
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-transparent to-black/20" />
      </div>

      {/* Decorative Blur Shapes */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />

      {/* Hero Content */}
      <div className="relative max-w-5xl mx-auto px-6 py-20 text-center flex flex-col items-center">
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 max-w-4xl leading-[1.15] font-sans">
          {tagline}
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
          {deskripsi}
        </p>

        {/* Buttons / CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
          <Link
            href="/profil-desa"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-500 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-emerald-900/30 cursor-pointer"
          >
            <span>Jelajahi Profil Desa</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/layanan-informasi"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-gray-200 bg-gray-900/80 border border-gray-800 hover:bg-gray-800 hover:text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 backdrop-blur-md cursor-pointer"
          >
            Pelayanan & Informasi
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
