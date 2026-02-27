import Identicon from '@polkadot/react-identicon';
import { useMemo } from 'react';

export default function Comments() {
  const randomAddress = useMemo(() => {
    return crypto.getRandomValues(new Uint8Array(32));
  }, []);

  return (
    <section className="w-full lg:w-3/4 mb-6 space-y-2">
      <h1 className="text-2xl font-bold">댓글</h1>
      <form className="w-full space-y-2">
        <div className="flex items-center gap-2">
          <Identicon
            value={randomAddress}
            size={48}
            theme="beachball"
            className="pointer-events-none"
          />
          <input
            maxLength={10}
            className="w-full p-2 bg-white dark:bg-black border border-slate-300 dark:border-slate-600 rounded"
            placeholder="이름"
          />
        </div>
        <textarea
          maxLength={280}
          className="w-full h-24 p-2 bg-white dark:bg-black border border-slate-300 dark:border-slate-600 rounded resize-none"
          placeholder="에티켓을 지켜서 댓글을 써주세요! (최대 280자)"
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
