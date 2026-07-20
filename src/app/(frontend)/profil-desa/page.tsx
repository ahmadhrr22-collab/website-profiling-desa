import React from 'react'
import { getPayload } from '@/lib/payload'
import { RichText } from '@/components/shared/RichText'
import { MapPin, Shield, Compass, Star, Map, BarChart3, Users, Sprout } from 'lucide-react'

export const revalidate = 60

export const metadata = {
  title: 'Profil Desa - Desa Gongseng',
  description: 'Sejarah singkat, visi & misi, batas geografis, luas wilayah, serta potensi ekonomi dan pertanian Desa Gongseng, Kecamatan Megaluh, Kabupaten Jombang.',
}

// Peta default Desa Gongseng, Megaluh, Jombang
const MAP_DEFAULT = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15822.951554160494!2d112.18683533446657!3d-7.495289907106093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e783fd979600e1b%3A0xc3f5e3fcfcf8a5ba!2sGongseng%2C%20Megaluh%2C%20Jombang%20Regency%2C%20East%20Java!5e0!3m2!1sen!2sid!4v1717930000000!5m2!1sen!2sid"

export default async function ProfilDesaPage() {
  let data = null
  let demografi = null

  try {
    const payload = await getPayload()
    const [profilRes, demografiRes] = await Promise.allSettled([
      payload.findGlobal({
        slug: 'profil-desa',
        depth: 1,
      }),
      payload.findGlobal({
        slug: 'data-demografi',
        depth: 1,
      }),
    ])

    if (profilRes.status === 'fulfilled') data = profilRes.value
    if (demografiRes.status === 'fulfilled') demografi = demografiRes.value
  } catch (error) {
    console.error('Error fetching Profil Desa data:', error)
  }

  // Teks Fallback jika data kosong
  const sejarahFallback = `
    <p class="mb-4">Desa Gongseng merupakan salah satu desa yang terletak di Kecamatan Megaluh, Kabupaten Jombang, Provinsi Jawa Timur. Terbentuk sejak masa lampau, asal-usul nama Gongseng dipercaya oleh masyarakat setempat erat kaitannya dengan sejarah babat alas pertanian wilayah Megaluh.</p>
    <p class="mb-4">Secara turun-temurun, penduduk desa hidup dari sektor agraris dan perkebunan. Dengan tanah yang subur, irigasi yang mengalir sepanjang musim, serta semangat kebersamaan gotong royong yang kental, Desa Gongseng terus tumbuh menjadi pemukiman yang mandiri dan asri.</p>
    <p>Di era modern ini, Desa Gongseng bertekad untuk bertransformasi ke arah digital guna mendekatkan pelayanan kepada warga dan memperkenalkan keindahan desa serta keunggulan produk lokal ke kancah nasional.</p>
  `

  const visiFallback = `
    <p class="text-lg italic font-medium">"Terwujudnya Desa Gongseng yang Maju, Mandiri, Sejahtera, Berkearifan Lokal, dan Transparan melalui Tata Kelola Pemerintahan yang Adaptif dan Berbasis Teknologi."</p>
  `

  const misiFallback = `
    <ol class="list-decimal pl-5 space-y-3">
      <li>Meningkatkan kualitas pelayanan publik kepada masyarakat secara cepat, tepat, dan transparan berbasis digitalisasi.</li>
      <li>Mengoptimalkan potensi sektor pertanian, peternakan, dan UMKM warga guna mendongkrak perekonomian lokal.</li>
      <li>Membangun infrastruktur desa yang merata, berkelanjutan, dan ramah lingkungan.</li>
      <li>Memelihara nilai-nilai luhur kebudayaan gotong royong dan keagamaan di kalangan masyarakat.</li>
    </ol>
  `

  const geografisFallback = `
    <p class="mb-4">Desa Gongseng terletak di dataran rendah Kecamatan Megaluh dengan kondisi tanah yang subur. Batas wilayah administratif desa adalah sebagai berikut:</p>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li><strong>Sebelah Utara:</strong> Desa Sudimoro</li>
      <li><strong>Sebelah Timur:</strong> Desa Megaluh</li>
      <li><strong>Sebelah Selatan:</strong> Desa Balongsari</li>
      <li><strong>Sebelah Barat:</strong> Sungai Brantas / Kabupaten Nganjuk</li>
    </ul>
    <p>Sebagian besar wilayah Desa Gongseng didominasi oleh lahan pertanian sawah irigasi teknis, menjadikannya salah satu lumbung padi andalan di Kecamatan Megaluh.</p>
  `

  const potensiFallback = `
    <p class="mb-4">Potensi utama Desa Gongseng berpusat pada pertanian padi, jagung, dan hortikultura. Tanahnya yang subur berkat suplai air irigasi Sungai Brantas mendukung produksi pertanian sepanjang tahun.</p>
    <p>Selain pertanian, sektor ekonomi kreatif yang digerakkan oleh industri rumah tangga (UMKM) seperti keripik tempe, batik tulis, dan kerajinan anyaman bambu menjadi roda penggerak ekonomi pendukung bagi kesejahteraan keluarga warga Desa Gongseng.</p>
  `

  const sejarah = data?.sejarah || sejarahFallback
  const visi = data?.visi || visiFallback
  const misi = data?.misi || misiFallback
  const geografis = data?.deskripsiGeografis || geografisFallback
  const luasWilayah = data?.luasWilayah || 'Desa Gongseng terbagi menjadi beberapa Dusun dengan luas lahan pertanian produktif yang mendominasi sebagian besar wilayah desa.'
  const petaUrl = data?.petaEmbed || MAP_DEFAULT
  const potensi = data?.potensi || potensiFallback

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      {/* Hero Header Banner */}
      <section className="relative bg-emerald-900 py-20 text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent_70%)]" />
        <div className="relative max-w-4xl mx-auto px-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-emerald-300 bg-emerald-950/80 border border-emerald-800/60 mb-4 uppercase tracking-wider">
            Mengenal Lebih Dekat
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Profil Desa Gongseng
          </h1>
          <p className="text-emerald-100/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Sejarah, Visi Misi, Wilayah Geografis, serta Potensi Unggulan Desa Gongseng, Kecamatan Megaluh, Kabupaten Jombang.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <main className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        
        {/* Section 1: Sejarah */}
        <section id="sejarah" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm">
          <div className="lg:col-span-4 flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700">
              <Compass className="w-6 h-6" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
              Sejarah Singkat Desa
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Asal-usul, sejarah berdiri, dan rangkuman riwayat perkembangan kemasyarakatan di Desa Gongseng.
            </p>
          </div>
          <div className="lg:col-span-8 border-t lg:border-t-0 lg:border-l border-gray-100 pt-8 lg:pt-0 lg:pl-10 text-gray-700 leading-relaxed">
            <RichText content={sejarah} />
          </div>
        </section>

        {/* Section 2: Visi & Misi */}
        <section id="visi-misi" className="space-y-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 mx-auto mb-4">
              <Shield className="w-6 h-6" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
              Visi & Misi Desa
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Arah kebijakan strategis dan program prioritas pembangunan jangka panjang Desa Gongseng.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Box Visi */}
            <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 text-white p-8 md:p-10 rounded-3xl shadow-xl flex flex-col justify-center relative overflow-hidden group">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-800/20 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />
              <span className="text-emerald-400 font-bold uppercase tracking-wider text-xs mb-3 block">VISI UTAMA</span>
              <RichText content={visi} className="text-emerald-50 prose-headings:text-white" />
            </div>

            {/* Box Misi */}
            <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-center">
              <span className="text-emerald-700 font-bold uppercase tracking-wider text-xs mb-4 block">MISI PEMBANGUNAN</span>
              <RichText content={misi} className="text-gray-700 list-decimal" />
            </div>
          </div>
        </section>

        {/* Section 3: Geografis & Peta */}
        <section id="geografi" className="space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <MapPin className="w-6 h-6" />
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                  Kondisi Geografis
                </h2>
              </div>
              <div className="text-gray-700 leading-relaxed border-l-2 border-emerald-500/20 pl-5">
                <RichText content={geografis} />
              </div>
              <div className="bg-emerald-50/50 border border-emerald-100/60 p-5 rounded-2xl">
                <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
                  <Map className="w-4 h-4 text-emerald-700" />
                  Luas Wilayah & Pembagian
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">{luasWilayah}</p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative w-full aspect-16/10 sm:aspect-16/9 rounded-3xl overflow-hidden border border-gray-100 shadow-lg bg-gray-100">
                <iframe
                  src={petaUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Peta Wilayah Desa Gongseng"
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <span className="text-xs text-gray-400 mt-3 block text-center italic">
                * Peta batas wilayah administratif resmi Desa Gongseng, Megaluh, Jombang.
              </span>
            </div>
          </div>
        </section>

        {/* Section 4: Statistik & Demografi Desa */}
        {demografi && (
          <section id="statistik-desa" className="space-y-12 bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-100 pb-6">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 mb-4">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                  Statistik & Demografi Desa
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Data kependudukan, wilayah administratif, dan statistik pertanian Desa Gongseng.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Sub-section 1: Kependudukan & Wilayah */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
                  <Users className="w-5 h-5 text-emerald-600" />
                  Kependudukan & Kewilayahan
                </h3>
                
                {/* Grid Mini Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <span className="text-xs text-gray-500 block mb-1">Total Penduduk</span>
                    <span className="text-lg font-bold text-gray-900">{demografi.jumlahPenduduk ? `${new Intl.NumberFormat('id-ID').format(demografi.jumlahPenduduk)} Jiwa` : '-'}</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <span className="text-xs text-gray-500 block mb-1">Jumlah KK</span>
                    <span className="text-lg font-bold text-gray-900">{demografi.jumlahKK ? `${new Intl.NumberFormat('id-ID').format(demografi.jumlahKK)} KK` : '-'}</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <span className="text-xs text-gray-500 block mb-1">Laki-Laki</span>
                    <span className="text-lg font-semibold text-gray-900">{demografi.jumlahLakiLaki ? `${new Intl.NumberFormat('id-ID').format(demografi.jumlahLakiLaki)} Jiwa` : '-'}</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <span className="text-xs text-gray-500 block mb-1">Perempuan</span>
                    <span className="text-lg font-semibold text-gray-900">{demografi.jumlahPerempuan ? `${new Intl.NumberFormat('id-ID').format(demografi.jumlahPerempuan)} Jiwa` : '-'}</span>
                  </div>
                </div>

                {/* Kelompok Usia */}
                {demografi.kelompokUsia && (
                  <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100 space-y-4">
                    <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Kelompok Usia</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div>
                        <span className="text-xs text-gray-400 block">Balita (0-5 th)</span>
                        <span className="text-base font-bold text-gray-800">{demografi.kelompokUsia.balita ? `${new Intl.NumberFormat('id-ID').format(demografi.kelompokUsia.balita)}` : '-'}</span>
                      </div>
                      <div>
                        <span className="text-xs text-gray-400 block">Anak (6-17 th)</span>
                        <span className="text-base font-bold text-gray-800">{demografi.kelompokUsia.anak ? `${new Intl.NumberFormat('id-ID').format(demografi.kelompokUsia.anak)}` : '-'}</span>
                      </div>
                      <div>
                        <span className="text-xs text-gray-400 block">Produktif (18-59 th)</span>
                        <span className="text-base font-bold text-gray-800">{demografi.kelompokUsia.produktif ? `${new Intl.NumberFormat('id-ID').format(demografi.kelompokUsia.produktif)}` : '-'}</span>
                      </div>
                      <div>
                        <span className="text-xs text-gray-400 block">Lansia (≥60 th)</span>
                        <span className="text-base font-bold text-gray-800">{demografi.kelompokUsia.lansia ? `${new Intl.NumberFormat('id-ID').format(demografi.kelompokUsia.lansia)}` : '-'}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Kewilayahan */}
                {demografi.wilayah && (
                  <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-4">
                    <div className="text-center">
                      <span className="text-xs text-gray-400 block">Dusun</span>
                      <span className="text-xl font-black text-emerald-700">{demografi.wilayah.dusun ?? '-'}</span>
                    </div>
                    <div className="text-center border-x border-gray-100">
                      <span className="text-xs text-gray-400 block">RT</span>
                      <span className="text-xl font-black text-emerald-700">{demografi.wilayah.rt ?? '-'}</span>
                    </div>
                    <div className="text-center">
                      <span className="text-xs text-gray-400 block">RW</span>
                      <span className="text-xl font-black text-emerald-700">{demografi.wilayah.rw ?? '-'}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Sub-section 2: Data Pertanian */}
              <div className="space-y-6 lg:border-l border-gray-100 lg:pl-8">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
                  <Sprout className="w-5 h-5 text-emerald-600" />
                  Sektor Pertanian (IPW)
                </h3>

                {/* Luas Lahan */}
                {demografi.luasLahan && (
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Luas Penggunaan Lahan</span>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-emerald-50/30 p-4 rounded-xl border border-emerald-100/50">
                        <span className="text-[10px] text-emerald-800 uppercase font-semibold block mb-0.5">Sawah</span>
                        <span className="text-lg font-bold text-gray-900">{demografi.luasLahan.sawah ?? '-'} <span className="text-xs font-normal text-gray-500">Ha</span></span>
                      </div>
                      <div className="bg-amber-50/30 p-4 rounded-xl border border-amber-100/50">
                        <span className="text-[10px] text-amber-800 uppercase font-semibold block mb-0.5">Pekarangan</span>
                        <span className="text-lg font-bold text-gray-900">{demografi.luasLahan.pekarangan ?? '-'} <span className="text-xs font-normal text-gray-500">Ha</span></span>
                      </div>
                      <div className="bg-blue-50/30 p-4 rounded-xl border border-blue-100/50">
                        <span className="text-[10px] text-blue-800 uppercase font-semibold block mb-0.5">Tegalan</span>
                        <span className="text-lg font-bold text-gray-900">{demografi.luasLahan.tegalan ?? '-'} <span className="text-xs font-normal text-gray-500">Ha</span></span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Produktivitas & Kelompok Tani */}
                <div className="space-y-4 pt-2">
                  <div className="flex justify-between items-center py-2 border-b border-gray-50 text-sm">
                    <span className="text-gray-500">Produktivitas Rata-rata Padi</span>
                    <span className="font-bold text-gray-900">{demografi.produktivitasPadi ?? '-'} Ton / Ha</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-50 text-sm">
                    <span className="text-gray-500">Jumlah Kelompok Tani</span>
                    <span className="font-bold text-gray-900">{demografi.jumlahKelompokTani ?? '-'} Kelompok</span>
                  </div>
                  <div className="flex justify-between items-center py-2 text-sm">
                    <span className="text-gray-500">Total Anggota Kelompok Tani</span>
                    <span className="font-bold text-gray-900">{demografi.jumlahAnggotaTani ?? '-'} Orang</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Section 5: Potensi Desa */}
        <section id="potensi" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm">
          <div className="lg:col-span-4 flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700">
              <Star className="w-6 h-6" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
              Potensi Unggulan
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Sumber daya pertanian, kebudayaan lokal, dan potensi ekonomi kreatif pendukung kesejahteraan desa.
            </p>
          </div>
          <div className="lg:col-span-8 border-t lg:border-t-0 lg:border-l border-gray-100 pt-8 lg:pt-0 lg:pl-10 text-gray-700 leading-relaxed">
            <RichText content={potensi} />
          </div>
        </section>

      </main>
    </div>
  )
}
