import { fetchPost } from '@/lib/fetch-notion';
import { INotionPage } from '@/types/notion';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE_URL = new URL('https://mina.house');
  const staticUrl = ['/', '/about'];
  const staticSitemap = staticUrl.map((url) => ({
    url: `${BASE_URL}${url}`,
    lastModified: new Date(),
    prioriry: 0.8,
  }));

  const response = await fetchPost(null);
  const posts = response.results as INotionPage[];
  const postSitemap = posts.map((post) => ({
    url: `${BASE_URL}/posts/${post.id}`,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticSitemap, ...postSitemap];
}
