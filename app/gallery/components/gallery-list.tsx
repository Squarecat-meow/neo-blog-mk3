'use client';

import { INotionGallery } from '@/types/notion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Pagination from '@/app/components/pagination';
import { useRef, useState } from 'react';
import { fetchGallery } from '@/lib/fetch-notion';
import GalleryItem from './gallery-item';

gsap.registerPlugin(useGSAP);

export default function GalleryList({
  initialPosts,
  initialHasMore,
  initialCursor,
}: {
  initialPosts: INotionGallery[];
  initialHasMore: boolean;
  initialCursor: string | null;
}) {
  const [posts, setPosts] = useState(initialPosts);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [cursor, setCursor] = useState(initialCursor);
  const [isLoading, setIsLoading] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const loadMore = async () => {
    if (isLoading || !cursor) return;
    setIsLoading(true);

    const res = await fetchGallery(cursor);

    setPosts((prev) => [...prev, ...(res.results as INotionGallery[])]);
    setHasMore(res.has_more);
    setCursor(res.next_cursor);
    setIsLoading(false);
  };
  useGSAP(
    () => {
      const newItems = gsap.utils
        .toArray<HTMLElement>('.gallery-item')
        .filter((el) => {
          return !el.dataset.animated;
        });

      if (newItems.length === 0) return;

      gsap.from(newItems, {
        delay: 0.5,
        y: -10,
        opacity: 0,
        duration: 0.7,
        stagger: 0.05,
        ease: 'power3.out',
        onStart: () => {
          newItems.forEach((el) => (el.dataset.animated = 'true'));
        },
      });
    },
    { dependencies: [posts], scope: listRef },
  );

  return (
    <section>
      <ul className="grid grid-cols-3" ref={listRef}>
        {posts.map((el) => (
          <div key={el.id} className="gallery-item">
            <GalleryItem key={el.id} item={el} />
          </div>
        ))}
      </ul>
      {hasMore && <Pagination onClick={loadMore} />}
    </section>
  );
}
