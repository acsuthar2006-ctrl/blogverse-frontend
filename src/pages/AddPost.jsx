import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import Button from '../components/Button';

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('PUBLISHED');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await api.post('/posts', {
        title,
        summary,
        content,
        status,
        categories: [],
        tags: []
      });
      
      if (response.data && response.data.success) {
        navigate('/dashboard');
      } else {
        setError('Failed to create post. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to create post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
      <div className="glass-panel">
        <h2 className="mb-2">Create New Post</h2>
        {error && <div style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</div>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label htmlFor="title">Title</label>
            <input 
              id="title" 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Post title"
              required 
            />
          </div>
          <div>
            <label htmlFor="summary">Summary</label>
            <textarea 
              id="summary" 
              value={summary} 
              onChange={(e) => setSummary(e.target.value)} 
              placeholder="Short summary of the post"
              rows={2}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-primary)', outline: 'none', transition: 'border-color 0.3s' }}
            />
          </div>
          <div>
            <label htmlFor="content">Content</label>
            <textarea 
              id="content" 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              placeholder="Write your full post content here..."
              rows={10}
              required
              style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-primary)', outline: 'none', transition: 'border-color 0.3s' }}
            />
          </div>
          <div>
            <label htmlFor="status">Status</label>
            <select 
              id="status" 
              value={status} 
              onChange={(e) => setStatus(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-primary)', outline: 'none', transition: 'border-color 0.3s' }}
            >
              <option value="PUBLISHED" style={{ color: '#000' }}>Publish Immediately</option>
              <option value="DRAFT" style={{ color: '#000' }}>Save as Draft</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <Button type="button" variant="outline" onClick={() => navigate('/dashboard')}>Cancel</Button>
            <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Post'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
