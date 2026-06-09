import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { uploadthingStorage } from '@payloadcms/storage-uploadthing'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { UMKM } from './collections/UMKM'
import { Wisata } from './collections/Wisata'
import { Galeri } from './collections/Galeri'
import { PerangkatDesa } from './collections/PerangkatDesa'
import { Kegiatan } from './collections/Kegiatan'
import { Pengumuman } from './collections/Pengumuman'

import { HeroBeranda } from './globals/HeroBeranda'
import { SambutanKades } from './globals/SambutanKades'
import { ProfilDesa } from './globals/ProfilDesa'
import { DataDemografi } from './globals/DataDemografi'
import { KontakSosmed } from './globals/KontakSosmed'
import { APBDes } from './globals/APBDes'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

console.log('Payload Config: UPLOADTHING_TOKEN is present:', !!process.env.UPLOADTHING_TOKEN)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, UMKM, Wisata, Galeri, PerangkatDesa, Kegiatan, Pengumuman],
  globals: [HeroBeranda, SambutanKades, ProfilDesa, DataDemografi, KontakSosmed, APBDes],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  localization: {
    locales: ['en'],
    fallback: true,
    defaultLocale: 'en',
  },
  plugins: process.env.UPLOADTHING_TOKEN
    ? [
        uploadthingStorage({
          collections: {
            media: true,
          },
          options: {
            token: process.env.UPLOADTHING_TOKEN,
            acl: 'public-read',
          },
        }),
      ]
    : [],
})
