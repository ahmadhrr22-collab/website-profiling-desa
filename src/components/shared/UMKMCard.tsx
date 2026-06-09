import React from 'react'
import Image from 'next/image'
import { Umkm, Media } from '@/payload-types'
import { WAButton } from './WAButton'
import { cn } from '@/lib/utils'

interface UMKMCardProps {
  item: Umkm
  className?: string
}

const KATEGORI_MAP: Record<string, string> = {
  makanan: 'Makanan',
  minuman: 'Minuman',
  kerajinan: 'Kerajinan',
  jasa: 'Jasa',
  pertanian: 'Pertanian',
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
    // Bersihkan double space
    const cleanText = fullText.replace(/\s+/g, ' ').trim()
    if (cleanText.length <= maxLength) return cleanText
    return cleanText.substring(0, maxLength).trim() + '...'
  }
  return ''
}

export function UMKMCard({ item, className }: UMKMCardProps) {
  const { nama, kategori, deskripsi, foto, nomorWA, pesanWA } = item

  // Ambil gambar pertama jika ada
  let imageUrl = '/images/placeholder-umkm.jpg' // Default static placeholder
  let altText = nama
  
  if (foto && foto.length > 0) {
    const firstFoto = foto[0].gambar
    if (typeof firstFoto === 'object' && firstFoto !== null && 'url' in firstFoto) {
      imageUrl = firstFoto.url || imageUrl
      altText = firstFoto.alt || nama
    }
  }

  const snippet = getRichTextSnippet(deskripsi, 90)

  return (
    <div
      className={cn(
        'group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full',
        className
      )}
    >
      {/* Wrapper Gambar */}
      <div className="relative aspect-4/3 w-full bg-gray-100 overflow-hidden">
        <Image
          src={imageUrl}
          alt={altText}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          priority={false}
        />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-100 backdrop-blur-md">
            {KATEGORI_MAP[kategori] || kategori}
          </span>
        </div>
      </div>

      {/* Konten Text */}
      <div className="flex flex-col flex-grow p-5">
        <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-emerald-700 transition-colors duration-200 mb-2">
          {nama}
        </h3>
        
        <p className="text-sm text-gray-600 line-clamp-3 mb-6 flex-grow">
          {snippet || 'Tidak ada deskripsi untuk produk ini.'}
        </p>

        {/* Tombol Aksi */}
        <div className="mt-auto">
          {nomorWA ? (
            <WAButton
              nomorWA={nomorWA}
              pesanWA={pesanWA || undefined}
              namaItem={nama}
              className="w-full text-center"
              label="Hubungi Penjual"
            />
          ) : (
            <div className="text-xs text-center text-gray-400 italic py-2.5 border border-dashed border-gray-200 rounded-lg">
              Kontak tidak tersedia
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UMKMCard
