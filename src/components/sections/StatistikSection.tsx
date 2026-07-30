'use client'

import React, { useState } from 'react'
import { DataDemografi } from '@/payload-types'
import { Users, Home, Mars, Venus, Sprout, BarChart3, MapPin } from 'lucide-react'

interface StatistikSectionProps {
  data?: DataDemografi | null
}

export function StatistikSection({ data }: StatistikSectionProps) {
  const [activeTab, setActiveTab] = useState<'kependudukan' | 'pertanian'>('kependudukan')

  // Formatter angka ribuan (e.g. 2,450)
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('id-ID').format(num)
  }

  // Setup 4 core stats
  const coreStats = [
    {
      label: 'Total Penduduk',
      value: data?.jumlahPenduduk ?? 2450,
      suffix: ' Jiwa',
      desc: 'Seluruh warga terdaftar',
      icon: Users,
      color: 'bg-emerald-500/10 text-emerald-600 border-emerald-200/50',
    },
    {
      label: 'Kepala Keluarga (KK)',
      value: data?.jumlahKK ?? 780,
      suffix: ' KK',
      desc: 'Jumlah kartu keluarga',
      icon: Home,
      color: 'bg-blue-500/10 text-blue-600 border-blue-200/50',
    },
    {
      label: 'Laki-Laki',
      value: data?.jumlahLakiLaki ?? 1210,
      suffix: ' Jiwa',
      desc: 'Jenis kelamin laki-laki',
      icon: Mars,
      color: 'bg-amber-500/10 text-amber-600 border-amber-200/50',
    },
    {
      label: 'Perempuan',
      value: data?.jumlahPerempuan ?? 1240,
      suffix: ' Jiwa',
      desc: 'Jenis kelamin perempuan',
      icon: Venus,
      color: 'bg-rose-500/10 text-rose-600 border-rose-200/50',
    },
  ]

  // Kelompok Usia data
  const kelompokUsia = data?.kelompokUsia
  const usiaList = [
    { label: 'Balita (0-5 th)', value: kelompokUsia?.balita ?? 150, color: 'bg-emerald-500' },
    { label: 'Anak (6-17 th)', value: kelompokUsia?.anak ?? 350, color: 'bg-blue-500' },
    { label: 'Usia Produktif (18-59 th)', value: kelompokUsia?.produktif ?? 1450, color: 'bg-amber-500' },
    { label: 'Lansia (≥60 th)', value: kelompokUsia?.lansia ?? 500, color: 'bg-rose-500' },
  ]

  // Hitung total usia untuk persentase progress bar
  const totalUsia = usiaList.reduce((acc, curr) => acc + (curr.value ?? 0), 0)

  // Wilayah data
  const wilayah = data?.wilayah

  // Luas Lahan data
  const luasLahan = data?.luasLahan

  return (
    <section className="relative py-16 -mt-10 z-10 max-w-7xl mx-auto px-6 space-y-12">
      {/* 4 Core Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {coreStats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <div
              key={idx}
              className="bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-gray-200/80 shadow-md hover:shadow-xl hover:-translate-y-1.5 hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between group cursor-default"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">{stat.label}</span>
                <div className={`p-3 rounded-xl border ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-gray-950 tracking-tight mb-1 group-hover:text-emerald-700 transition-colors">
                  {formatNumber(stat.value)}
                  <span className="text-sm font-semibold text-gray-500 ml-1">{stat.suffix}</span>
                </div>
                <p className="text-xs text-gray-500 leading-normal">{stat.desc}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Detailed Dashboard Card */}
      <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-md space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-6 gap-4">
          <div className="space-y-1">
            <h3 className="text-xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-600" />
              Dashboard Statistik Desa Gongseng
            </h3>
            <p className="text-xs text-gray-500">
              Detail demografi penduduk, wilayah administratif, dan sektor pertanian.
            </p>
          </div>
          
          {/* Tab Switcher */}
          <div className="inline-flex p-1 bg-gray-100 rounded-xl self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('kependudukan')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${
                activeTab === 'kependudukan'
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Kependudukan & Wilayah
            </button>
            <button
              onClick={() => setActiveTab('pertanian')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${
                activeTab === 'pertanian'
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Sektor Pertanian (IPW)
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'kependudukan' ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Kelompok Usia (Left) */}
            <div className="md:col-span-7 space-y-6">
              <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                Distribusi Kelompok Usia Penduduk
              </h4>
              <div className="space-y-4">
                {usiaList.map((usia, idx) => {
                  const percent = totalUsia > 0 ? Math.round((usia.value / totalUsia) * 100) : 0
                  return (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-gray-600">{usia.label}</span>
                        <span className="text-gray-900">{formatNumber(usia.value)} Jiwa ({percent}%)</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                        <div
                          className={`${usia.color} h-full rounded-full transition-all duration-500`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Kewilayahan (Right) */}
            <div className="md:col-span-5 flex flex-col justify-center bg-emerald-50/20 border border-emerald-100/60 p-6 rounded-2xl space-y-6">
              <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-700" />
                Wilayah Administratif
              </h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-white p-4 rounded-xl border border-emerald-100/40 shadow-sm">
                  <span className="text-2xl font-black text-emerald-700 block">{wilayah?.dusun ?? 3}</span>
                  <span className="text-xs text-gray-500 font-medium">Dusun</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-emerald-100/40 shadow-sm">
                  <span className="text-2xl font-black text-emerald-700 block">{wilayah?.rt ?? 12}</span>
                  <span className="text-xs text-gray-500 font-medium">RT</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-emerald-100/40 shadow-sm">
                  <span className="text-2xl font-black text-emerald-700 block">{wilayah?.rw ?? 4}</span>
                  <span className="text-xs text-gray-500 font-medium">RW</span>
                </div>
              </div>
              <p className="text-[10px] text-gray-400 text-center leading-relaxed">
                * Pembagian wilayah administratif resmi untuk kemudahan pelayanan warga Desa Gongseng.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Luas Lahan (Left) */}
            <div className="md:col-span-7 space-y-6">
              <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                Pemanfaatan Lahan Pertanian
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-emerald-50/30 p-5 rounded-2xl border border-emerald-100/50 flex flex-col justify-between min-h-[110px]">
                  <span className="text-[10px] text-emerald-800 uppercase font-bold tracking-wider block">Luas Sawah</span>
                  <div>
                    <span className="text-2xl font-black text-gray-900 block mt-2">
                      {luasLahan?.sawah ?? 120}
                      <span className="text-xs font-normal text-gray-500 ml-1">Ha</span>
                    </span>
                    <span className="text-[9px] text-gray-400">Lahan sawah irigasi</span>
                  </div>
                </div>

                <div className="bg-amber-50/30 p-5 rounded-2xl border border-amber-100/50 flex flex-col justify-between min-h-[110px]">
                  <span className="text-[10px] text-amber-800 uppercase font-bold tracking-wider block">Pekarangan</span>
                  <div>
                    <span className="text-2xl font-black text-gray-900 block mt-2">
                      {luasLahan?.pekarangan ?? 45}
                      <span className="text-xs font-normal text-gray-500 ml-1">Ha</span>
                    </span>
                    <span className="text-[9px] text-gray-400">Tanah pekarangan warga</span>
                  </div>
                </div>

                <div className="bg-blue-50/30 p-5 rounded-2xl border border-blue-100/50 flex flex-col justify-between min-h-[110px]">
                  <span className="text-[10px] text-blue-800 uppercase font-bold tracking-wider block">Luas Tegalan</span>
                  <div>
                    <span className="text-2xl font-black text-gray-900 block mt-2">
                      {luasLahan?.tegalan ?? 30}
                      <span className="text-xs font-normal text-gray-500 ml-1">Ha</span>
                    </span>
                    <span className="text-[9px] text-gray-400">Lahan kering/kebun</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Kelompok Tani (Right) */}
            <div className="md:col-span-5 flex flex-col justify-center bg-amber-50/20 border border-amber-100/60 p-6 rounded-2xl space-y-4 text-sm">
              <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                <Sprout className="w-4 h-4 text-amber-700" />
                Produktivitas & Keanggotaan
              </h4>
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center py-2 border-b border-amber-100/30">
                  <span className="text-gray-500">Produktivitas Rata-rata Padi</span>
                  <span className="font-bold text-gray-900">{data?.produktivitasPadi ?? 6.2} Ton / Ha</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-amber-100/30">
                  <span className="text-gray-500">Jumlah Kelompok Tani</span>
                  <span className="font-bold text-gray-900">{data?.jumlahKelompokTani ?? 4} Kelompok</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-500">Total Anggota Kelompok</span>
                  <span className="font-bold text-gray-900">{data?.jumlahAnggotaTani ?? 180} Orang</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default StatistikSection
