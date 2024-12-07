import type { CollectionConfig } from 'payload'

const slug = 'screenshot' as const

export const Screenshots: CollectionConfig = {
  slug,
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
