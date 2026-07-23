import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import api from '../api/axiosConfig';
import Button from '../components/Button';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyPosts = async () => {
    if (!user) return;
    try {
      const response = await api.get(`/posts/author/${user.username}`);
      if (response.data && response.data.success) {
        setPosts(response.data.data.content || []);
      }
    } catch (err) {
      console.error('Failed to fetch posts', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, [user]);

  const handleDelete = async (slug) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await api.delete(`/posts/${slug}`);
      fetchMyPosts(); // Refresh the list
    } catch (err) {
      console.error('Failed to delete post', err);
      alert('Failed to delete post.');
    }
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <div className="glass-panel" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2>Your Dashboard</h2>
          <Link to="/add-post">
            <Button>Create New Post</Button>
          </Link>
        </div>
        <p>Welcome back, {user.username}!</p>
      </div>

      <div className="glass-panel">
        <h3 className="mb-2">Your Published Posts</h3>
        {loading ? (
          <p>Loading posts...</p>
        ) : posts.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)' }}>You haven't written any posts yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {posts.map((post) => (
              <div key={post.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
                <div>
                  <h4 style={{ margin: '0 0 0.5rem 0' }}><Link to={`/post/${post.slug}`} style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>{post.title}</Link></h4>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {new Date(post.createdAt).toLocaleDateString()} &middot; {post.status}
                  </div>
                </div>
                <div>
                  <Button variant="outline" onClick={() => handleDelete(post.slug)} style={{ borderColor: '#ef4444', color: '#ef4444' }}>
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
