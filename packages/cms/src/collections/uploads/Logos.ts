import type { CollectionConfig } from 'payload'

const slug = 'logos' as const

export const Logos: CollectionConfig = {
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
    displayPreview: true,
  },
}
