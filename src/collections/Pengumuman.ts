import type { CollectionConfig } from 'payload'

export const Pengumuman: CollectionConfig = {
  slug: 'pengumuman',
  labels: {
    singular: 'Pengumuman',
    plural: 'Pengumuman',
  },
  admin: {
    useAsTitle: 'judul',
    defaultColumns: ['judul', 'tanggalTerbit', 'tanggalBerakhir', 'penting'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'judul',
      type: 'text',
      required: true,
      label: 'Judul Pengumuman / Berita',
    },
    {
      name: 'konten',
      type: 'richText',
      required: true,
      label: 'Isi Pengumuman / Konten',
    },
    {
      name: 'tanggalTerbit',
      type: 'date',
      required: true,
      label: 'Tanggal Terbit',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'tanggalBerakhir',
      type: 'date',
      label: 'Tanggal Berakhir (Opsional)',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
        description: 'Jika diset, pengumuman akan disembunyikan otomatis setelah tanggal ini.',
      },
    },
    {
      name: 'lampiran',
      type: 'upload',
      relationTo: 'media',
      label: 'File Lampiran Pendukung',
      admin: {
        description: 'Upload berkas PDF atau gambar jika ada dokumen pendukung (opsional).',
      },
    },
    {
      name: 'penting',
      type: 'checkbox',
      label: 'Tandai Sebagai Pengumuman Penting (Tampil Menjolok/Banner)',
      defaultValue: false,
    },
  ],
}
