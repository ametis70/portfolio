import type { CollectionConfig } from 'payload'

export const Works: CollectionConfig = {
  slug: 'works',
  admin: {
    defaultColumns: ['ogImage', 'title', 'id', 'enabled'],
  },
  fields: [
    {
      name: 'id',
      required: true,
      type: 'text',
    },
    {
      name: 'enabled',
      type: 'checkbox',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'priority',
      type: 'number',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'category',
      type: 'text',
      localized: true,
      required: true,
    },

    {
      name: 'tags',
      type: 'text',
      required: true,
      admin: {
        description: 'Comma separated',
      },
    },
    {
      name: 'gradient',
      type: 'code',
      required: true,
      admin: {
        language: 'css',
      },
    },
    {
      name: 'finishDate',
      label: 'Finish date',
      type: 'date',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'primaryLinkUrl',
          label: 'Primary Link URL',
          type: 'text',
          required: true,
        },
        {
          name: 'primaryLinkText',
          label: 'Primary Link Text',
          type: 'text',
          localized: true,
          required: true,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'secondaryLinkUrl',
          label: 'Secondary Link URL',
          type: 'text',
        },
        {
          name: 'secondaryLinkText',
          label: 'Secondary Link Text',
          localized: true,
          type: 'text',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'logos',
          required: true,
        },
        {
          name: 'banner',
          type: 'upload',
          relationTo: 'banner-backgrounds',
          required: true,
        },
      ],
    },
    {
      name: 'screenshotsCategories',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'screenshots',
          type: 'array',
          fields: [
            {
              name: 'screenshot',
              type: 'upload',
              relationTo: 'screenshots',
            },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'ogImage',
          label: 'OG Image',
          type: 'upload',
          relationTo: 'og-banners',
          required: true,
        },
        {
          name: 'ogDescription',
          label: 'OG description',
          type: 'textarea',
          localized: true,
          required: true,
        },
      ],
    },
  ],
}
