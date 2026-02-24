'use server';

import { notion } from './notion';

export async function fetchPost(cursor: string | null) {
  return await notion.dataSources.query({
    data_source_id: process.env.NOTION_POSTS_DATASOURCE_ID!,
    page_size: 10,
    start_cursor: cursor ?? undefined,
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
