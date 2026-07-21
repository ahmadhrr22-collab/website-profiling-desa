import React from 'react'
import { getPayload } from '@/lib/payload'
import { HeroSection } from '@/components/sections/HeroSection'
import { StatistikSection } from '@/components/sections/StatistikSection'
import { SambutanSection } from '@/components/sections/SambutanSection'
import { PengumumanSection } from '@/components/sections/PengumumanSection'
import { UMKMFeaturedSection } from '@/components/sections/UMKMFeaturedSection'
import Link from 'next/link'
import { BookOpen, Award, FileText, ShoppingBag, Image as ImageIcon, Settings, ArrowRight, MessageSquare } from 'lucide-react'

// Menandakan page ini selalu dinamis agar fetch data terupdate dari database
export const revalidate = 60

export default async function HomePage() {
  let payload
  let heroData = null
  let sambutanData = null
  let demografiData = null
  let pengumumanDocs: any[] = []
  let umkmDocs: any[] = []

  try {
    payload = await getPayload()

    // Ambil data Global & Collection secara paralel untuk performa optimal
    const [heroRes, sambutanRes, demografiRes, pengumumanRes, umkmRes] = await Promise.allSettled([
      payload.findGlobal({
        slug: 'hero-beranda',
        depth: 1,
      }),
      payload.findGlobal({
        slug: 'sambutan-kades',
        depth: 1,
      }),
      payload.findGlobal({
        slug: 'data-demografi',
        depth: 1,
      }),
      payload.find({
        collection: 'pengumuman',
        sort: '-tanggalTerbit',
        limit: 3,
        depth: 1,
      }),
      payload.find({
        collection: 'umkm',
        where: {
          featured: { equals: true },
          aktif: { equals: true },
        },
        limit: 3,
        depth: 1,
      }),
    ])

    if (heroRes.status === 'fulfilled') heroData = heroRes.value
    if (sambutanRes.status === 'fulfilled') sambutanData = sambutanRes.value
    if (demografiRes.status === 'fulfilled') demografiData = demografiRes.value
    if (pengumumanRes.status === 'fulfilled') pengumumanDocs = pengumumanRes.value.docs
    if (umkmRes.status === 'fulfilled') umkmDocs = umkmRes.value.docs

  } catch (error) {
    console.error('Error fetching data from Payload CMS:', error)
  }

  // Pintasan Layanan list
  const quickLinks = [
    {
      title: 'Profil Desa',
      desc: 'Pelajari sejarah, geografi, dan visi misi pembangunan Desa Gongseng.',
      href: '/profil-desa',
      icon: BookOpen,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    },
    {
      title: 'Perangkat Desa',
      desc: 'Kenali jajaran pamong desa dan struktur organisasi pelayanan desa.',
      href: '/perangkat-desa',
      icon: Award,
      color: 'text-blue-600 bg-blue-50 border-blue-100',
    },
    {
      title: 'Layanan & Informasi',
      desc: 'Akses pengumuman penting, jadwal kegiatan posyandu, dan agenda desa.',
      href: '/layanan-informasi',
      icon: FileText,
      color: 'text-amber-600 bg-amber-50 border-amber-100',
    },
    {
      title: 'UMKM & Wisata',
      desc: 'Dukung produk lokal unggulan warga dan jelajahi potensi wisata desa.',
      href: '/umkm-wisata',
      icon: ShoppingBag,
      color: 'text-purple-600 bg-purple-50 border-purple-100',
    },
    {
      title: 'Galeri Kegiatan',
      desc: 'Dokumentasi visual berbagai kegiatan warga dan pembangunan di desa.',
      href: '/galeri',
      icon: ImageIcon,
      color: 'text-rose-600 bg-rose-50 border-rose-100',
    },
    {
      title: 'Lapor Desa',
      desc: 'Sampaikan pengaduan, saran, atau aspirasi secara langsung via WhatsApp.',
      href: '/layanan-informasi?tab=lapor',
      icon: MessageSquare,
      color: 'text-teal-600 bg-teal-50 border-teal-100',
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      {/* 1. Hero Section */}
      <HeroSection data={heroData} />

      {/* 2. Statistik Demografi */}
      <StatistikSection data={demografiData} />

      {/* 3. Sambutan Kepala Desa */}
      <SambutanSection data={sambutanData} />

      {/* 4. Pengumuman & Berita Terbaru */}
      <PengumumanSection items={pengumumanDocs} />

      {/* 5. UMKM Unggulan */}
      <UMKMFeaturedSection items={umkmDocs} />

      {/* 5.5. Banner Call to Action (CTA) Lapor Desa */}
      <section className="py-16 bg-emerald-900 text-white relative overflow-hidden">
        {/* Background decorative patterns */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.15),transparent_60%)] animate-pulse duration-5000" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-3xl text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 uppercase tracking-wider">
              Layanan Aspirasi & Pengaduan
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Punya Masalah atau Aspirasi untuk Gongseng?
            </h2>
            <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
              Laporkan keluhan infrastruktur, masalah sampah, irigasi pertanian, atau sampaikan saran pembangunan secara instan ke WhatsApp resmi Pemerintah Desa Gongseng.
            </p>
          </div>
          <div className="flex flex-shrink-0">
            <Link
              href="/layanan-informasi?tab=lapor"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-amber-500 hover:bg-amber-400 active:scale-95 text-gray-950 font-bold rounded-xl shadow-lg hover:shadow-amber-500/20 transition-all duration-200 cursor-pointer text-sm sm:text-base"
            >
              <MessageSquare className="w-5 h-5 text-gray-950" />
              <span>Mulai Lapor Desa</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Akses Cepat / Pintasan Layanan */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-bold tracking-wider text-emerald-700 uppercase mb-3 block">
              Akses Cepat
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Pintasan Layanan Desa
            </h2>
            <p className="text-gray-500 mt-4 text-sm sm:text-base">
              Klik salah satu menu di bawah ini untuk langsung menuju halaman informasi yang Anda butuhkan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {quickLinks.map((link, idx) => {
              const Icon = link.icon
              return (
                <Link
                  key={idx}
                  href={link.href}
                  className="group flex flex-col p-6 bg-white rounded-2xl border border-gray-100 hover:border-emerald-500 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-xl border ${link.color} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-700 transition-colors duration-200">
                      {link.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed mb-5 flex-grow">
                    {link.desc}
                  </p>
                  <div className="mt-auto flex items-center gap-1 text-xs font-semibold text-emerald-700 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                    <span>Kunjungi Halaman</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
