'use server';

import { cacheLife, cacheTag } from 'next/cache';
import { notion } from './notion';

export async function fetchPost(cursor: string | null) {
  'use cache';
  cacheTag('posts');
  cacheLife('days');
  return await notion.dataSources.query({
    data_source_id: process.env.NOTION_POSTS_DATASOURCE_ID!,
    ...(cursor ? { page_size: 10 } : {}),
    ...(cursor ? { start_cursor: cursor } : {}),
    sorts: [
      {
        property: '최종 편집 일시',
        direction: 'descending',
      },
    ],
    filter: {
      property: '발행',
      checkbox: {
        equals: true,
      },
    },
  });
}

export async function fetchGallery(cursor: string | null) {
  'use cache';
  cacheTag('gallery');
  cacheLife('days');
  return await notion.dataSources.query({
    data_source_id: process.env.NOTION_GALLERY_DATASOURCE_ID!,
    page_size: 10,
    start_cursor: cursor ?? undefined,
    sorts: [
      {
        property: '생성일',
        direction: 'ascending',
      },
    ],
    filter: {
      property: '발행',
      checkbox: {
        equals: true,
      },
    },
  });
}
