'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { PerangkatDesa } from '@/payload-types'
import { Eye, ImageIcon, Layers, FileText, CheckCircle2, ChevronRight } from 'lucide-react'

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
  const bpd = getStaff('BPD', 'NUR CHABIB', 'BADAN PERMUSYAWARATAN DESA (BPD)')
  const sekdes = getStaff('Sekretaris', 'SURYADI', 'SEKRETARIS DESA')

  // Kasi (Pelaksana Teknis)
  const kasiPem = getStaff('Pemerintahan', 'FOFON W.DS.', 'KEPALA SEKSI PEMERINTAHAN')
  const kasiKesra = getStaff('Kesejahteraan', 'TAUFIK L.', 'KEPALA SEKSI KESEJAHTERAAN')
  const kasiPelayanan = getStaff('Pelayanan', 'ILHAM P.', 'KEPALA SEKSI PELAYANAN')

  // Kaur (Sekretariat)
  const kaurUmum = getStaff('Tata Usaha', 'SUWANAH', 'KEPALA URUSAN TATA USAHA DAN UMUM')
  const kaurKeuangan = getStaff('Keuangan', 'MAYA PURNAMA S.', 'KEPALA URUSAN KEUANGAN')
  const kaurPerencanaan = getStaff('Perencanaan', 'TSANI ABIL HASAN A.S.', 'KEPALA URUSAN PERENCANAAN')

  // Kasun (Kewilayahan - 4 Dusun)
  const kasun1 = getStaff('Gongseng 1', 'CANDRA W.', 'KEPALA DUSUN GONGSENG 1')
  const kasun2 = getStaff('Gongseng 2', 'SRI SUGIANTI', 'KEPALA DUSUN GONGSENG 2')
  const kasun3 = getStaff('Krandekan', 'SYAMSUDIN Z.', 'KEPALA DUSUN KRANDEKAN')
  const kasun4 = getStaff('Garurejo', 'ANAS MAULANA', 'KEPALA DUSUN GARUREJO')

  return (
    <div className="bg-white rounded-3xl border border-gray-200/90 shadow-md overflow-hidden">
      {/* Switcher Header Mode Diagram vs Foto Papan Asli */}
      <div className="p-4 sm:p-6 bg-gradient-to-r from-gray-900 via-emerald-950 to-gray-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-800">
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
            <span>Bagan Digital</span>
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

      {/* Konten Mode 1: Foto Papan Asli Kantor Desa */}
      {viewMode === 'photo' ? (
        <div className="p-6 sm:p-8 flex flex-col items-center justify-center bg-gray-950/90 text-center space-y-4">
          <div className="relative w-full max-w-4xl aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-400/80 bg-gray-900">
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
        /* Konten Mode 2: Bagan Flowchart Digital SOTK Presisi 1:1 */
        <div className="p-4 sm:p-8 bg-amber-50/20 overflow-x-auto">
          <div className="min-w-[840px] max-w-5xl mx-auto space-y-6">

            {/* Banner Header Papan SOTK */}
            <div className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 p-4 rounded-xl border-2 border-amber-500 shadow-xs text-center space-y-1">
              <h2 className="text-lg sm:text-xl font-black text-gray-950 tracking-tight uppercase">
                SUSUNAN ORGANISASI TATA KERJA PEMERINTAH DESA GONGSENG
              </h2>
              <p className="text-xs font-black text-gray-800 uppercase tracking-wider">
                KECAMATAN MEGALUH - KABUPATEN JOMBANG
              </p>
            </div>

            {/* LINE A: BPD (Kiri) <---> KEPALA DESA (Kanan/Pusat) */}
            <div className="grid grid-cols-12 gap-4 items-center relative pt-2">
              {/* BPD (Columns 1-4) */}
              <div className="col-span-5 bg-white border-2 border-gray-900 rounded-xl p-3.5 text-center shadow-sm relative">
                <div className="bg-gray-200 text-gray-900 text-[10px] font-extrabold uppercase py-1 px-2 rounded mb-1.5 border border-gray-400">
                  BADAN PERMUSYAWARATAN DESA (BPD)
                </div>
                <div className="text-base font-black text-gray-950 uppercase">{bpd.nama}</div>
              </div>

              {/* Garis Horizontal Koordinasi antara BPD & Kades */}
              <div className="col-span-2 flex items-center justify-center relative">
                <div className="w-full border-t-2 border-dashed border-gray-900" />
              </div>

              {/* KEPALA DESA (Columns 8-12) */}
              <div className="col-span-5 bg-white border-2 border-gray-900 rounded-xl p-3.5 text-center shadow-md relative">
                <div className="bg-amber-400 text-gray-950 text-[10px] font-extrabold uppercase py-1 px-2 rounded mb-1.5 border border-amber-500">
                  KEPALA DESA
                </div>
                <div className="text-base sm:text-lg font-black text-gray-950 uppercase">{kades.nama}</div>
              </div>
            </div>

            {/* Garis Utama dari Kades turun kebawah */}
            <div className="flex justify-end pr-28 relative">
              <div className="w-0.5 h-8 bg-gray-900" />
            </div>

            {/* Cabang Kasi (Kiri) & Sekdes/Kaur (Kanan) */}
            <div className="grid grid-cols-12 gap-6 relative">
              {/* KOLOM KIRI: KASI (3 Kotak Hijau Bertingkat/Horizontal) */}
              <div className="col-span-6 bg-emerald-50/60 border-2 border-emerald-300/80 rounded-2xl p-4 space-y-3 relative">
                <div className="text-center text-xs font-black text-emerald-900 uppercase tracking-wider pb-2 border-b border-emerald-200">
                  Pelaksana Teknis (Seksi)
                </div>
                <div className="space-y-3">
                  {/* Kasi Pem */}
                  <div className="bg-white border-2 border-emerald-700 rounded-xl p-3 text-center shadow-xs">
                    <div className="bg-emerald-700 text-white text-[9px] font-extrabold uppercase py-0.5 px-2 rounded mb-1">
                      {kasiPem.jabatan}
                    </div>
                    <div className="text-sm font-black text-gray-950 uppercase">{kasiPem.nama}</div>
                  </div>
                  {/* Kasi Kesra */}
                  <div className="bg-white border-2 border-emerald-700 rounded-xl p-3 text-center shadow-xs">
                    <div className="bg-emerald-700 text-white text-[9px] font-extrabold uppercase py-0.5 px-2 rounded mb-1">
                      {kasiKesra.jabatan}
                    </div>
                    <div className="text-sm font-black text-gray-950 uppercase">{kasiKesra.nama}</div>
                  </div>
                  {/* Kasi Pelayanan */}
                  <div className="bg-white border-2 border-emerald-700 rounded-xl p-3 text-center shadow-xs">
                    <div className="bg-emerald-700 text-white text-[9px] font-extrabold uppercase py-0.5 px-2 rounded mb-1">
                      {kasiPelayanan.jabatan}
                    </div>
                    <div className="text-sm font-black text-gray-950 uppercase">{kasiPelayanan.nama}</div>
                  </div>
                </div>
              </div>

              {/* KOLOM KANAN: SEKRETARIS DESA + KAUR (3 Kotak Biru) */}
              <div className="col-span-6 bg-blue-50/60 border-2 border-blue-300/80 rounded-2xl p-4 space-y-4 relative">
                <div className="text-center text-xs font-black text-blue-900 uppercase tracking-wider pb-2 border-b border-blue-200">
                  Sekretariat Desa
                </div>

                {/* Box Sekretaris Desa */}
                <div className="bg-white border-2 border-amber-600 rounded-xl p-3 text-center shadow-xs mx-auto max-w-xs">
                  <div className="bg-amber-600 text-white text-[10px] font-extrabold uppercase py-1 px-2 rounded mb-1">
                    SEKRETARIS DESA
                  </div>
                  <div className="text-base font-black text-gray-950 uppercase">{sekdes.nama}</div>
                </div>

                {/* Sub-Kaur Under Sekdes */}
                <div className="space-y-3 pt-2">
                  {/* Kaur TU & Umum */}
                  <div className="bg-white border-2 border-blue-700 rounded-xl p-3 text-center shadow-xs">
                    <div className="bg-blue-700 text-white text-[9px] font-extrabold uppercase py-0.5 px-2 rounded mb-1">
                      {kaurUmum.jabatan}
                    </div>
                    <div className="text-sm font-black text-gray-950 uppercase">{kaurUmum.nama}</div>
                  </div>
                  {/* Kaur Keuangan */}
                  <div className="bg-white border-2 border-blue-700 rounded-xl p-3 text-center shadow-xs">
                    <div className="bg-blue-700 text-white text-[9px] font-extrabold uppercase py-0.5 px-2 rounded mb-1">
                      {kaurKeuangan.jabatan}
                    </div>
                    <div className="text-sm font-black text-gray-950 uppercase">{kaurKeuangan.nama}</div>
                  </div>
                  {/* Kaur Perencanaan */}
                  <div className="bg-white border-2 border-blue-700 rounded-xl p-3 text-center shadow-xs">
                    <div className="bg-blue-700 text-white text-[9px] font-extrabold uppercase py-0.5 px-2 rounded mb-1">
                      {kaurPerencanaan.jabatan}
                    </div>
                    <div className="text-sm font-black text-gray-950 uppercase">{kaurPerencanaan.nama}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Garis Vertikal Turun ke Kepala Dusun */}
            <div className="flex justify-center my-2">
              <div className="w-0.5 h-8 bg-gray-900" />
            </div>

            {/* KEPALA DUSUN (BARIS BAWAH - 4 DUSUN LENGKAP) */}
            <div className="bg-emerald-100/70 border-2 border-emerald-400 p-5 rounded-2xl space-y-3">
              <div className="text-center text-xs font-black text-emerald-950 uppercase tracking-widest pb-2 border-b border-emerald-300">
                Unsur Pelaksana Kewilayahan (Kepala Dusun / Kasun)
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {/* Dusun 1 */}
                <div className="bg-white border-2 border-emerald-800 rounded-xl p-3 text-center shadow-xs">
                  <div className="bg-emerald-800 text-white text-[9px] font-extrabold uppercase py-0.5 px-1.5 rounded mb-1">
                    {kasun1.jabatan}
                  </div>
                  <div className="text-xs sm:text-sm font-black text-gray-950 uppercase">{kasun1.nama}</div>
                </div>
                {/* Dusun 2 */}
                <div className="bg-white border-2 border-emerald-800 rounded-xl p-3 text-center shadow-xs">
                  <div className="bg-emerald-800 text-white text-[9px] font-extrabold uppercase py-0.5 px-1.5 rounded mb-1">
                    {kasun2.jabatan}
                  </div>
                  <div className="text-xs sm:text-sm font-black text-gray-950 uppercase">{kasun2.nama}</div>
                </div>
                {/* Dusun 3 */}
                <div className="bg-white border-2 border-emerald-800 rounded-xl p-3 text-center shadow-xs">
                  <div className="bg-emerald-800 text-white text-[9px] font-extrabold uppercase py-0.5 px-1.5 rounded mb-1">
                    {kasun3.jabatan}
                  </div>
                  <div className="text-xs sm:text-sm font-black text-gray-950 uppercase">{kasun3.nama}</div>
                </div>
                {/* Dusun 4 */}
                <div className="bg-white border-2 border-emerald-800 rounded-xl p-3 text-center shadow-xs">
                  <div className="bg-emerald-800 text-white text-[9px] font-extrabold uppercase py-0.5 px-1.5 rounded mb-1">
                    {kasun4.jabatan}
                  </div>
                  <div className="text-xs sm:text-sm font-black text-gray-950 uppercase">{kasun4.nama}</div>
                </div>
              </div>
            </div>

            {/* Cap Pengesahan Kades (Kanan Bawah) */}
            <div className="flex justify-end pt-4">
              <div className="bg-white border-2 border-gray-900 p-3 rounded-xl text-center w-52 shadow-xs">
                <div className="text-[10px] font-extrabold uppercase text-gray-700">KEPALA DESA GONGSENG</div>
                <div className="h-6" />
                <div className="text-xs font-black text-gray-950 uppercase underline tracking-tight">
                  {kades.nama}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}

export default SOTKDiagram
