import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle } from 'lucide-react';

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
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Heart size={14} /> {post.likesCount || 0} Likes</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><MessageCircle size={14} /> {post.commentsCount || 0} Comments</span>
        </div>
      </div>
      <div className="post-card-footer">
        <span className="post-card-author">
          By {post.authorSummary?.username ? (
            <Link to={`/author/${post.authorSummary.username}`} style={{ color: 'inherit', textDecoration: 'none' }}>
              {post.authorSummary.fullName || post.authorSummary.username}
            </Link>
          ) : 'Unknown'}
        </span>
        <Link to={`/post/${post.slug}`} className="post-card-link">Read more &rarr;</Link>
      </div>
    </div>
  );
};

export default PostCard;
