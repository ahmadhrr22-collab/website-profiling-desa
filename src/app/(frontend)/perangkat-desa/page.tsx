import React from 'react'
import Image from 'next/image'
import { getPayload } from '@/lib/payload'
import { PerangkatDesa } from '@/payload-types'
import { WAButton } from '@/components/shared/WAButton'
import { SOTKDiagram } from '@/components/shared/SOTKDiagram'
import { Users } from 'lucide-react'

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

  // Fallback data resmi 13 SOTK Pemdes Gongseng
  const fallbackDevices: any[] = [
    { id: 1, nama: 'AHMAD SUPRIYADI', jabatan: 'Kepala Desa', urutan: 1 },
    { id: 2, nama: 'NUR CHABIB', jabatan: 'Ketua BPD', urutan: 2 },
    { id: 3, nama: 'SURYADI', jabatan: 'Sekretaris Desa', urutan: 3 },
    { id: 4, nama: 'SUWANAH', jabatan: 'Kaur Tata Usaha & Umum', urutan: 4 },
    { id: 5, nama: 'MAYA PURNAMA S.', jabatan: 'Kaur Keuangan', urutan: 5 },
    { id: 6, nama: 'TSANI ABIL HASAN A.S.', jabatan: 'Kaur Perencanaan', urutan: 6 },
    { id: 7, nama: 'FOFON W.DS.', jabatan: 'Kasi Pemerintahan', urutan: 7 },
    { id: 8, nama: 'TAUFIK L.', jabatan: 'Kasi Kesejahteraan', urutan: 8 },
    { id: 9, nama: 'ILHAM P.', jabatan: 'Kasi Pelayanan', urutan: 9 },
    { id: 10, nama: 'CANDRA W.', jabatan: 'Kasun Gongseng 1', urutan: 10 },
    { id: 11, nama: 'SRI SUGIANTI', jabatan: 'Kasun Gongseng 2', urutan: 11 },
    { id: 12, nama: 'SYAMSUDIN Z.', jabatan: 'Kasun Krandekan', urutan: 12 },
    { id: 13, nama: 'ANAS MAULANA', jabatan: 'Kasun Garurejo', urutan: 13 },
  ]

  const displayDevices = hasDevices ? devices : fallbackDevices

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      {/* Hero Header Banner */}
      <section className="relative bg-emerald-900 py-20 text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15),transparent_70%)]" />
        <div className="relative max-w-4xl mx-auto px-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-emerald-300 bg-emerald-950/80 border border-emerald-800/60 mb-4 uppercase tracking-wider">
            Struktur Pemerintahan Desa
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Aparatur & Perangkat Desa
          </h1>
          <p className="text-emerald-100/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Susunan Organisasi dan Tata Kerja (SOTK) Pemerintah Desa Gongseng, Kec. Megaluh, Kab. Jombang.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-16 space-y-20">

        {/* 1. SEKSI DIAGRAM VISUAL SOTK 1:1 */}
        <section className="space-y-4">
          <SOTKDiagram devices={displayDevices} />
        </section>

        {/* 2. DAFTAR KARTU DETAIL PERANGKAT DESA (LENGKAP 13 HINGGA SEMUA KASUN) */}
        <section className="space-y-12">
          <div className="text-center max-w-md mx-auto">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 mx-auto mb-2 border border-emerald-200">
              <Users className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Daftar Perangkat Desa</h2>
            <p className="text-xs text-gray-500 mt-1">Profil lengkap 13 jajaran aparatur Desa Gongseng</p>
            <div className="w-12 h-1 bg-emerald-600 mx-auto mt-3 rounded" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayDevices.map((device) => {
              const hasPhoto = device.foto && typeof device.foto === 'object' && 'url' in device.foto && device.foto.url
              const photoUrl = hasPhoto ? device.foto.url : null
              const isPimpinan = device.urutan === 1 || device.urutan === 2

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
                        className="object-cover"
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
