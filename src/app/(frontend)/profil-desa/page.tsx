import React from 'react'
import Image from 'next/image'
import { getPayload } from '@/lib/payload'
import { RichText } from '@/components/shared/RichText'
import { PageHero } from '@/components/shared/PageHero'
import { InteractiveMapViewer } from '@/components/shared/InteractiveMapViewer'
import { MapPin, Shield, Compass, Star, Map, BookOpen, Landmark } from 'lucide-react'

export const revalidate = 60

export const metadata = {
  title: 'Profil Desa - Desa Gongseng',
  description: 'Sejarah singkat, visi & misi, batas geografis, situs monumen bersejarah, serta potensi ekonomi Desa Gongseng, Kecamatan Megaluh, Kabupaten Jombang.',
}

// Peta default Desa Gongseng, Megaluh, Jombang
const MAP_DEFAULT = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15822.951554160494!2d112.18683533446657!3d-7.495289907106093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e783fd979600e1b%3A0xc3f5e3fcfcf8a5ba!2sGongseng%2C%20Megaluh%2C%20Jombang%20Regency%2C%20East%20Java!5e0!3m2!1sen!2sid!4v1717930000000!5m2!1sen!2sid"

export default async function ProfilDesaPage() {
  let data: any = null
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

  const situsFallback = [
    {
      nama: 'Patung Monumen Brigjen Kretarto',
      kategori: 'Monumen Pahlawan',
      deskripsi: 'Monumen bersejarah sebagai bentuk pengabdian dan penghormatan tinggi atas rekam jejak perjuangan Brigadir Jenderal Kretarto, tokoh komandan pejuang kemerdekaan Indonesia yang memiliki nilai sejarah perjuangan di wilayah Jombang dan Desa Gongseng.',
      lokasi: 'Wilayah Desa Gongseng, Megaluh',
      foto: '/images/situs/monumen-kretarto.jpg',
    },
    {
      nama: 'Relief Pahlawan Perjuangan',
      kategori: 'Relief Sejarah & Cagar Budaya',
      deskripsi: 'Ukiran dinding relief bersejarah yang mengabadikan rekam jejak perjuangan, keberanian, dan semangat gotong-royong warga Desa Gongseng dalam mempertahankan kedaulatan NKRI pada masa perang kemerdekaan.',
      lokasi: 'Wilayah Desa Gongseng, Megaluh',
      foto: '/images/situs/relief-pahlawan.jpg',
    },
  ]

  const sejarah = data?.sejarah || sejarahFallback
  const visi = data?.visi || visiFallback
  const misi = data?.misi || misiFallback
  const geografis = data?.deskripsiGeografis || geografisFallback
  const luasWilayah = data?.luasWilayah || 'Desa Gongseng terbagi menjadi beberapa Dusun dengan luas lahan pertanian produktif yang mendominasi sebagian besar wilayah desa.'
  const petaUrl = data?.petaEmbed || MAP_DEFAULT
  const potensi = data?.potensi || potensiFallback

  // Menggabungkan data CMS jika admin telah mengunggah foto/situs asli
  const situsList = (data?.situsBersejarah && data.situsBersejarah.length > 0)
    ? data.situsBersejarah.map((s: any, idx: number) => ({
        nama: s.nama || (idx === 0 ? 'Patung Monumen Brigjen Kretarto' : 'Relief Pahlawan Perjuangan'),
        kategori: s.kategori || 'Situs Bersejarah',
        deskripsi: s.deskripsi || '',
        lokasi: s.lokasi || 'Desa Gongseng, Megaluh',
        foto: (s.foto && typeof s.foto === 'object' && s.foto.url) ? s.foto.url : (idx === 0 ? '/images/situs/monumen-kretarto.jpg' : '/images/situs/relief-pahlawan.jpg'),
      }))
    : situsFallback

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      {/* Hero Header Banner */}
      <PageHero
        badge="Mengenal Lebih Dekat"
        title="Profil Desa"
        description="Sejarah, Visi Misi, Wilayah Geografis, serta Potensi Unggulan Desa Gongseng, Kecamatan Megaluh, Kabupaten Jombang."
        icon={BookOpen}
      />

      {/* Main Content Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        
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
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Visi & Misi Pembangunan
            </h2>
            <p className="text-sm text-gray-500">
              Arah kebijakan dan komitmen Pemerintah Desa Gongseng dalam melayani warga
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Box Visi */}
            <div className="lg:col-span-5 bg-gradient-to-br from-emerald-900 to-emerald-950 text-white p-8 md:p-10 rounded-3xl shadow-xl flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800 inline-block">
                  Visi Desa
                </span>
                <div className="text-emerald-100 leading-relaxed">
                  <RichText content={visi} className="text-emerald-100" />
                </div>
              </div>
              <div className="pt-6 border-t border-emerald-800/80 text-xs text-emerald-300 font-semibold uppercase tracking-wider">
                Pemerintah Desa Gongseng
              </div>
            </div>

            {/* Box Misi */}
            <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 inline-block">
                  Misi Desa
                </span>
                <div className="text-gray-700 leading-relaxed">
                  <RichText content={misi} className="text-gray-700 list-decimal" />
                </div>
              </div>
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

        {/* Section: Peta Pemetaan Digital Interaktif QGIS */}
        <section id="peta-gis" className="space-y-8 pt-4">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto border border-emerald-200 shadow-sm">
              <Compass className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-950 tracking-tight">
              Peta Pemetaan Digital Interaktif (QGIS)
            </h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
              Hasil digitalisasi peta pemetaan geospasial Desa Gongseng karya KKN-T IPB University 2026. Perbesar, geser, dan klik titik lokasi untuk melihat dokumentasi foto asli dan petunjuk arah.
            </p>
            <div className="w-12 h-1 bg-emerald-500 mx-auto rounded-full" />
          </div>

          <InteractiveMapViewer />
        </section>

        {/* Section 4: Situs Bersejarah & Monumen Perjuangan */}
        <section id="situs-bersejarah" className="space-y-10 pt-6">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto border border-amber-200 shadow-sm">
              <Landmark className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-950 tracking-tight">
              Situs & Monumen Bersejarah
            </h2>
            <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
              Jejak sejarah dan cagar budaya kebanggaan warga Desa Gongseng sebagai bukti rekam jejak perjuangan kemerdekaan.
            </p>
            <div className="w-12 h-1 bg-amber-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {situsList.map((situs: any, idx: number) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-gray-200/90 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col justify-between"
              >
                <div className="relative w-full aspect-16/10 bg-gray-900 overflow-hidden">
                  <Image
                    src={situs.foto}
                    alt={situs.nama}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <span className="absolute top-4 left-4 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-amber-400 text-gray-950 shadow-md">
                    {situs.kategori}
                  </span>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-black text-white leading-tight drop-shadow-md">
                      {situs.nama}
                    </h3>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {situs.deskripsi}
                  </p>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1.5 font-semibold text-emerald-800">
                      <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{situs.lokasi}</span>
                    </div>
                    <span className="text-[11px] bg-emerald-50 text-emerald-800 font-bold px-2.5 py-1 rounded-lg border border-emerald-200">
                      Cagar Budaya Desa
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

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
