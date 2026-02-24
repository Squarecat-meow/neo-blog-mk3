import { notion } from '@/lib/notion';
import { INotionPage } from '@/types/notion';
import PostList from './components/post-list';

export default async function Page() {
  const res = await notion.dataSources.query({
    data_source_id: process.env.NOTION_POSTS_DATASOURCE_ID!,
    filter: {
      property: '발행',
      checkbox: {
        equals: true,
      },
    },
  });
  const results = res.results as INotionPage[];

  return (
    <>
      <PostList src={results} />
    </>
  );
}
