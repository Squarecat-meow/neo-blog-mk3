import { Client } from '@notionhq/client';

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const NOTION_COLORS: Record<string, { text: string; bg: string }> = {
  default: { text: '#37352F', bg: '#E9E9E6' },
  gray: { text: '#9B9A97', bg: '#EBECD0' },
  brown: { text: '#64473A', bg: '#E9E5E3' },
  orange: { text: '#D9730D', bg: '#FAEBDD' },
  yellow: { text: '#DFAB01', bg: '#FBF3DB' },
  green: { text: '#0F7B6C', bg: '#DDEDEA' },
  blue: { text: '#0B6E99', bg: '#DDEBF1' },
  purple: { text: '#6940A5', bg: '#EAE4F2' },
  pink: { text: '#AD1A72', bg: '#F4DFEB' },
  red: { text: '#E03E3E', bg: '#FBE4E4' },
};

export const getNotionProxyUrl = (url: string, blockId: string) => {
  if (!url) return;

  if (url.startsWith('https://www.notion.so/image')) return url;

  const encodedUrl = encodeURIComponent(url);
  return `https://www.notion.so/image/${encodedUrl}?table=block&id=${blockId}&cache=v2`;
};
