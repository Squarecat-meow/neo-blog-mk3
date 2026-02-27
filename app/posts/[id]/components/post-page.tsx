'use client';

import { INotionPage } from '@/types/notion';
import type { ExtendedRecordMap } from 'notion-types';
import Category from '../../components/post-category';
import { NotionRenderer } from 'react-notion-x';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import 'react-notion-x/src/styles.css';
import { getNotionProxyUrl } from '@/lib/notion';
import Comments from '../../components/comments/comments';

gsap.registerPlugin(useGSAP);

function ImageComponent({ url }: { url: string }) {
  return (
    <Image
      src={url}
      alt="notion image caption"
      width={1200}
      height={675}
      unoptimized
    />
  );
}

export default function PostPage({
  post,
  recordMap,
}: {
  post: INotionPage;
  recordMap: ExtendedRecordMap;
}) {
  const proxyUrl = getNotionProxyUrl(
    (post.cover?.type === 'file'
      ? post.cover.file.url
      : post.cover?.external.url) ?? '',
    post.id,
  );

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
      {post.cover && (
        <Image
          src={proxyUrl ?? ''}
          alt={`${post.properties.제목.title[0].plain_text}의 커버`}
          className="post-element w-full md:w-3/4"
          width={1200}
          height={675}
        />
      )}
      <NotionRenderer
        recordMap={recordMap}
        className="post-element"
        mapImageUrl={(url, block) => getNotionProxyUrl(url ?? '', block.id)}
        components={{ nextImage: ImageComponent }}
      />
      <Comments id={post.id} />
    </section>
  );
}
