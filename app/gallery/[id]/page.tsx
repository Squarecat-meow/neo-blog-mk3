import { notion } from '@/lib/notion';
import { INotionGallery } from '@/types/notion';
import { NotionAPI } from 'notion-client';
import { ExtendedRecordMap } from 'notion-types';
import GalleryPage from './componenets/gallery-page';
import { Suspense } from 'react';

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
  const { id } = await params;

  const notionAPI = new NotionAPI();
  const [properties, recordMap] = (await Promise.all([
    notion.pages.retrieve({ page_id: id }),
    notionAPI.getPage(id),
  ])) as [INotionGallery, ExtendedRecordMap];

  return <GalleryPage post={properties} recordMap={recordMap} />;
}
