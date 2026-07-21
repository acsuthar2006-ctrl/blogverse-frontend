import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogIn, LogOut, PenTool } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', padding: '1rem 2rem' }}>
      <div>
        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
          Blog<span style={{ color: 'var(--accent-color)' }}>Verse</span>
        </Link>
      </div>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link to="/" style={{ fontWeight: '500' }}>Home</Link>
        {user ? (
          <>
            <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500' }}>
              <PenTool size={18} /> Dashboard
            </Link>
            <button 
              onClick={logout} 
              style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem' }}
            >
              <LogOut size={18} /> Logout
            </button>
          </>
        ) : (
          <Link to="/login" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500', color: 'var(--accent-color)' }}>
            <LogIn size={18} /> Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
