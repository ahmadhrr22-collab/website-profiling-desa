import { PageHero } from '@/components/shared/PageHero'
import { Metadata } from 'next'
import { Sprout, Sun, Calendar, Users, MapPin, Droplets, Tractor, ShieldCheck, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Potensi & Pertanian - Desa Gongseng',
  description: 'Informasi potensi sektor agraris, luas lahan sawah 170 Ha, komoditas unggulan, dan profil kelompok tani Desa Gongseng, Kecamatan Megaluh, Kabupaten Jombang.',
}

export default function PotensiPertanianPage() {
  const komoditasList = [
    {
      nama: 'Padi (Ciherang & Inpari 32)',
      kategori: 'Tanaman Pangan Utama',
      luas: '170 Hektar',
      produktivitas: '8.0 Ton / Hektar',
      periode: 'Musim Hujan (Rendeng) & Pancaroba (Gadu)',
      deskripsi: 'Komoditas utama Desa Gongseng yang menopang ketahanan pangan lokal. Menggunakan varietas Ciherang & Inpari 32 unggulan tahan hama dengan pengairan teknis.',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    },
    {
      nama: 'Jagung Hibrida',
      kategori: 'Tanaman Palawija',
      luas: '45 Hektar',
      produktivitas: '6.5 Ton / Hektar',
      periode: 'Musim Gadu / Kemarau I',
      deskripsi: 'Tanaman sela bergizi tinggi yang ditanam petani saat masa transisi pasca panen padi musim hujan, dipasarkan untuk kebutuhan pakan dan industri ternak.',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    },
    {
      nama: 'Cabai Merah & Rawit',
      kategori: 'Hortikultura Komersial',
      luas: '20 Hektar',
      produktivitas: '4.2 Ton / Hektar',
      periode: 'Musim Kemarau (MT 3)',
      deskripsi: 'Komoditas bernilai ekonomi tinggi yang dibudidayakan warga di lahan pekarangan dan sawah tadah hujan musim kemarau dengan nilai jual stabil.',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    },
    {
      nama: 'Bawang Merah',
      kategori: 'Hortikultura Komersial',
      luas: '15 Hektar',
      produktivitas: '7.0 Ton / Hektar',
      periode: 'Musim Kemarau (MT 3)',
      deskripsi: 'Hasil tanam musiman petani Desa Gongseng yang memanfaatkan karakteristik tanah aluvial fertile untuk kualitas umbi bawang beraroma kuat.',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    },
    {
      nama: 'Semangka Manis',
      kategori: 'Buah-buahan Musiman',
      luas: '18 Hektar',
      produktivitas: '12.0 Ton / Hektar',
      periode: 'Musim Kemarau II',
      deskripsi: 'Buah kebanggaan petani Gongseng jelang musim kemarau panjang. Semangka hasil panen Gongseng terkenal manis dan diminati tengkulak daerah Jombang.',
      badgeColor: 'bg-lime-100 text-lime-800 border-lime-300',
    },
  ]

  const poktanList = [
    {
      nama: 'Kelompok Tani Gongseng 1',
      dusun: 'Dusun Gongseng 1',
      luasArea: '48 Hektar',
      fokus: 'Budidaya Padi Sawah & Semangka',
      ketua: 'Bpk. Candra W.',
    },
    {
      nama: 'Kelompok Tani Gongseng 2',
      dusun: 'Dusun Gongseng 2',
      luasArea: '42 Hektar',
      fokus: 'Padi Inpari 32 & Cabai Rawit',
      ketua: 'Ibu Sri Sugianti',
    },
    {
      nama: 'Kelompok Tani Krandekan',
      dusun: 'Dusun Krandekan',
      luasArea: '45 Hektar',
      fokus: 'Padi Ciherang & Bawang Merah',
      ketua: 'Bpk. Syamsudin Z.',
    },
    {
      nama: 'Kelompok Tani Garurejo',
      dusun: 'Dusun Garurejo',
      luasArea: '35 Hektar',
      fokus: 'Padi Sawah & Jagung Hibrida',
      ketua: 'Bpk. Anas Maulana',
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      
      {/* 1. Hero Header Banner */}
      <PageHero
        badge="Sektor Unggulan Agraris"
        title="Potensi & Pertanian"
        description="Menyelami kekayaan alam Desa Gongseng, Kecamatan Megaluh. Hamparan sawah seluas 170 Hektar yang subur dengan produktivitas panen padi mencapai 8 Ton per Hektar."
        icon={Sprout}
      />

      {/* 2. Main Body Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">

        {/* STATISTIK AGRARIS DESA */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200/90 shadow-sm text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-1 border border-emerald-200">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="text-3xl font-black text-gray-950">170 Ha</div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Luas Sawah Irigasi</div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200/90 shadow-sm text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-1 border border-amber-200">
              <Sprout className="w-5 h-5" />
            </div>
            <div className="text-3xl font-black text-gray-950">8 Ton/Ha</div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Hasil Panen Padi</div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200/90 shadow-sm text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center mx-auto mb-1 border border-blue-200">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-3xl font-black text-gray-950">4 Poktan</div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Kelompok Tani Aktif</div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200/90 shadow-sm text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center mx-auto mb-1 border border-rose-200">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="text-3xl font-black text-gray-950">2 - 3x</div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Masa Panen per Tahun</div>
          </div>
        </div>

        {/* DAFTAR KOMODITAS HASIL TANI */}
        <section className="space-y-8">
          <div className="text-center max-w-md mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
              Komoditas Hasil Tani Unggulan
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Ragam hasil bumi Desa Gongseng sepanjang musim tanam
            </p>
            <div className="w-12 h-1 bg-emerald-600 mx-auto rounded" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {komoditasList.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-200/90 shadow-sm hover:shadow-md transition-all p-6 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ${item.badgeColor}`}>
                      {item.kategori}
                    </span>
                    <span className="text-[10px] font-black text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                      {item.luas}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-gray-950">{item.nama}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.deskripsi}</p>
                </div>

                <div className="pt-4 border-t border-gray-100 space-y-1 text-xs">
                  <div className="flex justify-between text-gray-500">
                    <span>Produktivitas:</span>
                    <span className="font-bold text-emerald-800">{item.produktivitas}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Periode Tanam:</span>
                    <span className="font-bold text-gray-800">{item.periode}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROFIL KELOMPOK TANI (POKTAN) */}
        <section className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 space-y-8 shadow-xl">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-black tracking-widest text-amber-400 uppercase">
              Kelembagaan Petani Desa
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Profil 4 Kelompok Tani (Poktan) Desa Gongseng
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
              Setiap dusun di Desa Gongseng dinaungi oleh Kelompok Tani resmi yang mengoordinasikan distribusi pupuk subsudi, penyuluhan pertanian, dan pengaturan giliran air irigasi.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {poktanList.map((poktan, idx) => (
              <div
                key={idx}
                className="bg-emerald-900/60 border border-emerald-700/60 rounded-2xl p-5 space-y-3 hover:border-amber-400 transition-all"
              >
                <div className="flex items-center gap-2 text-amber-300 text-xs font-black uppercase">
                  <Users className="w-4 h-4" />
                  <span>{poktan.dusun}</span>
                </div>

                <h3 className="text-base font-extrabold text-white">{poktan.nama}</h3>

                <div className="space-y-1.5 text-xs text-emerald-100/80 pt-2 border-t border-emerald-800/80">
                  <div>
                    <span className="text-emerald-300">Penanggung Jawab:</span>
                    <div className="font-bold text-white">{poktan.ketua}</div>
                  </div>
                  <div>
                    <span className="text-emerald-300">Luas Kelolaan:</span>
                    <div className="font-bold text-white">{poktan.luasArea}</div>
                  </div>
                  <div>
                    <span className="text-emerald-300">Fokus Komoditas:</span>
                    <div className="font-bold text-amber-300">{poktan.fokus}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* KALENDER MUSIM TANAM & PRASARANA IRIGASI */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Kalender Musim Tanam */}
          <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-100 text-amber-800 rounded-2xl border border-amber-200">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-gray-950">Kalender Musim Tanam</h3>
                <p className="text-xs text-gray-500">Pola rotasi tanam tahunan warga Desa Gongseng</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-2xl space-y-1">
                <div className="flex justify-between items-center text-xs font-black text-emerald-900 uppercase">
                  <span>MT 1 — Musim Hujan (Rendeng)</span>
                  <span className="bg-emerald-200 text-emerald-950 px-2 py-0.5 rounded">Nov — Feb</span>
                </div>
                <p className="text-xs text-gray-700">Fokus penuh penanaman Padi Sawah (Ciherang / Inpari 32) dengan pasokan air melimpah dari hujan & sungai.</p>
              </div>

              <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-2xl space-y-1">
                <div className="flex justify-between items-center text-xs font-black text-amber-900 uppercase">
                  <span>MT 2 — Musim Pancaroba (Gadu)</span>
                  <span className="bg-amber-200 text-amber-950 px-2 py-0.5 rounded">Mar — Jun</span>
                </div>
                <p className="text-xs text-gray-700">Penanaman Padi tahap kedua atau diselingi Jagung Hibrida untuk menjaga kesuburan hara tanah sawah.</p>
              </div>

              <div className="p-4 bg-rose-50/60 border border-rose-200 rounded-2xl space-y-1">
                <div className="flex justify-between items-center text-xs font-black text-rose-900 uppercase">
                  <span>MT 3 — Musim Kemarau (Palawija)</span>
                  <span className="bg-rose-200 text-rose-950 px-2 py-0.5 rounded">Jul — Okt</span>
                </div>
                <p className="text-xs text-gray-700">Penanaman komoditas hortikultura bernilai ekonomi tinggi seperti Cabai, Bawang Merah, dan Semangka Manis.</p>
              </div>
            </div>
          </div>

          {/* Prasarana & Irigasi Pertanian */}
          <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 text-blue-800 rounded-2xl border border-blue-200">
                <Droplets className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-gray-950">Prasarana & Irigasi Sawah</h3>
                <p className="text-xs text-gray-500">Fasilitas pendukung kelancaran panen warga</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-black text-gray-900">Saluran Irigasi Teknis Sungai Megaluh</h4>
                  <p className="text-xs text-gray-500">Jaringan suplesi air pengairan melintasi 4 dusun menjamin kecukupan pasokan air sawah.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                <Tractor className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-black text-gray-900">Mekanisasi Alsintan (Alat Mesin Pertanian)</h4>
                  <p className="text-xs text-gray-500">Ketersediaan traktor bajak dan mesin pemotong padi modern (*Combine Harvester*) bantuan pemerintah.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-black text-gray-900">Jalan Usaha Tani (JUT) Desa</h4>
                  <p className="text-xs text-gray-500">Akses jalan rabat beton antar-blok sawah mempermudah pengangkutan hasil panen warga menuju pasar.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </main>
    </div>
  )
}
