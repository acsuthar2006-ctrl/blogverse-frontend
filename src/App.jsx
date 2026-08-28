import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PostDetail from './pages/PostDetail';
import Dashboard from './pages/Dashboard';
import AddPost from './pages/AddPost';
import EditPost from './pages/EditPost';
import UserProfile from './pages/UserProfile';
import { Toaster } from 'react-hot-toast';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: '#1a1d26',
            color: '#f0f2f5',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            fontSize: '0.9rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          },
          success: {
            iconTheme: { primary: '#22c55e', secondary: '#1a1d26' },
          },
          error: {
            iconTheme: { primary: '#ef4444', secondary: '#1a1d26' },
          },
        }}
      />
      <Router>
        <div className="bg-gradient-blob"></div>
        <div className="bg-gradient-blob-2"></div>
        
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
          <Navbar />
          
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/post/:slug" element={<PostDetail />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/add-post" element={<AddPost />} />
              <Route path="/edit-post/:slug" element={<EditPost />} />
              <Route path="/author/:username" element={<UserProfile />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
