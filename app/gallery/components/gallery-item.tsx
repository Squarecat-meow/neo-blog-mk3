import { getNotionProxyUrl } from '@/lib/notion';
import { INotionGallery } from '@/types/notion';
import Link from 'next/link';

export default function GalleryItem({ item }: { item: INotionGallery }) {
  const proxyUrl = getNotionProxyUrl(
    (item.cover?.type === 'file'
      ? item.cover.file.url
      : item.cover?.external.url) ?? '',
    item.id,
  );
  return (
    <Link href={`/gallery/${item.id}`} className="w-fit">
      <li className="w-fit rounded-lg shadow hover:shadow-lg transition-all">
        <div className="w-full lg:w-xs p-2 bg-white">
          <div className="-mt-2 -mx-2">
            <img
              src={proxyUrl}
              alt={`${item.properties.이름.title[0].plain_text}의 커버`}
              className="rounded-t-lg w-full"
            />
          </div>
          <h1 className="text-2xl font-bold">
            {item.properties.이름.title[0].plain_text}
          </h1>
          <p className="text-sm">
            {item.properties.설명.rich_text[0]?.plain_text ?? ''}
          </p>
        </div>
      </li>
    </Link>
  );
}
