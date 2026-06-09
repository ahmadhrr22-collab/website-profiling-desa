import React from 'react'
import Image from 'next/image'
import { getPayload } from '@/lib/payload'
import { PerangkatDesa, Media } from '@/payload-types'
import { WAButton } from '@/components/shared/WAButton'
import { Award, Mail, Phone, Users } from 'lucide-react'

export const revalidate = 0

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

  // Fallback data jika data di database kosong
  const fallbackDevices = [
    {
      id: 1,
      nama: 'H. Solehan',
      jabatan: 'Kepala Desa Gongseng',
      urutan: 1,
      kontak: '81234567890',
      foto: {
        url: '/images/kades-placeholder.jpg',
        alt: 'Foto H. Solehan',
      },
    },
    {
      id: 2,
      nama: 'Siti Rahmawati, S.Sos',
      jabatan: 'Sekretaris Desa',
      urutan: 2,
      kontak: '81234567891',
      foto: {
        url: '',
        alt: 'Foto Siti Rahmawati',
      },
    },
    {
      id: 3,
      nama: 'Ahmad Fauzi',
      jabatan: 'Kaur Keuangan (Bendahara)',
      urutan: 3,
      kontak: '81234567892',
      foto: {
        url: '',
        alt: 'Foto Ahmad Fauzi',
      },
    },
    {
      id: 4,
      nama: 'M. Rochmad, S.Pd',
      jabatan: 'Kaur Umum & Pemerintahan',
      urutan: 4,
      kontak: '81234567893',
      foto: {
        url: '',
        alt: 'Foto M. Rochmad',
      },
    },
    {
      id: 5,
      nama: 'Supriadi',
      jabatan: 'Kepala Dusun Gongseng',
      urutan: 5,
      kontak: '81234567894',
      foto: {
        url: '',
        alt: 'Foto Supriadi',
      },
    },
  ] as any[]

  const displayDevices = hasDevices ? devices : fallbackDevices

  // Pisahkan Kepala Desa (Urutan 1) dari perangkat lainnya untuk layout superior
  const kades = displayDevices.find(d => d.urutan === 1) || displayDevices[0]
  const staff = displayDevices.filter(d => d.id !== kades.id)

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      {/* Hero Header Banner */}
      <section className="relative bg-emerald-900 py-20 text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent_70%)]" />
        <div className="relative max-w-4xl mx-auto px-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-emerald-300 bg-emerald-950/80 border border-emerald-800/60 mb-4 uppercase tracking-wider">
            Struktur Pemerintahan
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Aparatur & Perangkat Desa
          </h1>
          <p className="text-emerald-100/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Mengenal jajaran pimpinan dan perangkat pelayanan Desa Gongseng yang siap melayani kebutuhan warga sepenuh hati.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        
        {/* KADES CARD (Superior Top Card) */}
        {kades && (
          <section className="flex flex-col items-center">
            <div className="text-center max-w-md mb-8">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 mx-auto mb-2 border border-amber-200">
                <Award className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wider">Pimpinan Desa</h2>
              <div className="w-12 h-1 bg-emerald-600 mx-auto mt-2 rounded" />
            </div>

            <div className="w-full max-w-2xl bg-white rounded-3xl border border-gray-100 shadow-md hover:shadow-xl transition-shadow duration-300 p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center">
              {/* Foto Kades */}
              <div className="relative w-44 h-56 rounded-2xl overflow-hidden shadow-inner bg-gray-100 border border-gray-100 flex-shrink-0">
                <Image
                  src={
                    kades.foto && typeof kades.foto === 'object' && 'url' in kades.foto && kades.foto.url
                      ? kades.foto.url
                      : '/images/kades-placeholder.jpg'
                  }
                  alt={kades.nama}
                  fill
                  className="object-cover"
                  sizes="176px"
                />
              </div>

              {/* Detail Kades */}
              <div className="flex-grow text-center md:text-left flex flex-col justify-center items-center md:items-start">
                <span className="text-xs font-bold tracking-widest text-emerald-700 uppercase mb-1.5 block">
                  {kades.jabatan}
                </span>
                <h3 className="text-2xl font-black text-gray-900 leading-tight mb-4">
                  {kades.nama}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-6 text-center md:text-left max-w-sm">
                  Memimpin jalannya pelayanan administrasi pemerintahan, pembangunan fisik kemasyarakatan, serta pembinaan sosial budaya di Desa Gongseng.
                </p>

                {kades.kontak && (
                  <WAButton
                    nomorWA={kades.kontak}
                    namaItem={kades.nama}
                    label="Hubungi Kepala Desa"
                    pesanWA={`Halo Pak Kades ${kades.nama}, saya ingin menanyakan perihal pelayanan desa.`}
                    className="w-full md:w-auto"
                  />
                )}
              </div>
            </div>
          </section>
        )}

        {/* STAFF SECTION (Grid of remaining staff) */}
        {staff.length > 0 && (
          <section className="space-y-10">
            <div className="text-center max-w-md mx-auto">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto mb-2 border border-emerald-200">
                <Users className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wider">Staf Pelaksana & Pamong</h2>
              <div className="w-12 h-1 bg-emerald-600 mx-auto mt-2 rounded" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {staff.map((device) => {
                const hasPhoto = device.foto && typeof device.foto === 'object' && 'url' in device.foto && device.foto.url
                const photoUrl = hasPhoto ? device.foto.url : '/images/avatar-placeholder.jpg'

                return (
                  <div
                    key={device.id}
                    className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-5 flex flex-col items-center text-center h-full"
                  >
                    {/* Foto Staff */}
                    <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-md border-4 border-emerald-50 bg-gray-50 mb-5 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                      <Image
                        src={photoUrl}
                        alt={device.nama}
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                    </div>

                    {/* Info */}
                    <span className="text-[10px] font-bold tracking-widest text-emerald-700 uppercase mb-1">
                      {device.jabatan}
                    </span>
                    <h4 className="text-base font-extrabold text-gray-900 leading-snug mb-5 flex-grow line-clamp-2">
                      {device.nama}
                    </h4>

                    {/* Hubungi WA */}
                    <div className="w-full mt-auto">
                      {device.kontak ? (
                        <WAButton
                          nomorWA={device.kontak}
                          namaItem={device.nama}
                          label="Kirim Pesan WA"
                          pesanWA={`Halo ${device.jabatan} ${device.nama}, saya warga Desa Gongseng ingin menanyakan perihal layanan.`}
                          className="w-full text-xs py-2 px-3 shadow-none hover:shadow-sm"
                        />
                      ) : (
                        <div className="text-[10px] text-gray-400 italic py-2 border border-dashed border-gray-100 rounded-lg">
                          Kontak tidak tersedia
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

      </main>
    </div>
  )
}
