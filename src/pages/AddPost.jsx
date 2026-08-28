/**
 * @file AddPost.jsx
 * @description Page for creating a new blog post.
 * Provides a form with fields for title, summary, content, and publish status.
 * Redirects to the dashboard on successful creation.
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../api/axiosConfig';
import Button from '../components/Button';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('PUBLISHED');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /** Submit the new post to the backend. */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await api.post('/posts', {
        title,
        summary,
        content,
        categories: [],
        tags: []
      });

      // If user selected PUBLISHED, update it immediately to bypass backend DRAFT default
      if (status === 'PUBLISHED') {
        await api.put(`/posts/${response.data.data.slug}`, {
          title,
          summary,
          content,
          status: 'PUBLISHED',
          categories: [],
          tags: []
        });
      }
      
      if (response.data && response.data.success) {
        toast.success('Post created successfully!');
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
    <div className="add-post-container">
      <div className="glass-panel" style={{ padding: '2.5rem' }}>
        <h2 style={{ marginBottom: '0.5rem' }}>Create New Post</h2>
        <p style={{ marginBottom: '2rem' }}>Share your thoughts with the world.</p>
        
        {error && <div className="form-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="add-post-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input 
              id="title" 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Give your post a great title"
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="summary">Summary</label>
            <textarea 
              id="summary" 
              value={summary} 
              onChange={(e) => setSummary(e.target.value)} 
              placeholder="A short description to hook your readers"
              rows={2}
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <div className="quill-container" style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: '8px', overflow: 'hidden' }}>
              <ReactQuill 
                theme="snow"
                value={content} 
                onChange={setContent} 
                placeholder="Write your full post content here..."
                style={{ height: '300px', marginBottom: '40px' }}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select 
              id="status" 
              value={status} 
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="PUBLISHED">Publish Immediately</option>
              <option value="DRAFT">Save as Draft</option>
            </select>
          </div>
          <div className="add-post-actions">
            <Button type="button" variant="outline" onClick={() => navigate('/dashboard')}>Cancel</Button>
            <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Post'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
