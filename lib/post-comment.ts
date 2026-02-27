'use server';

import { ICommentPayload } from '@/types/notion';
import { notion } from './notion';
import { revalidatePath, revalidateTag } from 'next/cache';

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
      해시: {
        rich_text: [{ text: { content: payload.gravatarHash } }],
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

  revalidatePath('/post/[id]', 'page');
  revalidateTag('comments', 'max');

  return res.id;
}
