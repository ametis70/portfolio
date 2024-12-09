import { CollectionConfig } from 'payload'

export const Translations: CollectionConfig = {
  slug: 'translations',
  admin: {
    defaultColumns: ['namespace'],
    useAsTitle: 'namespace',
  },
  fields: [
    {
      name: 'namespace',
      type: 'text',
      required: true,
    },
    {
      name: 'translations',
      type: 'array',
      admin: {
        components: {
          RowLabel: '/components/ArrayRow#KeyValueLabelRow',
        },
        initCollapsed: true,
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'key',
              type: 'text',
              required: true,
            },
            {
              name: 'value',
              type: 'text',
              required: true,
              localized: true,
            },
          ],
        },
      ],
    },
  ],
}
