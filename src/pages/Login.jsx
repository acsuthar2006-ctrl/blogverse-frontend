import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import Button from '../components/Button';
import { Loader2 } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="glass-panel auth-panel">
        <div className="text-center">
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">Sign in to continue to your dashboard</p>
        </div>
        {error && <div className="form-error">{error}</div>}
        <form onSubmit={handleSubmit}>
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
            <label htmlFor="password">Password</label>
            <input 
              id="password" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter your password"
              required 
            />
          </div>
          <Button type="submit" className="btn-full" style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem', justifyContent: 'center' }} disabled={isLoading}>
            {isLoading && <Loader2 size={18} className="spin" />}
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
          <div className="auth-link">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
