import type { CollectionConfig } from 'payload'

const slug = 'og-banners' as const

export const OGBanners: CollectionConfig = {
  slug,
  labels: {
    singular: 'OG Banner',
    plural: 'OG Banners',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'id',
      required: true,
      type: 'text',
    },
    {
      name: 'alt',
      type: 'text',
      localized: true,
      required: true,
    },
  ],
  upload: {
    staticDir: `${process.env.UPLOADS_DIR}/${slug}`,
  },
}
