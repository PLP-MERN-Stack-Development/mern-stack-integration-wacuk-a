import React from 'react';
import { Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';

const Home = () => {
  const { posts, loading } = useBlog();

  const quickResources = [
    {
      title: 'Emergency Shelter',
      description: 'Find safe accommodation across Kenya',
      link: '/resources',
      icon: '🏠'
    },
    {
      title: 'Legal Assistance',
      description: 'Free legal aid and support',
      link: '/resources',
      icon: '⚖️'
    },
    {
      title: 'Counseling Services',
      description: 'Professional psychological support',
      link: '/resources',
      icon: '💬'
    },
    {
      title: 'Medical Help',
      description: 'Healthcare services and support',
      link: '/resources',
      icon: '🏥'
    }
  ];

  return (
    <div className="container">
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '4rem 2rem',
        borderRadius: '10px',
        textAlign: 'center',
        marginBottom: '3rem'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          🛡️ SafeSpace Kenya
        </h1>
        <p style={{ fontSize: '1.3rem', marginBottom: '2rem', opacity: 0.9 }}>
          A safe platform for domestic violence survivors in Kenya to share stories, 
          find resources, and access support.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/share-story" className="btn" style={{ 
            backgroundColor: '#e74c3c', 
            color: 'white',
            padding: '12px 24px',
            fontSize: '1.1rem'
          }}>
            Share Your Story
          </Link>
          <Link to="/resources" className="btn" style={{ 
            backgroundColor: 'transparent', 
            color: 'white',
            border: '2px solid white',
            padding: '12px 24px',
            fontSize: '1.1rem'
          }}>
            Get Help Now
          </Link>
        </div>
      </section>

      {/* Quick Resources */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#2c3e50' }}>
          Quick Access to Help
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem'
        }}>
          {quickResources.map((resource, index) => (
            <Link 
              key={index}
              to={resource.link}
              style={{ textDecoration: 'none' }}
            >
              <div className="card" style={{ 
                textAlign: 'center',
                padding: '2rem 1rem',
                transition: 'transform 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                  {resource.icon}
                </div>
                <h3 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>
                  {resource.title}
                </h3>
                <p style={{ color: '#666' }}>
                  {resource.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Stories */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ color: '#2c3e50' }}>Recent Survivor Stories</h2>
          <Link to="/stories" style={{ color: '#e74c3c', textDecoration: 'none' }}>
            View All Stories →
          </Link>
        </div>

        {!loading && posts.length > 0 ? (
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {posts.slice(0, 3).map(post => (
              <div key={post._id} className="card">
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ 
                    backgroundColor: '#e74c3c', 
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}>
                    {post.authorRole?.replace('_', ' ').toUpperCase()}
                  </div>
                  {post.triggerWarning && (
                    <div style={{ 
                      backgroundColor: '#f39c12', 
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem'
                    }}>
                      ⚠️ TRIGGER WARNING
                    </div>
                  )}
                </div>
                
                <h3 style={{ margin: '1rem 0 0.5rem 0' }}>
                  <Link 
                    to={`/stories/${post._id}`}
                    style={{ color: '#2c3e50', textDecoration: 'none' }}
                  >
                    {post.title}
                  </Link>
                </h3>
                
                <p style={{ color: '#666', marginBottom: '1rem', lineHeight: '1.5' }}>
                  {post.excerpt || post.content.substring(0, 150)}...
                </p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#999', fontSize: '0.9rem' }}>
                    {post.isAnonymous ? 'Anonymous' : `By ${post.author}`} • 
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                  <Link 
                    to={`/stories/${post._id}`}
                    style={{ 
                      color: '#e74c3c', 
                      textDecoration: 'none',
                      fontWeight: 'bold'
                    }}
                  >
                    Read Story →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
            <h3 style={{ color: '#666', marginBottom: '1rem' }}>
              No stories yet
            </h3>
            <p style={{ color: '#999', marginBottom: '2rem' }}>
              Be the first to share your story and help others feel less alone
            </p>
            <Link to="/share-story" className="btn" style={{ 
              backgroundColor: '#e74c3c', 
              color: 'white' 
            }}>
              Share Your Story
            </Link>
          </div>
        )}
      </section>

      {/* Emergency Section */}
      <section style={{ 
        backgroundColor: '#fff3cd',
        border: '1px solid #ffeaa7',
        borderRadius: '8px',
        padding: '2rem',
        marginTop: '3rem',
        textAlign: 'center'
      }}>
        <h3 style={{ color: '#856404', marginBottom: '1rem' }}>
          🚨 In Immediate Danger?
        </h3>
        <p style={{ color: '#856404', marginBottom: '1.5rem' }}>
          If you are in immediate danger, please call emergency services first.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <div style={{ 
            backgroundColor: '#dc3545', 
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '8px',
            fontWeight: 'bold'
          }}>
            🚓 Police: <strong>999</strong>
          </div>
          <div style={{ 
            backgroundColor: '#e74c3c', 
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '8px',
            fontWeight: 'bold'
          }}>
            📞 GBV Hotline: <strong>1195</strong>
          </div>
          <div style={{ 
            backgroundColor: '#3498db', 
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '8px',
            fontWeight: 'bold'
          }}>
            👶 Childline: <strong>116</strong>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
