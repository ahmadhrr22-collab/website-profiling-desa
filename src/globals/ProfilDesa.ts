import type { GlobalConfig } from 'payload'

export const ProfilDesa: GlobalConfig = {
  slug: 'profil-desa',
  label: 'Sejarah, Visi Misi & Geografi',
  admin: {
    group: '📖 Halaman Profil Desa',
    description: 'Pengaturan teks sejarah desa, visi misi, letak geografis, luas wilayah, serta situs monumen bersejarah.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'sejarah',
      type: 'richText',
      required: true,
      label: 'Sejarah Singkat Desa',
    },
    {
      name: 'visi',
      type: 'richText',
      required: true,
      label: 'Visi Desa',
    },
    {
      name: 'misi',
      type: 'richText',
      required: true,
      label: 'Misi Desa',
    },
    {
      name: 'deskripsiGeografis',
      type: 'richText',
      required: true,
      label: 'Letak Geografis dan Batas Wilayah',
    },
    {
      name: 'luasWilayah',
      type: 'text',
      label: 'Luas Wilayah dan Dusun',
      admin: {
        placeholder: 'Contoh: Desa Gongseng memiliki luas wilayah 150 Hektar yang terbagi menjadi 3 Dusun...',
      },
    },
    {
      name: 'petaEmbed',
      type: 'text',
      label: 'URL Google Maps Embed',
      admin: {
        description: 'Tulis tautan Google Maps Embed (ambil bagian link di dalam tanda kutip `src="..."` saja pada menu Share -> Embed a Map. Contoh: https://www.google.com/maps/embed?pb=...)',
      },
    },
    {
      name: 'potensi',
      type: 'richText',
      label: 'Potensi Unggulan Desa (Opsional)',
    },
    {
      name: 'situsBersejarah',
      type: 'array',
      label: 'Situs & Monumen Bersejarah Desa',
      fields: [
        {
          name: 'nama',
          type: 'text',
          required: true,
          label: 'Nama Situs / Monumen',
        },
        {
          name: 'kategori',
          type: 'text',
          label: 'Kategori / Jenis',
        },
        {
          name: 'deskripsi',
          type: 'textarea',
          label: 'Deskripsi Sejarah',
        },
        {
          name: 'lokasi',
          type: 'text',
          label: 'Lokasi Situs',
        },
        {
          name: 'foto',
          type: 'upload',
          relationTo: 'media',
          label: 'Foto Situs',
        },
      ],
    },
  ],
}
