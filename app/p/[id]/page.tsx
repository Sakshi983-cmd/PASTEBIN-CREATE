import { getPaste } from '@/lib/storage';
import { notFound } from 'next/navigation';

export default async function PastePage({ params }: { params: { id: string } }) {
  const paste = await getPaste(params.id);
  
  if (!paste) {
    notFound();
  }
  
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px', fontFamily: 'system-ui' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px', color: '#333' }}>📋 Paste View</h1>
      
      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #dee2e6',
        marginBottom: '20px'
      }}>
        <pre style={{
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          fontFamily: 'monospace',
          fontSize: '14px',
          margin: 0,
          color: '#212529'
        }}>
          {paste.content}
        </pre>
      </div>
      
      <div style={{ fontSize: '14px', color: '#6c757d' }}>
        {paste.max_views !== undefined && (
          <p style={{ margin: '5px 0' }}>
            👁️ Views remaining: {paste.max_views - paste.views}
          </p>
        )}
        {paste.ttl_seconds && (
          <p style={{ margin: '5px 0' }}>
            ⏰ Expires: {new Date(paste.created_at + paste.ttl_seconds * 1000).toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
}
