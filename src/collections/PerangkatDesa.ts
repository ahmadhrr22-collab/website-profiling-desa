import type { CollectionConfig } from 'payload'

export const PerangkatDesa: CollectionConfig = {
  slug: 'perangkat-desa',
  labels: {
    singular: 'Perangkat Desa',
    plural: 'Daftar Perangkat Desa',
  },
  admin: {
    group: '👥 Halaman Perangkat Desa',
    useAsTitle: 'nama',
    defaultColumns: ['nama', 'jabatan', 'urutan', 'aktif'],
    description: 'Tambah, ubah foto, nama, dan susunan urutan struktur pemerintahan Perangkat Desa Gongseng.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'nama',
      type: 'text',
      required: true,
      label: 'Nama Lengkap (Beserta Gelar)',
    },
    {
      name: 'jabatan',
      type: 'text',
      required: true,
      label: 'Jabatan Resmi',
      admin: {
        placeholder: 'Contoh: Kepala Desa, Sekretaris Desa, Kepala Dusun Gongseng',
      },
    },
    {
      name: 'foto',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto Resmi (Opsional)',
    },
    {
      name: 'urutan',
      type: 'number',
      required: true,
      label: 'No Urutan Tampilan',
      admin: {
        description: 'Untuk menentukan siapa yang tampil duluan di bagan struktur (contoh: Kepala Desa = 1, Sekretaris = 2, dst).',
      },
    },
    {
      name: 'kontak',
      type: 'text',
      label: 'Nomor WA Kontak Perangkat',
      admin: {
        description: 'Tulis tanpa angka 0 di depan (contoh: 81234567890) (opsional).',
      },
    },
    {
      name: 'aktif',
      type: 'checkbox',
      label: 'Masih Aktif Menjabat',
      defaultValue: true,
    },
  ],
}
