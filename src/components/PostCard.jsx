import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const PostCard = ({ post }) => {
  return (
    <div className="glass-panel post-card-container">
      <div className="post-card-body">
        <span className="post-card-date">
          {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
        </span>
        <h3 className="post-card-title">
          <Link to={`/post/${post.slug}`}>
            {post.title}
          </Link>
        </h3>
        <p className="post-card-summary">{post.summary}</p>
      </div>
      <div className="post-card-footer">
        <span className="post-card-author">
          By {post.authorSummary?.username ? (
            <Link to={`/author/${post.authorSummary.username}`} style={{ color: 'inherit', textDecoration: 'none' }}>
              {post.authorSummary.fullName || post.authorSummary.username}
            </Link>
          ) : 'Unknown'}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <Heart size={14} /> {post.likesCount || 0}
          </span>
          <Link to={`/post/${post.slug}`} className="post-card-link">Read more &rarr;</Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
