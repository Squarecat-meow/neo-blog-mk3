import { notion } from '@/lib/notion';
import { INotionPage } from '@/types/notion';
import PostPage from './components/post-page';
import { NotionAPI } from 'notion-client';
import { ExtendedRecordMap } from 'notion-types';
import { Suspense } from 'react';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<div>포스트를 불러오는 중...</div>}>
      <PostContent params={params} />
    </Suspense>
  );
}

async function PostContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const notionAPI = new NotionAPI();
  const [properties, recordMap] = (await Promise.all([
    notion.pages.retrieve({ page_id: id }),
    notionAPI.getPage(id),
  ])) as [INotionPage, ExtendedRecordMap];

  return <PostPage post={properties} recordMap={recordMap} />;
}
