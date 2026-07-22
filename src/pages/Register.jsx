import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import Button from '../components/Button';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  
  const { register, user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    const success = await register(username, email, password, fullName);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Registration failed. Username or email might be taken.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto' }}>
      <div className="glass-panel">
        <h2 className="text-center mb-2">Create Account</h2>
        {error && <div style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="fullName">Full Name</label>
            <input 
              id="fullName" 
              type="text" 
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)} 
              placeholder="Enter your full name"
              required 
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="email">Email</label>
            <input 
              id="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter your email"
              required 
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="username">Username</label>
            <input 
              id="username" 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Choose a username"
              required 
            />
          </div>
          <div style={{ marginBottom: '2rem' }}>
            <label htmlFor="password">Password</label>
            <input 
              id="password" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="At least 8 characters"
              required 
              minLength={8}
            />
          </div>
          <Button type="submit" style={{ width: '100%', marginBottom: '1rem' }}>Sign Up</Button>
          <div className="text-center" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Already have an account? <Link to="/login">Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
