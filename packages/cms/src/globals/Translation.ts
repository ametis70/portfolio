import { GlobalConfig } from 'payload'

export const Translation: GlobalConfig = {
  slug: 'translation',
  fields: [
    {
      name: 'namespaces',
      type: 'array',
      fields: [
        {
          name: 'namespace',
          type: 'text',
          required: true,
        },
        {
          name: 'translations',
          type: 'array',
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
    },
  ],
}
