import { defineCollection, z } from 'astro:content';

/**
 * ニュース/お知らせコレクション（既存互換）
 */
const newsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional().default(false),
  }),
});

/**
 * 活動報告コレクション（spec.md準拠）
 * カテゴリ: 議会 / 地域 / 政策進捗 / メディア / お知らせ / ご挨拶
 */
const activityCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    description: z.string().max(200),
    category: z.string(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional().default(false),
    relatedPolicy: z.string().optional(),
  }),
});

/**
 * 政策コレクション（spec.md準拠）
 */
const policyCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    order: z.number().optional().default(999),
    featured: z.boolean().optional().default(false),
    summary: z.string().max(150),
    category: z.string(),
  }),
});

export const collections = {
  news: newsCollection,
  activity: activityCollection,
  policy: policyCollection,
};
