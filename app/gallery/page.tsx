import { fetchGallery } from '@/lib/fetch-notion';
import GalleryList from './components/gallery-list';
import { INotionGallery } from '@/types/notion';

export default async function Page() {
  const res = await fetchGallery(null);
  const results = res.results as INotionGallery[];

  return (
    <>
      <GalleryList
        initialPosts={results}
        initialHasMore={res.has_more}
        initialCursor={res.next_cursor}
      />
    </>
  );
}
