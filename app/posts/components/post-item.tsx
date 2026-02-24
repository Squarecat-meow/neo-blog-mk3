import { INotionPage } from '@/types/notion';
import Category from './post-category';
import Link from 'next/link';

export default function PostItem({ item }: { item: INotionPage }) {
  return (
    <Link
      href={`/posts/${item.id}`}
      className="post-item hover:shadow transition-shadow rounded-lg"
    >
      <li className="flex p-2 relative overflow-clip rounded-lg">
        <div className="space-y-2">
          <h2 className="font-kalnia text-sm">
            {item.properties.게시일.date
              ? item.properties.게시일.date.start
              : ''}
          </h2>
          <h1 className="text-3xl font-bold">
            {item.properties.제목.title[0].plain_text}
          </h1>
          <Category category={item.properties.카테고리} />
        </div>
        {item.cover?.type === 'file' ? (
          <img
            className="absolute mask-l-from-0% top-1/2 left-1/2 -translate-1/2 pointer-events-none -z-[1]"
            src={item.cover.file.url}
            alt={`${item.properties.제목.title[0].plain_text}의 커버`}
          />
        ) : (
          item.cover?.type === 'external' && (
            <img
              className="absolute mask-l-from-0% top-1/2 left-1/2 -translate-1/2 pointer-events-none -z-[1]"
              src={item.cover.external.url}
              alt={`${item.properties.제목.title[0].plain_text}의 커버`}
            />
          )
        )}
      </li>
    </Link>
  );
}
