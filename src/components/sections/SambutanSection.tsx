import React from 'react'
import Image from 'next/image'
import { SambutanKade } from '@/payload-types'
import { RichText } from '../shared/RichText'
import { Award, Quote } from 'lucide-react'

interface SambutanSectionProps {
  data?: SambutanKade | null
}

export function SambutanSection({ data }: SambutanSectionProps) {
  // Setup fallback data resmi Kepala Desa Gongseng
  const nama = data?.nama || 'AHMAD SUPRIYADI'
  const jabatan = data?.jabatan || 'Kepala Desa Gongseng'
  
  let fotoUrl = '/images/perangkat/ahmad_supriyadi.jpg'
  let altText = nama
  if (data?.foto && typeof data.foto === 'object' && 'url' in data.foto && data.foto.url) {
    fotoUrl = data.foto.url
    altText = data.foto.alt || nama
  }

  // Teks sambutan default berupa string HTML jika richText kosong
  const teksDefault = `
    <p class="leading-relaxed text-gray-700 mb-4">
      Assalamualaikum Warahmatullahi Wabarakatuh,
    </p>
    <p class="leading-relaxed text-gray-700 mb-4">
      Selamat datang di portal resmi digital <strong>Desa Gongseng, Kecamatan Megaluh, Kabupaten Jombang</strong>. Kami berkomitmen penuh untuk menghadirkan keterbukaan informasi publik, kemudahan akses informasi, dan peningkatan efisiensi pelayanan bagi seluruh warga desa.
    </p>
    <p class="leading-relaxed text-gray-700 mb-4">
      Melalui portal website desa ini, kami berharap dapat mempererat silaturahmi serta memberikan kemudahan dalam mengakses informasi seputar profil desa, kelembagaan, potensi pertanian, hingga agenda kegiatan kemasyarakatan.
    </p>
    <p class="leading-relaxed text-gray-700">
      Terima kasih atas dukungan seluruh lapisan masyarakat. Semoga Desa Gongseng semakin maju, sejahtera, dan berkearifan lokal. Wassalamualaikum Warahmatullahi Wabarakatuh.
    </p>
  `

  const teksSambutan = data?.teks || teksDefault

  return (
    <section className="py-20 bg-gradient-to-b from-white via-emerald-50/40 to-white relative overflow-hidden border-y border-emerald-100/60">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Sisi Kiri: Foto Profil Kepala Desa */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[320px] aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-8 ring-emerald-600/10 bg-emerald-950 group hover:scale-[1.02] transition-transform duration-300">
              <Image
                src={fotoUrl}
                alt={altText}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 320px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent opacity-90" />
              
              <div className="absolute bottom-4 inset-x-4 p-4 rounded-2xl bg-emerald-950/90 border border-emerald-700/60 backdrop-blur-md text-white text-center shadow-lg">
                <div className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-amber-300 tracking-wider mb-0.5">
                  <Award className="w-3 h-3" />
                  <span>{jabatan}</span>
                </div>
                <h3 className="font-extrabold text-base tracking-tight text-white">{nama}</h3>
              </div>
            </div>
          </div>

          {/* Sisi Kanan: Teks Sambutan */}
          <div className="md:col-span-7 flex flex-col justify-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-200/80 w-fit uppercase tracking-wider">
              <Quote className="w-3.5 h-3.5 text-emerald-700" />
              <span>Sambutan Kepala Desa</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight leading-tight">
              Selamat Datang di Portal Resmi Desa Gongseng
            </h2>
            
            <div className="text-gray-700 border-l-4 border-emerald-600/40 pl-5 py-1 text-sm sm:text-base leading-relaxed">
              <RichText content={teksSambutan} className="text-gray-700" />
            </div>

            {/* Profil Signature */}
            <div className="flex items-center gap-4 border-t border-gray-200/80 pt-5 mt-2">
              <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-black text-lg shadow-md shrink-0">
                AS
              </div>
              <div>
                <h4 className="font-extrabold text-gray-950 text-base">{nama}</h4>
                <p className="text-xs font-semibold text-emerald-700">{jabatan}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default SambutanSection
