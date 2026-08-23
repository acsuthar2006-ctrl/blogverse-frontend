import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import PostCard from '../components/PostCard';
import InfiniteScroll from 'react-infinite-scroll-component';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [sortBy, setSortBy] = useState('publishedAt,desc');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get(`/posts?page=${page}&size=6&sort=${sortBy}`);
        if (response.data && response.data.data) {
          const newPosts = response.data.data.content || [];
          setPosts(prev => {
            if (page === 0) return newPosts;
            const existingIds = new Set(prev.map(p => p.id));
            const uniqueNewPosts = newPosts.filter(p => !existingIds.has(p.id));
            return [...prev, ...uniqueNewPosts];
          });
          setHasMore(!response.data.data.last);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [page, sortBy]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setPosts([]);
    setPage(0);
    setHasMore(true);
    setLoading(true);
  };

  if (loading && page === 0) {
    return (
      <div>
        <div className="hero-section">
          <div className="skeleton-line" style={{ height: '48px', width: '60%', margin: '0 auto 1rem', borderRadius: '12px' }}></div>
          <div className="skeleton-line" style={{ height: '20px', width: '40%', margin: '0 auto 2rem', borderRadius: '8px' }}></div>
          <div className="skeleton-line" style={{ height: '3px', width: '60px', margin: '0 auto', borderRadius: '2px' }}></div>
        </div>
        <div className="skeleton-grid">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="skeleton-card">
              <div className="skeleton-line" style={{ height: '14px', width: '30%', marginBottom: '1rem', borderRadius: '4px' }}></div>
              <div className="skeleton-line" style={{ height: '24px', width: '80%', marginBottom: '0.75rem', borderRadius: '6px' }}></div>
              <div className="skeleton-line" style={{ height: '16px', width: '100%', marginBottom: '0.5rem', borderRadius: '4px' }}></div>
              <div className="skeleton-line" style={{ height: '16px', width: '90%', marginBottom: '1.5rem', borderRadius: '4px' }}></div>
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                <div className="skeleton-line" style={{ height: '14px', width: '25%', borderRadius: '4px' }}></div>
                <div className="skeleton-line" style={{ height: '14px', width: '20%', borderRadius: '4px' }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="hero-section">
        <h1>Welcome to BlogVerse</h1>
        <p className="hero-subtitle">
          Discover fresh perspectives, share your ideas, and connect with a community of passionate writers.
        </p>
        <div className="hero-divider"></div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Sort by:</span>
        <select 
          value={sortBy} 
          onChange={handleSortChange}
          style={{ 
            padding: '0.4rem 0.8rem', 
            borderRadius: '6px', 
            background: 'rgba(255,255,255,0.05)', 
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)',
            outline: 'none',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          <option value="publishedAt,desc" style={{ color: 'black' }}>Recent</option>
        </select>
      </div>

      {posts.length === 0 && !loading ? (
        <div className="glass-panel empty-state">
          <div className="empty-state-icon">📝</div>
          <h3>No posts yet</h3>
          <p>Be the first to share something amazing with the community.</p>
        </div>
      ) : (
        <InfiniteScroll
          dataLength={posts.length}
          next={() => setPage(prev => prev + 1)}
          hasMore={hasMore}
          loader={<div style={{ textAlign: 'center', padding: '1rem', color: 'var(--text-muted)' }}>Loading more posts...</div>}
          endMessage={
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
              <b>You have seen all posts!</b>
            </div>
          }
          style={{ overflow: 'visible' }}
        >
          <div className="posts-grid">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Home;
