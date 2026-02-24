import { createHmac, timingSafeEqual } from 'crypto';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const verificationToken = process.env.NOTION_WEBHOOK_TOKEN;
  if (!verificationToken) {
    console.error('Verification token is missing');
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }

  const body = await req.json();
  const signature = `sha256=${createHmac('sha256', verificationToken).update(JSON.stringify(body)).digest('hex')}`;
  const notionSignature = req.headers.get('X-Notion-Signature');
  const isTrustedPayload =
    signature &&
    timingSafeEqual(Buffer.from(signature), Buffer.from(notionSignature || ''));
  if (!isTrustedPayload) {
    console.warn('Invalid signature - ignoring request');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  console.log(body);

  revalidateTag('posts', 'max');

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
