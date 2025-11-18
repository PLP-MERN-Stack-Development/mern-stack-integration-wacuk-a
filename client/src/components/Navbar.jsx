import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const navStyle = {
    backgroundColor: '#2c3e50',
    padding: '1rem 0',
    marginBottom: '0'
  };

  const linkStyle = (isActive) => ({
    color: isActive ? '#e74c3c' : 'white',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    backgroundColor: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
    transition: 'all 0.3s ease'
  });

  return (
    <nav style={navStyle}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Link 
            to="/" 
            style={{
              color: 'white',
              textDecoration: 'none',
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}
          >
            🛡️ SafeSpace Kenya
          </Link>
          
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Link to="/" style={linkStyle(location.pathname === '/')}>
              Home
            </Link>
            <Link to="/stories" style={linkStyle(location.pathname === '/stories')}>
              Survivor Stories
            </Link>
            <Link to="/share-story" style={linkStyle(location.pathname === '/share-story')}>
              Share Your Story
            </Link>
            <Link to="/resources" style={linkStyle(location.pathname === '/resources')}>
              Help Resources
            </Link>
            <Link to="/about" style={linkStyle(location.pathname === '/about')}>
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
