import React from 'react'
import Image from 'next/image'
import { getPayload } from '@/lib/payload'
import { PerangkatDesa } from '@/payload-types'
import { WAButton } from '@/components/shared/WAButton'
import { SOTKDiagram } from '@/components/shared/SOTKDiagram'
import { PageHero } from '@/components/shared/PageHero'
import { Award, Users } from 'lucide-react'

export const revalidate = 60

export const metadata = {
  title: 'Perangkat Desa - Desa Gongseng',
  description: 'Susunan Organisasi dan Tata Kerja (SOTK) Pemerintah Desa Gongseng, Kecamatan Megaluh, Kabupaten Jombang.',
}

export default async function PerangkatDesaPage() {
  let devices: PerangkatDesa[] = []
  let hasDevices = false

  try {
    const payload = await getPayload()
    const response = await payload.find({
      collection: 'perangkat-desa',
      where: {
        aktif: { equals: true },
      },
      sort: 'urutan',
      limit: 100, // Memastikan seluruh 13 perangkat desa terambil tanpa batasan default 10
      depth: 1,
    })
    
    if (response && response.docs && response.docs.length > 0) {
      devices = response.docs
      hasDevices = true
    }
  } catch (error) {
    console.error('Error fetching Perangkat Desa docs:', error)
  }

  // Map foto avatar perangkat desa dari hasil ekstraksi ID Card
  const photoMap: Record<string, string> = {
    'AHMAD SUPRIYADI': '/images/perangkat/ahmad_supriyadi.jpg',
    'SURYADI': '/images/perangkat/suryadi.jpg',
    'SUWANAH': '/images/perangkat/suwanah.jpg',
    'MAYA PURNAMA S.': '/images/perangkat/maya_p.jpg',
    'TSANI ABIL HASAN A.S.': '/images/perangkat/pak_diky.jpg',
    'FOFON W.DS.': '/images/perangkat/fofon_wahyu.jpg',
    'TAUFIK L.': '/images/perangkat/taufik_lubis.jpg',
    'ILHAM P.': '/images/perangkat/ilham_p.jpg',
    'CANDRA W.': '/images/perangkat/candra_w.jpg',
    'SRI SUGIANTI': '/images/perangkat/sri_sugianti.jpg',
    'SYAMSUDIN Z.': '/images/perangkat/syamsudin_z.jpg',
    'ANAS MAULANA': '/images/perangkat/anas_m.jpg',
  }

  // Fallback data resmi 13 SOTK Pemdes Gongseng
  const fallbackDevices: any[] = [
    { id: 1, nama: 'AHMAD SUPRIYADI', jabatan: 'Kepala Desa', urutan: 1, foto: '/images/perangkat/ahmad_supriyadi.jpg' },
    { id: 2, nama: 'NUR CHABIB', jabatan: 'Ketua BPD', urutan: 2 },
    { id: 3, nama: 'SURYADI', jabatan: 'Sekretaris Desa', urutan: 3, foto: '/images/perangkat/suryadi.jpg' },
    { id: 4, nama: 'SUWANAH', jabatan: 'Kaur Tata Usaha & Umum', urutan: 4, foto: '/images/perangkat/suwanah.jpg' },
    { id: 5, nama: 'MAYA PURNAMA S.', jabatan: 'Kaur Keuangan', urutan: 5, foto: '/images/perangkat/maya_p.jpg' },
    { id: 6, nama: 'TSANI ABIL HASAN A.S.', jabatan: 'Kaur Perencanaan', urutan: 6, foto: '/images/perangkat/pak_diky.jpg' },
    { id: 7, nama: 'FOFON W.DS.', jabatan: 'Kasi Pemerintahan', urutan: 7, foto: '/images/perangkat/fofon_wahyu.jpg' },
    { id: 8, nama: 'TAUFIK L.', jabatan: 'Kasi Kesejahteraan', urutan: 8, foto: '/images/perangkat/taufik_lubis.jpg' },
    { id: 9, nama: 'ILHAM P.', jabatan: 'Kasi Pelayanan', urutan: 9, foto: '/images/perangkat/ilham_p.jpg' },
    { id: 10, nama: 'CANDRA W.', jabatan: 'Kasun Gongseng 1', urutan: 10, foto: '/images/perangkat/candra_w.jpg' },
    { id: 11, nama: 'SRI SUGIANTI', jabatan: 'Kasun Gongseng 2', urutan: 11, foto: '/images/perangkat/sri_sugianti.jpg' },
    { id: 12, nama: 'SYAMSUDIN Z.', jabatan: 'Kasun Krandekan', urutan: 12, foto: '/images/perangkat/syamsudin_z.jpg' },
    { id: 13, nama: 'ANAS MAULANA', jabatan: 'Kasun Garurejo', urutan: 13, foto: '/images/perangkat/anas_m.jpg' },
  ]

  const displayDevices = hasDevices ? devices : fallbackDevices

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      {/* Hero Header Banner */}
      <PageHero
        badge="Struktur Pemerintahan Desa"
        title="Aparatur & Perangkat Desa"
        description="Susunan Organisasi dan Tata Kerja (SOTK) Pemerintah Desa Gongseng, Kec. Megaluh, Kab. Jombang."
        icon={Award}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-16 space-y-20">

        {/* 1. SEKSI DIAGRAM VISUAL SOTK 1:1 */}
        <section className="space-y-4">
          <SOTKDiagram devices={displayDevices} />
        </section>

        {/* 2. DAFTAR KARTU DETAIL PERANGKAT DESA (PELAKSANA PEMERINTAH DESA) */}
        <section className="space-y-12">
          <div className="text-center max-w-md mx-auto">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 mx-auto mb-2 border border-emerald-200">
              <Users className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Daftar Perangkat Desa</h2>
            <p className="text-xs text-gray-500 mt-1">Profil jajaran aparatur Pemerintah Desa Gongseng</p>
            <div className="w-12 h-1 bg-emerald-600 mx-auto mt-3 rounded" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayDevices
              .filter((device) => !device.jabatan.toLowerCase().includes('bpd'))
              .map((device) => {
                const hasPayloadPhoto = device.foto && typeof device.foto === 'object' && 'url' in device.foto && device.foto.url
                const photoUrl = hasPayloadPhoto 
                  ? device.foto.url 
                  : (typeof device.foto === 'string' ? device.foto : (photoMap[device.nama] || null))
                const isPimpinan = device.urutan === 1

              return (
                <div
                  key={device.id || device.urutan}
                  className={`bg-white rounded-2xl border transition-all duration-300 p-6 flex flex-col items-center text-center relative overflow-hidden group ${
                    isPimpinan 
                      ? 'border-emerald-300 shadow-md ring-1 ring-emerald-500/10' 
                      : 'border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200'
                  }`}
                >
                  {/* Badge Urutan SOTK */}
                  <span className="absolute top-4 left-4 text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                    SOTK #{device.urutan}
                  </span>

                  {/* Foto / Inisial Avatar */}
                  <div className="relative w-28 h-28 rounded-full overflow-hidden shadow-sm border-4 border-emerald-50 bg-emerald-100/50 mt-4 mb-4 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                    {photoUrl ? (
                      <Image
                        src={photoUrl}
                        alt={device.nama}
                        fill
                        className="object-cover object-top"
                        sizes="112px"
                      />
                    ) : (
                      <div className="text-2xl font-black text-emerald-800 tracking-tight">
                        {device.nama.split(' ').slice(0, 2).map((n: string) => n[0]).join('')}
                      </div>
                    )}
                  </div>

                  {/* Jabatan & Nama */}
                  <span className="text-[10px] font-extrabold tracking-widest text-emerald-700 uppercase mb-1 block">
                    {device.jabatan}
                  </span>
                  <h4 className="text-base font-extrabold text-gray-900 leading-snug mb-5 flex-grow">
                    {device.nama}
                  </h4>

                  {/* WA Contact Button (Jika Diisi di CMS) */}
                  <div className="w-full mt-auto">
                    {device.kontak ? (
                      <WAButton
                        nomorWA={device.kontak}
                        namaItem={device.nama}
                        label="Hubungi via WA"
                        pesanWA={`Halo ${device.jabatan} ${device.nama}, saya warga Desa Gongseng ingin menanyakan perihal layanan.`}
                        className="w-full text-xs py-2 px-3 shadow-none hover:shadow-sm"
                      />
                    ) : (
                      <div className="text-[10px] text-gray-400 italic py-2 border border-dashed border-gray-100 rounded-lg">
                        Kontak tersedia di Balai Desa
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

      </main>
    </div>
  )
}
