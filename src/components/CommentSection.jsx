/**
 * @file CommentSection.jsx
 * @description Comment thread component embedded within PostDetail.
 * Fetches and displays comments for a given post, and provides a form
 * to submit new comments. Uses skeleton loaders during fetch and
 * toast notifications for user feedback.
 *
 * @param {Object} props
 * @param {number} props.postId - The database ID of the parent post.
 */
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import api from '../api/axiosConfig';
import Button from './Button';
import { AuthContext } from '../context/AuthContext';

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { user } = useContext(AuthContext);

  /** Fetch all top-level comments for this post from the backend. */
  const fetchComments = useCallback(async () => {
    if (!postId) return;
    try {
      const response = await api.get(`/posts/${postId}/comments`);
      if (response.data && response.data.success) {
        setComments(response.data.data);
      }
    } catch (err) {
      console.error('Failed to load comments', err);
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  /**
   * Submit a new comment. Uses the authenticated user's username
   * or defaults to "Anonymous" for guest commenters.
   */
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
      toast.success('Comment posted!');
      fetchComments(); // Refresh the comment list
    } catch (err) {
      console.error('Failed to post comment', err);
      toast.error('Failed to post comment');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="comment-section">
      <h3>Comments ({comments.length})</h3>
      
      {/* Comment submission form */}
      <form onSubmit={handleSubmit} className="comment-form">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts..."
          rows={3}
          required
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Posting...' : 'Post Comment'}
          </Button>
        </div>
      </form>

      {/* Comment list with loading/empty states */}
      {loading ? (
        <div className="comment-list">
          {[1, 2].map(i => (
            <div key={i} className="comment-card">
              <div className="comment-header">
                <div className="skeleton-line" style={{ height: '14px', width: '25%' }}></div>
                <div className="skeleton-line" style={{ height: '14px', width: '15%' }}></div>
              </div>
              <div className="skeleton-line" style={{ height: '14px', width: '80%', marginBottom: '0.3rem' }}></div>
              <div className="skeleton-line" style={{ height: '14px', width: '60%' }}></div>
            </div>
          ))}
        </div>
      ) : comments.length === 0 ? (
        <p className="comment-empty">No comments yet. Be the first to share your thoughts!</p>
      ) : (
        <div className="comment-list">
          {comments.map((comment) => (
            <div key={comment.id} className="comment-card">
              <div className="comment-header">
                <span className="comment-author">{comment.authorName}</span>
                <span className="comment-date">
                  {new Date(comment.createdDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </span>
              </div>
              <p className="comment-content">{comment.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
