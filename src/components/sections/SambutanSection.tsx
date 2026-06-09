import React from 'react'
import Image from 'next/image'
import { SambutanKade, Media } from '@/payload-types'
import { RichText } from '../shared/RichText'

interface SambutanSectionProps {
  data?: SambutanKade | null
}

export function SambutanSection({ data }: SambutanSectionProps) {
  // Setup fallback data
  const nama = data?.nama || 'H. Solehan'
  const jabatan = data?.jabatan || 'Kepala Desa Gongseng'
  
  let fotoUrl = '/images/kades-placeholder.jpg' // Static placeholder
  let altText = nama
  if (data?.foto && typeof data.foto === 'object' && 'url' in data.foto) {
    fotoUrl = data.foto.url || fotoUrl
    altText = data.foto.alt || nama
  }

  // Teks sambutan default berupa string HTML jika richText kosong
  const teksDefault = `
    <p class="leading-relaxed text-gray-700 mb-4">
      Assalamualaikum Warahmatullahi Wabarakatuh,
    </p>
    <p class="leading-relaxed text-gray-700 mb-4">
      Selamat datang di portal resmi digital <strong>Desa Gongseng, Kecamatan Megaluh, Kabupaten Jombang</strong>. Kami berkomitmen penuh untuk menghadirkan keterbukaan informasi publik dan peningkatan efisiensi layanan bagi seluruh warga desa.
    </p>
    <p class="leading-relaxed text-gray-700 mb-4">
      Melalui integrasi program digitalisasi hasil kolaborasi program KKN IPB University ini, kami berharap sekat jarak dan waktu dapat dijembatani. Seluruh warga kini dapat dengan mudah mengakses pengumuman penting, jadwal posyandu, profil desa, hingga produk-produk unggulan dari UMKM lokal kami secara langsung.
    </p>
    <p class="leading-relaxed text-gray-700">
      Terima kasih, semoga portal ini membawa manfaat besar bagi kemajuan desa tercinta. Wassalamualaikum Warahmatullahi Wabarakatuh.
    </p>
  `

  const teksSambutan = data?.teks || teksDefault

  return (
    <section className="py-20 bg-emerald-50/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Sisi Kiri: Foto */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[320px] aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-8 ring-emerald-500/5 hover:scale-[1.01] transition-transform duration-300">
              <Image
                src={fotoUrl}
                alt={altText}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 320px"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white text-center md:hidden">
                <h3 className="font-bold text-lg">{nama}</h3>
                <p className="text-xs text-emerald-300">{jabatan}</p>
              </div>
            </div>
          </div>

          {/* Sisi Kanan: Teks Sambutan */}
          <div className="md:col-span-7 flex flex-col justify-center">
            <span className="text-sm font-bold tracking-wider text-emerald-700 uppercase mb-3 block">
              Sambutan Hangat
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
              Kepala Desa Gongseng
            </h2>
            
            <div className="text-gray-700 mb-8 border-l-2 border-emerald-500/30 pl-4 md:pl-6">
              <RichText content={teksSambutan} className="text-gray-700" />
            </div>

            {/* Profil Signature */}
            <div className="hidden md:flex flex-col border-t border-gray-100 pt-6">
              <h4 className="font-bold text-gray-900 text-lg">{nama}</h4>
              <p className="text-sm text-gray-500 font-medium">{jabatan}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SambutanSection
