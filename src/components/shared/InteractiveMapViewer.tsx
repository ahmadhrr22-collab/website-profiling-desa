'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  MapPin,
  X,
  ExternalLink,
  Info,
  Navigation,
  Sparkles,
  Building2,
  GraduationCap,
  HeartPulse,
  Landmark,
} from 'lucide-react'

interface Hotspot {
  id: string
  title: string
  category: 'monumen' | 'pemerintahan' | 'pendidikan' | 'dusun' | 'posyandu'
  categoryLabel: string
  x: number // percentage from left
  y: number // percentage from top
  photo: string
  description: string
  googleMapsUrl?: string
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'monumen-kretarto',
    title: 'Patung Monumen Brigjen Kretarto',
    category: 'monumen',
    categoryLabel: 'Monumen Bersejarah',
    x: 16.5,
    y: 82.5,
    photo: '/images/footage desa gongseng/monument.jpg',
    description:
      'Monumen penghormatan atas rekam jejak perjuangan Brigadir Jenderal Kretarto, tokoh pejuang kemerdekaan Republik Indonesia di wilayah Jombang dan Desa Gongseng.',
    googleMapsUrl: 'https://maps.google.com/?q=-7.4952899,112.1868353',
  },
  {
    id: 'relief-perjuangan',
    title: 'Relief Pahlawan Perjuangan Desa Gongseng',
    category: 'monumen',
    categoryLabel: 'Cagar Budaya',
    x: 43.2,
    y: 17.5,
    photo: '/images/footage desa gongseng/relief.jpg',
    description:
      'Ukiran relief dinding bersejarah yang mengabadikan rekam jejak perjuangan, keberanian, dan gotong royong warga Desa Gongseng dalam mempertahankan kedaulatan NKRI.',
    googleMapsUrl: 'https://maps.google.com/?q=-7.4952899,112.1868353',
  },
  {
    id: 'kantor-desa',
    title: 'Kantor & Balai Desa Gongseng',
    category: 'pemerintahan',
    categoryLabel: 'Pemerintahan Desa',
    x: 57.2,
    y: 17.5,
    photo: '/images/footage desa gongseng/kantor_desa.jpg',
    description:
      'Gedung Kantor dan Balai Desa Gongseng sebagai pusat pelayanan administratif kependudukan, tata kelola pemerintahan, dan ruang musyawarah warga.',
    googleMapsUrl: 'https://maps.google.com/?q=-7.4952899,112.1868353',
  },
  {
    id: 'sdn-gongseng',
    title: 'SD Negeri Gongseng',
    category: 'pendidikan',
    categoryLabel: 'Fasilitas Pendidikan',
    x: 29.8,
    y: 82.5,
    photo: '/images/footage desa gongseng/IMG_0835.jpg',
    description:
      'Sekolah Dasar Negeri Gongseng yang melayani pendidikan dasar anak-anak warga Desa Gongseng dan sekitarnya.',
    googleMapsUrl: 'https://maps.google.com/?q=-7.4952899,112.1868353',
  },
  {
    id: 'dusun-gongseng-1',
    title: 'Wilayah Dusun Gongseng I',
    category: 'dusun',
    categoryLabel: 'Wilayah Dusun',
    x: 29.8,
    y: 17.5,
    photo: '/images/footage desa gongseng/halaman_depan.jpg',
    description:
      'Pemukiman warga Dusun Gongseng I dengan kawasan agraris yang asri dan kebersamaan warga yang kental.',
  },
  {
    id: 'dusun-gongseng-2',
    title: 'Wilayah Dusun Gongseng II',
    category: 'dusun',
    categoryLabel: 'Wilayah Dusun',
    x: 16.5,
    y: 17.5,
    photo: '/images/footage desa gongseng/IMG_0783.jpg',
    description:
      'Kawasan pemukiman Dusun Gongseng II dengan akses jalan yang mudah terhubung ke pusat Kecamatan Megaluh.',
  },
  {
    id: 'dusun-garurejo',
    title: 'Wilayah Dusun Garurejo',
    category: 'dusun',
    categoryLabel: 'Wilayah Dusun',
    x: 43.2,
    y: 82.5,
    photo: '/images/footage desa gongseng/IMG_0845.jpg',
    description:
      'Dusun Garurejo, wilayah bagian selatan Desa Gongseng yang didominasi oleh pertanian sawah irigasi teknis.',
  },
  {
    id: 'dusun-krandekan',
    title: 'Wilayah Dusun Krandekan',
    category: 'dusun',
    categoryLabel: 'Wilayah Dusun',
    x: 57.2,
    y: 82.5,
    photo: '/images/footage desa gongseng/IMG_0847.jpg',
    description:
      'Dusun Krandekan, bagian dari wilayah administratif Desa Gongseng dengan suasana pedesaan yang damai.',
  },
  {
    id: 'pusat-layanan',
    title: 'Koperasi Desa Merah Putih & Posyandu',
    category: 'posyandu',
    categoryLabel: 'Layanan Sosial & Kesehatan',
    x: 37.8,
    y: 43.5,
    photo: '/images/footage desa gongseng/dalam_balai.jpg',
    description:
      'Pusat layanan Posyandu kesehatan ibu-balita dan kegiatan ekonomi Koperasi Merah Putih Desa Gongseng.',
  },
]

export function InteractiveMapViewer() {
  const [zoom, setZoom] = useState(1)
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.3, 2.5))
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.3, 1))
  const handleResetZoom = () => setZoom(1)

  const toggleFullscreen = () => {
    if (!containerRef.current) return
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {})
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {})
    }
  }

  const filteredHotspots = activeCategory === 'all'
    ? HOTSPOTS
    : HOTSPOTS.filter((h) => h.category === activeCategory)

  return (
    <div className="space-y-6">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer shadow-xs border ${
            activeCategory === 'all'
              ? 'bg-emerald-700 text-white border-emerald-800 shadow-md'
              : 'bg-white text-gray-700 border-gray-200 hover:bg-emerald-50 hover:text-emerald-800'
          }`}
        >
          ✨ Semua Titik ({HOTSPOTS.length})
        </button>
        <button
          onClick={() => setActiveCategory('monumen')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer shadow-xs border ${
            activeCategory === 'monumen'
              ? 'bg-amber-600 text-white border-amber-700 shadow-md'
              : 'bg-white text-gray-700 border-gray-200 hover:bg-amber-50 hover:text-amber-800'
          }`}
        >
          🗿 Cagar Budaya & Monumen
        </button>
        <button
          onClick={() => setActiveCategory('pemerintahan')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer shadow-xs border ${
            activeCategory === 'pemerintahan'
              ? 'bg-blue-600 text-white border-blue-700 shadow-md'
              : 'bg-white text-gray-700 border-gray-200 hover:bg-blue-50 hover:text-blue-800'
          }`}
        >
          🏛️ Pemerintahan & SDN
        </button>
        <button
          onClick={() => setActiveCategory('dusun')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer shadow-xs border ${
            activeCategory === 'dusun'
              ? 'bg-emerald-600 text-white border-emerald-700 shadow-md'
              : 'bg-white text-gray-700 border-gray-200 hover:bg-emerald-50 hover:text-emerald-800'
          }`}
        >
          🏡 Wilayah Dusun
        </button>
        <button
          onClick={() => setActiveCategory('posyandu')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer shadow-xs border ${
            activeCategory === 'posyandu'
              ? 'bg-rose-600 text-white border-rose-700 shadow-md'
              : 'bg-white text-gray-700 border-gray-200 hover:bg-rose-50 hover:text-rose-800'
          }`}
        >
          🏥 Posyandu & Layanan
        </button>
      </div>

      {/* Main Map Interactive Box */}
      <div
        ref={containerRef}
        className="relative w-full rounded-3xl overflow-hidden border border-gray-200 shadow-xl bg-gray-950 group"
      >
        {/* Floating Controls Bar */}
        <div className="absolute top-4 right-4 z-30 flex items-center gap-1.5 bg-gray-950/80 p-1.5 rounded-2xl border border-gray-800 backdrop-blur-md shadow-lg text-white">
          <button
            onClick={handleZoomIn}
            title="Perbesar Peta (+)"
            className="p-2 rounded-xl hover:bg-emerald-600/80 transition-colors cursor-pointer"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            title="Perkecil Peta (-)"
            className="p-2 rounded-xl hover:bg-emerald-600/80 transition-colors cursor-pointer"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetZoom}
            title="Reset Perbesaran"
            className="p-2 rounded-xl hover:bg-emerald-600/80 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <div className="w-px h-4 bg-gray-800 my-auto" />
          <button
            onClick={toggleFullscreen}
            title="Layar Penuh"
            className="p-2 rounded-xl hover:bg-emerald-600/80 transition-colors cursor-pointer"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Floating Instruction Banner */}
        <div className="absolute top-4 left-4 z-20 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-700/60 backdrop-blur-md text-emerald-200 text-xs font-semibold shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>Klik titik bercahaya pada peta untuk melihat detail lokasi</span>
        </div>

        {/* Scrollable / Zoomable Map Container */}
        <div className="w-full overflow-auto max-h-[75vh] flex justify-center items-center p-2 sm:p-4 bg-gray-950">
          <div
            className="relative w-full aspect-[1122/794] max-w-[1200px] transition-transform duration-300 origin-center select-none"
            style={{ transform: `scale(${zoom})` }}
          >
            {/* Base QGIS Map Image */}
            <Image
              src="/images/qgis.jpeg"
              alt="Peta Hasil Pemetaan QGIS Desa Gongseng Megaluh Jombang"
              fill
              className="object-contain rounded-xl"
              priority
              sizes="100vw"
            />

            {/* Interactive Pulsing Hotspots Layer */}
            {filteredHotspots.map((hotspot) => (
              <button
                key={hotspot.id}
                onClick={() => setSelectedHotspot(hotspot)}
                style={{ top: `${hotspot.y}%`, left: `${hotspot.x}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group/pin cursor-pointer focus:outline-none"
                title={`Klik untuk melihat detail ${hotspot.title}`}
              >
                {/* Outer Pulsing Wave */}
                <span className="absolute -inset-2 rounded-full bg-amber-400/40 animate-ping" />
                <span className="absolute -inset-1 rounded-full bg-emerald-500/60 animate-pulse" />

                {/* Inner Pin Button */}
                <div className="relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-emerald-700 to-emerald-500 text-white shadow-lg border-2 border-white group-hover/pin:scale-125 transition-transform duration-300">
                  <MapPin className="w-4 h-4 text-amber-300 drop-shadow-md" />
                </div>

                {/* Tooltip Hover Label */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/pin:flex flex-col items-center z-30 pointer-events-none w-max">
                  <span className="px-3 py-1.5 rounded-xl bg-gray-900/95 text-white text-xs font-bold shadow-xl border border-gray-700 whitespace-nowrap">
                    {hotspot.title}
                  </span>
                  <div className="w-2 h-2 bg-gray-900 rotate-45 -mt-1 border-r border-b border-gray-700" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer Info inside Map Container */}
        <div className="p-4 bg-gray-900/90 border-t border-gray-800 text-xs text-gray-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Peta Pemetaan Geografis Digital Desa Gongseng — Hasil Karya KKN-T IPB University 2026</span>
          </div>
          <a
            href="/images/qgis.jpeg"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 font-bold hover:underline flex items-center gap-1 shrink-0"
          >
            <span>Unduh File HD</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Modal Popup Detail Lokasi */}
      {selectedHotspot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div
            className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-200 animate-scaleUp relative flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Image */}
            <div className="relative w-full aspect-16/10 bg-gray-900">
              <Image
                src={selectedHotspot.photo}
                alt={selectedHotspot.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 500px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedHotspot(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors cursor-pointer border border-white/20"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="absolute top-4 left-4 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-amber-400 text-gray-950 shadow-md">
                {selectedHotspot.categoryLabel}
              </span>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-xl font-extrabold text-white leading-tight drop-shadow-md">
                  {selectedHotspot.title}
                </h3>
              </div>
            </div>

            {/* Modal Body Content */}
            <div className="p-6 space-y-4">
              <p className="text-sm text-gray-700 leading-relaxed">
                {selectedHotspot.description}
              </p>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
                <div className="text-xs text-gray-500 flex items-center gap-1.5 font-medium">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Desa Gongseng, Megaluh, Jombang</span>
                </div>

                {selectedHotspot.googleMapsUrl && (
                  <a
                    href={selectedHotspot.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-600 transition-colors shadow-md shrink-0"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Petunjuk Arah</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
