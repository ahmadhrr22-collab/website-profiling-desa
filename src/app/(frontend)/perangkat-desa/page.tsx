import React from 'react'
import Image from 'next/image'
import { getPayload } from '@/lib/payload'
import { PerangkatDesa, Media } from '@/payload-types'
import { WAButton } from '@/components/shared/WAButton'
import { Award, Users, Shield, UserCheck, MapPin, Building2, Briefcase } from 'lucide-react'

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
      depth: 1,
    })
    
    if (response && response.docs && response.docs.length > 0) {
      devices = response.docs
      hasDevices = true
    }
  } catch (error) {
    console.error('Error fetching Perangkat Desa docs:', error)
  }

  // Fallback data resmi sesuai SOTK fisik kantor desa jika DB belum terisi
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

  // Helper pencari perangkat berdasarkan jabatan / urutan
  const findStaff = (titleSnippet: string) => 
    displayDevices.find(d => d.jabatan.toLowerCase().includes(titleSnippet.toLowerCase()))

  const kades = findStaff('Kepala Desa') || displayDevices[0]
  const bpd = findStaff('BPD') || displayDevices[1]
  const sekdes = findStaff('Sekretaris') || displayDevices[2]

  const kaurList = displayDevices.filter(d => d.jabatan.toLowerCase().includes('kaur'))
  const kasiList = displayDevices.filter(d => d.jabatan.toLowerCase().includes('kasi'))
  const kasunList = displayDevices.filter(d => d.jabatan.toLowerCase().includes('kasun') || d.jabatan.toLowerCase().includes('dusun'))

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

        {/* 1. SEKSI DIAGRAM VISUAL SOTK */}
        <section className="bg-white p-6 sm:p-10 rounded-3xl border border-gray-200/80 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-widest block">
              Bagan Resmi SOTK Pemdes Gongseng
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Struktur Organisasi & Tata Kerja
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Sesuai dengan peta tata kerja Pemerintah Desa Gongseng, Kec. Megaluh - Kab. Jombang.
            </p>
          </div>

          {/* Bagan Organisasi (Tree Flowchart) */}
          <div className="overflow-x-auto pb-6">
            <div className="min-w-[760px] flex flex-col items-center space-y-8">
              
              {/* Level 1: Kepala Desa & BPD */}
              <div className="flex items-center justify-center gap-12 w-full relative">
                {/* BPD Box (Kiri) */}
                <div className="w-56 bg-amber-50/80 border-2 border-amber-300 p-4 rounded-2xl text-center shadow-sm relative">
                  <div className="text-[10px] font-extrabold uppercase text-amber-800 tracking-wider mb-1">
                    Badan Permusyawaratan Desa (BPD)
                  </div>
                  <div className="text-base font-black text-gray-900">{bpd?.nama || 'NUR CHABIB'}</div>
                </div>

                {/* Garis Koordinasi Horizontal (Putus-putus) */}
                <div className="w-16 border-t-2 border-dashed border-gray-400 flex items-center justify-center">
                  <span className="text-[9px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-bold">Mitra</span>
                </div>

                {/* Kepala Desa Box (Utama / Top) */}
                <div className="w-64 bg-emerald-700 text-white border-2 border-emerald-800 p-4 rounded-2xl text-center shadow-lg relative">
                  <div className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase bg-amber-400 text-gray-950 mb-1">
                    Kepala Desa
                  </div>
                  <div className="text-lg font-black tracking-tight">{kades?.nama || 'AHMAD SUPRIYADI'}</div>
                </div>
              </div>

              {/* Garis Vertikal dari Kades ke Sekdes */}
              <div className="w-0.5 h-8 bg-emerald-600" />

              {/* Level 2: Sekretaris Desa */}
              <div className="w-64 bg-emerald-50 border-2 border-emerald-400 p-4 rounded-2xl text-center shadow-sm relative">
                <div className="text-[10px] font-extrabold uppercase text-emerald-800 tracking-wider mb-1">
                  Sekretaris Desa
                </div>
                <div className="text-base font-black text-gray-900">{sekdes?.nama || 'SURYADI'}</div>
              </div>

              {/* Garis Pembagi Cabang Kaur & Kasi */}
              <div className="w-full max-w-2xl border-t-2 border-emerald-500 relative flex justify-around">
                {/* Cabang Kiri: Kaur */}
                <div className="w-0.5 h-6 bg-emerald-500" />
                {/* Cabang Kanan: Kasi */}
                <div className="w-0.5 h-6 bg-emerald-500" />
              </div>

              {/* Level 3: Dual Grid (Kaur di Sekretariat & Kasi di Pelaksana Teknis) */}
              <div className="grid grid-cols-2 gap-8 w-full max-w-4xl">
                {/* Kolom Kiri: Kaur (Kepala Urusan) */}
                <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-200/60 space-y-3">
                  <div className="text-center text-xs font-extrabold text-blue-800 uppercase tracking-wider pb-1 border-b border-blue-200">
                    Sekretariat (Kepala Urusan)
                  </div>
                  <div className="space-y-2">
                    {kaurList.map((kaur, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-xl border border-blue-100 shadow-xs flex flex-col justify-center">
                        <span className="text-[10px] font-bold text-blue-600 uppercase">{kaur.jabatan}</span>
                        <span className="text-sm font-extrabold text-gray-900">{kaur.nama}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Kolom Kanan: Kasi (Kepala Seksi) */}
                <div className="bg-purple-50/50 p-4 rounded-2xl border border-purple-200/60 space-y-3">
                  <div className="text-center text-xs font-extrabold text-purple-800 uppercase tracking-wider pb-1 border-b border-purple-200">
                    Pelaksana Teknis (Kepala Seksi)
                  </div>
                  <div className="space-y-2">
                    {kasiList.map((kasi, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-xl border border-purple-100 shadow-xs flex flex-col justify-center">
                        <span className="text-[10px] font-bold text-purple-600 uppercase">{kasi.jabatan}</span>
                        <span className="text-sm font-extrabold text-gray-900">{kasi.nama}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Garis Penghubung ke Kasun */}
              <div className="w-0.5 h-8 bg-emerald-500" />

              {/* Level 4: Kepala Dusun (Unsur Kewilayahan) */}
              <div className="w-full max-w-4xl bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200/80 space-y-3">
                <div className="text-center text-xs font-extrabold text-emerald-800 uppercase tracking-wider pb-1 border-b border-emerald-200">
                  Pelaksana Kewilayahan (Kepala Dusun)
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {kasunList.map((kasun, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-xl border border-emerald-100 text-center shadow-xs">
                      <span className="text-[10px] font-bold text-emerald-700 block uppercase">{kasun.jabatan}</span>
                      <span className="text-xs font-extrabold text-gray-900">{kasun.nama}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 2. DAFTAR KARTU DETAIL PERANGKAT DESA */}
        <section className="space-y-12">
          <div className="text-center max-w-md mx-auto">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 mx-auto mb-2 border border-emerald-200">
              <Users className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Daftar Perangkat Desa</h2>
            <p className="text-xs text-gray-500 mt-1">Profil lengkap jajaran aparatur Desa Gongseng</p>
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
