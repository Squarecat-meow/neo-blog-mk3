'use server';

import { ICommentPayload } from '@/types/notion';
import { notion } from './notion';

export async function postComment(payload: ICommentPayload) {
  const res = await notion.pages.create({
    properties: {
      작성자: {
        title: [
          {
            text: {
              content: payload.username,
            },
          },
        ],
      },
      텍스트: {
        rich_text: [{ text: { content: payload.body } }],
      },
      '포스트 ID': {
        rich_text: [{ text: { content: payload.id } }],
      },
    },
    parent: { data_source_id: process.env.NOTION_COMMENTS_DATASOURCE_ID! },
  });

  return res.id;
}
