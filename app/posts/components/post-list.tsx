'use client';

import { INotionPage } from '@/types/notion';
import PostItem from './post-item';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Pagination from '@/app/components/pagination';
import { useRef, useState } from 'react';
import { fetchPost } from '@/lib/fetch-notion';

gsap.registerPlugin(useGSAP);

export default function PostList({
  initialPosts,
  initialHasMore,
  initialCursor,
}: {
  initialPosts: INotionPage[];
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

    const res = await fetchPost(cursor);

    setPosts((prev) => [...prev, ...(res.results as INotionPage[])]);
    setHasMore(res.has_more);
    setCursor(res.next_cursor);
    setIsLoading(false);
  };
  useGSAP(
    () => {
      const newItems = gsap.utils
        .toArray<HTMLElement>('.post-item')
        .filter((el) => {
          return !el.dataset.animated;
        });

      if (newItems.length === 0) return;

      gsap.fromTo(
        newItems,
        { opacity: 0, y: -10 },
        {
          y: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: 'expo.out',
          onStart: () => {
            newItems.forEach((el) => (el.dataset.animated = 'true'));
          },
        },
      );

      gsap.to(newItems, {
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
      <ul className="grid grid-cols-2 gap-2" ref={listRef}>
        {posts.map((el) => (
          <PostItem key={el.id} item={el} />
        ))}
      </ul>
      {hasMore && <Pagination onClick={loadMore} />}
    </section>
  );
}
