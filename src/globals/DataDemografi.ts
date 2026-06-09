import type { GlobalConfig } from 'payload'

export const DataDemografi: GlobalConfig = {
  slug: 'data-demografi',
  admin: {
    group: 'Informasi Desa',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'jumlahPenduduk',
      type: 'number',
      label: 'Jumlah Penduduk (Jiwa)',
      admin: {
        description: 'Total seluruh warga Desa Gongseng.',
      },
    },
    {
      name: 'jumlahKK',
      type: 'number',
      label: 'Jumlah Kepala Keluarga (KK)',
    },
    {
      name: 'jumlahLakiLaki',
      type: 'number',
      label: 'Jumlah Laki-Laki (Jiwa)',
    },
    {
      name: 'jumlahPerempuan',
      type: 'number',
      label: 'Jumlah Perempuan (Jiwa)',
    },
  ],
}
