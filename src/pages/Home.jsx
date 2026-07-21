import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import PostCard from '../components/PostCard';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');
        // The backend returns Page<PostSummaryResponse> in ApiResponse.data
        if (response.data && response.data.data && response.data.data.content) {
          setPosts(response.data.data.content);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return <div className="text-center mt-2">Loading posts...</div>;
  }

  return (
    <div>
      <div className="text-center mb-2">
        <h2>Latest from the Blog</h2>
        <p>Discover fresh perspectives and insights.</p>
      </div>
      
      {posts.length === 0 ? (
        <div className="glass-panel text-center">No posts found.</div>
      ) : (
        <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
