import { NOTION_COLORS } from '@/lib/notion';
import { SelectPropertyItemObjectResponse } from '@notionhq/client';

export default function Category({
  category,
}: {
  category: SelectPropertyItemObjectResponse;
}) {
  return (
    <div
      style={{
        backgroundColor: NOTION_COLORS[category.select?.color ?? 'default'].bg,
      }}
      className="w-fit px-1 rounded-lg"
    >
      <p
        style={{
          color: NOTION_COLORS[category.select?.color ?? 'default'].text,
        }}
        className="text-sm"
      >
        {category.select?.name}
      </p>
    </div>
  );
}
