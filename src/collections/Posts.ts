import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'publishedDate', 'updatedAt'],
  },
  access: {
    read: ({ req: { user } }) => {
      // Published posts are publicly accessible
      if (!user) {
        return {
          status: {
            equals: 'published',
          },
        }
      }
      // Logged in users can see all posts
      return true
    },
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: '제목',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: lexicalEditor(),
      label: '내용',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
      label: 'URL 슬러그',
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        {
          label: '임시 저장',
          value: 'draft',
        },
        {
          label: '게시됨',
          value: 'published',
        },
      ],
      admin: {
        position: 'sidebar',
      },
      label: '상태',
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      label: '게시일',
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        position: 'sidebar',
      },
      label: '작성자',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        position: 'sidebar',
      },
      label: '대표 이미지',
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: '요약',
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'postsCategories',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
      label: '카테고리',
    },
    {
      name: 'tags',
      type: 'array',
      admin: {
        position: 'sidebar',
      },
      label: '태그',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    // SEO Fields Group
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          label: '메타 제목',
          admin: {
            description: 'SEO용 제목을 재정의합니다. 비워두면 포스트 제목을 사용합니다.',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          label: '메타 설명',
          admin: {
            description: '검색 엔진용 간단한 설명 (150-160자 권장).',
          },
        },
        {
          name: 'metaImage',
          type: 'upload',
          relationTo: 'media',
          label: '메타 이미지',
          admin: {
            description: '소셜 미디어 공유용 이미지. 비워두면 대표 이미지를 사용합니다.',
          },
        },
        {
          name: 'canonical',
          type: 'text',
          label: '표준 URL',
          admin: {
            description: '이 포스트의 표준 URL. 비워두면 자동 생성됩니다.',
          },
        },
        {
          name: 'noIndex',
          type: 'checkbox',
          label: '색인 제외',
          admin: {
            description: '검색 엔진이 이 포스트를 색인하지 않도록 합니다.',
          },
        },
      ],
    },
  ],
}
