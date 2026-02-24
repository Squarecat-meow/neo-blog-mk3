'use client';

import { INotionPage } from '@/types/notion';
import type { ExtendedRecordMap } from 'notion-types';
import Category from '../../components/post-category';
import { NotionRenderer } from 'react-notion-x';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function PostPage({
  post,
  recordMap,
}: {
  post: INotionPage;
  recordMap: ExtendedRecordMap;
}) {
  useGSAP(() => {
    gsap.from('.post-element', {
      opacity: 0,
      y: -10,
      duration: 1,
      stagger: {
        each: 0.1,
        from: 'start',
      },
      ease: 'power3.inOut',
    });
  });

  return (
    <section className="space-y-2">
      <div className="relative overflow-clip">
        <h1 className="post-element font-serif text-4xl font-bold">
          {post.properties.제목.title[0].plain_text}
        </h1>
        <div className="post-element flex items-center gap-2">
          <h2 className="font-kalnia text-sm">
            {post.properties.게시일.date
              ? post.properties.게시일.date.start
              : ''}
          </h2>
          <Category category={post.properties.카테고리} />
        </div>
      </div>
      <NotionRenderer recordMap={recordMap} className="post-element" />
    </section>
  );
}
