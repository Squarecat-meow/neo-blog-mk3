import { getNotionPage } from '@/lib/notion';
import { INotionGallery } from '@/types/notion';
import { NotionAPI } from 'notion-client';
import { ExtendedRecordMap } from 'notion-types';
import GalleryPage from './componenets/gallery-page';
import { Suspense } from 'react';
import { cacheLife, cacheTag } from 'next/cache';
import { fetchAllGalleryIds } from '@/lib/fetch-notion';

export async function generateStaticParams() {
  const ids = await fetchAllGalleryIds();
  return ids.map((id) => ({ id }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<div>포스트를 불러오는 중...</div>}>
      <GalleryContent params={params} />
    </Suspense>
  );
}

async function GalleryContent({ params }: { params: Promise<{ id: string }> }) {
  'use cache';
  cacheLife('days');

  const { id } = await params;
  cacheTag('posts', id);

  const notionAPI = new NotionAPI();
  const [properties, recordMap] = (await Promise.all([
    getNotionPage(id),
    notionAPI.getPage(id),
  ])) as [INotionGallery, ExtendedRecordMap];

  return <GalleryPage post={properties} recordMap={recordMap} />;
}
