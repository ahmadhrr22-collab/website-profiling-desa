import React from 'react'
import { getPayload } from '@/lib/payload'
import { UMKMWisataTabs } from '@/components/shared/UMKMWisataTabs'
import { Umkm, Wisata } from '@/payload-types'

export const revalidate = 0

export const metadata = {
  title: 'UMKM & Wisata - Desa Gongseng',
  description: 'Temukan produk lokal unggulan UMKM dan berbagai destinasi wisata menarik di Desa Gongseng, Kecamatan Megaluh, Kabupaten Jombang.',
}

export default async function UMKMWisataPage() {
  let umkmDocs: Umkm[] = []
  let wisataDocs: Wisata[] = []
  let hasData = false

  try {
    const payload = await getPayload()
    const [umkmRes, wisataRes] = await Promise.allSettled([
      payload.find({
        collection: 'umkm',
        where: {
          aktif: { equals: true },
        },
        sort: 'nama',
        depth: 1,
      }),
      payload.find({
        collection: 'wisata',
        sort: 'nama',
        depth: 1,
      }),
    ])

    if (umkmRes.status === 'fulfilled' && umkmRes.value.docs.length > 0) {
      umkmDocs = umkmRes.value.docs
      hasData = true
    }
    if (wisataRes.status === 'fulfilled' && wisataRes.value.docs.length > 0) {
      wisataDocs = wisataRes.value.docs
      hasData = true
    }

  } catch (error) {
    console.error('Error fetching UMKM & Wisata data:', error)
  }

  // Fallback data jika database kosong
  const fallbackUmkm = [
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
  ] as any[]

  const fallbackWisata = [
    {
      id: 1,
      nama: 'Wisata Edukasi Pertanian Desa Gongseng',
      kategori: 'agrowisata',
      tiket: 'Rp 15.000 / Orang',
      jamBuka: 'Sabtu & Minggu, 08:00 - 15:00 WIB',
      nomorWA: '81234567890',
      deskripsi: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Ekowisata bertema edukasi pertanian, di mana pengunjung dapat belajar langsung cara menanam padi di sawah berlumpur, mengenal tanaman hortikultura organik, hingga memerah susu kambing etawa langsung di kandang.',
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
      nama: 'Situs Religi Makam Mbah Gongseng',
      kategori: 'religi',
      tiket: 'Gratis / Infaq Sukarela',
      jamBuka: 'Setiap Hari, 24 Jam',
      nomorWA: '81234567890',
      deskripsi: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Destinasi wisata religi ziarah makam leluhur pembabat alas yang dihormati masyarakat Desa Gongseng. Situs makam ini sangat ramai didatangi peziarah terutama pada malam Jumat Legi untuk kirim doa bersama.',
                },
              ],
            },
          ],
        },
      },
      foto: [],
    },
  ] as any[]

  const finalUmkm = hasData ? umkmDocs : fallbackUmkm
  const finalWisata = hasData ? wisataDocs : fallbackWisata

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      {/* Hero Header Banner */}
      <section className="relative bg-emerald-900 py-20 text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent_70%)]" />
        <div className="relative max-w-4xl mx-auto px-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-emerald-300 bg-emerald-950/80 border border-emerald-800/60 mb-4 uppercase tracking-wider">
            Potensi Ekonomi & Pariwisata
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            UMKM & Wisata Desa
          </h1>
          <p className="text-emerald-100/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Dukung produk lokal unggulan hasil olahan warga Desa Gongseng dan jelajahi berbagai potensi rekreasi edukasi pedesaan kami.
          </p>
        </div>
      </section>

      {/* Main Content (Tabs and Lists) */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <UMKMWisataTabs umkmItems={finalUmkm} wisataItems={finalWisata} />
      </main>
    </div>
  )
}
