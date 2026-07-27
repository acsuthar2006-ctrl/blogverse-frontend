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
 * @returns {{ post: Object|null, loading: boolean, error: string }}
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
        console.error('Error fetching post:', err);
        setError('Post not found');
      } finally {
        setLoading(false);
      }
    };
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const handleLike = async () => {
    if (!post) return;
    const originalPost = { ...post };
    // Optimistic UI update
    setPost({ ...post, likesCount: (post.likesCount || 0) + 1 });
    try {
      await postService.api?.post(`/posts/${slug}/like`) || await fetch(`/api/v1/posts/${slug}/like`, { method: 'POST' });
    } catch (err) {
      console.error('Failed to like post:', err);
      // Revert if the backend doesn't support it yet
      setPost(originalPost);
    }
  };

  return {
    post,
    loading,
    error,
    handleLike
  };
};
