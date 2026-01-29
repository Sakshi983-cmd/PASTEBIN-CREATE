import { kv } from '@vercel/kv';
import { nanoid } from 'nanoid';

export interface PasteData {
  content: string;
  ttl_seconds?: number;
  max_views?: number;
  created_at: number;
  views: number;
}

export async function createPaste(data: Omit<PasteData, 'created_at' | 'views'>): Promise<string> {
  const id = nanoid(10);
  const paste: PasteData = {
    ...data,
    created_at: Date.now(),
    views: 0
  };
  
  await kv.set(`paste:${id}`, JSON.stringify(paste));
  
  if (data.ttl_seconds) {
    await kv.expire(`paste:${id}`, data.ttl_seconds);
  }
  
  return id;
}

export async function getPaste(id: string, currentTimeMs?: number): Promise<PasteData | null> {
  const raw = await kv.get<string>(`paste:${id}`);
  if (!raw) return null;
  
  const paste: PasteData = JSON.parse(raw);
  const now = currentTimeMs || Date.now();
  
  if (paste.ttl_seconds) {
    const expiresAt = paste.created_at + paste.ttl_seconds * 1000;
    if (now >= expiresAt) return null;
  }
  
  if (paste.max_views !== undefined && paste.views >= paste.max_views) {
    return null;
  }
  
  return paste;
}

export async function incrementView(id: string): Promise<void> {
  const raw = await kv.get<string>(`paste:${id}`);
  if (!raw) return;
  
  const paste: PasteData = JSON.parse(raw);
  paste.views += 1;
  await kv.set(`paste:${id}`, JSON.stringify(paste));
}
