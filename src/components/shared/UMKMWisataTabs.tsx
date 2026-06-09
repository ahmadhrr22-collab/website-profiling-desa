'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Umkm, Wisata } from '@/payload-types'
import { UMKMCard } from './UMKMCard'
import { WAButton } from './WAButton'
import { Store, Compass, Clock, Ticket, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface UMKMWisataTabsProps {
  umkmItems: Umkm[]
  wisataItems: Wisata[]
}

const WISATA_KATEGORI_MAP: Record<string, string> = {
  alam: 'Wisata Alam',
  budaya: 'Wisata Budaya',
  religi: 'Wisata Religi',
  agrowisata: 'Agrowisata',
  buatan: 'Wisata Buatan',
  lainnya: 'Lainnya',
}

// Helper untuk mengekstrak teks dari Lexical JSON
function getLexicalText(node: any): string {
  if (!node) return ''
  if (node.type === 'text') return node.text || ''
  if (node.children && Array.isArray(node.children)) {
    return node.children.map(getLexicalText).join(' ')
  }
  return ''
}

function getRichTextSnippet(content: any, maxLength = 100): string {
  if (!content) return ''
  if (typeof content === 'string') {
    const plain = content.replace(/<[^>]*>/g, '')
    if (plain.length <= maxLength) return plain
    return plain.substring(0, maxLength).trim() + '...'
  }
  if (content.root) {
    const fullText = getLexicalText(content.root)
    const cleanText = fullText.replace(/\s+/g, ' ').trim()
    if (cleanText.length <= maxLength) return cleanText
    return cleanText.substring(0, maxLength).trim() + '...'
  }
  return ''
}

export function UMKMWisataTabs({ umkmItems, wisataItems }: UMKMWisataTabsProps) {
  const [activeTab, setActiveTab] = useState<'umkm' | 'wisata'>('umkm')

  return (
    <div className="space-y-12">
      {/* Buttons Tab Switcher */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 bg-gray-100 rounded-2xl border border-gray-200/50">
          <button
            onClick={() => setActiveTab('umkm')}
            className={cn(
              'flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer',
              activeTab === 'umkm'
                ? 'bg-white text-emerald-800 shadow-md'
                : 'text-gray-500 hover:text-gray-800'
            )}
          >
            <Store className="w-4 h-4" />
            <span>Produk UMKM</span>
            <span className="text-xs bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full font-bold ml-1">
              {umkmItems.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('wisata')}
            className={cn(
              'flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer',
              activeTab === 'wisata'
                ? 'bg-white text-emerald-800 shadow-md'
                : 'text-gray-500 hover:text-gray-800'
            )}
          >
            <Compass className="w-4 h-4" />
            <span>Destinasi Wisata</span>
            <span className="text-xs bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full font-bold ml-1">
              {wisataItems.length}
            </span>
          </button>
        </div>
      </div>

      {/* Grid Content */}
      <div className="transition-all duration-300">
        {activeTab === 'umkm' ? (
          umkmItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {umkmItems.map((item) => (
                <UMKMCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white border border-gray-100 rounded-3xl p-8 max-w-md mx-auto shadow-sm">
              <AlertCircle className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-950 mb-2">UMKM Belum Tersedia</h3>
              <p className="text-sm text-gray-500">
                Data usaha mikro dan produk lokal warga Desa Gongseng belum diinput di database CMS.
              </p>
            </div>
          )
        ) : wisataItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {wisataItems.map((dest) => {
              // Ambil foto pertama jika ada
              let imageUrl = '/images/placeholder-wisata.jpg'
              let altText = dest.nama
              if (dest.foto && dest.foto.length > 0) {
                const firstFoto = dest.foto[0].gambar
                if (typeof firstFoto === 'object' && firstFoto !== null && 'url' in firstFoto) {
                  imageUrl = firstFoto.url || imageUrl
                  altText = firstFoto.alt || dest.nama
                }
              }

              const snippet = getRichTextSnippet(dest.deskripsi, 120)

              return (
                <div
                  key={dest.id}
                  className="group flex flex-col sm:flex-row bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden h-full"
                >
                  {/* Bagian Foto */}
                  <div className="relative w-full sm:w-48 aspect-4/3 sm:aspect-auto sm:h-full bg-gray-100 overflow-hidden flex-shrink-0">
                    <Image
                      src={imageUrl}
                      alt={altText}
                      fill
                      sizes="(max-width: 640px) 100vw, 192px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-100/50 backdrop-blur-md">
                        {WISATA_KATEGORI_MAP[dest.kategori] || dest.kategori}
                      </span>
                    </div>
                  </div>

                  {/* Bagian Deskripsi */}
                  <div className="flex flex-col flex-grow p-6">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1 mb-2 group-hover:text-emerald-700 transition-colors duration-200">
                      {dest.nama}
                    </h3>
                    
                    <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
                      {snippet || 'Tidak ada deskripsi untuk destinasi wisata ini.'}
                    </p>

                    {/* Metadata Detail */}
                    <div className="space-y-2 border-t border-gray-100 pt-3 mb-5">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>{dest.jamBuka || 'Hubungi pengelola'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Ticket className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>{dest.tiket || 'Gratis'}</span>
                      </div>
                    </div>

                    {/* Button WhatsApp */}
                    <div className="mt-auto">
                      {dest.nomorWA ? (
                        <WAButton
                          nomorWA={dest.nomorWA}
                          namaItem={dest.nama}
                          className="w-full text-center py-2 text-xs"
                          label="Hubungi Pengelola Wisata"
                          pesanWA={`Halo pengelola wisata ${dest.nama}, saya ingin menanyakan perihal operasional wisata.`}
                        />
                      ) : (
                        <div className="text-[10px] text-center text-gray-400 italic py-2 border border-dashed border-gray-100 rounded-lg">
                          Kontak tidak tersedia
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-gray-100 rounded-3xl p-8 max-w-md mx-auto shadow-sm">
            <AlertCircle className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-950 mb-2">Destinasi Wisata Belum Tersedia</h3>
            <p className="text-sm text-gray-500">
              Data destinasi dan sarana rekreasi lokal Desa Gongseng belum diinput di database CMS.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
export default UMKMWisataTabs
