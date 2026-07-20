import React from 'react'
import { getPayload } from '@/lib/payload'
import { LayananInformasiTabs } from '@/components/shared/LayananInformasiTabs'
import { Kegiatan, Pengumuman } from '@/payload-types'

export const revalidate = 60

export const metadata = {
  title: 'Layanan & Informasi - Desa Gongseng',
  description: 'Portal informasi resmi Desa Gongseng. Akses pengumuman penting pemerintah desa, berita warga terbaru, serta jadwal agenda kegiatan desa.',
}

export default async function LayananInformasiPage() {
  let kegiatanDocs: Kegiatan[] = []
  let pengumumanDocs: Pengumuman[] = []
  let hasData = false

  let kontakData: any = null
  try {
    const payload = await getPayload()
    const [kegiatanRes, pengumumanRes, kontakRes] = await Promise.allSettled([
      payload.find({
        collection: 'kegiatan',
        sort: '-tanggal',
        depth: 1,
      }),
      payload.find({
        collection: 'pengumuman',
        sort: '-tanggalTerbit',
        depth: 1,
      }),
      payload.findGlobal({
        slug: 'kontak-sosmed',
        depth: 1,
      }),
    ])

    if (kegiatanRes.status === 'fulfilled' && kegiatanRes.value.docs.length > 0) {
      kegiatanDocs = kegiatanRes.value.docs
      hasData = true
    }
    if (pengumumanRes.status === 'fulfilled' && pengumumanRes.value.docs.length > 0) {
      pengumumanDocs = pengumumanRes.value.docs
      hasData = true
    }
    if (kontakRes.status === 'fulfilled') {
      kontakData = kontakRes.value
    }
  } catch (error) {
    console.error('Error fetching Layanan & Informasi data:', error)
  }

  // Fallback data jika database kosong
  const fallbackKegiatan = [
    {
      id: 1,
      judul: 'Pemeriksaan Posyandu Melati Rutin Bulanan',
      kategori: 'kesehatan',
      tanggal: '2026-07-10T00:00:00.000Z',
      waktu: '08:00 - 11:30 WIB',
      lokasi: 'Posyandu Melati (Rumah Ibu Kasun Gongseng)',
      deskripsi: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Kegiatan rutin bulanan penimbangan berat badan balita, imunisasi polio, campak, serta DPT dasar lengkap. Juga diselenggarakan pemeriksaan tensi darah gratis bagi ibu hamil dan pemberian vitamin A bagi balita.',
                },
              ],
            },
          ],
        },
      },
      dokumen: null,
    },
    {
      id: 2,
      judul: 'Pelatihan Pembuatan Pupuk Organik Bokashi Cair & Padat',
      kategori: 'pertanian',
      tanggal: '2026-06-25T00:00:00.000Z',
      waktu: '09:00 WIB - Selesai',
      lokasi: 'Pendopo Balai Desa Gongseng',
      deskripsi: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Pemberdayaan kelompok tani desa Gongseng untuk mengolah limbah kotoran sapi dan sekam padi menjadi pupuk organik bermutu tinggi menggunakan starter EM4. Pelatihan dipandu oleh PPL Kecamatan Megaluh.',
                },
              ],
            },
          ],
        },
      },
      dokumen: null,
    },
    {
      id: 3,
      judul: 'Musyawarah Perencanaan Pembangunan Desa (Musrenbangdes)',
      kategori: 'pemerintahan',
      tanggal: '2026-06-12T00:00:00.000Z',
      waktu: '19:30 WIB - Selesai',
      lokasi: 'Pendopo Balai Desa Gongseng',
      deskripsi: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Rapat terbuka jajaran perangkat desa, BPD, ketua RT/RW, dan tokoh masyarakat untuk membahas rancangan Rencana Kerja Pemerintah Desa (RKPDes) tahun anggaran berikutnya.',
                },
              ],
            },
          ],
        },
      },
      dokumen: null,
    },
  ] as any[]

  const fallbackPengumuman = [
    {
      id: 1,
      judul: 'Pemberitahuan Posyandu Balita & Poswindu Juli 2026',
      tanggalTerbit: '2026-07-05T00:00:00.000Z',
      penting: true,
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
      lampiran: null,
    },
    {
      id: 2,
      judul: 'Penyuluhan Budidaya Pertanian Organik Modern',
      tanggalTerbit: '2026-06-20T00:00:00.000Z',
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
                  text: 'Diberitahukan kepada seluruh anggota kelompok tani Desa Gongseng untuk menghadiri pelatihan pembuatan pupuk organik bokashi bersama dinas pertanian setempat.',
                },
              ],
            },
          ],
        },
      },
      lampiran: null,
    },
  ] as any[]

  const finalKegiatan = hasData ? kegiatanDocs : fallbackKegiatan
  const finalPengumuman = hasData ? pengumumanDocs : fallbackPengumuman

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      {/* Hero Header Banner */}
      <section className="relative bg-emerald-900 py-20 text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent_70%)]" />
        <div className="relative max-w-4xl mx-auto px-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-emerald-300 bg-emerald-950/80 border border-emerald-800/60 mb-4 uppercase tracking-wider">
            Portal Informasi Publik
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Layanan & Informasi Desa
          </h1>
          <p className="text-emerald-100/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Ikuti berbagai pengumuman resmi pemerintah desa serta jadwal agenda kegiatan kemasyarakatan terbaru di wilayah Desa Gongseng.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <LayananInformasiTabs 
          kegiatanItems={finalKegiatan} 
          pengumumanItems={finalPengumuman} 
          kontak={kontakData}
        />
      </main>
    </div>
  )
}
