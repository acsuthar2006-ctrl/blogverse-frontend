/**
 * @file UserProfile.jsx
 * @description Public profile page for an author.
 */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axiosConfig';
import PostCard from '../components/PostCard';

const UserProfile = () => {
  const { username } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthorPosts = async () => {
      try {
        const response = await api.get(`/posts/author/${username}`);
        if (response.data && response.data.success) {
          setPosts(response.data.data.content || []);
        }
      } catch (err) {
        console.error('Failed to fetch author posts', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAuthorPosts();
  }, [username]);

  return (
    <div>
      <div className="hero-section" style={{ padding: '2rem 1rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--accent-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: 'white', marginBottom: '1rem' }}>
            {username.charAt(0).toUpperCase()}
          </div>
          <h2 style={{ margin: 0 }}>{username}'s Profile</h2>
          <p className="hero-subtitle" style={{ marginTop: '0.5rem' }}>
            {posts.length} published {posts.length === 1 ? 'post' : 'posts'}
          </p>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Recent Posts</h3>
        
        {loading ? (
          <div className="posts-grid">
            {[1, 2, 3].map(i => (
              <div key={i} className="skeleton-card">
                <div className="skeleton-line" style={{ height: '14px', width: '30%', marginBottom: '1rem', borderRadius: '4px' }}></div>
                <div className="skeleton-line" style={{ height: '24px', width: '80%', marginBottom: '0.75rem', borderRadius: '6px' }}></div>
                <div className="skeleton-line" style={{ height: '16px', width: '100%', marginBottom: '0.5rem', borderRadius: '4px' }}></div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">✍️</div>
            <h3>No posts yet</h3>
            <p>This author hasn't published anything yet.</p>
          </div>
        ) : (
          <div className="posts-grid">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
