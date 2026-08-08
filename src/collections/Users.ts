import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Pengelola CMS',
    plural: 'Akun Pengelola CMS',
  },
  admin: {
    group: '⚙️ Pengaturan & Media',
    useAsTitle: 'email',
    description: 'Daftar akun admin yang berhak login dan mengedit data CMS Desa Gongseng.',
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
  versions: false,
}
