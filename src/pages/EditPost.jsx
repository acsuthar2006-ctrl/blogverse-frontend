/**
 * @file EditPost.jsx
 * @description Page for editing an existing blog post.
 */
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import postService from '../services/postService';
import Button from '../components/Button';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const EditPost = () => {
  const { slug } = useParams();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('PUBLISHED');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await postService.getPost(slug);
        setTitle(data.title);
        setSummary(data.summary || '');
        setContent(data.content);
        setStatus(data.status);
      } catch (err) {
        setError('Failed to load post. It may have been deleted.');
      } finally {
        setFetching(false);
      }
    };
    fetchPost();
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await postService.updatePost(slug, {
        title,
        summary,
        content,
        status,
        categories: [],
        tags: []
      });
      
      toast.success('Post updated successfully!');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to update post.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="add-post-container"><p>Loading...</p></div>;
  }

  return (
    <div className="add-post-container">
      <div className="glass-panel" style={{ padding: '2.5rem' }}>
        <h2 style={{ marginBottom: '0.5rem' }}>Edit Post</h2>
        <p style={{ marginBottom: '2rem' }}>Make changes to your article.</p>
        
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
            <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Changes'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
