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
  const bpd = getStaff('BPD', 'NUR CHABIB', 'BADAN PERMUSYAWARATAN DESA (BPD)')
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
    <div className="bg-white rounded-3xl border border-gray-300 shadow-lg overflow-hidden">
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
            <span>Bagan Digital (1:1)</span>
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
        /* Mode 2: Bagan Flowchart Digital SOTK Presisi 1:1 Dengan Garis Menyatu Perfect */
        <div className="p-4 sm:p-8 bg-amber-50/20 overflow-x-auto">
          <div className="min-w-[960px] max-w-5xl mx-auto p-6 bg-white border-4 border-amber-600/90 rounded-2xl shadow-xl space-y-0 text-gray-950 font-sans relative">
            
            {/* 1. BANNER HEADER BOARD (Kuning Emas SOTK) */}
            <div className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 border-2 border-black p-3 rounded-lg text-center shadow-xs mb-8">
              <h2 className="text-xl font-black text-black uppercase tracking-tight leading-tight">
                SUSUNAN ORGANISASI TATA KERJA PEMERINTAH DESA GONGSENG
              </h2>
              <p className="text-sm font-black text-black uppercase tracking-wider">
                KECAMATAN MEGALUH - KABUPATEN JOMBANG
              </p>
            </div>

            {/* 2. TINGKAT ATAS: BPD & KEPALA DESA */}
            <div className="grid grid-cols-12 gap-0 items-center relative">
              {/* BPD (Kiri - Col 1-4) */}
              <div className="col-span-4 pr-0">
                <div className="border-2 border-black bg-white rounded shadow-xs overflow-hidden max-w-[240px]">
                  <div className="bg-yellow-300 text-black text-[10px] font-black uppercase text-center py-1 border-b border-black px-1">
                    BADAN PERMUSYAWARATAN DESA ( BPD )
                  </div>
                  <div className="p-2 text-center text-sm font-black text-black uppercase">
                    {bpd.nama}
                  </div>
                </div>
              </div>

              {/* Garis Horizontal Koordinasi BPD <---> Kades */}
              <div className="col-span-4 flex items-center relative">
                <div className="w-full border-t-2 border-black" />
              </div>

              {/* KEPALA DESA (Kanan - Col 5-12) */}
              <div className="col-span-4 pl-0 flex justify-end">
                <div className="border-2 border-black bg-white rounded shadow-md overflow-hidden w-[240px] id-kades">
                  <div className="bg-yellow-300 text-black text-[11px] font-black uppercase text-center py-1 border-b border-black">
                    KEPALA DESA
                  </div>
                  <div className="p-2.5 text-center text-base font-black text-black uppercase">
                    {kades.nama}
                  </div>
                </div>
              </div>
            </div>

            {/* 3. GARIS VERTIKAL DARIPADA KEPALA DESA TURUN */}
            <div className="relative h-10">
              {/* Garis lurus persis di bawah tengah kotak Kades (Kanan / ~83% width) */}
              <div className="absolute right-[120px] top-0 bottom-0 w-0.5 bg-black" />
            </div>

            {/* 4. GARIS T-BAR HORIZONTAL UTAMA MEMBAGI KE KASI (KIRI) DAN SEKDES (KANAN) */}
            <div className="relative h-6">
              {/* Garis Horizontal dari pusat Kasi (Kiri 25%) sampai Sekdes (Kanan 83%) */}
              <div className="absolute left-[25%] right-[120px] top-0 h-0.5 bg-black" />
              
              {/* Turun ke Kasi (Kiri 25%) */}
              <div className="absolute left-[25%] top-0 bottom-0 w-0.5 bg-black" />
              
              {/* Turun ke Sekdes (Kanan 83%) */}
              <div className="absolute right-[120px] top-0 bottom-0 w-0.5 bg-black" />

              {/* Turun ke Jalur Utama Kasun (Tengah 50%) */}
              <div className="absolute left-[50%] top-0 bottom-0 w-0.5 bg-black" />
            </div>

            {/* 5. TINGKAT TENGAH: KASI (KIRI) & SEKRETARIS DESA / KAUR (KANAN) */}
            <div className="grid grid-cols-12 gap-8 items-start relative pt-0">
              
              {/* SIDE KIRI: KASI (3 Seksi Bersampingan) */}
              <div className="col-span-6 relative pt-0">
                {/* Garis Horizontal Menyambung 3 Box Kasi */}
                <div className="relative h-6">
                  <div className="absolute left-[16.6%] right-[16.6%] top-0 h-0.5 bg-black" />
                  {/* Drop Line Kasi 1 */}
                  <div className="absolute left-[16.6%] top-0 bottom-0 w-0.5 bg-black" />
                  {/* Drop Line Kasi 2 */}
                  <div className="absolute left-[50%] top-0 bottom-0 w-0.5 bg-black" />
                  {/* Drop Line Kasi 3 */}
                  <div className="absolute right-[16.6%] top-0 bottom-0 w-0.5 bg-black" />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {/* Kasi Pem */}
                  <div className="border-2 border-black bg-white rounded overflow-hidden shadow-xs">
                    <div className="bg-emerald-600 text-white text-[9px] font-black uppercase text-center py-1 border-b border-black px-0.5">
                      KEPALA SEKSI PEMERINTAHAN
                    </div>
                    <div className="p-2 text-center text-xs font-black text-black uppercase">
                      {kasiPem.nama}
                    </div>
                  </div>

                  {/* Kasi Kesra */}
                  <div className="border-2 border-black bg-white rounded overflow-hidden shadow-xs">
                    <div className="bg-emerald-600 text-white text-[9px] font-black uppercase text-center py-1 border-b border-black px-0.5">
                      KEPALA SEKSI KESEJAHTERAAN
                    </div>
                    <div className="p-2 text-center text-xs font-black text-black uppercase">
                      {kasiKesra.nama}
                    </div>
                  </div>

                  {/* Kasi Pelayanan */}
                  <div className="border-2 border-black bg-white rounded overflow-hidden shadow-xs">
                    <div className="bg-emerald-600 text-white text-[9px] font-black uppercase text-center py-1 border-b border-black px-0.5">
                      KEPALA SEKSI PELAYANAN
                    </div>
                    <div className="p-2 text-center text-xs font-black text-black uppercase">
                      {kasiPelayanan.nama}
                    </div>
                  </div>
                </div>
              </div>

              {/* SIDE KANAN: SEKRETARIS DESA & KAUR */}
              <div className="col-span-6 flex flex-col items-center relative pt-0">
                {/* Box Sekretaris Desa */}
                <div className="border-2 border-black bg-white rounded shadow-xs overflow-hidden w-[220px]">
                  <div className="bg-amber-600 text-white text-[10px] font-black uppercase text-center py-1 border-b border-black">
                    SEKRETARIS DESA
                  </div>
                  <div className="p-2 text-center text-sm font-black text-black uppercase">
                    {sekdes.nama}
                  </div>
                </div>

                {/* Garis Vertikal turun dari Sekdes ke T-Bar Kaur */}
                <div className="w-0.5 h-6 bg-black" />

                {/* Garis Horizontal Menyambung 3 Box Kaur */}
                <div className="w-full relative h-6">
                  <div className="absolute left-[16.6%] right-[16.6%] top-0 h-0.5 bg-black" />
                  {/* Drop Line Kaur 1 */}
                  <div className="absolute left-[16.6%] top-0 bottom-0 w-0.5 bg-black" />
                  {/* Drop Line Kaur 2 */}
                  <div className="absolute left-[50%] top-0 bottom-0 w-0.5 bg-black" />
                  {/* Drop Line Kaur 3 */}
                  <div className="absolute right-[16.6%] top-0 bottom-0 w-0.5 bg-black" />
                </div>

                {/* 3 Box Kaur (TU, Keuangan, Perencanaan) */}
                <div className="grid grid-cols-3 gap-2 w-full">
                  {/* Kaur TU */}
                  <div className="border-2 border-black bg-white rounded overflow-hidden shadow-xs">
                    <div className="bg-emerald-600 text-white text-[8px] sm:text-[9px] font-black uppercase text-center py-1 border-b border-black px-0.5">
                      KEPALA URUSAN TATA USAHA DAN UMUM
                    </div>
                    <div className="p-1.5 text-center text-xs font-black text-black uppercase">
                      {kaurUmum.nama}
                    </div>
                  </div>

                  {/* Kaur Keuangan */}
                  <div className="border-2 border-black bg-white rounded overflow-hidden shadow-xs">
                    <div className="bg-emerald-600 text-white text-[8px] sm:text-[9px] font-black uppercase text-center py-1 border-b border-black px-0.5">
                      KEPALA URUSAN KEUANGAN
                    </div>
                    <div className="p-1.5 text-center text-xs font-black text-black uppercase">
                      {kaurKeuangan.nama}
                    </div>
                  </div>

                  {/* Kaur Perencanaan */}
                  <div className="border-2 border-black bg-white rounded overflow-hidden shadow-xs">
                    <div className="bg-emerald-600 text-white text-[8px] sm:text-[9px] font-black uppercase text-center py-1 border-b border-black px-0.5">
                      KEPALA URUSAN PERENCANAAN
                    </div>
                    <div className="p-1.5 text-center text-xs font-black text-black uppercase">
                      {kaurPerencanaan.nama}
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* 6. GARIS VERTIKAL UTAMA TURUN KE BARIS KASUN */}
            <div className="relative h-10">
              <div className="absolute left-[50%] top-0 bottom-0 w-0.5 bg-black" />
            </div>

            {/* 7. GARIS HORIZONTAL SPANNING KE 4 KEPALA DUSUN */}
            <div className="relative h-6">
              {/* Garis Horizontal menyambung 4 Kasun dari 12.5% sampai 87.5% */}
              <div className="absolute left-[12.5%] right-[12.5%] top-0 h-0.5 bg-black" />
              
              {/* Drop Line Kasun 1 (12.5%) */}
              <div className="absolute left-[12.5%] top-0 bottom-0 w-0.5 bg-black" />
              {/* Drop Line Kasun 2 (37.5%) */}
              <div className="absolute left-[37.5%] top-0 bottom-0 w-0.5 bg-black" />
              {/* Drop Line Kasun 3 (62.5%) */}
              <div className="absolute left-[62.5%] top-0 bottom-0 w-0.5 bg-black" />
              {/* Drop Line Kasun 4 (87.5%) */}
              <div className="absolute left-[87.5%] top-0 bottom-0 w-0.5 bg-black" />
            </div>

            {/* 8. BARIS 4 KEPALA DUSUN (GONGSENG 1, GONGSENG 2, KRANDEKAN, GARUREJO) */}
            <div className="grid grid-cols-4 gap-3">
              {/* Kasun 1 */}
              <div className="border-2 border-black bg-white rounded overflow-hidden shadow-xs">
                <div className="bg-emerald-600 text-white text-[9px] font-black uppercase text-center py-1 border-b border-black px-0.5">
                  {kasun1.jabatan}
                </div>
                <div className="p-2 text-center text-xs font-black text-black uppercase">
                  {kasun1.nama}
                </div>
              </div>

              {/* Kasun 2 */}
              <div className="border-2 border-black bg-white rounded overflow-hidden shadow-xs">
                <div className="bg-emerald-600 text-white text-[9px] font-black uppercase text-center py-1 border-b border-black px-0.5">
                  {kasun2.jabatan}
                </div>
                <div className="p-2 text-center text-xs font-black text-black uppercase">
                  {kasun2.nama}
                </div>
              </div>

              {/* Kasun 3 */}
              <div className="border-2 border-black bg-white rounded overflow-hidden shadow-xs">
                <div className="bg-emerald-600 text-white text-[9px] font-black uppercase text-center py-1 border-b border-black px-0.5">
                  {kasun3.jabatan}
                </div>
                <div className="p-2 text-center text-xs font-black text-black uppercase">
                  {kasun3.nama}
                </div>
              </div>

              {/* Kasun 4 */}
              <div className="border-2 border-black bg-white rounded overflow-hidden shadow-xs">
                <div className="bg-emerald-600 text-white text-[9px] font-black uppercase text-center py-1 border-b border-black px-0.5">
                  {kasun4.jabatan}
                </div>
                <div className="p-2 text-center text-xs font-black text-black uppercase">
                  {kasun4.nama}
                </div>
              </div>
            </div>

            {/* 9. STAMP KEPALA DESA (KANAN BAWAH) */}
            <div className="flex justify-end pt-6">
              <div className="border-2 border-black bg-white p-2.5 rounded text-center w-52 shadow-xs">
                <div className="text-[10px] font-black uppercase text-black">KEPALA DESA</div>
                <div className="h-5" />
                <div className="text-xs font-black text-black uppercase underline tracking-tight">
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
