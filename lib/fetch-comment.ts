'use server';

import { cacheLife, cacheTag } from 'next/cache';
import { notion } from './notion';

export async function fetchComment(id: string) {
  'use cache';
  cacheTag('comments', id);
  cacheLife('days');
  const notionRes = await notion.dataSources.query({
    data_source_id: process.env.NOTION_COMMENTS_DATASOURCE_ID!,
    filter: {
      property: '포스트 ID',
      rich_text: {
        equals: id,
      },
    },
    sorts: [
      {
        property: '생성 일시',
        direction: 'ascending',
      },
    ],
  });

  return notionRes.results;
}
