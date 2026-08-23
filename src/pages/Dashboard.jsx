/**
 * @file Dashboard.jsx
 * @description Authenticated user's dashboard page.
 * Displays aggregate statistics (total posts, published, drafts),
 * a list of the user's posts with status badges, and actions to
 * create or delete posts. Redirects to /login if not authenticated.
 */
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import api from '../api/axiosConfig';
import { toast } from 'react-hot-toast';
import Button from '../components/Button';
import { Plus, Trash2, Edit } from 'lucide-react';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  /** Fetch all posts authored by the current user. */
  const fetchMyPosts = useCallback(async () => {
    if (!user) return;
    try {
      const response = await api.get('/posts/me');
      if (response.data && response.data.success) {
        setPosts(response.data.data.content || []);
      }
    } catch (err) {
      console.error('Failed to fetch posts', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchMyPosts();
  }, [fetchMyPosts]);

  /**
   * Delete a post by slug after user confirmation.
   * Refreshes the post list on success.
   */
  const handleDelete = async (slug) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await api.delete(`/posts/${slug}`);
      toast.success('Post deleted successfully');
      fetchMyPosts();
    } catch (err) {
      console.error('Failed to delete post', err);
      toast.error('Failed to delete post.');
    }
  };

  // Guard: redirect unauthenticated users to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Derived statistics
  const publishedCount = posts.filter(p => p.status === 'PUBLISHED').length;
  const draftCount = posts.filter(p => p.status === 'DRAFT').length;

  return (
    <div>
      {/* Dashboard header with stats */}
      <div className="glass-panel dashboard-header">
        <div className="dashboard-header-top">
          <div>
            <h2 style={{ marginBottom: '0.25rem' }}>Dashboard</h2>
            <p className="dashboard-welcome">Welcome back, {user.username}</p>
          </div>
          <Link to="/add-post">
            <Button><Plus size={16} /> New Post</Button>
          </Link>
        </div>
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-value">{posts.length}</div>
            <div className="stat-label">Total Posts</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{publishedCount}</div>
            <div className="stat-label">Published</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{draftCount}</div>
            <div className="stat-label">Drafts</div>
          </div>
        </div>
      </div>

      {/* Post list */}
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Your Posts</h3>
        {loading ? (
          <div className="dashboard-post-list">
            {[1, 2, 3].map(i => (
              <div key={i} className="dashboard-post-row">
                <div style={{ flex: 1 }}>
                  <div className="skeleton-line" style={{ height: '18px', width: '60%', marginBottom: '0.5rem' }}></div>
                  <div className="skeleton-line" style={{ height: '14px', width: '30%' }}></div>
                </div>
                <div className="skeleton-line" style={{ height: '36px', width: '80px', borderRadius: '8px' }}></div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">✍️</div>
            <h3>No posts yet</h3>
            <p>Start writing your first post and share it with the world.</p>
          </div>
        ) : (
          <div className="dashboard-post-list">
            {posts.map((post) => (
              <div key={post.id} className="dashboard-post-row">
                <div className="dashboard-post-info">
                  <h4>
                    <Link to={`/post/${post.slug}`}>{post.title}</Link>
                  </h4>
                  <div className="dashboard-post-meta">
                    <span>{new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    <span className={`status-badge ${post.status?.toLowerCase()}`}>
                      <span className={`status-dot ${post.status?.toLowerCase()}`}></span>
                      {post.status}
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Link to={`/edit-post/${post.slug}`}>
                    <Button variant="outline">
                      <Edit size={14} /> Edit
                    </Button>
                  </Link>
                  <Button variant="danger" onClick={() => handleDelete(post.slug)}>
                    <Trash2 size={14} /> Delete
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
