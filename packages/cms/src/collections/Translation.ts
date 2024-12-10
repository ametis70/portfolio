import { CollectionConfig } from 'payload'

import { isAdmin, isAdminOrApi } from '@/auth'

export const Translations: CollectionConfig = {
  slug: 'translations',
  access: {
    read: isAdminOrApi,
    update: isAdmin,
    delete: isAdmin,
    create: isAdmin,
  },
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
