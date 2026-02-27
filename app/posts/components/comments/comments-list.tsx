'use client';

import { ICommentResponse } from '@/types/notion';
import CommentsItem from './comments-item';
export default function CommentsList({
  initialComments,
}: {
  initialComments: { comment: ICommentResponse; username: string | null }[];
}) {
  return (
    <section className="space-y-2">
      <h1 className="text-2xl font-bold">댓글</h1>
      <ul className="space-y-4">
        {initialComments.map((el, key) => {
          const isOptimistic = el.comment.id.startsWith('temp-');

          return (
            <CommentsItem
              key={key}
              props={el}
              className={
                isOptimistic ? 'opacity-50 grayscale blur-[1px]' : 'opacity-100'
              }
            />
          );
        })}
      </ul>
    </section>
  );
}
