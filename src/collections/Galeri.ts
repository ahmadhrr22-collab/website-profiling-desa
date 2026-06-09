import type { CollectionConfig } from 'payload'

export const Galeri: CollectionConfig = {
  slug: 'galeri',
  admin: {
    useAsTitle: 'judul',
    defaultColumns: ['judul', 'kategori', 'tanggal'],
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
      label: 'File Foto',
    },
    {
      name: 'judul',
      type: 'text',
      required: true,
      label: 'Judul Foto',
    },
    {
      name: 'kategori',
      type: 'select',
      required: true,
      label: 'Kategori',
      options: [
        { label: 'Kegiatan Desa', value: 'kegiatan' },
        { label: 'Pemandangan Alam', value: 'alam' },
        { label: 'Infrastruktur', value: 'infrastruktur' },
        { label: 'Pertanian / Panen', value: 'panen' },
        { label: 'Kebudayaan', value: 'budaya' },
      ],
    },
    {
      name: 'tanggal',
      type: 'date',
      required: true,
      label: 'Tanggal Pengambilan Foto',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'keterangan',
      type: 'text',
      label: 'Keterangan Tambahan / Caption',
    },
  ],
}
