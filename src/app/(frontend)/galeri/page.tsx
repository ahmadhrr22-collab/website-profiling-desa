import React from 'react'
import { getPayload } from '@/lib/payload'
import { GaleriInteractiveGrid } from '@/components/shared/GaleriInteractiveGrid'
import { PageHero } from '@/components/shared/PageHero'
import { Image as ImageIcon } from 'lucide-react'
import { Galeri } from '@/payload-types'

export const revalidate = 60

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

  // Fallback data foto asli desa jika database kosong
  const fallbackDocs = [
    {
      id: 1,
      judul: 'Kantor & Balai Desa Gongseng',
      kategori: 'infrastruktur',
      tanggal: '2026-08-01T00:00:00.000Z',
      keterangan: 'Gedung Kantor dan Balai Desa Gongseng sebagai pusat pelayanan administratif dan tempat musyawarah pembangunan bagi seluruh warga desa.',
      foto: {
        url: '/images/footage desa gongseng/kantor_desa.jpg',
        alt: 'Kantor Balai Desa Gongseng',
      },
    },
    {
      id: 2,
      judul: 'Patung Monumen Brigjen Kretarto',
      kategori: 'budaya',
      tanggal: '2026-08-01T00:00:00.000Z',
      keterangan: 'Monumen bersejarah penghormatan atas rekam jejak perjuangan Brigadir Jenderal Kretarto di wilayah Desa Gongseng, Megaluh.',
      foto: {
        url: '/images/footage desa gongseng/monument.jpg',
        alt: 'Patung Monumen Brigjen Kretarto',
      },
    },
    {
      id: 3,
      judul: 'Relief Pahlawan Perjuangan Desa Gongseng',
      kategori: 'budaya',
      tanggal: '2026-08-01T00:00:00.000Z',
      keterangan: 'Ukiran relief dinding bersejarah yang mengabadikan semangat keberanian dan perjuangan warga Desa Gongseng dalam mempertahankan kedaulatan NKRI.',
      foto: {
        url: '/images/footage desa gongseng/relief.jpg',
        alt: 'Relief Pahlawan Perjuangan Desa Gongseng',
      },
    },
    {
      id: 4,
      judul: 'Pemandangan Hamparan Sawah Irigasi Desa Gongseng',
      kategori: 'alam',
      tanggal: '2026-08-01T00:00:00.000Z',
      keterangan: 'Lahan agraris produktif Desa Gongseng dengan sistem irigasi teknis yang subur penghasil tanaman padi dan holtikultura berkualitas.',
      foto: {
        url: '/images/footage desa gongseng/sawah.jpg',
        alt: 'Pemandangan sawah Desa Gongseng',
      },
    },
    {
      id: 5,
      judul: 'Halaman Depan & Pelataran Balai Desa',
      kategori: 'infrastruktur',
      tanggal: '2026-08-01T00:00:00.000Z',
      keterangan: 'Halaman dan lingkungan Balai Desa Gongseng yang tertata rapi, asri, dan ramah bagi masyarakat yang mengurus administrasi kependudukan.',
      foto: {
        url: '/images/footage desa gongseng/halaman_depan.jpg',
        alt: 'Halaman Depan Balai Desa Gongseng',
      },
    },
    {
      id: 6,
      judul: 'Interior Ruang Pertemuan Balai Desa Gongseng',
      kategori: 'kegiatan',
      tanggal: '2026-08-01T00:00:00.000Z',
      keterangan: 'Ruang balai pertemuan utama yang digunakan untuk rapat koordinasi RT/RW, rembuk stunting, dan musyawarah pembangunan desa (Musrenbangdes).',
      foto: {
        url: '/images/footage desa gongseng/dalam_balai.jpg',
        alt: 'Interior Balai Desa Gongseng',
      },
    },
  ] as any[]

  const finalDocs = hasData ? docs : fallbackDocs

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      {/* Hero Header Banner */}
      <PageHero
        badge="Dokumentasi Visual"
        title="Galeri"
        description="Kumpulan potret pembangunan infrastruktur, kegiatan kemasyarakatan, kebudayaan lokal, serta pesona alam pertanian Desa Gongseng."
        icon={ImageIcon}
      />

      {/* Main Content (Interactive Filters and Lightbox) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <GaleriInteractiveGrid items={finalDocs} />
      </main>
    </div>
  )
}
