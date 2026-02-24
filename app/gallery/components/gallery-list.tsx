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

      gsap.set(newItems, { opacity: 0, y: -30, visibility: 'visible' });
      gsap.to(newItems, {
        delay: 0.5,
        y: 0,
        duration: 0.7,
        stagger: 0.05,
        ease: 'power3.out',
        onStart: () => {
          newItems.forEach((el) => (el.dataset.animated = 'true'));
        },
      });

      gsap.to(newItems, {
        delay: 0.7,
        opacity: 1,
        duration: 0.05,
        stagger: {
          each: 0.1,
          from: 'start',
          repeat: 6,
          yoyo: true,
        },
        ease: 'rough',
        onComplete: () => {
          gsap.set(newItems, { opacity: 1 });
        },
      });
    },
    { dependencies: [posts], scope: listRef },
  );

  return (
    <section>
      <ul className="grid grid-cols-3" ref={listRef}>
        {posts.map((el) => (
          <GalleryItem key={el.id} item={el} />
        ))}
      </ul>
      {hasMore && <Pagination onClick={loadMore} />}
    </section>
  );
}
