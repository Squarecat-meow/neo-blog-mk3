import { INotionPage } from '@/types/notion';
import PostList from './components/post-list';
import { fetchPost } from '@/lib/fetch-notion';

export default async function Page() {
  const res = await fetchPost(null);
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
