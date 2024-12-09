import { GlobalConfig } from 'payload'

export const About: GlobalConfig = {
  slug: 'about',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'city',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      required: true,
    },
    {
      name: 'experience',
      type: 'array',
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '/components/ArrayRow#CompanyLabelRow',
        },
      },
      fields: [
        {
          name: 'start',
          type: 'date',
          required: true,
        },
        {
          name: 'end',
          type: 'date',
          required: false,
        },
        {
          name: 'role',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'company',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          required: true,
        },
      ],
    },
    {
      name: 'skills',
      type: 'array',
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '/components/ArrayRow#CategoryLabelRow',
        },
      },

      fields: [
        {
          name: 'category',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'skills',
          type: 'textarea',
          localized: true,
          required: true,
        },
      ],
    },
    {
      name: 'education',
      type: 'array',
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '/components/ArrayRow#CategoryLabelRow',
        },
      },

      fields: [
        {
          name: 'category',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'items',
          type: 'array',
          admin: {
            initCollapsed: true,
            components: {
              RowLabel: '/components/ArrayRow#TitleLabelRow',
            },
          },

          fields: [
            {
              name: 'start',
              type: 'date',
              required: true,
            },
            {
              name: 'end',
              type: 'date',
              required: false,
            },
            {
              name: 'title',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'school',
              type: 'text',
              required: true,
            },
            {
              name: 'link',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
}
