import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
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
