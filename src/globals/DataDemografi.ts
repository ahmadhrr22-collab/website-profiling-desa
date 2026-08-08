import type { GlobalConfig } from 'payload'

export const DataDemografi: GlobalConfig = {
  slug: 'data-demografi',
  label: '3. Data Demografi Penduduk',
  admin: {
    group: '🏠 Halaman Beranda',
    description: 'Data statistik jumlah penduduk, KK, jenis kelamin, serta batas wilayah administratif desa.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Kependudukan & Wilayah',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'jumlahPenduduk',
                  type: 'number',
                  label: 'Jumlah Penduduk (Jiwa)',
                  required: true,
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'jumlahKK',
                  type: 'number',
                  label: 'Jumlah Kepala Keluarga (KK)',
                  required: true,
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'jumlahLakiLaki',
                  type: 'number',
                  label: 'Jumlah Laki-Laki (Jiwa)',
                  required: true,
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'jumlahPerempuan',
                  type: 'number',
                  label: 'Jumlah Perempuan (Jiwa)',
                  required: true,
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
            {
              type: 'group',
              name: 'kelompokUsia',
              label: 'Kelompok Usia Penduduk',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'balita',
                      type: 'number',
                      label: 'Balita (0-5 Tahun) (Jiwa)',
                      admin: {
                        width: '25%',
                      },
                    },
                    {
                      name: 'anak',
                      type: 'number',
                      label: 'Anak-Anak (6-17 Tahun) (Jiwa)',
                      admin: {
                        width: '25%',
                      },
                    },
                    {
                      name: 'produktif',
                      type: 'number',
                      label: 'Usia Produktif (18-59 Tahun) (Jiwa)',
                      admin: {
                        width: '25%',
                      },
                    },
                    {
                      name: 'lansia',
                      type: 'number',
                      label: 'Lansia (>= 60 Tahun) (Jiwa)',
                      admin: {
                        width: '25%',
                      },
                    },
                  ],
                },
              ],
            },
            {
              type: 'group',
              name: 'wilayah',
              label: 'Batas Wilayah Administratif',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'dusun',
                      type: 'number',
                      label: 'Jumlah Dusun',
                      admin: {
                        width: '33.3%',
                      },
                    },
                    {
                      name: 'rt',
                      type: 'number',
                      label: 'Jumlah RT',
                      admin: {
                        width: '33.3%',
                      },
                    },
                    {
                      name: 'rw',
                      type: 'number',
                      label: 'Jumlah RW',
                      admin: {
                        width: '33.3%',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Data Pertanian',
          fields: [
            {
              type: 'group',
              name: 'luasLahan',
              label: 'Luas Lahan Pertanian (Hektar / Ha)',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'sawah',
                      type: 'number',
                      label: 'Luas Sawah (Ha)',
                      admin: {
                        width: '33.3%',
                      },
                    },
                    {
                      name: 'pekarangan',
                      type: 'number',
                      label: 'Luas Pekarangan (Ha)',
                      admin: {
                        width: '33.3%',
                      },
                    },
                    {
                      name: 'tegalan',
                      type: 'number',
                      label: 'Luas Tegalan (Ha)',
                      admin: {
                        width: '33.3%',
                      },
                    },
                  ],
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'produktivitasPadi',
                  type: 'number',
                  label: 'Produktivitas Padi (Ton / Ha)',
                  admin: {
                    width: '33.3%',
                  },
                },
                {
                  name: 'jumlahKelompokTani',
                  type: 'number',
                  label: 'Jumlah Kelompok Tani',
                  admin: {
                    width: '33.3%',
                  },
                },
                {
                  name: 'jumlahAnggotaTani',
                  type: 'number',
                  label: 'Jumlah Anggota Tani (Orang)',
                  admin: {
                    width: '33.3%',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
