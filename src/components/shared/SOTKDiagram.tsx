'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { PerangkatDesa } from '@/payload-types'
import { ImageIcon, Layers } from 'lucide-react'

interface SOTKDiagramProps {
  devices: PerangkatDesa[] | any[]
}

export function SOTKDiagram({ devices }: SOTKDiagramProps) {
  const [viewMode, setViewMode] = useState<'diagram' | 'photo'>('diagram')

  // Helper pencari staf berdasarkan substring nama/jabatan
  const getStaff = (query: string, defaultName: string, defaultTitle: string) => {
    const found = devices.find(d => 
      d.jabatan.toLowerCase().includes(query.toLowerCase()) || 
      d.nama.toLowerCase().includes(query.toLowerCase())
    )
    return {
      nama: found?.nama || defaultName,
      jabatan: found?.jabatan || defaultTitle,
      kontak: found?.kontak || null,
      foto: found?.foto && typeof found.foto === 'object' && 'url' in found.foto ? found.foto.url : null,
    }
  }

  const kades = getStaff('Kepala Desa', 'AHMAD SUPRIYADI', 'KEPALA DESA')
  const bpd = getStaff('BPD', 'NUR CHABIB', 'BADAN PERMUSYAWARATAN DESA ( BPD )')
  const sekdes = getStaff('Sekretaris', 'SURYADI', 'SEKRETARIS DESA')

  // Kasi (Pelaksana Teknis)
  const kasiPem = getStaff('Pemerintahan', 'FOFON W.DS.', 'KEPALA SEKSI PEMERINTAHAN')
  const kasiKesra = getStaff('Kesejahteraan', 'TAUFIK .L.', 'KEPALA SEKSI KESEJAHTERAAN')
  const kasiPelayanan = getStaff('Pelayanan', 'ILHAM P.', 'KEPALA SEKSI PELAYANAN')

  // Kaur (Sekretariat)
  const kaurUmum = getStaff('Tata Usaha', 'SUWANAH', 'KEPALA URUSAN TATA USAHA DAN UMUM')
  const kaurKeuangan = getStaff('Keuangan', 'MAYA PURNAMA S.', 'KEPALA URUSAN KEUANGAN')
  const kaurPerencanaan = getStaff('Perencanaan', 'TSANI ABIL HASAN A.S.', 'KEPALA URUSAN PERENCANAAN')

  // Kasun (Kewilayahan - 4 Dusun)
  const kasun1 = getStaff('Gongseng 1', 'CANDRA.W', 'KEPALA DUSUN GONGSENG 1')
  const kasun2 = getStaff('Gongseng 2', 'SRI SUGIANTI', 'KEPALA DUSUN GONGSENG 2')
  const kasun3 = getStaff('Krandekan', 'SYAMSUDIN Z.', 'KEPALA DUSUN KRANDEKAN')
  const kasun4 = getStaff('Garurejo', 'ANAS MAULANA', 'KEPALA DUSUN GARUREJO')

  return (
    <div className="bg-white rounded-3xl border border-gray-300 shadow-xl overflow-hidden">
      {/* Switcher Header Mode Diagram vs Foto Papan Asli */}
      <div className="p-4 sm:p-6 bg-gradient-to-r from-gray-950 via-emerald-950 to-gray-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-800">
        <div>
          <span className="text-[10px] font-extrabold tracking-widest text-emerald-400 uppercase block mb-0.5">
            Pemerintah Desa Gongseng
          </span>
          <h3 className="text-lg sm:text-xl font-black tracking-tight">
            Papan Susunan Organisasi & Tata Kerja (SOTK)
          </h3>
        </div>

        <div className="flex items-center gap-2 p-1 bg-gray-800/80 rounded-xl border border-gray-700/60">
          <button
            onClick={() => setViewMode('diagram')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'diagram'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Bagan Digital (1:1 Vektor)</span>
          </button>
          <button
            onClick={() => setViewMode('photo')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'photo'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Foto Papan Asli</span>
          </button>
        </div>
      </div>

      {/* Mode 1: Foto Papan Asli */}
      {viewMode === 'photo' ? (
        <div className="p-6 sm:p-8 flex flex-col items-center justify-center bg-gray-950/95 text-center space-y-4">
          <div className="relative w-full max-w-4xl aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-400 bg-gray-900">
            <Image
              src="/images/sotk-papan-gongseng.jpeg"
              alt="Papan SOTK Resmi Pemdes Gongseng Kantor Desa"
              fill
              className="object-contain"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
          </div>
          <p className="text-xs text-gray-400 italic">
            Dokumentasi fisik Papan Susunan Organisasi Tata Kerja Pemerintah Desa Gongseng, Kec. Megaluh, Kab. Jombang.
          </p>
        </div>
      ) : (
        /* Mode 2: Bagan Flowchart Vektor SOTK Presisi 1:1 Dengan Garis SVG Nyatu Perfect Tanpa Celah */
        <div className="p-4 sm:p-8 bg-amber-50/15 overflow-x-auto">
          <div className="relative w-[1000px] h-[660px] mx-auto bg-white border-4 border-amber-500/90 rounded-2xl shadow-xl p-5 select-none font-sans">
            
            {/* SVG OVERLAY CANVAS UNTUK GARIS-GARIS SEAMLESS TANPA PAHA / CELAH */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none z-10" 
              viewBox="0 0 1000 660" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* 1. Garis Horisontal Koordinasi BPD ke Kades (Dashed) */}
              <line x1="280" y1="102" x2="850" y2="102" stroke="#111827" strokeWidth="2" strokeDasharray="6 4" />

              {/* 2. Garis Vertikal dari Kades Turun ke T-Bar 1 */}
              <line x1="850" y1="135" x2="850" y2="165" stroke="#111827" strokeWidth="2.5" />

              {/* 3. T-Bar Horisontal Utama (Dari Kasi Center 237.5 s/d Kades 850) */}
              <line x1="237.5" y1="165" x2="850" y2="165" stroke="#111827" strokeWidth="2.5" />

              {/* 4. Drop Line ke Kasi Group T-Bar */}
              <line x1="237.5" y1="165" x2="237.5" y2="185" stroke="#111827" strokeWidth="2.5" />
              {/* Kasi T-Bar Horisontal (Dari Kasi 1 87.5 s/d Kasi 3 387.5) */}
              <line x1="87.5" y1="185" x2="387.5" y2="185" stroke="#111827" strokeWidth="2.5" />
              {/* Drop Lines ke Kasi 1, 2, 3 */}
              <line x1="87.5" y1="185" x2="87.5" y2="210" stroke="#111827" strokeWidth="2.5" />
              <line x1="237.5" y1="185" x2="237.5" y2="210" stroke="#111827" strokeWidth="2.5" />
              <line x1="387.5" y1="185" x2="387.5" y2="210" stroke="#111827" strokeWidth="2.5" />

              {/* 5. Drop Line ke Sekdes Top Center (X = 740) */}
              <line x1="740" y1="165" x2="740" y2="210" stroke="#111827" strokeWidth="2.5" />

              {/* 6. Line dari Sekdes Bottom (Y = 275) ke Kaur T-Bar (Y = 305) */}
              <line x1="740" y1="275" x2="740" y2="305" stroke="#111827" strokeWidth="2.5" />
              {/* Kaur T-Bar Horisontal (Dari Kaur 1 580 s/d Kaur 3 890) */}
              <line x1="580" y1="305" x2="890" y2="305" stroke="#111827" strokeWidth="2.5" />
              {/* Drop Lines ke Kaur 1, 2, 3 */}
              <line x1="580" y1="305" x2="580" y2="330" stroke="#111827" strokeWidth="2.5" />
              <line x1="735" y1="305" x2="735" y2="330" stroke="#111827" strokeWidth="2.5" />
              <line x1="890" y1="305" x2="890" y2="330" stroke="#111827" strokeWidth="2.5" />

              {/* 7. Trunk Vertikal Utama ke Kasun (X = 480, dari Y = 165 s/d Y = 455) */}
              <line x1="480" y1="165" x2="480" y2="455" stroke="#111827" strokeWidth="2.5" />
              {/* Kasun T-Bar Horisontal (Dari Kasun 1 132.5 s/d Kasun 4 867.5) */}
              <line x1="132.5" y1="455" x2="867.5" y2="455" stroke="#111827" strokeWidth="2.5" />
              {/* Drop Lines ke Kasun 1, 2, 3, 4 */}
              <line x1="132.5" y1="455" x2="132.5" y2="480" stroke="#111827" strokeWidth="2.5" />
              <line x1="377.5" y1="455" x2="377.5" y2="480" stroke="#111827" strokeWidth="2.5" />
              <line x1="622.5" y1="455" x2="622.5" y2="480" stroke="#111827" strokeWidth="2.5" />
              <line x1="867.5" y1="455" x2="867.5" y2="480" stroke="#111827" strokeWidth="2.5" />
            </svg>

            {/* HEADER BANNER SOTK */}
            <div className="absolute left-[20px] top-[18px] right-[20px] h-[42px] bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 border-2 border-black rounded shadow-xs flex flex-col items-center justify-center">
              <h2 className="text-sm font-black text-black uppercase tracking-tight leading-tight">
                SUSUNAN ORGANISASI TATA KERJA PEMERINTAH DESA GONGSENG
              </h2>
              <p className="text-[10px] font-black text-black uppercase tracking-wider">
                KECAMATAN MEGALUH - KABUPATEN JOMBANG
              </p>
            </div>

            {/* ROW 1: BPD & KEPALA DESA */}
            {/* BPD (Left 20px, Top 70px, Width 260px, Height 65px) */}
            <div className="absolute left-[20px] top-[70px] w-[260px] h-[65px] border-2 border-black bg-white rounded overflow-hidden shadow-xs z-20 flex flex-col justify-between">
              <div className="bg-yellow-300 text-black text-[9px] font-black uppercase text-center py-1 border-b border-black">
                BADAN PERMUSYAWARATAN DESA ( BPD )
              </div>
              <div className="py-2 text-center text-xs font-black text-black uppercase flex-grow flex items-center justify-center">
                {bpd.nama}
              </div>
            </div>

            {/* KEPALA DESA (Left 720px, Top 70px, Width 260px, Height 65px) */}
            <div className="absolute left-[720px] top-[70px] w-[260px] h-[65px] border-2 border-black bg-white rounded overflow-hidden shadow-md z-20 flex flex-col justify-between">
              <div className="bg-yellow-300 text-black text-[10px] font-black uppercase text-center py-1 border-b border-black">
                KEPALA DESA
              </div>
              <div className="py-2 text-center text-sm font-black text-black uppercase flex-grow flex items-center justify-center">
                {kades.nama}
              </div>
            </div>

            {/* ROW 2: KASI & SEKDES */}
            {/* Kasi 1 (Pemerintahan) */}
            <div className="absolute left-[20px] top-[210px] w-[135px] h-[70px] border-2 border-black bg-white rounded overflow-hidden shadow-xs z-20 flex flex-col justify-between">
              <div className="bg-emerald-600 text-white text-[8px] font-black uppercase text-center py-1 border-b border-black leading-tight">
                KEPALA SEKSI PEMERINTAHAN
              </div>
              <div className="py-1.5 text-center text-xs font-black text-black uppercase flex-grow flex items-center justify-center">
                {kasiPem.nama}
              </div>
            </div>

            {/* Kasi 2 (Kesejahteraan) */}
            <div className="absolute left-[170px] top-[210px] w-[135px] h-[70px] border-2 border-black bg-white rounded overflow-hidden shadow-xs z-20 flex flex-col justify-between">
              <div className="bg-emerald-600 text-white text-[8px] font-black uppercase text-center py-1 border-b border-black leading-tight">
                KEPALA SEKSI KESEJAHTERAAN
              </div>
              <div className="py-1.5 text-center text-xs font-black text-black uppercase flex-grow flex items-center justify-center">
                {kasiKesra.nama}
              </div>
            </div>

            {/* Kasi 3 (Pelayanan) */}
            <div className="absolute left-[320px] top-[210px] w-[135px] h-[70px] border-2 border-black bg-white rounded overflow-hidden shadow-xs z-20 flex flex-col justify-between">
              <div className="bg-emerald-600 text-white text-[8px] font-black uppercase text-center py-1 border-b border-black leading-tight">
                KEPALA SEKSI PELAYANAN
              </div>
              <div className="py-1.5 text-center text-xs font-black text-black uppercase flex-grow flex items-center justify-center">
                {kasiPelayanan.nama}
              </div>
            </div>

            {/* SEKRETARIS DESA (Left 620px, Top 210px, Width 240px, Height 65px) */}
            <div className="absolute left-[620px] top-[210px] w-[240px] h-[65px] border-2 border-black bg-white rounded overflow-hidden shadow-xs z-20 flex flex-col justify-between">
              <div className="bg-amber-600 text-white text-[9.5px] font-black uppercase text-center py-1 border-b border-black">
                SEKRETARIS DESA
              </div>
              <div className="py-1.5 text-center text-xs font-black text-black uppercase flex-grow flex items-center justify-center">
                {sekdes.nama}
              </div>
            </div>

            {/* ROW 3: KAUR (UNDER SEKDES) */}
            {/* Kaur 1 (TU & Umum) */}
            <div className="absolute left-[510px] top-[330px] w-[140px] h-[75px] border-2 border-black bg-white rounded overflow-hidden shadow-xs z-20 flex flex-col justify-between">
              <div className="bg-emerald-600 text-white text-[7.5px] font-black uppercase text-center py-1 border-b border-black leading-tight">
                KEPALA URUSAN TATA USAHA DAN UMUM
              </div>
              <div className="py-1.5 text-center text-[11px] font-black text-black uppercase flex-grow flex items-center justify-center">
                {kaurUmum.nama}
              </div>
            </div>

            {/* Kaur 2 (Keuangan) */}
            <div className="absolute left-[665px] top-[330px] w-[140px] h-[75px] border-2 border-black bg-white rounded overflow-hidden shadow-xs z-20 flex flex-col justify-between">
              <div className="bg-emerald-600 text-white text-[7.5px] font-black uppercase text-center py-1 border-b border-black leading-tight">
                KEPALA URUSAN KEUANGAN
              </div>
              <div className="py-1.5 text-center text-[11px] font-black text-black uppercase flex-grow flex items-center justify-center">
                {kaurKeuangan.nama}
              </div>
            </div>

            {/* Kaur 3 (Perencanaan) */}
            <div className="absolute left-[820px] top-[330px] w-[140px] h-[75px] border-2 border-black bg-white rounded overflow-hidden shadow-xs z-20 flex flex-col justify-between">
              <div className="bg-emerald-600 text-white text-[7.5px] font-black uppercase text-center py-1 border-b border-black leading-tight">
                KEPALA URUSAN PERENCANAAN
              </div>
              <div className="py-1.5 text-center text-[11px] font-black text-black uppercase flex-grow flex items-center justify-center">
                {kaurPerencanaan.nama}
              </div>
            </div>

            {/* ROW 4: 4 KEPALA DUSUN */}
            {/* Kasun 1 */}
            <div className="absolute left-[20px] top-[480px] w-[225px] h-[65px] border-2 border-black bg-white rounded overflow-hidden shadow-xs z-20 flex flex-col justify-between">
              <div className="bg-emerald-600 text-white text-[8.5px] font-black uppercase text-center py-1 border-b border-black">
                {kasun1.jabatan}
              </div>
              <div className="py-1.5 text-center text-xs font-black text-black uppercase flex-grow flex items-center justify-center">
                {kasun1.nama}
              </div>
            </div>

            {/* Kasun 2 */}
            <div className="absolute left-[265px] top-[480px] w-[225px] h-[65px] border-2 border-black bg-white rounded overflow-hidden shadow-xs z-20 flex flex-col justify-between">
              <div className="bg-emerald-600 text-white text-[8.5px] font-black uppercase text-center py-1 border-b border-black">
                {kasun2.jabatan}
              </div>
              <div className="py-1.5 text-center text-xs font-black text-black uppercase flex-grow flex items-center justify-center">
                {kasun2.nama}
              </div>
            </div>

            {/* Kasun 3 */}
            <div className="absolute left-[510px] top-[480px] w-[225px] h-[65px] border-2 border-black bg-white rounded overflow-hidden shadow-xs z-20 flex flex-col justify-between">
              <div className="bg-emerald-600 text-white text-[8.5px] font-black uppercase text-center py-1 border-b border-black">
                {kasun3.jabatan}
              </div>
              <div className="py-1.5 text-center text-xs font-black text-black uppercase flex-grow flex items-center justify-center">
                {kasun3.nama}
              </div>
            </div>

            {/* Kasun 4 */}
            <div className="absolute left-[755px] top-[480px] w-[225px] h-[65px] border-2 border-black bg-white rounded overflow-hidden shadow-xs z-20 flex flex-col justify-between">
              <div className="bg-emerald-600 text-white text-[8.5px] font-black uppercase text-center py-1 border-b border-black">
                {kasun4.jabatan}
              </div>
              <div className="py-1.5 text-center text-xs font-black text-black uppercase flex-grow flex items-center justify-center">
                {kasun4.nama}
              </div>
            </div>

            {/* CAP PENGESAHAN KADES (KANAN BAWAH) */}
            <div className="absolute left-[760px] top-[565px] w-[220px] border-2 border-black bg-white p-2 rounded text-center shadow-xs z-20">
              <div className="text-[9px] font-black uppercase text-black">KEPALA DESA</div>
              <div className="h-5" />
              <div className="text-[11px] font-black text-black uppercase underline tracking-tight">
                {kades.nama}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}

export default SOTKDiagram
