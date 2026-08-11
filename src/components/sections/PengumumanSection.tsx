import React from 'react'
import Link from 'next/link'
import { Pengumuman, Media } from '@/payload-types'
import { Calendar, Bell, Download, ChevronRight } from 'lucide-react'
import { RichText } from '../shared/RichText'

interface PengumumanSectionProps {
  items?: Pengumuman[]
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

// Helper untuk mengekstrak teks dari Lexical JSON
function getLexicalText(node: any): string {
  if (!node) return ''
  if (node.type === 'text') return node.text || ''
  if (node.children && Array.isArray(node.children)) {
    return node.children.map(getLexicalText).join(' ')
  }
  return ''
}

function getSnippet(content: any, maxLength = 120): string {
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

export function PengumumanSection({ items = [] }: PengumumanSectionProps) {
  // Setup fallback data jika data asli kosong
  const hasItems = items && items.length > 0
  
  const displayItems = hasItems
    ? items.slice(0, 3)
    : [
        {
          id: 'sembada-1',
          judul: 'Tim KKN-T IPB Gelar Program SEMBADA: Inovasi Penyemaian Padi Media Tray Bersama Poktan Garurejo',
          tanggalTerbit: '2026-08-11T00:00:00.000Z',
          penting: true,
          isNewsArticle: true,
          slug: '/layanan-informasi/sembada-penyemaian-bibit-padi',
          konten: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Program pendampingan teknis dan praktik langsung penyemaian benih padi mandiri menggunakan media tray guna meningkatkan efisiensi benih dan ketahanan bibit petani Desa Gongseng.',
                    },
                  ],
                },
              ],
            },
          },
        },
        {
          id: 2,
          judul: 'Pemberitahuan Posyandu Balita & Poswindu Agustus 2026',
          tanggalTerbit: '2026-08-05T00:00:00.000Z',
          penting: false,
          konten: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Posyandu rutin bulanan untuk balita dan Poswindu lansia akan diselenggarakan di Balai Desa mulai pukul 08.00 WIB. Diharapkan kehadiran ibu dan balita membawa KAI.',
                    },
                  ],
                },
              ],
            },
          },
        },
        {
          id: 3,
          judul: 'Rencana Gotong Royong Kebersihan Saluran Irigasi Desa',
          tanggalTerbit: '2026-07-25T00:00:00.000Z',
          penting: false,
          konten: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Kerja bakti pembersihan saluran irigasi primer untuk memperlancar suplai air sawah warga menjelang musim tanam padi kedua tahun ini. Dimohon partisipasi warga.',
                    },
                  ],
                },
              ],
            },
          },
        },
      ] as any[]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-sm font-bold tracking-wider text-emerald-700 uppercase mb-3 block">
              Pusat Informasi
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Pengumuman & Berita Terbaru
            </h2>
          </div>
          <Link
            href="/layanan-informasi"
            className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-semibold mt-4 md:mt-0 transition-colors group cursor-pointer"
          >
            <span>Lihat Semua Pengumuman</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid Kartu */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayItems.map((item) => {
            const isPenting = item.penting
            const snippet = getSnippet(item.konten)
            const lampiran = item.lampiran

            return (
              <div
                key={item.id}
                className={`flex flex-col p-6 rounded-2xl border transition-all duration-300 relative ${
                  isPenting
                    ? 'border-emerald-500 bg-emerald-50/10 shadow-lg shadow-emerald-500/5 ring-1 ring-emerald-500/30'
                    : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-md'
                }`}
              >
                {/* Badge Penting */}
                {isPenting && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-amber-500 text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded">
                    <Bell className="w-3 h-3" />
                    <span>PENTING</span>
                  </div>
                )}

                {/* Metadata Tanggal */}
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <span>{formatDate(item.tanggalTerbit)}</span>
                </div>

                {/* Judul */}
                <h3 className="text-lg font-bold text-gray-900 line-clamp-2 leading-snug mb-3 group-hover:text-emerald-700 transition-colors duration-200">
                  {item.judul}
                </h3>

                {/* Deskripsi Snippet */}
                <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed mb-6 flex-grow">
                  {snippet}
                </p>

                {/* Attachment / Readmore Link */}
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                  {lampiran && typeof lampiran === 'object' && 'url' in lampiran && lampiran.url ? (
                    <a
                      href={lampiran.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>Unduh Lampiran</span>
                    </a>
                  ) : (
                    <span className="text-xs text-gray-400">Tidak ada lampiran</span>
                  )}
                  <Link
                    href={item.slug || `/layanan-informasi#pengumuman-${item.id}`}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors inline-flex items-center gap-0.5"
                  >
                    <span>Baca Berita Selengkapnya</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default PengumumanSection
