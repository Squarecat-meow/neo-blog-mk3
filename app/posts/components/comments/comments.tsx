'use client';

import {
  SubmitEvent,
  useEffect,
  useOptimistic,
  useState,
  useTransition,
} from 'react';
import crypto from 'crypto';
import { postComment } from '@/lib/post-comment';
import { ICommentResponse } from '@/types/notion';
import CommentsList from './comments-list';

export default function Comments({
  id,
  initialComments,
}: {
  id: string;
  initialComments: {
    comment: ICommentResponse;
    username: string | null;
  }[];
}) {
  const [username, setUsername] = useState<string>('');
  const [gravatarUrl, setGravatarUrl] = useState('');
  const [gravatarHash, setGravatarHash] = useState('');
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [body, setBody] = useState<string>('');
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    initialComments,
    (state, newCommentContent: ICommentResponse) => [
      ...state,
      {
        comment: newCommentContent,
        username: username,
      },
    ],
  );
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      addOptimisticComment({
        id: `temp-${Math.random()}`, // 임시 ID
        object: 'page',
        created_time: Date.now().toString(),
        last_edited_time: Date.now().toString(),
        parent: { type: 'database_id', database_id: '' },
        archived: false,
        url: '',
        public_url: null,
        icon: null,
        cover: null,
        created_by: { object: 'user', id: '' },
        last_edited_by: { object: 'user', id: '' },
        in_trash: false,
        is_locked: false,
        // 핵심 properties 부분
        properties: {
          작성자: {
            id: '1',
            type: 'title',
            title: [
              {
                type: 'text',
                text: { content: '작성 중...', link: null },
                annotations: {} as any,
                plain_text: '작성 중...',
                href: null,
              },
            ],
          },
          텍스트: {
            id: '2',
            type: 'rich_text',
            rich_text: [
              {
                type: 'text',
                text: { content: body, link: null },
                annotations: {} as any,
                plain_text: body,
                href: null,
              },
            ],
          },
          해시: {
            id: '3',
            type: 'rich_text',
            rich_text: [
              {
                type: 'text',
                text: {
                  content: gravatarHash,
                  link: null,
                },
                annotations: {} as any,
                plain_text: gravatarHash,
                href: null,
              },
            ],
          },
          '생성 일시': {
            id: '4',
            type: 'date',
            date: { start: Date.now().toString(), end: '', time_zone: null },
          },
          '포스트 ID': { id: '5', type: 'rich_text', rich_text: [] },
          '대댓글 ID': { id: '6', type: 'rich_text', rich_text: [] },
        },
      });
      await postComment({ username, gravatarHash, body, id });
    });

    setUsername('');
    setGravatarUrl('');
    setBody('');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (username.trim() !== '익명' && username.trim()) {
        const hash = crypto
          .createHash('md5')
          .update(username.trim().toLowerCase())
          .digest('hex');
        setGravatarHash(hash);
        setGravatarUrl(
          `https://www.gravatar.com/avatar/${hash}?s=40&d=identicon`,
        );
      } else {
        setGravatarUrl('');
        setGravatarHash('');
        setIsImageLoaded(false);
      }
    }, 700);

    return () => clearTimeout(timer);
  }, [username]);

  return (
    <section className="w-full lg:w-3/4 my-4 space-y-2">
      <CommentsList initialComments={optimisticComments} />
      <form className="w-full space-y-2" onSubmit={handleSubmit}>
        <div className="flex items-center gap-2">
          <div
            className={`w-[42px] aspect-square ${!isImageLoaded && 'border border-slate-300 dark:border-slate-600'} rounded`}
          >
            {gravatarUrl !== '' && (
              <img
                src={gravatarUrl}
                alt="Profile"
                onLoad={() => setIsImageLoaded(true)}
                className="rounded"
              />
            )}
          </div>
          <input
            value={username ?? ''}
            required
            maxLength={30}
            className="w-full p-2 bg-white dark:bg-black border border-slate-300 dark:border-slate-600 rounded"
            placeholder="이름 또는 Gravatar 이메일"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <textarea
          value={body ?? ''}
          required
          maxLength={280}
          className="w-full h-24 p-2 bg-white dark:bg-black border border-slate-300 dark:border-slate-600 rounded resize-none"
          placeholder="에티켓을 지켜서 댓글을 써주세요! (최대 280자)"
          onChange={(e) => setBody(e.target.value)}
        />
        <div className="w-full text-right">
          <button
            disabled={isPending}
            className="px-5 py-2 bg-white dark:bg-black border border-slate-300 dark:border-slate-600 rounded hover:bg-slate-300 transition-colors"
          >
            {isPending ? '전송 중...' : '제출'}
          </button>
        </div>
      </form>
    </section>
  );
}
