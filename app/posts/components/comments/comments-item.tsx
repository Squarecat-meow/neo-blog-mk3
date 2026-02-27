import { ICommentResponse } from '@/types/notion';

export default function CommentsItem({
  props,
  className,
}: {
  props: { comment: ICommentResponse; username: string | null };
  className?: string;
}) {
  return (
    <li className={`flex gap-2 ${className}`}>
      <img
        src={`https://www.gravatar.com/avatar/${props.comment.properties.해시.rich_text[0].plain_text}?s=40&d=identicon`}
        alt={`${props.username ?? '익명'}의 프로필 사진`}
        className="w-10 aspect-square rounded-full"
      />{' '}
      <div>
        <h2 className="text-xs text-slate-600 dark:text-slate-400">
          {props.username
            ? props.username
            : props.comment.properties.작성자.title[0].plain_text}
        </h2>
        <p>{props.comment.properties.텍스트.rich_text[0].plain_text}</p>
      </div>
    </li>
  );
}
