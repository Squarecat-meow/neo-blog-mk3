import { INotionPage } from '@/types/notion';
import PostList from './components/post-list';
import { fetchNotion } from '@/lib/fetch-notion';

export default async function Page() {
  const res = await fetchNotion(null);
  const results = res.results as INotionPage[];

  return (
    <>
      <PostList
        initialPosts={results}
        initialHasMore={res.has_more}
        initialCursor={res.next_cursor}
      />
    </>
  );
}
