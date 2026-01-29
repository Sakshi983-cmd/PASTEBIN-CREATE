'use client';

import { useState } from 'react';

export default function Home() {
  const [content, setContent] = useState('');
  const [ttl, setTtl] = useState('');
  const [maxViews, setMaxViews] = useState('');
  const [result, setResult] = useState<{ url: string } | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);

    try {
      const body: any = { content };
      if (ttl) body.ttl_seconds = parseInt(ttl);
      if (maxViews) body.max_views = parseInt(maxViews);

      const res = await fetch('/api/pastes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to create paste');
      } else {
        setResult(data);
        setContent('');
        setTtl('');
        setMaxViews('');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '40px 20px', fontFamily: 'system-ui' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>📋 Pastebin Lite</h1>
      <p style={{ color: '#6c757d', marginBottom: '30px' }}>
        Share text with optional expiry settings
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
            Content *
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Paste your text here..."
            required
            style={{
              width: '100%',
              minHeight: '200px',
              padding: '12px',
              fontSize: '14px',
              border: '1px solid #ced4da',
              borderRadius: '6px',
              fontFamily: 'monospace',
              resize: 'vertical'
            }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              TTL (seconds)
            </label>
            <input
              type="number"
              value={ttl}
              onChange={(e) => setTtl(e.target.value)}
              placeholder="Optional"
              min="1"
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '14px',
                border: '1px solid #ced4da',
                borderRadius: '6px'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              Max Views
            </label>
            <input
              type="number"
              value={maxViews}
              onChange={(e) => setMaxViews(e.target.value)}
              placeholder="Optional"
              min="1"
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '14px',
                border: '1px solid #ced4da',
                borderRadius: '6px'
              }}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            fontWeight: '600',
            color: 'white',
            backgroundColor: loading ? '#6c757d' : '#007bff',
            border: 'none',
            borderRadius: '6px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Creating...' : 'Create Paste'}
        </button>
      </form>

      {error && (
        <div style={{
          marginTop: '20px',
          padding: '12px',
          backgroundColor: '#f8d7da',
          border: '1px solid #f5c6cb',
          borderRadius: '6px',
          color: '#721c24'
        }}>
          {error}
        </div>
      )}

      {result && (
        <div style={{
          marginTop: '20px',
          padding: '16px',
          backgroundColor: '#d4edda',
          border: '1px solid #c3e6cb',
          borderRadius: '6px'
        }}>
          <p style={{ fontWeight: '600', marginBottom: '8px', color: '#155724' }}>
            ✅ Paste created!
          </p>
          
            href={result.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#007bff',
              textDecoration: 'underline',
              wordBreak: 'break-all'
            }}
          >
            {result.url}
          </a>
        </div>
      )}
    </div>
  );
}
