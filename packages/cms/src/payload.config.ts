// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig, TypedLocale } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Works } from './collections/Works'
import { Translations } from './collections/Translation'

import { Logos } from './collections/uploads/Logos'
import { BannerBackgrounds } from './collections/uploads/BannerBackgrounds'
import { Screenshots } from './collections/uploads/Screenshots'
import { OGBanners } from './collections/uploads/OGBanners'

import { About } from './globals/About'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const locales: {
  locales: TypedLocale[]
  defaultLocale: TypedLocale
} = {
  locales: ['en', 'es'],
  defaultLocale: 'en',
} as const

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  serverURL: process.env.DEV_URL,
  localization: locales,
  globals: [About],
  collections: [Users, Logos, BannerBackgrounds, Screenshots, OGBanners, Works, Translations],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [],
})
