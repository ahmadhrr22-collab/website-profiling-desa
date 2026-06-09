import React from 'react'
import { DataDemografi } from '@/payload-types'
import { Users, Home, UserCheck, Heart } from 'lucide-react'

interface StatistikSectionProps {
  data?: DataDemografi | null
}

export function StatistikSection({ data }: StatistikSectionProps) {
  // Setup fallback data
  const stats = [
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
      desc: 'Penduduk berjenis kelamin laki-laki',
      icon: UserCheck,
      color: 'bg-amber-500/10 text-amber-600 border-amber-200/50',
    },
    {
      label: 'Perempuan',
      value: data?.jumlahPerempuan ?? 1240,
      suffix: ' Jiwa',
      desc: 'Penduduk berjenis kelamin perempuan',
      icon: Heart,
      color: 'bg-rose-500/10 text-rose-600 border-rose-200/50',
    },
  ]

  // Formatter angka ribuan (e.g. 2,450)
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('id-ID').format(num)
  }

  return (
    <section className="relative py-16 -mt-10 z-10 max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <div
              key={idx}
              className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-gray-500">{stat.label}</span>
                <div className={`p-2.5 rounded-xl border ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-gray-900 tracking-tight mb-1">
                  {formatNumber(stat.value)}
                  <span className="text-sm font-normal text-gray-500">{stat.suffix}</span>
                </div>
                <p className="text-xs text-gray-500">{stat.desc}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default StatistikSection
