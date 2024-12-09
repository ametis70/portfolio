import type { CollectionConfig } from 'payload'

const slug = 'banner-backgrounds'

export const BannerBackgrounds: CollectionConfig = {
  slug,
  access: {
    read: () => true,
  },
  fields: [
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
