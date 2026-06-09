import type { CollectionConfig } from 'payload'

export const Wisata: CollectionConfig = {
  slug: 'wisata',
  admin: {
    useAsTitle: 'nama',
    defaultColumns: ['nama', 'kategori', 'tiket', 'jamBuka', 'featured'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'nama',
      type: 'text',
      required: true,
      label: 'Nama Destinasi Wisata',
    },
    {
      name: 'kategori',
      type: 'select',
      required: true,
      label: 'Kategori Wisata',
      options: [
        { label: 'Wisata Alam', value: 'alam' },
        { label: 'Wisata Budaya', value: 'budaya' },
        { label: 'Wisata Religi', value: 'religi' },
        { label: 'Agrowisata', value: 'agrowisata' },
        { label: 'Wisata Buatan', value: 'buatan' },
        { label: 'Lainnya', value: 'lainnya' },
      ],
    },
    {
      name: 'deskripsi',
      type: 'richText',
      label: 'Deskripsi Lengkap',
    },
    {
      name: 'foto',
      type: 'array',
      label: 'Galeri Foto Wisata',
      fields: [
        {
          name: 'gambar',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'File Gambar',
        },
      ],
    },
    {
      name: 'tiket',
      type: 'text',
      label: 'Harga Tiket Masuk',
      admin: {
        placeholder: 'Contoh: Rp 5.000 / Gratis',
      },
    },
    {
      name: 'jamBuka',
      type: 'text',
      label: 'Jam Operasional',
      admin: {
        placeholder: 'Contoh: Setiap hari, 08:00 - 17:00',
      },
    },
    {
      name: 'nomorWA',
      type: 'text',
      label: 'Nomor WA Pengelola / Informasi',
      admin: {
        description: 'Tulis tanpa angka 0 di depan (contoh: 81234567890).',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Tampilkan di Beranda (Wisata Unggulan)',
      defaultValue: false,
    },
  ],
}
