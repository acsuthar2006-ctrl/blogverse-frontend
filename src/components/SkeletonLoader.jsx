import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="post-detail-container" style={{ paddingTop: '1rem' }}>
      {/* Back link skeleton */}
      <div className="skeleton-line" style={{ height: '18px', width: '120px', marginBottom: '2rem', borderRadius: '8px' }}></div>
      
      <div className="glass-panel" style={{ padding: '2.5rem' }}>
        {/* Title */}
        <div className="skeleton-line" style={{ height: '40px', width: '75%', marginBottom: '1.5rem' }}></div>
        
        {/* Meta */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
          <div className="skeleton-line" style={{ height: '16px', width: '120px' }}></div>
          <div className="skeleton-line" style={{ height: '16px', width: '100px' }}></div>
        </div>
        
        {/* Content lines */}
        <div className="skeleton-line" style={{ height: '18px', width: '100%', marginBottom: '1rem' }}></div>
        <div className="skeleton-line" style={{ height: '18px', width: '95%', marginBottom: '1rem' }}></div>
        <div className="skeleton-line" style={{ height: '18px', width: '88%', marginBottom: '1rem' }}></div>
        <div className="skeleton-line" style={{ height: '18px', width: '92%', marginBottom: '1rem' }}></div>
        <div className="skeleton-line" style={{ height: '18px', width: '78%', marginBottom: '3rem' }}></div>
        
        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '1rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
          <div className="skeleton-line" style={{ height: '42px', width: '130px', borderRadius: '8px' }}></div>
          <div className="skeleton-line" style={{ height: '42px', width: '130px', borderRadius: '8px' }}></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
