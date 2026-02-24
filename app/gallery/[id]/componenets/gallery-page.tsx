'use client';

import { INotionGallery } from '@/types/notion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ExtendedRecordMap } from 'notion-types';
import { NotionRenderer } from 'react-notion-x';

gsap.registerPlugin(useGSAP);

export default function GalleryPage({
  post,
  recordMap,
}: {
  post: INotionGallery;
  recordMap: ExtendedRecordMap;
}) {
  useGSAP(() => {
    gsap.from('.gallery-element', {
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
      <div>
        <h1 className="gallery-element text-2xl font-bold">
          {post.properties.이름.title[0].plain_text}
        </h1>
        <p className="gallery-element font-kalnia text-sm">
          {post.properties.생성일.date?.start ?? ''}
        </p>
        <p className="gallery-element">
          {post.properties.설명.rich_text[0]?.plain_text ?? ''}
        </p>
      </div>
      <NotionRenderer recordMap={recordMap} className="gallery-element" />
    </section>
  );
}
