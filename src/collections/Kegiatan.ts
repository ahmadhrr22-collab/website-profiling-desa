import type { CollectionConfig } from 'payload'

export const Kegiatan: CollectionConfig = {
  slug: 'kegiatan',
  admin: {
    useAsTitle: 'judul',
    defaultColumns: ['judul', 'kategori', 'tanggal', 'waktu', 'lokasi'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'judul',
      type: 'text',
      required: true,
      label: 'Nama Kegiatan / Agenda',
    },
    {
      name: 'kategori',
      type: 'select',
      required: true,
      label: 'Kategori Kegiatan',
      options: [
        { label: 'Kesehatan (Posyandu, dll)', value: 'kesehatan' },
        { label: 'Pertanian / Ketahanan Pangan', value: 'pertanian' },
        { label: 'Sosial / Keagamaan / Kemasyarakatan', value: 'sosial' },
        { label: 'Pemerintahan Desa', value: 'pemerintahan' },
        { label: 'Pemuda & Olahraga / Karang Taruna', value: 'pemuda' },
      ],
    },
    {
      name: 'tanggal',
      type: 'date',
      required: true,
      label: 'Tanggal Pelaksanaan',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'waktu',
      type: 'text',
      required: true,
      label: 'Waktu / Jam Pelaksanaan',
      admin: {
        placeholder: 'Contoh: 08:00 - Selesai atau 09:00 - 12:00 WIB',
      },
    },
    {
      name: 'lokasi',
      type: 'text',
      required: true,
      label: 'Tempat / Lokasi Kegiatan',
      admin: {
        placeholder: 'Contoh: Balai Desa Gongseng, Posyandu Dusun Gongseng',
      },
    },
    {
      name: 'deskripsi',
      type: 'richText',
      label: 'Detail Deskripsi Kegiatan',
    },
    {
      name: 'dokumen',
      type: 'upload',
      relationTo: 'media',
      label: 'Dokumen Lampiran (Undangan / Materi)',
      admin: {
        description: 'Upload berkas PDF atau gambar jika ada lampiran resmi (opsional).',
      },
    },
  ],
}
