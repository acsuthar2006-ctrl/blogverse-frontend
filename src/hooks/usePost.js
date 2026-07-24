/**
 * @file usePost.js
 * @description Custom React hook that implements the Container/Presenter pattern
 * for a single blog post. Encapsulates data fetching, loading/error states,
 * and user actions (like, share) so the PostDetail component can focus
 * purely on rendering the UI.
 *
 * Usage:
 *   const { post, loading, error, likePost, sharePost } = usePost('my-slug');
 */
import { useState, useEffect } from 'react';
import postService from '../services/postService';

/**
 * Hook to fetch and interact with a single blog post.
 * @param {string} slug - The URL slug identifying the post.
 * @returns {{ post: Object|null, loading: boolean, error: string, likePost: Function, sharePost: Function }}
 */
export const usePost = (slug) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch post data on mount or when slug changes
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await postService.getPost(slug);
        setPost(data);
      } catch (err) {
        setError('Post not found');
      } finally {
        setLoading(false);
      }
    };
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  /**
   * Like the current post. Optimistically increments the UI counter.
   * @returns {Promise<{success: boolean, message?: string}>}
   */
  const likePost = async () => {
    try {
      await postService.likePost(slug);
      setPost((prev) => ({ ...prev, likesCount: (prev.likesCount || 0) + 1 }));
      return { success: true };
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        return { success: false, message: err.response.data.message };
      }
      return { success: false, message: 'You have already liked this post.' };
    }
  };

  /**
   * Share the current post. Optimistically increments the UI counter.
   * @returns {Promise<{success: boolean, message?: string}>}
   */
  const sharePost = async () => {
    try {
      await postService.sharePost(slug);
      setPost((prev) => ({ ...prev, sharesCount: (prev.sharesCount || 0) + 1 }));
      return { success: true };
    } catch (err) {
      return { success: false, message: 'Failed to share post' };
    }
  };

  return {
    post,
    loading,
    error,
    likePost,
    sharePost,
  };
};
