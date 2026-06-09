'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Galeri, Media } from '@/payload-types'
import { Calendar, Tag, AlertCircle, X, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface GaleriInteractiveGridProps {
  items: Galeri[]
}

const KATEGORI_MAP: Record<string, string> = {
  kegiatan: 'Kegiatan Desa',
  alam: 'Pemandangan Alam',
  infrastruktur: 'Infrastruktur',
  panen: 'Pertanian / Panen',
  budaya: 'Kebudayaan',
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  try {
    const date = new Date(dateStr)
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date)
  } catch (e) {
    return dateStr
  }
}

export function GaleriInteractiveGrid({ items }: GaleriInteractiveGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [activePhoto, setActivePhoto] = useState<Galeri | null>(null)

  // Filter items
  const filteredItems = selectedCategory === 'all'
    ? items
    : items.filter(item => item.kategori === selectedCategory)

  const categories = [
    { value: 'all', label: 'Semua Foto' },
    { value: 'kegiatan', label: 'Kegiatan Desa' },
    { value: 'alam', label: 'Pemandangan Alam' },
    { value: 'infrastruktur', label: 'Infrastruktur' },
    { value: 'panen', label: 'Pertanian / Panen' },
    { value: 'budaya', label: 'Kebudayaan' },
  ]

  return (
    <div className="space-y-12">
      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={cn(
              'px-4 py-2 rounded-full text-xs font-semibold tracking-wide border transition-all duration-200 cursor-pointer',
              selectedCategory === cat.value
                ? 'bg-emerald-600 border-emerald-600 text-white shadow-md'
                : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900'
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid Foto */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => {
            let imageUrl = '/images/placeholder-galeri.jpg'
            let altText = item.judul
            if (item.foto && typeof item.foto === 'object' && 'url' in item.foto) {
              imageUrl = item.foto.url || imageUrl
              altText = item.foto.alt || item.judul
            }

            return (
              <div
                key={item.id}
                onClick={() => setActivePhoto(item)}
                className="group relative aspect-square rounded-2xl bg-gray-100 overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
              >
                <Image
                  src={imageUrl}
                  alt={altText}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                  <span className="inline-flex w-fit items-center px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-2">
                    {KATEGORI_MAP[item.kategori] || item.kategori}
                  </span>
                  <h4 className="text-white font-extrabold text-sm leading-snug line-clamp-1">
                    {item.judul}
                  </h4>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10">
                    <span className="text-[10px] text-gray-300 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(item.tanggal)}
                    </span>
                    <Search className="w-4 h-4 text-emerald-400" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-white border border-gray-100 rounded-3xl p-8 max-w-md mx-auto shadow-sm">
          <AlertCircle className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-950 mb-2">Foto Tidak Ditemukan</h3>
          <p className="text-sm text-gray-500">
            Tidak ada dokumentasi foto untuk kategori ini dalam database.
          </p>
        </div>
      )}

      {/* Lightbox Modal / Pop-up */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-md transition-opacity duration-300">
          <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-800/20 flex flex-col md:flex-row max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors shadow-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Container Gambar */}
            <div className="relative flex-grow md:w-3/5 aspect-4/3 md:aspect-auto md:h-auto min-h-[300px] bg-gray-950 flex items-center justify-center">
              <Image
                src={
                  activePhoto.foto && typeof activePhoto.foto === 'object' && 'url' in activePhoto.foto && activePhoto.foto.url
                    ? activePhoto.foto.url
                    : '/images/placeholder-galeri.jpg'
                }
                alt={activePhoto.judul}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 60vw"
                priority
              />
            </div>

            {/* Container Detail Info */}
            <div className="p-6 md:p-8 md:w-2/5 flex flex-col justify-between bg-white overflow-y-auto">
              <div>
                {/* Kategori Badge */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-100">
                    <Tag className="w-3 h-3" />
                    {KATEGORI_MAP[activePhoto.kategori] || activePhoto.kategori}
                  </span>
                </div>

                {/* Judul */}
                <h3 className="text-xl font-black text-gray-900 leading-snug mb-3">
                  {activePhoto.judul}
                </h3>

                {/* Keterangan / Caption */}
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  {activePhoto.keterangan || 'Tidak ada keterangan tambahan untuk dokumentasi ini.'}
                </p>
              </div>

              {/* Tanggal Pengambilan */}
              <div className="pt-4 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-500 mt-auto">
                <Calendar className="w-4 h-4 text-emerald-600" />
                <span>Diambil pada: <strong>{formatDate(activePhoto.tanggal)}</strong></span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default GaleriInteractiveGrid
