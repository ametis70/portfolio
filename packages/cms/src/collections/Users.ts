import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    useAPIKey: true,
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      options: ['admin', 'api'],
      required: true,
      defaultValue: 'admin',
    },
  ],
}
