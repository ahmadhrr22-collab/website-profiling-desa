import React from 'react'
import Link from 'next/link'
import { Umkm } from '@/payload-types'
import { UMKMCard } from '../shared/UMKMCard'
import { ChevronRight } from 'lucide-react'

interface UMKMFeaturedSectionProps {
  items?: Umkm[]
}

export function UMKMFeaturedSection({ items = [] }: UMKMFeaturedSectionProps) {
  const hasItems = items && items.length > 0

  // Fallback data jika data asli kosong
  const displayItems = hasItems
    ? items.slice(0, 3)
    : ([
        {
          id: 1,
          nama: 'Keripik Tempe Renyah Gongseng',
          kategori: 'makanan',
          nomorWA: '81234567890',
          pesanWA: 'Halo, saya tertarik memesan Keripik Tempe Renyah Gongseng.',
          deskripsi: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Keripik tempe gurih dan renyah khas Desa Gongseng, diiris tipis secara higienis menggunakan kedelai pilihan dan resep bumbu turun-temurun tanpa pengawet.',
                    },
                  ],
                },
              ],
            },
          },
          foto: [],
        },
        {
          id: 2,
          nama: 'Batik Tulis Megaluh Khas Jombang',
          kategori: 'kerajinan',
          nomorWA: '81234567890',
          pesanWA: 'Halo, saya tertarik menanyakan motif dan harga Batik Tulis Megaluh.',
          deskripsi: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Batik cap dan tulis tradisional dengan motif dedaunan dan padi lokal Megaluh. Dibuat langsung oleh pengrajin lokal menggunakan kain katun prima yang sejuk.',
                    },
                  ],
                },
              ],
            },
          },
          foto: [],
        },
        {
          id: 3,
          nama: 'Madu Murni Ternak Bunga Jati',
          kategori: 'makanan',
          nomorWA: '81234567890',
          pesanWA: 'Halo, saya tertarik membeli Madu Murni Ternak Bunga Jati.',
          deskripsi: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Madu murni alami hasil ternak lebah madu Apis Mellifera yang dilepasliarkan di perkebunan dan hutan jati sekitar Desa Gongseng. Dijamin asli 100%.',
                    },
                  ],
                },
              ],
            },
          },
          foto: [],
        },
      ] as any[])

  return (
    <section className="py-20 bg-emerald-50/10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-sm font-bold tracking-wider text-emerald-700 uppercase mb-3 block">
              Ekonomi Kreatif
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              UMKM Unggulan Desa Gongseng
            </h2>
          </div>
          <Link
            href="/umkm-wisata"
            className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-semibold mt-4 md:mt-0 transition-colors group cursor-pointer"
          >
            <span>Lihat Semua Produk UMKM</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid Kartu */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayItems.map((item) => (
            <UMKMCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default UMKMFeaturedSection
