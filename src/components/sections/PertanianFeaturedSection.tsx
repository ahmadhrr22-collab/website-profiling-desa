import React from 'react'
import Link from 'next/link'
import { Sprout, ArrowRight, Sun, Calendar } from 'lucide-react'

export function PertanianFeaturedSection() {
  const komoditas = [
    { nama: 'Padi (Ciherang & Inpari 32)', panen: '8 Ton / Ha', desc: 'Komoditas pangan utama dengan luas tanam 170 Hektar.', icon: Sprout, bg: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
    { nama: 'Jagung & Palawija', panen: 'Musim Gadu', desc: 'Tanaman sela produktif pasca panen padi musim hujan.', icon: Sun, bg: 'bg-amber-50 text-amber-700 border-amber-100' },
    { nama: 'Cabai, Bawang & Semangka', panen: 'Musim Kemarau', desc: 'Hortikultura bernilai tinggi hasil panen warga desa.', icon: Calendar, bg: 'bg-rose-50 text-rose-700 border-rose-100' },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white relative overflow-hidden">
      {/* Background Accent Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(52,211,153,0.12),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl space-y-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-emerald-300 bg-emerald-800/60 border border-emerald-700/50 uppercase tracking-wider">
              <Sprout className="w-3.5 h-3.5" />
              Sektor Unggulan Desa
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Potensi Pertanian & Lahan Sawah Produktif
            </h2>
            <p className="text-emerald-100/80 text-sm sm:text-base leading-relaxed">
              Desa Gongseng membanggakan 170 Hektar lahan sawah subur dengan hasil produksi padi mencapai 8 Ton per Hektar dan ditopang 4 Kelompok Tani aktif.
            </p>
          </div>

          <Link
            href="/potensi-pertanian"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-gray-950 font-bold text-sm transition-all duration-300 shadow-lg shadow-amber-400/20 hover:scale-[1.02] shrink-0 self-start md:self-end"
          >
            <span>Jelajahi Potensi Pertanian</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Featured Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {komoditas.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="bg-emerald-900/60 border border-emerald-700/60 backdrop-blur-xs rounded-2xl p-6 hover:border-amber-400/80 hover:bg-emerald-850/80 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl border ${item.bg}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-950/80 text-amber-300 border border-emerald-700/50">
                      {item.panen}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors mb-2">
                    {item.nama}
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-100/70 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-emerald-800/60 flex items-center justify-between text-xs text-emerald-300 font-medium">
                  <span>Kelompok Tani Desa</span>
                  <span className="text-amber-300 font-bold">PRODESKEL 2025</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom Banner Stats Highlight */}
        <div className="bg-emerald-950/80 border border-emerald-800 rounded-2xl p-6 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-amber-300 mb-1">170 Ha</div>
            <div className="text-xs text-emerald-200 uppercase font-semibold">Luas Sawah Irigasi</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-amber-300 mb-1">8 Ton/Ha</div>
            <div className="text-xs text-emerald-200 uppercase font-semibold">Produktivitas Padi</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-amber-300 mb-1">4 Poktan</div>
            <div className="text-xs text-emerald-200 uppercase font-semibold">Kelompok Tani Aktif</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-amber-300 mb-1">2-3 Panen</div>
            <div className="text-xs text-emerald-200 uppercase font-semibold">Frekuensi per Tahun</div>
          </div>
        </div>

      </div>
    </section>
  )
}
