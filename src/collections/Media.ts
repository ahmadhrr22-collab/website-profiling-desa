import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'File Media',
    plural: 'Perpustakaan Media',
  },
  admin: {
    group: '⚙️ Pengaturan & Media',
    useAsTitle: 'alt',
    description: 'Semua foto (termasuk format iPhone HEIC/HEIF) dan dokumen PDF yang di-upload ke website.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    disableLocalStorage: true,
    mimeTypes: [
      'image/*',
      'image/heic',
      'image/heic-sequence',
      'image/heif',
      'image/heif-sequence',
      '.heic',
      '.heif',
      'application/pdf',
    ],
  },
}
