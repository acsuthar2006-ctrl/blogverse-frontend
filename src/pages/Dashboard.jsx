import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <div className="glass-panel">
        <h2>Dashboard</h2>
        <p>Welcome back, {user.username}! This is your author dashboard.</p>
        <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
          (Post creation and editing features will be added here in the future.)
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
