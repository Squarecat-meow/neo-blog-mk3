import { SubmitEvent, useEffect, useState } from 'react';
import crypto from 'crypto';
import { postComment } from '@/lib/post-comment';

export default function Comments({ id }: { id: string }) {
  const [username, setUsername] = useState<string>('');
  const [gravatarUrl, setGravatarUrl] = useState('');
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [body, setBody] = useState<string>('');

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await postComment({ username, body, id });

    setUsername('');
    setGravatarUrl('');
    setBody('');

    console.log(res);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (username.trim() !== '익명' && username.trim()) {
        const hash = crypto
          .createHash('md5')
          .update(username.trim().toLowerCase())
          .digest('hex');
        setGravatarUrl(
          `https://www.gravatar.com/avatar/${hash}?s=40&d=identicon`,
        );
      } else {
        setGravatarUrl('');
        setIsImageLoaded(false);
      }
    }, 700);

    return () => clearTimeout(timer);
  }, [username]);

  return (
    <section className="w-full lg:w-3/4 mb-6 space-y-2">
      <h1 className="text-2xl font-bold">댓글</h1>
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
          <button className="px-5 py-2 bg-white dark:bg-black border border-slate-300 dark:border-slate-600 rounded hover:bg-slate-300 transition-colors">
            제출
          </button>
        </div>
      </form>
    </section>
  );
}
