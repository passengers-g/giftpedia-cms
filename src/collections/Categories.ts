import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'postsCategories',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: '이름',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
      label: '슬러그',
    },
    {
      name: 'description',
      type: 'textarea',
      label: '설명',
    },
  ],
}
