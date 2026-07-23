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
import './index.css';

function App() {
  return (
    <AuthProvider>
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
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
