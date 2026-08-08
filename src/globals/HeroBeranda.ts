import type { GlobalConfig } from 'payload'

export const HeroBeranda: GlobalConfig = {
  slug: 'hero-beranda',
  label: '1. Banner & Tagline Utama',
  admin: {
    group: '🏠 Halaman Beranda',
    description: 'Pengaturan gambar latar hero banner dan kalimat tagline utama di halaman depan beranda.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'fotoHero',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Foto Background Hero',
    },
    {
      name: 'tagline',
      type: 'text',
      required: true,
      label: 'Tagline Utama Desa',
      admin: {
        placeholder: 'Contoh: Desa Gongseng Go Digital!',
      },
    },
    {
      name: 'deskripsi',
      type: 'text',
      required: true,
      label: 'Deskripsi Singkat Halaman Utama',
      admin: {
        placeholder: 'Contoh: Portal resmi pelayanan dan pusat informasi digital Desa Gongseng, Kec. Megaluh, Kab. Jombang.',
      },
    },
  ],
}
