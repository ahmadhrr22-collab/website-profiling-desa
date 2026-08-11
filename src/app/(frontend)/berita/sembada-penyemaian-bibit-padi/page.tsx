import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Calendar,
  User,
  MapPin,
  Clock,
  Share2,
  ArrowLeft,
  CheckCircle2,
  Bookmark,
  Printer,
  Sparkles,
  ExternalLink,
  MessageSquare,
} from 'lucide-react'

export const metadata = {
  title: 'Program SEMBADA: Inovasi Penyemaian Padi Media Tray di Desa Gongseng - Berita Desa',
  description: 'Program pendampingan dan praktik penyemaian bibit padi secara mandiri menggunakan media tray di Desa Gongseng kolaborasi KKN-T IPB, Brigade Pangan, dan Poktan Garurejo.',
}

export default function BeritaSembadaPage() {
  return (
    <article className="min-h-screen bg-gray-50/50 pb-20">
      {/* Top Breadcrumb Header Bar */}
      <div className="bg-white border-b border-gray-200/80 sticky top-16 z-30 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4 text-xs font-medium text-gray-600">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <Link href="/" className="hover:text-emerald-700 transition-colors">
              Beranda
            </Link>
            <span>/</span>
            <Link href="/layanan-informasi" className="hover:text-emerald-700 transition-colors">
              Layanan & Informasi
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-bold truncate">Program SEMBADA</span>
          </div>

          <Link
            href="/layanan-informasi"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors font-bold shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Berita</span>
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        {/* Article Header & Headline */}
        <header className="space-y-4 bg-white p-6 sm:p-10 rounded-3xl border border-gray-200/80 shadow-sm">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-700 text-white uppercase tracking-wider shadow-xs">
              PUBLIKASI MEDIA MASSA & INOVASI PERTANIAN
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-950 border border-amber-200">
              KKN-T IPB University 2026
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-950 leading-tight tracking-tight">
            Tingkatkan Efisiensi Pertanian, Tim KKN-T IPB Gelar Program SEMBADA: Inovasi Penyemaian Padi Media Tray Bersama Poktan Garurejo Desa Gongseng
          </h1>

          <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
            Program pendampingan teknis dan praktik langsung penyemaian benih padi mandiri menggunakan media tray guna meningkatkan efisiensi benih dan ketahanan bibit petani Desa Gongseng.
          </p>

          {/* Author & Publication Metadata Bar */}
          <div className="pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-500">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                  IPB
                </div>
                <div>
                  <span className="font-bold text-gray-900 block">Tim KKN-T IPB University</span>
                  <span className="text-[11px] text-gray-500">Humas Desa Gongseng</span>
                </div>
              </div>

              <div className="h-6 w-px bg-gray-200 hidden sm:block" />

              <div className="flex items-center gap-1.5 text-gray-600">
                <Calendar className="w-4 h-4 text-emerald-700" />
                <span>Selasa, 11 Agustus 2026 | 14:30 WIB</span>
              </div>

              <div className="flex items-center gap-1.5 text-gray-600">
                <MapPin className="w-4 h-4 text-emerald-700" />
                <span>Desa Gongseng, Megaluh</span>
              </div>

              <div className="flex items-center gap-1.5 text-gray-600">
                <Clock className="w-4 h-4 text-emerald-700" />
                <span>4 Menit Baca</span>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Main Photo Banner with News Caption */}
        <figure className="space-y-2 bg-white p-3 rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden">
          <div className="relative w-full h-[320px] sm:h-[480px] rounded-2xl overflow-hidden bg-gray-900">
            <Image
              src="/images/berita/sembada-2.jpg"
              alt="Praktik Penyemaian Bibit Padi Media Tray Program SEMBADA Desa Gongseng"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
          <figcaption className="px-3 py-2 text-xs text-gray-600 leading-relaxed italic border-l-2 border-emerald-600">
            <strong className="text-gray-900 not-italic font-bold">PRAKTIK PENYEMAIAN:</strong> Petani Kelompok Tani (Poktan) Garurejo bersama Tim Mahasiswa KKN-T IPB University saat memperagakan pengisian media tanam dan penataan benih padi pada media tray persemaian mandiri di Desa Gongseng, Megaluh, Jombang. (Foto: Dok. Tim KKN-T IPB Desa Gongseng)
          </figcaption>
        </figure>

        {/* Main Article Body Section */}
        <main className="bg-white p-6 sm:p-10 rounded-3xl border border-gray-200/80 shadow-sm space-y-8 text-gray-800 text-base leading-relaxed font-normal">
          {/* Lead Paragraph */}
          <p className="text-lg text-gray-900 font-medium leading-relaxed">
            <strong className="font-extrabold text-emerald-900 uppercase">DESA GONGSENG, MEGALUH —</strong> Dalam upaya memperkuat kemandirian agraris dan mendorong modernisasi teknologi pertanian di tingkat tapak, Tim Mahasiswa KKN Tematik (KKN-T) IPB University meluncurkan program inovasi pertanian bertajuk <strong className="text-emerald-800 font-bold">SEMBADA (Semai Padi Mandiri dengan Media Tray)</strong> di Desa Gongseng, Kecamatan Megaluh, Kabupaten Jombang, Jawa Timur.
          </p>

          <p>
            Program ini dilaksanakan melalui kolaborasi erat bersama <strong>Brigade Pangan Desa Gongseng</strong> dan <strong>Kelompok Tani (Poktan) Garurejo</strong>. Kegiatan difokuskan pada pendampingan teknis serta praktik lapangan pengolahan persemaian padi menggunakan metode <em>tray</em> (wadah semai plastik berlubang) sebagai alternatif modern pengganti metode pembibitan sawah basah konvensional.
          </p>

          {/* Subheading 1 */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-950 tracking-tight flex items-center gap-2">
              <span className="w-2.5 h-6 bg-emerald-600 rounded-full inline-block" />
              Solusi Efisiensi Benih dan Perlindungan Akar
            </h2>
            <p>
              Koordinator Tim KKN-T IPB University Desa Gongseng menjelaskan bahwa metode penyemaian benih padi dengan media <em>tray</em> menawarkan efisiensi tinggi dari segi penggunaan benih, tenaga kerja, serta perlindungan bibit dari gangguan cuaca ekstrem dan hama sawah.
            </p>
            <p>
              "Selama ini, persemaian konvensional di lahan terbuka kerap menghadapi risiko kebanjiran, serangan keong, dan kerusakan perakaran saat pembibitan dicabut (*daut*). Dengan media <em>tray</em>, benih tumbuh seragam, perakaran tetap utuh terlindungi, dan penghematan benih bisa mencapai 30 hingga 40 persen per hektar," terangnya saat memandu sosialisasi.
            </p>
          </div>

          {/* Inline Embedded Photo 2 */}
          <figure className="space-y-2 bg-gray-50 p-3 rounded-2xl border border-gray-200/60 my-6">
            <div className="relative w-full h-[280px] sm:h-[400px] rounded-xl overflow-hidden bg-gray-900">
              <Image
                src="/images/berita/sembada-1.jpg"
                alt="Diskusi dan Pendampingan Teknis Poktan Garurejo Desa Gongseng"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
            <figcaption className="px-2 text-xs text-gray-600 italic">
              <strong>DISKUSI INTERAKTIF:</strong> Suasana antusiasme anggota Kelompok Tani Garurejo saat mengikuti pemaparan keunggulan penyemaian media tray bersama mahasiswa IPB University. (Foto: Dok. Humas KKN IPB)
            </figcaption>
          </figure>

          {/* Journalist Quote Highlight Box */}
          <div className="bg-emerald-900 text-white p-6 sm:p-8 rounded-3xl shadow-md space-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-800/40 rounded-full blur-2xl pointer-events-none" />
            <span className="text-amber-400 font-serif text-5xl leading-none block font-bold">“</span>
            <blockquote className="text-base sm:text-lg font-medium text-emerald-100 leading-relaxed italic relative z-10 -mt-6">
              "Melalui teknologi penyemaian tray ini, para petani Desa Gongseng tidak lagi bergantung pada bibit luar dan lebih siap menghadapi tantangan iklim. Akar bibit utuh sehingga saat ditanam di sawah langsung tumbuh cepat tanpa mengalami stres pertumbuhan."
            </blockquote>
            <div className="pt-2 text-xs font-bold text-amber-300 uppercase tracking-widest border-t border-emerald-800">
              — Perwakilan Poktan Garurejo Desa Gongseng
            </div>
          </div>

          {/* Subheading 2 */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-950 tracking-tight flex items-center gap-2">
              <span className="w-2.5 h-6 bg-emerald-600 rounded-full inline-block" />
              Sinergi Bersama Brigade Pangan dan Poktan Garurejo
            </h2>
            <p>
              Ketua Poktan Garurejo mengapresiasi keikutsertaan aktif mahasiswa IPB University dan tim Brigade Pangan Desa Gongseng. Menurutnya, praktik langsung persemaian mandiri ini membuka wawasan baru bagi para petani tempatan untuk mengadopsi teknologi tepat guna yang praktis dan ekonomis.
            </p>
            <p>
              "Proses penyemaian di dalam <em>tray</em> sangat fleksibel, dapat ditaruh di pelataran pekarangan atau balai desa tanpa memakan tempat luas. Petani juga lebih mudah mengontrol kelembaban media tanam serta kebutuhan nutrisi pupuk organik," tambahnya.
            </p>
          </div>

          {/* Inline Embedded Photo 3 */}
          <figure className="space-y-2 bg-gray-50 p-3 rounded-2xl border border-gray-200/60 my-6">
            <div className="relative w-full h-[280px] sm:h-[400px] rounded-xl overflow-hidden bg-gray-900">
              <Image
                src="/images/berita/sembada-3.jpg"
                alt="Penataan Benih Padi di Tray Persemaian Desa Gongseng"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
            <figcaption className="px-2 text-xs text-gray-600 italic">
              <strong>PENATAAN BENIH:</strong> Proses peletakan benih padi unggul di atas kotak tray penyemaian yang telah diisi media tanam subur. (Foto: Dok. Humas KKN IPB)
            </figcaption>
          </figure>

          {/* Key Advantages Summary Box */}
          <div className="bg-emerald-50/80 border border-emerald-200 p-6 rounded-3xl space-y-4">
            <h3 className="font-extrabold text-emerald-950 text-base flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>3 Keunggulan Utama Metode Penyemaian Media Tray (Program SEMBADA):</span>
            </h3>
            <ul className="space-y-3 text-sm text-emerald-900 font-medium">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <span><strong>Hemat Penggunaan Benih:</strong> Mengurangi borosnya benih hingga 30%-40% dibanding persemaian konvensional.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <span><strong>Pertumbuhan Seragam & Akar Utuh:</strong> Pembibitan dapat dipindah tanpa merusak sistem perakaran padi.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <span><strong>Kemandirian Kelompok Tani:</strong> Poktan Garurejo & Brigade Pangan mampu memproduksi bibit mandiri secara berkelanjutan.</span>
              </li>
            </ul>
          </div>

          <p>
            Pemerintah Desa Gongseng mengapresiasi penuh keberhasilan Program SEMBADA ini dan berharap inovasi penyemaian media <em>tray</em> dapat direplikasi secara meluas oleh seluruh kelompok tani di empat dusun Desa Gongseng menjelang musim tanam mendatang.
          </p>

          {/* Article Footer Tags */}
          <div className="pt-6 border-t border-gray-100 flex flex-wrap items-center gap-2 text-xs font-bold text-gray-600">
            <span className="text-gray-400 font-medium">Topik Terkait:</span>
            <span className="px-3 py-1 rounded-lg bg-gray-100 text-gray-800 border border-gray-200">#KKNTIPB2026</span>
            <span className="px-3 py-1 rounded-lg bg-gray-100 text-gray-800 border border-gray-200">#DesaGongseng</span>
            <span className="px-3 py-1 rounded-lg bg-gray-100 text-gray-800 border border-gray-200">#SEMBADA</span>
            <span className="px-3 py-1 rounded-lg bg-gray-100 text-gray-800 border border-gray-200">#PoktanGarurejo</span>
            <span className="px-3 py-1 rounded-lg bg-gray-100 text-gray-800 border border-gray-200">#BrigadePangan</span>
            <span className="px-3 py-1 rounded-lg bg-gray-100 text-gray-800 border border-gray-200">#MegaluhJombang</span>
          </div>
        </main>

        {/* Luaran Wajib Reporting Banner (Print / Link Helper) */}
        <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-emerald-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-amber-400 text-gray-950 inline-block">
              [LUARAN WAJIB] PUBLIKASI MEDIA MASSA
            </span>
            <h3 className="text-lg font-bold text-white">
              Dokumen Resmi Publikasi Berita KKN-T IPB University
            </h3>
            <p className="text-xs text-emerald-200">
              Artikel ini diterbitkan secara resmi di Portal Digital Desa Gongseng untuk keperluan pelaporan Luaran Wajib KKN-T.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/layanan-informasi"
              className="px-4 py-2.5 rounded-xl bg-white text-emerald-900 font-bold text-xs hover:bg-emerald-50 transition-colors shadow-sm"
            >
              Lihat Daftar Berita
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
