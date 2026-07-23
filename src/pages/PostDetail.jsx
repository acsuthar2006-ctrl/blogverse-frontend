import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axiosConfig';
import Button from '../components/Button';
import CommentSection from '../components/CommentSection';
import { AuthContext } from '../context/AuthContext';

const PostDetail = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${slug}`);
        setPost(response.data.data);
      } catch (err) {
        setError('Post not found');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  const handleLike = async () => {
    if (!isAuthenticated) {
      alert('Please login to like this post');
      return;
    }
    try {
      await api.post(`/posts/${slug}/like`);
      setPost(prev => ({ ...prev, likesCount: prev.likesCount + 1 }));
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert('You have already liked this post.');
      }
    }
  };

  const handleShare = async () => {
    try {
      await api.post(`/posts/${slug}/share`);
      setPost(prev => ({ ...prev, sharesCount: prev.sharesCount + 1 }));
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to share', err);
    }
  };

  if (loading) return <div className="text-center mt-2">Loading post...</div>;
  if (error) return <div className="text-center mt-2 text-red-500">{error}</div>;
  if (!post) return null;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/" style={{ display: 'inline-block', marginBottom: '2rem', color: 'var(--text-primary)', textDecoration: 'none' }}>&larr; Back to Home</Link>
      <div className="glass-panel">
        <h1 style={{ marginBottom: '1rem', fontSize: '2.5rem' }}>{post.title}</h1>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          <span>By {post.authorSummary?.fullName || 'Unknown'}</span>
          <span>&bull;</span>
          <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString()}</span>
        </div>
        
        {post.tags && post.tags.length > 0 && (
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
            {post.tags.map(tag => (
              <span key={tag} style={{ background: 'var(--accent-color)', color: '#fff', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem' }}>
                {tag}
              </span>
            ))}
          </div>
        )}

        <div 
          style={{ lineHeight: '1.8', fontSize: '1.1rem', marginBottom: '3rem' }} 
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />

        <div style={{ display: 'flex', gap: '1rem', paddingBottom: '1rem' }}>
          <Button variant="outline" onClick={handleLike}>
            ❤️ Like ({post.likesCount || 0})
          </Button>
          <Button variant="outline" onClick={handleShare}>
            🔗 Share ({post.sharesCount || 0})
          </Button>
        </div>

        <CommentSection postId={post.id} />
      </div>
    </div>
  );
};

export default PostDetail;
