import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  return (
    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ marginBottom: '1rem' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--accent-color)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
          {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
        </span>
        <h3 style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
          <Link to={`/post/${post.slug}`} style={{ color: 'var(--text-primary)' }}>
            {post.title}
          </Link>
        </h3>
        <p style={{ fontSize: '0.9rem', flexGrow: 1 }}>{post.summary}</p>
      </div>
      <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>By {post.authorSummary?.fullName || 'Unknown'}</span>
        <Link to={`/post/${post.slug}`} style={{ fontSize: '0.85rem', fontWeight: '500' }}>Read more &rarr;</Link>
      </div>
    </div>
  );
};

export default PostCard;
