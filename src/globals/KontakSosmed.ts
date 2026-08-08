import type { GlobalConfig } from 'payload'

export const KontakSosmed: GlobalConfig = {
  slug: 'kontak-sosmed',
  label: '1. Kontak WA & Sosmed Desa',
  admin: {
    group: '⚙️ Pengaturan & Media',
    description: 'Pengaturan nomor WhatsApp pelayanan, email resmi, alamat balai desa, dan akun Instagram.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'nomorWA',
      type: 'text',
      required: true,
      label: 'Nomor WhatsApp Kantor Desa',
      admin: {
        description: 'Tulis tanpa angka 0 di depan (contoh: 81234567890).',
      },
    },

    {
      name: 'email',
      type: 'text',
      required: true,
      label: 'Email Resmi Desa',
      admin: {
        placeholder: 'Contoh: info@desagongseng.id',
      },
    },
    {
      name: 'alamat',
      type: 'text',
      required: true,
      label: 'Alamat Kantor Desa',
      admin: {
        placeholder: 'Contoh: Jl. Raya Megaluh No. 12, Desa Gongseng, Jombang',
      },
    },
    {
      name: 'instagram',
      type: 'text',
      label: 'Tautan Instagram Desa',
      admin: {
        placeholder: 'Contoh: https://instagram.com/desagongseng',
      },
    },
  ],
}
