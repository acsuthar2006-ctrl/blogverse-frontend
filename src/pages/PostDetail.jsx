/**
 * @file PostDetail.jsx
 * @description Full blog post page (Presenter component).
 * Delegates all data fetching and state management to the `usePost` custom hook
 * (Container/Presenter pattern). Renders the post title, meta info, sanitized
 * HTML content, like/share actions, and a comment thread.
 *
 * Security: Post content is sanitized through DOMPurify before rendering
 * via `dangerouslySetInnerHTML` to prevent XSS attacks.
 */
import React, { useContext } from 'react';
import { Heart, Share2 } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { toast } from 'react-hot-toast';
import Button from '../components/Button';
import CommentSection from '../components/CommentSection';
import SkeletonLoader from '../components/SkeletonLoader';
import { AuthContext } from '../context/AuthContext';
import { usePost } from '../hooks/usePost';

const PostDetail = () => {
  const { user } = useContext(AuthContext);
  const { slug } = useParams();
  const { post, loading, error, likePost, sharePost } = usePost(slug);

  /** Like handler — requires authentication, shows toast feedback. */
  const handleLike = async () => {
    if (!user) {
      toast.error('Please login to like this post');
      return;
    }
    const result = await likePost();
    if (!result.success) {
      toast.error(result.message || 'Error liking post');
    }
  };

  /** Share handler — copies URL to clipboard and shows toast. */
  const handleShare = async () => {
    const result = await sharePost();
    if (result.success) {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    } else {
      toast.error(result.message || 'Error sharing post');
    }
  };

  // Loading & error states
  if (loading) return <SkeletonLoader />;
  if (error) return <div className="text-center mt-2" style={{ color: 'var(--danger-color)' }}>{error}</div>;
  if (!post) return null;

  return (
    <div className="post-detail-container">
      <Link to="/" className="back-link">&larr; Back to Home</Link>
      <div className="glass-panel" style={{ padding: '2.5rem' }}>
        <h1 className="post-detail-title">{post.title}</h1>
        <div className="post-detail-meta">
          <span>
            By {post.authorSummary?.username ? (
              <Link to={`/author/${post.authorSummary.username}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                {post.authorSummary.fullName || post.authorSummary.username}
              </Link>
            ) : 'Unknown'}
          </span>
          <span>&bull;</span>
          <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
        </div>
        
        {/* Tag pills */}
        {post.tags && post.tags.length > 0 && (
          <div className="post-detail-tags">
            {post.tags.map(tag => (
              <span key={tag} className="tag-pill">{tag}</span>
            ))}
          </div>
        )}

        {/* Sanitized HTML content — XSS safe via DOMPurify */}
        <div 
          className="post-detail-content"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }} 
        />

        {/* Like & Share actions */}
        <div className="post-detail-actions">
          <Button onClick={handleLike} className="btn-outline">
            <Heart size={16} /> Like ({post.likesCount || 0})
          </Button>
          <Button onClick={handleShare} className="btn-outline">
            <Share2 size={16} /> Share ({post.sharesCount || 0})
          </Button>
        </div>

        <CommentSection postId={post.id} />
      </div>
    </div>
  );
};

export default PostDetail;
