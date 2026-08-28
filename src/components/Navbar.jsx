/**
 * @file Navbar.jsx
 * @description Top navigation bar component.
 * Displays the BlogVerse brand, navigation links, and auth actions.
 * Uses `useLocation` from React Router to highlight the currently active tab.
 * Conditionally renders Dashboard/Logout (authenticated) or Login (guest).
 */
import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogIn, LogOut, PenTool, Home, Loader2 } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  
  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
    setIsLoggingOut(false);
  };
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="glass-panel navbar">
      <div>
        <Link to="/" className="navbar-brand">
          Blog<span>Verse</span>
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className={`nav-link ${currentPath === '/' ? 'active' : ''}`}>
          <Home size={16} /> Home
        </Link>
        {user ? (
          <>
            <Link to="/dashboard" className={`nav-link ${currentPath === '/dashboard' || currentPath === '/add-post' ? 'active' : ''}`}>
              <PenTool size={16} /> Dashboard
            </Link>
            <button onClick={handleLogout} className="nav-link nav-link-logout" disabled={isLoggingOut}>
              {isLoggingOut ? <Loader2 size={16} className="spin" /> : <LogOut size={16} />}
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </button>
          </>
        ) : (
          <Link to="/login" className={`nav-link ${currentPath === '/login' || currentPath === '/register' ? 'active' : ''}`}>
            <LogIn size={16} /> Login
          </Link>
        )}
      </div>

      {isLoggingOut && (
        <div className="full-page-loader">
          <Loader2 size={48} className="spin" />
          <span>Logging out...</span>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
