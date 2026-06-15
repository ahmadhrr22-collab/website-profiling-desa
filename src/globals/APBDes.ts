import type { GlobalConfig } from 'payload'

export const APBDes: GlobalConfig = {
  slug: 'apbdes',
  label: 'APBDes',
  admin: {
    group: 'Informasi Desa',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'pendapatan',
      type: 'number',
      label: 'Total Pendapatan Desa (Rupiah)',
    },
    {
      name: 'belanja',
      type: 'number',
      label: 'Total Belanja Desa (Rupiah)',
    },
    {
      name: 'tahun',
      type: 'number',
      label: 'Tahun Anggaran',
      admin: {
        placeholder: 'Contoh: 2026',
      },
    },
  ],
}
