import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');

  // if (secret !== process.env.NOTION_TOKEN) {
  //   return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  // }

  // 'posts' 태그가 달린 모든 캐시를 즉시 만료시킴
  // revalidateTag('posts', 'max');

  return NextResponse.json({ secret });
}
