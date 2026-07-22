import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axiosConfig';

const PostDetail = () => {
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

  if (loading) return <div className="text-center mt-2">Loading post...</div>;
  if (error) return <div className="text-center mt-2 text-red-500">{error}</div>;
  if (!post) return null;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/" style={{ display: 'inline-block', marginBottom: '2rem' }}>&larr; Back to Home</Link>
      <div className="glass-panel">
        <h1 style={{ marginBottom: '1rem', fontSize: '2.5rem' }}>{post.title}</h1>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          <span>By {post.author.fullName}</span>
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
          style={{ lineHeight: '1.8', fontSize: '1.1rem' }} 
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
      </div>
    </div>
  );
};

export default PostDetail;
