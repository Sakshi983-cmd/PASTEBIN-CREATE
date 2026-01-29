import { NextRequest, NextResponse } from 'next/server';
import { getPaste, incrementView } from '@/lib/storage';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  let currentTime: number | undefined;
  
  if (process.env.TEST_MODE === '1') {
    const testNowMs = req.headers.get('x-test-now-ms');
    if (testNowMs) {
      currentTime = parseInt(testNowMs, 10);
    }
  }
  
  const paste = await getPaste(params.id, currentTime);
  
  if (!paste) {
    return NextResponse.json(
      { error: 'Paste not found or expired' },
      { status: 404 }
    );
  }
  
  await incrementView(params.id);
  
  const response: any = {
    content: paste.content,
    remaining_views: paste.max_views !== undefined ? paste.max_views - paste.views - 1 : null,
    expires_at: paste.ttl_seconds 
      ? new Date(paste.created_at + paste.ttl_seconds * 1000).toISOString()
      : null
  };
  
  return NextResponse.json(response);
}
