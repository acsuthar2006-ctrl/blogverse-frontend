/**
 * @file postService.js
 * @description Service layer that abstracts all Post-related API calls.
 * Components and hooks should call these methods instead of using `api`
 * directly, keeping API route definitions in a single place.
 *
 * Pattern: Service Object — each method maps to one backend endpoint.
 */
import api from '../api/axiosConfig';

const postService = {
  /**
   * Fetch a single post by its URL slug.
   * @param {string} slug - The unique URL-friendly identifier for the post.
   * @returns {Promise<Object>} The full post data (PostResponse DTO).
   */
  getPost: async (slug) => {
    const response = await api.get(`/posts/${slug}`);
    return response.data.data;
  },

  /**
   * Create a new blog post.
   * @param {Object} postData - The post payload (title, summary, content, status, categories, tags).
   * @returns {Promise<Object>} The created post data.
   */
  createPost: async (postData) => {
    const response = await api.post('/posts', postData);
    return response.data.data;
  },

  /**
   * Update an existing blog post.
   * @param {string} slug - The post's slug.
   * @param {Object} postData - The post payload.
   * @returns {Promise<Object>} The updated post data.
   */
  updatePost: async (slug, postData) => {
    const response = await api.put(`/posts/${slug}`, postData);
    return response.data.data;
  }
};

export default postService;
