'use client';

export default function Pagination({ onClick }: { onClick: () => void }) {
  return (
    <div className="w-full mt-4 text-center">
      <button
        className={`w-fit py-1 px-5 border border-key/50 rounded-lg hover:shadow hover:bg-slate-300 transition-all`}
        onClick={onClick}
      >
        더보기
      </button>
    </div>
  );
}
