import type { CollectionConfig } from 'payload'

export const UMKM: CollectionConfig = {
  slug: 'umkm',
  labels: {
    singular: 'Usaha UMKM',
    plural: 'Arsip Data UMKM',
  },
  admin: {
    group: '⚙️ Pengaturan & Media',
    useAsTitle: 'nama',
    defaultColumns: ['nama', 'kategori', 'featured', 'aktif'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'nama',
      type: 'text',
      required: true,
      label: 'Nama UMKM / Produk',
    },
    {
      name: 'kategori',
      type: 'select',
      required: true,
      label: 'Kategori',
      options: [
        { label: 'Makanan', value: 'makanan' },
        { label: 'Minuman', value: 'minuman' },
        { label: 'Kerajinan', value: 'kerajinan' },
        { label: 'Jasa', value: 'jasa' },
        { label: 'Pertanian', value: 'pertanian' },
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
      label: 'Foto Produk (Bisa lebih dari satu)',
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
      name: 'nomorWA',
      type: 'text',
      label: 'Nomor WhatsApp Pemilik',
      admin: {
        description: 'Tulis tanpa angka 0 di depan (contoh: 81234567890).',
      },
    },
    {
      name: 'pesanWA',
      type: 'text',
      label: 'Template Pesan WhatsApp',
      admin: {
        description: 'Pesan otomatis yang akan dikirim saat pengunjung mengklik tombol Hubungi WA (opsional).',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Tampilkan di Beranda (UMKM Unggulan)',
      defaultValue: false,
    },
    {
      name: 'aktif',
      type: 'checkbox',
      label: 'Aktif (Tampilkan di website)',
      defaultValue: true,
    },
  ],
}
