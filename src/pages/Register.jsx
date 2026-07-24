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
    <div className="auth-container">
      <div className="glass-panel auth-panel">
        <div className="text-center">
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">Join the BlogVerse community today</p>
        </div>
        {error && <div className="form-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
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
          <div className="form-group">
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
          <div className="form-group">
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
          <div className="form-group">
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
          <Button type="submit" className="btn-full" style={{ marginTop: '0.5rem' }}>Create Account</Button>
          <div className="auth-link">
            Already have an account? <Link to="/login">Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
