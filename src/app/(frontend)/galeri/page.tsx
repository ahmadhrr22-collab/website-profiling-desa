import React from 'react'
import { getPayload } from '@/lib/payload'
import { GaleriInteractiveGrid } from '@/components/shared/GaleriInteractiveGrid'
import { Galeri } from '@/payload-types'

export const revalidate = 0

export const metadata = {
  title: 'Galeri Kegiatan - Desa Gongseng',
  description: 'Dokumentasi foto kegiatan gotong royong, pembangunan desa, potensi pertanian, kebudayaan lokal, dan pelayanan sosial kemasyarakatan di Desa Gongseng.',
}

export default async function GaleriPage() {
  let docs: Galeri[] = []
  let hasData = false

  try {
    const payload = await getPayload()
    const response = await payload.find({
      collection: 'galeri',
      sort: '-tanggal',
      depth: 1,
    })

    if (response && response.docs && response.docs.length > 0) {
      docs = response.docs
      hasData = true
    }
  } catch (error) {
    console.error('Error fetching Galeri data:', error)
  }

  // Fallback data foto jika database kosong
  const fallbackDocs = [
    {
      id: 1,
      judul: 'Gotong Royong Warga Membersihkan Saluran Irigasi Sawah',
      kategori: 'kegiatan',
      tanggal: '2026-06-05T00:00:00.000Z',
      keterangan: 'Kebersamaan warga Dusun Gongseng bahu-membahu membersihkan rumput liar dan sedimen lumpur di saluran air irigasi sawah utama untuk kelancaran aliran air menjelang musim panen.',
      foto: {
        url: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&auto=format&fit=crop&q=80',
        alt: 'Warga gotong royong irigasi',
      },
    },
    {
      id: 2,
      judul: 'Pemandangan Hamparan Sawah Hijau Desa Gongseng',
      kategori: 'alam',
      tanggal: '2026-05-28T00:00:00.000Z',
      keterangan: 'Keindahan alam persawahan Desa Gongseng di sore hari dengan latar belakang langit jingga keemasan yang menyejukkan mata bagi siapa saja yang melintas.',
      foto: {
        url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80',
        alt: 'Pemandangan sawah hijau',
      },
    },
    {
      id: 3,
      judul: 'Pesta Panen Raya Padi Varietas Unggul',
      kategori: 'panen',
      tanggal: '2026-05-15T00:00:00.000Z',
      keterangan: 'Hasil panen melimpah para petani Desa Gongseng menggunakan alat pemotong padi modern (combine harvester) yang mempercepat proses panen padi varietas unggul Jombang.',
      foto: {
        url: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=800&auto=format&fit=crop&q=80',
        alt: 'Panen raya padi Gongseng',
      },
    },
    {
      id: 4,
      judul: 'Penyelesaian Pembangunan Jalan Rabat Beton Lingkungan',
      kategori: 'infrastruktur',
      tanggal: '2026-04-30T00:00:00.000Z',
      keterangan: 'Realisasi pembangunan infrastruktur jalan rabat beton di pemukiman Dusun Gongseng Barat guna mempermudah mobilitas transportasi warga sehari-hari.',
      foto: {
        url: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=800&auto=format&fit=crop&q=80',
        alt: 'Pembangunan jalan rabat beton',
      },
    },
    {
      id: 5,
      judul: 'Pentas Seni Tradisional Jaranan Khas Jombang',
      kategori: 'budaya',
      tanggal: '2026-04-18T00:00:00.000Z',
      keterangan: 'Pelestarian seni tari budaya jaranan pegon khas daerah Jombang yang digelar meriah pada acara bersih desa tahunan sebagai wujud melestarikan tradisi leluhur.',
      foto: {
        url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80',
        alt: 'Pentas tari jaranan tradisional',
      },
    },
    {
      id: 6,
      judul: 'Pemeriksaan Kesehatan Ibu & Anak Rutin di Posyandu Melati',
      kategori: 'kegiatan',
      tanggal: '2026-04-05T00:00:00.000Z',
      keterangan: 'Kegiatan bulanan penimbangan berat badan, pengukuran tinggi badan, pemberian imunisasi, serta penyuluhan gizi bagi balita oleh kader PKK di Posyandu Melati.',
      foto: {
        url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=80',
        alt: 'Kegiatan imunisasi posyandu',
      },
    },
  ] as any[]

  const finalDocs = hasData ? docs : fallbackDocs

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      {/* Hero Header Banner */}
      <section className="relative bg-emerald-900 py-20 text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent_70%)]" />
        <div className="relative max-w-4xl mx-auto px-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-emerald-300 bg-emerald-950/80 border border-emerald-800/60 mb-4 uppercase tracking-wider">
            Dokumentasi Visual
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Galeri Kegiatan Desa
          </h1>
          <p className="text-emerald-100/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Kumpulan potret pembangunan infrastruktur, kegiatan kemasyarakatan, kebudayaan lokal, serta pesona alam pertanian Desa Gongseng.
          </p>
        </div>
      </section>

      {/* Main Content (Interactive Filters and Lightbox) */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <GaleriInteractiveGrid items={finalDocs} />
      </main>
    </div>
  )
}
