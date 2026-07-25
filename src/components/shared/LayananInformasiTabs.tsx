'use client'

import React, { useState } from 'react'
import { Kegiatan, Pengumuman } from '@/payload-types'
import { RichText } from './RichText'
import { Calendar, Clock, MapPin, Download, AlertCircle, FileText, Bell, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LayananInformasiTabsProps {
  kegiatanItems: Kegiatan[]
  pengumumanItems: Pengumuman[]
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

export function LayananInformasiTabs({ kegiatanItems, pengumumanItems }: LayananInformasiTabsProps) {
  const [activeTab, setActiveTab] = useState<'kegiatan' | 'pengumuman'>('kegiatan')
  const [expandedKegiatanId, setExpandedKegiatanId] = useState<number | null>(null)

  const toggleExpandKegiatan = (id: number) => {
    setExpandedKegiatanId(expandedKegiatanId === id ? null : id)
  }

  return (
    <div className="space-y-12">
      {/* Switcher Tab */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 bg-gray-100 rounded-2xl border border-gray-200/50">
          <button
            onClick={() => setActiveTab('kegiatan')}
            className={cn(
              'flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer',
              activeTab === 'kegiatan'
                ? 'bg-white text-emerald-800 shadow-md'
                : 'text-gray-500 hover:text-gray-800'
            )}
          >
            <Calendar className="w-4 h-4" />
            <span>Agenda Kegiatan</span>
            <span className="text-xs bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full font-bold ml-1">
              {kegiatanItems.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('pengumuman')}
            className={cn(
              'flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer',
              activeTab === 'pengumuman'
                ? 'bg-white text-emerald-800 shadow-md'
                : 'text-gray-500 hover:text-gray-800'
            )}
          >
            <Bell className="w-4 h-4" />
            <span>Pengumuman & Berita</span>
            <span className="text-xs bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full font-bold ml-1">
              {pengumumanItems.length}
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
        ) : pengumumanItems.length > 0 ? (
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
        )}
      </div>
    </div>
  )
}
export default LayananInformasiTabs
