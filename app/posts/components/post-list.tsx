import { INotionPage } from '@/types/notion';
import PostItem from './post-item';

export default function PostList({ src }: { src: INotionPage[] }) {
  return (
    <section>
      <ul className="grid grid-cols-2 gap-2">
        {src.map((el) => (
          <PostItem key={el.id} item={el} />
        ))}
      </ul>
    </section>
  );
}
