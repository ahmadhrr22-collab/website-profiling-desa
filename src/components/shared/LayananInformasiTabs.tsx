'use client'

import React, { useState, useEffect } from 'react'
import { Kegiatan, Pengumuman, KontakSosmed } from '@/payload-types'
import { RichText } from './RichText'
import { Calendar, Clock, MapPin, Download, AlertCircle, FileText, Bell, ChevronDown, ChevronUp, MessageSquare, Send, ShieldAlert, User } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LayananInformasiTabsProps {
  kegiatanItems: Kegiatan[]
  pengumumanItems: Pengumuman[]
  kontak?: KontakSosmed | null
}

const KEGIATAN_KATEGORI_MAP: Record<string, string> = {
  kesehatan: 'Kesehatan (Posyandu, dll)',
  pertanian: 'Pertanian & Ketahanan Pangan',
  sosial: 'Sosial & Keagamaan',
  pemerintahan: 'Pemerintahan Desa',
  pemuda: 'Pemuda & Karang Taruna',
}

const formatDate = (dateStr: string, includeDay = false) => {
  if (!dateStr) return ''
  try {
    const date = new Date(dateStr)
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: includeDay ? 'long' : undefined,
    }).format(date)
  } catch (e) {
    return dateStr
  }
}

export function LayananInformasiTabs({ kegiatanItems, pengumumanItems, kontak }: LayananInformasiTabsProps) {
  const [activeTab, setActiveTab] = useState<'kegiatan' | 'pengumuman' | 'lapor'>('kegiatan')
  const [expandedKegiatanId, setExpandedKegiatanId] = useState<number | null>(null)

  // Form State Lapor Desa
  const [nama, setNama] = useState('')
  const [dusun, setDusun] = useState('Gongseng 1')
  const [rt, setRt] = useState('')
  const [rw, setRw] = useState('')
  const [kategori, setKategori] = useState('Infrastruktur & Jalan Rusak')
  const [laporan, setLaporan] = useState('')
  
  const [errorNama, setErrorNama] = useState(false)
  const [errorRt, setErrorRt] = useState(false)
  const [errorRw, setErrorRw] = useState(false)
  const [errorLaporan, setErrorLaporan] = useState(false)

  // Handle URL parameters for default tab
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const tabParam = params.get('tab')
      if (tabParam === 'lapor') {
        setActiveTab('lapor')
      } else if (tabParam === 'pengumuman') {
        setActiveTab('pengumuman')
      }
    }
  }, [])

  const toggleExpandKegiatan = (id: number) => {
    setExpandedKegiatanId(expandedKegiatanId === id ? null : id)
  }

  // Handle Laporan Submit
  const handleKirimLaporan = (e: React.FormEvent) => {
    e.preventDefault()
    
    let hasError = false
    if (!nama.trim()) {
      setErrorNama(true)
      hasError = true
    } else {
      setErrorNama(false)
    }

    if (!rt.trim()) {
      setErrorRt(true)
      hasError = true
    } else {
      setErrorRt(false)
    }

    if (!rw.trim()) {
      setErrorRw(true)
      hasError = true
    } else {
      setErrorRw(false)
    }

    if (!laporan.trim()) {
      setErrorLaporan(true)
      hasError = true
    } else {
      setErrorLaporan(false)
    }

    if (hasError) return

    // Ambil nomor WA dari database atau fallback ke nomor user
    const rawWA = kontak?.nomorWALapor || kontak?.nomorWA || '81319670828'
    
    // Bersihkan nomor WA
    let cleanWA = rawWA.replace(/\D/g, '')
    if (cleanWA.startsWith('0')) {
      cleanWA = cleanWA.substring(1)
    }
    if (cleanWA.startsWith('62')) {
      cleanWA = cleanWA.substring(2)
    }
    if (!cleanWA) {
      cleanWA = '81319670828'
    }

    // Rangkai teks pesan
    const pesanText = `Halo Admin Lapor Desa Gongseng,

Saya ingin menyampaikan pengaduan/aspirasi warga melalui website resmi desa:

*Nama Pelapor:* ${nama}
*Asal Wilayah:* Dusun ${dusun}, RT ${rt} / RW ${rw}
*Kategori:* ${kategori}
*Detail Laporan:*
${laporan}

*(Saya akan mengirimkan foto selfie di chat ini sebagai bukti verifikasi identitas warga)*

Mohon ditindaklanjuti. Terima kasih.`

    const waUrl = `https://wa.me/62${cleanWA}?text=${encodeURIComponent(pesanText)}`
    
    // Redirect ke WA
    window.open(waUrl, '_blank')
  }

  return (
    <div className="space-y-12">
      {/* Switcher Tab */}
      <div className="flex justify-center">
        <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-gray-100 rounded-2xl border border-gray-200/50">
          <button
            onClick={() => setActiveTab('kegiatan')}
            className={cn(
              'flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 cursor-pointer',
              activeTab === 'kegiatan'
                ? 'bg-white text-emerald-800 shadow-md'
                : 'text-gray-500 hover:text-gray-800'
            )}
          >
            <Calendar className="w-4 h-4" />
            <span>Agenda Kegiatan</span>
            <span className="text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full font-bold ml-1">
              {kegiatanItems.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('pengumuman')}
            className={cn(
              'flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 cursor-pointer',
              activeTab === 'pengumuman'
                ? 'bg-white text-emerald-800 shadow-md'
                : 'text-gray-500 hover:text-gray-800'
            )}
          >
            <Bell className="w-4 h-4" />
            <span>Pengumuman & Berita</span>
            <span className="text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full font-bold ml-1">
              {pengumumanItems.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('lapor')}
            className={cn(
              'flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 cursor-pointer',
              activeTab === 'lapor'
                ? 'bg-white text-emerald-800 shadow-md'
                : 'text-gray-500 hover:text-gray-800'
            )}
          >
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <span>Lapor Desa</span>
            <span className="text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full font-bold ml-1">
              Baru
            </span>
          </button>
        </div>
      </div>

      {/* Konten Halaman */}
      <div className="transition-all duration-300">
        {activeTab === 'kegiatan' ? (
          kegiatanItems.length > 0 ? (
            <div className="max-w-4xl mx-auto space-y-6">
              {kegiatanItems.map((event) => {
                const isExpanded = expandedKegiatanId === event.id
                const attachment = event.dokumen

                return (
                  <div
                    key={event.id}
                    className={cn(
                      'bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden',
                      isExpanded && 'border-emerald-500/30 shadow-md'
                    )}
                  >
                    {/* Header Event (Selalu Terlihat) */}
                    <div
                      onClick={() => toggleExpandKegiatan(event.id)}
                      className="p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between cursor-pointer select-none"
                    >
                      <div className="flex-grow">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-100 mb-2.5">
                          {KEGIATAN_KATEGORI_MAP[event.kategori] || event.kategori}
                        </span>
                        <h3 className="text-lg font-extrabold text-gray-900 tracking-tight leading-snug">
                          {event.judul}
                        </h3>
                        
                        {/* Ringkasan Lokasi & Tanggal */}
                        <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-500 font-medium">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            {formatDate(event.tanggal, true)}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            {event.waktu}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            {event.lokasi}
                          </span>
                        </div>
                      </div>
                      <div className="text-gray-400 self-end sm:self-center">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </div>

                    {/* Detail Deskripsi (Collapsible) */}
                    {isExpanded && (
                      <div className="px-6 pb-6 border-t border-gray-50 pt-5 bg-gray-50/30 text-sm text-gray-700 leading-relaxed space-y-5">
                        {event.deskripsi ? (
                          <RichText content={event.deskripsi} />
                        ) : (
                          <p className="text-gray-500 italic">Tidak ada deskripsi detail untuk agenda ini.</p>
                        )}

                        {/* File Lampiran */}
                        {attachment && typeof attachment === 'object' && 'url' in attachment && attachment.url && (
                          <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl mt-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-emerald-50 rounded-lg text-emerald-700 border border-emerald-100">
                                <FileText className="w-4 h-4" />
                              </div>
                              <div>
                                <h5 className="font-bold text-gray-900 text-xs">Dokumen Lampiran</h5>
                                <p className="text-[10px] text-gray-400">PDF / Gambar Pendukung Agenda</p>
                              </div>
                            </div>
                            <a
                              href={attachment.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors cursor-pointer"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Unduh Berkas</span>
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-white border border-gray-100 rounded-3xl p-8 max-w-md mx-auto shadow-sm">
              <AlertCircle className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-950 mb-2">Agenda Belum Tersedia</h3>
              <p className="text-sm text-gray-500">
                Belum ada jadwal kegiatan desa terdaftar untuk saat ini.
              </p>
            </div>
          )
        ) : activeTab === 'pengumuman' ? (
          pengumumanItems.length > 0 ? (
            <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
              {pengumumanItems.map((news) => {
                const isPenting = news.penting
                const attachment = news.lampiran

                return (
                  <div
                    key={news.id}
                    id={`pengumuman-${news.id}`}
                    className={cn(
                      'bg-white p-6 md:p-8 rounded-2xl border transition-all duration-300 relative',
                      isPenting
                        ? 'border-emerald-500 bg-emerald-50/10 shadow-lg shadow-emerald-500/5 ring-1 ring-emerald-500/20'
                        : 'border-gray-100 shadow-sm hover:border-gray-200'
                    )}
                  >
                    {/* Badge Penting */}
                    {isPenting && (
                      <div className="absolute top-6 right-6 flex items-center gap-1 bg-amber-500 text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded shadow-sm">
                        <Bell className="w-3 h-3 animate-bounce" />
                        <span>Penting</span>
                      </div>
                    )}

                    {/* Metadata Tanggal */}
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                      <Calendar className="w-4 h-4 text-emerald-600" />
                      <span>Terbit pada: <strong>{formatDate(news.tanggalTerbit)}</strong></span>
                    </div>

                    {/* Judul Pengumuman */}
                    <h3 className="text-xl font-extrabold text-gray-900 tracking-tight leading-snug mb-5 max-w-[85%]">
                      {news.judul}
                    </h3>

                    {/* Konten Utama */}
                    <div className="text-sm text-gray-700 leading-relaxed mb-6 border-l-2 border-emerald-500/20 pl-4">
                      <RichText content={news.konten} />
                    </div>

                    {/* File Lampiran */}
                    {attachment && typeof attachment === 'object' && 'url' in attachment && attachment.url && (
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-emerald-50/30 border border-emerald-100/50 rounded-xl mt-6 gap-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-emerald-100 rounded-lg text-emerald-800">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div>
                            <h5 className="font-bold text-gray-900 text-xs">Dokumen Lampiran Resmi</h5>
                            <p className="text-[10px] text-gray-500">Silakan unduh dokumen untuk informasi cetak penuh</p>
                          </div>
                        </div>
                        <a
                          href={attachment.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm cursor-pointer w-full sm:w-auto justify-center"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Unduh Berkas Lampiran</span>
                        </a>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-white border border-gray-100 rounded-3xl p-8 max-w-md mx-auto shadow-sm">
              <AlertCircle className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-950 mb-2">Pengumuman Belum Tersedia</h3>
              <p className="text-sm text-gray-500">
                Belum ada berita atau pengumuman resmi yang diterbitkan untuk saat ini.
              </p>
            </div>
          )
        ) : (
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Informasi Prosedur (Left 5-columns) */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-gray-900 leading-tight">Prosedur Pengaduan</h4>
                  <p className="text-[10px] text-gray-400">Cara menyampaikan laporan & aspirasi</p>
                </div>
              </div>
              
              <div className="space-y-4 text-xs text-gray-600">
                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center flex-shrink-0">1</div>
                  <p>Isi formulir pengaduan dengan nama asli Anda dan detail laporan yang jelas.</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center flex-shrink-0">2</div>
                  <p>Klik tombol <strong>"Kirim via WhatsApp"</strong> untuk membuka obrolan chat WhatsApp.</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center flex-shrink-0">3</div>
                  <p>Kirimkan <strong>foto selfie Anda</strong> langsung di chat WhatsApp tersebut sebagai bukti verifikasi identitas warga.</p>
                </div>
              </div>

              <div className="bg-emerald-50/40 p-4 rounded-xl border border-emerald-100/50 text-[11px] text-emerald-800 leading-relaxed">
                <strong>Catatan Kerahasiaan:</strong> Laporan Anda dikirim langsung secara <em>end-to-end</em> ke nomor resmi perangkat desa tanpa disimpan di database website, menjamin privasi Anda sepenuhnya terjaga.
              </div>
            </div>

            {/* Form Laporan (Right 7-columns) */}
            <form onSubmit={handleKirimLaporan} className="lg:col-span-7 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
              <h4 className="text-base font-bold text-gray-900 border-b border-gray-50 pb-3">Formulir Pengaduan Warga</h4>
              
              {/* Nama Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 block">Nama Pelapor *</label>
                <div className="relative">
                  <input
                    type="text"
                    value={nama}
                    onChange={(e) => {
                      setNama(e.target.value)
                      setErrorNama(false)
                    }}
                    placeholder="Masukkan nama lengkap Anda"
                    className={cn(
                      "w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-all",
                      errorNama 
                        ? "border-red-300 focus:border-red-500 bg-red-50/10" 
                        : "border-gray-200 focus:border-emerald-500"
                    )}
                  />
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
                {errorNama && <p className="text-[10px] text-red-500">Nama pelapor wajib diisi.</p>}
              </div>

              {/* Dusun, RT, RW Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Dusun Select */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 block">Dusun *</label>
                  <select
                    value={dusun}
                    onChange={(e) => setDusun(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-emerald-500 bg-white"
                  >
                    <option value="Gongseng 1">Gongseng 1</option>
                    <option value="Gongseng 2">Gongseng 2</option>
                    <option value="Krandekan">Krandekan</option>
                    <option value="Garu Rejo">Garu Rejo</option>
                  </select>
                </div>
                {/* RT Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 block">RT *</label>
                  <input
                    type="text"
                    value={rt}
                    onChange={(e) => {
                      setRt(e.target.value)
                      setErrorRt(false)
                    }}
                    placeholder="Contoh: 03"
                    className={cn(
                      "w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-all",
                      errorRt 
                        ? "border-red-300 focus:border-red-500 bg-red-50/10" 
                        : "border-gray-200 focus:border-emerald-500"
                    )}
                  />
                  {errorRt && <p className="text-[10px] text-red-500">RT wajib diisi.</p>}
                </div>
                {/* RW Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 block">RW *</label>
                  <input
                    type="text"
                    value={rw}
                    onChange={(e) => {
                      setRw(e.target.value)
                      setErrorRw(false)
                    }}
                    placeholder="Contoh: 01"
                    className={cn(
                      "w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-all",
                      errorRw 
                        ? "border-red-300 focus:border-red-500 bg-red-50/10" 
                        : "border-gray-200 focus:border-emerald-500"
                    )}
                  />
                  {errorRw && <p className="text-[10px] text-red-500">RW wajib diisi.</p>}
                </div>
              </div>

              {/* Kategori Select */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 block">Kategori Laporan *</label>
                <select
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-emerald-500 bg-white"
                >
                  <option value="Infrastruktur & Jalan Rusak">Infrastruktur & Jalan Rusak</option>
                  <option value="Layanan Kependudukan / Administrasi">Layanan Kependudukan / Administrasi</option>
                  <option value="Kesehatan, Kebersihan & Sampah">Kesehatan, Kebersihan & Sampah</option>
                  <option value="Keamanan & Ketertiban Desa">Keamanan & Ketertiban Desa</option>
                  <option value="Pertanian, Irigasi & Air">Pertanian, Irigasi & Air</option>
                  <option value="Aspirasi, Saran & Kritik">Aspirasi, Saran & Kritik</option>
                </select>
              </div>

              {/* Detail Textarea */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 block">Detail Laporan / Pesan *</label>
                <textarea
                  value={laporan}
                  onChange={(e) => {
                    setLaporan(e.target.value)
                    setErrorLaporan(false)
                  }}
                  rows={5}
                  placeholder="Tuliskan secara detail laporan, lokasi kejadian, atau aspirasi Anda..."
                  className={cn(
                    "w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-all resize-none",
                    errorLaporan 
                      ? "border-red-300 focus:border-red-500 bg-red-50/10" 
                      : "border-gray-200 focus:border-emerald-500"
                  )}
                />
                {errorLaporan && <p className="text-[10px] text-red-500">Detail laporan/aspirasi wajib diisi.</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-md shadow-emerald-600/10 hover:shadow-lg transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Laporan via WhatsApp</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
export default LayananInformasiTabs
