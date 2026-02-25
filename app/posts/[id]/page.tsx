import { notion } from '@/lib/notion';
import { INotionPage } from '@/types/notion';
import PostPage from './components/post-page';
import { NotionAPI } from 'notion-client';
import { ExtendedRecordMap } from 'notion-types';
import { Suspense } from 'react';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const res = (await notion.pages.retrieve({ page_id: id })) as INotionPage;

  return {
    title: `${res.properties.제목.title[0].plain_text} | Mina's Garden`,
    description: '요즈미나의 작은 정원이에요(또는 그냥 블로그라고도 불러요)!',
    openGraph: {
      title: `${res.properties.제목.title[0].plain_text} | Mina's Garden`,
      description: '요즈미나의 작은 정원이에요(또는 그냥 블로그라고도 불러요)!',
      url: `/posts/${res.id}`,
      images: [
        {
          url: res.cover
            ? res.cover.type === 'file'
              ? res.cover.file.url
              : res.cover.external.url
            : '',
          width: 1200,
          height: 630,
          alt: 'og-image',
        },
      ],
      type: 'website',
    },
  };
}

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
