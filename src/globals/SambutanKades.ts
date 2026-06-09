import type { GlobalConfig } from 'payload'

export const SambutanKades: GlobalConfig = {
  slug: 'sambutan-kades',
  admin: {
    group: 'Halaman Utama',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'foto',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Foto Kepala Desa',
    },
    {
      name: 'nama',
      type: 'text',
      required: true,
      label: 'Nama Lengkap Kepala Desa',
    },
    {
      name: 'jabatan',
      type: 'text',
      required: true,
      label: 'Jabatan Resmi',
      defaultValue: 'Kepala Desa Gongseng',
    },
    {
      name: 'teks',
      type: 'richText',
      required: true,
      label: 'Teks Sambutan',
    },
  ],
}
