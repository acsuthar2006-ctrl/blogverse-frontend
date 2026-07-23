import React, { useState, useEffect, useContext } from 'react';
import api from '../api/axiosConfig';
import Button from './Button';
import { AuthContext } from '../context/AuthContext';

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { user } = useContext(AuthContext);

  const fetchComments = async () => {
    try {
      const response = await api.get(`/posts/${postId}/comments`);
      if (response.data && response.data.success) {
        setComments(response.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch comments', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    setSubmitting(true);
    try {
      await api.post(`/posts/${postId}/comments`, {
        content: newComment,
        authorName: user ? user.username : 'Anonymous',
        authorEmail: user ? user.username : 'anonymous@example.com'
      });
      setNewComment('');
      fetchComments();
    } catch (err) {
      console.error('Failed to post comment', err);
      alert('Failed to post comment');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
      <h3>Comments ({comments.length})</h3>
      
      <form onSubmit={handleSubmit} style={{ margin: '1.5rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Leave a comment..."
          rows={3}
          required
          style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-primary)', outline: 'none' }}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Posting...' : 'Post Comment'}
          </Button>
        </div>
      </form>

      {loading ? (
        <p>Loading comments...</p>
      ) : comments.length === 0 ? (
        <p style={{ color: 'var(--text-secondary)' }}>No comments yet. Be the first to share your thoughts!</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {comments.map((comment) => (
            <div key={comment.id} style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                <strong>{comment.authorName}</strong>
                <span style={{ color: 'var(--text-secondary)' }}>
                  {new Date(comment.createdDate).toLocaleDateString()}
                </span>
              </div>
              <p style={{ margin: 0, lineHeight: 1.5 }}>{comment.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
