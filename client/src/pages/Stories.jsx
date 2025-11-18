import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';

const Stories = () => {
  const { posts, loading, error, deletePost } = useBlog();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  // Filter posts based on search and filters
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = !selectedCategory || 
                             post.categories?.some(cat => cat._id === selectedCategory);
      
      const matchesRole = !selectedRole || post.authorRole === selectedRole;
      
      return matchesSearch && matchesCategory && matchesRole;
    });
  }, [posts, searchTerm, selectedCategory, selectedRole]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this story? This action cannot be undone.')) {
      try {
        await deletePost(id);
      } catch (error) {
        alert('Error deleting story: ' + error.message);
      }
    }
  };

  const getRoleBadge = (role) => {
    const roleConfig = {
      survivor: { label: 'SURVIVOR', color: '#e74c3c' },
      counselor: { label: 'COUNSELOR', color: '#3498db' },
      advocate: { label: 'ADVOCATE', color: '#9b59b6' },
      legal_expert: { label: 'LEGAL EXPERT', color: '#f39c12' },
      healthcare_worker: { label: 'HEALTHCARE', color: '#27ae60' }
    };
    
    const config = roleConfig[role] || { label: role.toUpperCase(), color: '#95a5a6' };
    
    return (
      <span style={{
        backgroundColor: config.color,
        color: 'white',
        padding: '2px 8px',
        borderRadius: '12px',
        fontSize: '0.7rem',
        fontWeight: 'bold'
      }}>
        {config.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📖</div>
          <p>Loading survivor stories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="card" style={{ color: '#dc3545', textAlign: 'center' }}>
          <h3>Error Loading Stories</h3>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="btn btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ 
        background: 'linear-gradient(135deg, #fd746c 0%, #ff9068 100%)',
        color: 'white',
        padding: '3rem 2rem',
        borderRadius: '10px',
        textAlign: 'center',
        marginBottom: '3rem'
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          📖 Survivor Stories
        </h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
          Real stories from survivors, advocates, and supporters across Kenya. 
          Your story matters.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          {/* Search Input */}
          <div className="form-group">
            <label htmlFor="search">Search Stories</label>
            <input
              type="text"
              id="search"
              placeholder="Search by title, content, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          {/* Category Filter */}
          <div className="form-group">
            <label htmlFor="category">Filter by Topic</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ width: '100%' }}
            >
              <option value="">All Topics</option>
              <option value="physical-violence">Physical Violence</option>
              <option value="emotional-abuse">Emotional Abuse</option>
              <option value="legal-support">Legal Support</option>
              <option value="recovery">Recovery Journey</option>
            </select>
          </div>

          {/* Role Filter */}
          <div className="form-group">
            <label htmlFor="role">Filter by Role</label>
            <select
              id="role"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              style={{ width: '100%' }}
            >
              <option value="">All Roles</option>
              <option value="survivor">Survivors</option>
              <option value="counselor">Counselors</option>
              <option value="advocate">Advocates</option>
              <option value="legal_expert">Legal Experts</option>
              <option value="healthcare_worker">Healthcare Workers</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
          <span style={{ color: '#666', fontSize: '0.9rem' }}>
            Showing {filteredPosts.length} of {posts.length} stories
            {searchTerm && ` for "${searchTerm}"`}
          </span>
          {(searchTerm || selectedCategory || selectedRole) && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
                setSelectedRole('');
              }}
              className="btn"
              style={{ backgroundColor: '#95a5a6', color: 'white', fontSize: '0.8rem' }}
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ color: '#2c3e50', margin: 0 }}>
            {filteredPosts.length} {filteredPosts.length === 1 ? 'Story' : 'Stories'} Found
          </h2>
          <p style={{ color: '#7f8c8d', margin: '0.5rem 0 0 0' }}>
            Stories of courage, resilience, and hope
          </p>
        </div>
        <Link to="/share-story" className="btn" style={{ 
          backgroundColor: '#e74c3c', 
          color: 'white',
          padding: '12px 24px',
          fontSize: '1rem'
        }}>
          ✍️ Share Your Story
        </Link>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
          <h3 style={{ color: '#2c3e50', marginBottom: '1rem' }}>
            No Stories Found
          </h3>
          <p style={{ color: '#7f8c8d', marginBottom: '2rem', fontSize: '1.1rem' }}>
            {posts.length === 0 
              ? 'Be the first to share your story and create a safe space for others to come forward.'
              : 'Try adjusting your search terms or filters to find more stories.'
            }
          </p>
          <Link to="/share-story" className="btn" style={{ 
            backgroundColor: '#e74c3c', 
            color: 'white',
            padding: '12px 30px',
            fontSize: '1.1rem'
          }}>
            Share Your Story
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {filteredPosts.map(post => (
            <div key={post._id} className="card" style={{ 
              borderLeft: `4px solid #e74c3c`,
              position: 'relative'
            }}>
              {/* Trigger Warning Overlay */}
              {post.triggerWarning && (
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  backgroundColor: '#f39c12',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '0.7rem',
                  fontWeight: 'bold'
                }}>
                  ⚠️ TRIGGER WARNING
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  {getRoleBadge(post.authorRole)}
                  {post.categories && post.categories.length > 0 && (
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {post.categories.map(cat => (
                        <span 
                          key={cat._id}
                          style={{
                            backgroundColor: '#ecf0f1',
                            color: '#2c3e50',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '0.7rem'
                          }}
                        >
                          {cat.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <h3 style={{ margin: '0 0 1rem 0', lineHeight: '1.3' }}>
                <Link 
                  to={`/stories/${post._id}`}
                  style={{ 
                    color: '#2c3e50', 
                    textDecoration: 'none',
                    fontSize: '1.3rem'
                  }}
                >
                  {post.title}
                </Link>
              </h3>
              
              <p style={{ 
                color: '#5d6d7e', 
                marginBottom: '1.5rem', 
                lineHeight: '1.6',
                fontSize: '1rem'
              }}>
                {post.excerpt || post.content.substring(0, 200)}...
              </p>

              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                paddingTop: '1rem',
                borderTop: '1px solid #ecf0f1'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>
                    {post.isAnonymous ? '🙍‍♂️ Anonymous' : `👤 By ${post.author}`}
                  </span>
                  <span style={{ color: '#bdc3c7', fontSize: '0.9rem' }}>
                    📅 {new Date(post.createdAt).toLocaleDateString('en-KE')}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Link 
                    to={`/stories/${post._id}`}
                    style={{ 
                      color: '#e74c3c', 
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      fontSize: '0.9rem'
                    }}
                  >
                    Read Full Story →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Support Reminder */}
      <div style={{ 
        backgroundColor: '#e8f4fd',
        border: '1px solid #b3d9ff',
        borderRadius: '8px',
        padding: '2rem',
        marginTop: '3rem',
        textAlign: 'center'
      }}>
        <h4 style={{ color: '#2980b9', marginBottom: '1rem' }}>
          💙 You Are Not Alone
        </h4>
        <p style={{ color: '#3498db', marginBottom: '1rem' }}>
          Reading these stories can be emotional. Remember that support is available.
        </p>
        <Link to="/resources" className="btn" style={{ 
          backgroundColor: '#3498db', 
          color: 'white' 
        }}>
          Find Support Resources
        </Link>
      </div>
    </div>
  );
};

export default Stories;
