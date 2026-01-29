import { NextRequest, NextResponse } from 'next/server';
import { createPaste } from '@/lib/storage';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    if (!body.content || typeof body.content !== 'string' || body.content.trim() === '') {
      return NextResponse.json(
        { error: 'Content is required and must be a non-empty string' },
        { status: 400 }
      );
    }
    
    if (body.ttl_seconds !== undefined) {
      if (!Number.isInteger(body.ttl_seconds) || body.ttl_seconds < 1) {
        return NextResponse.json(
          { error: 'ttl_seconds must be an integer >= 1' },
          { status: 400 }
        );
      }
    }
    
    if (body.max_views !== undefined) {
      if (!Number.isInteger(body.max_views) || body.max_views < 1) {
        return NextResponse.json(
          { error: 'max_views must be an integer >= 1' },
          { status: 400 }
        );
      }
    }
    
    const id = await createPaste({
      content: body.content,
      ttl_seconds: body.ttl_seconds,
      max_views: body.max_views
    });
    
    const url = `${req.nextUrl.origin}/p/${id}`;
    
    return NextResponse.json({ id, url });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
