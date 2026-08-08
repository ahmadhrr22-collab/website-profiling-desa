'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  Download,
  FileText,
  Info,
  Compass,
} from 'lucide-react'

export function InteractiveMapViewer() {
  const [zoom, setZoom] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.35, 3))
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.35, 1))
  const handleResetZoom = () => setZoom(1)

  const toggleFullscreen = () => {
    if (!containerRef.current) return
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {})
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {})
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Action Bar: Download PNG */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 shadow-sm text-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 leading-tight">
              Peta Wilayah Desa Gongseng
            </h4>
            <p className="text-xs text-gray-600">
              Hasil pemetaan spasial Desa Gongseng.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href="/images/qgis-hd.png"
            download="Peta-Desa-Gongseng.png"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-600 transition-colors shadow-md cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Unduh Peta (PNG)</span>
          </a>
        </div>
      </div>

      {/* Clean Map Viewer Box */}
      <div
        ref={containerRef}
        className="relative w-full rounded-3xl overflow-hidden border border-gray-200 shadow-xl bg-gray-950 group"
      >
        {/* Floating Controls Bar */}
        <div className="absolute top-4 right-4 z-30 flex items-center gap-1.5 bg-gray-950/85 p-1.5 rounded-2xl border border-gray-800 backdrop-blur-md shadow-lg text-white">
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

        {/* Scrollable / Zoomable Clean Map Container */}
        <div className="w-full overflow-auto max-h-[85vh] min-h-[500px] flex justify-center items-center p-2 sm:p-4 bg-gray-950">
          <div
            className="relative w-full aspect-[3368/2380] max-w-[1400px] transition-transform duration-300 origin-center select-none"
            style={{ transform: `scale(${zoom})` }}
          >
            {/* Base QGIS Map Image */}
            <Image
              src="/images/qgis-hd.png"
              alt="Peta Pemetaan Desa Gongseng"
              fill
              className="object-contain rounded-xl"
              priority
              sizes="100vw"
            />
          </div>
        </div>

        {/* Footer Info inside Map Container */}
        <div className="p-4 bg-gray-900/95 border-t border-gray-800 text-xs text-gray-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Peta Pemetaan Desa Gongseng</span>
          </div>
          <span className="text-gray-500 font-medium">Gunakan tombol perbesar (+) untuk melihat detail peta.</span>
        </div>
      </div>
    </div>
  )
}
