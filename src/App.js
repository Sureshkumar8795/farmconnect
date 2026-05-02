import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Jobs from './components/Jobs';
import Workers from './components/Workers';
import Chat from './components/Chat';
import Profile from './components/Profile';

function App() {
  return (
    <BrowserRouter>
      <nav style={{
        background: '#2d6a4f',
        padding: '15px 20px',
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap'
      }}>
        <Link to="/" style={{ color: 'white',
          textDecoration: 'none',
          fontWeight: 'bold' }}>🌾 Jobs</Link>
        <Link to="/workers" style={{ color: 'white',
          textDecoration: 'none',
          fontWeight: 'bold' }}>👷 Workers</Link>
        <Link to="/chat" style={{ color: 'white',
          textDecoration: 'none',
          fontWeight: 'bold' }}>💬 Chat</Link>
        <Link to="/profile" style={{ color: 'white',
          textDecoration: 'none',
          fontWeight: 'bold' }}>👤 Profile</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Jobs />} />
        <Route path="/workers" element={<Workers />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;