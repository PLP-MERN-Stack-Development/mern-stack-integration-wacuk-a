import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { blogService } from '../services/blogService';
import { useBlog } from '../context/BlogContext';

const StoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { deletePost } = useBlog();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const postData = await blogService.getPost(id);
        setPost(postData.data);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this story? This action cannot be undone.')) {
      try {
        await deletePost(id);
        navigate('/stories');
      } catch (error) {
        alert('Error deleting story: ' + error.message);
      }
    }
  };

  const getRoleBadge = (role) => {
    const roleConfig = {
      survivor: { label: 'SURVIVOR', color: '#e74c3c', description: 'Personal Experience' },
      counselor: { label: 'COUNSELOR', color: '#3498db', description: 'Mental Health Professional' },
      advocate: { label: 'ADVOCATE', color: '#9b59b6', description: 'GBV Prevention Advocate' },
      legal_expert: { label: 'LEGAL EXPERT', color: '#f39c12', description: 'Legal Assistance' },
      healthcare_worker: { label: 'HEALTHCARE', color: '#27ae60', description: 'Medical Professional' }
    };
    
    const config = roleConfig[role] || { label: role.toUpperCase(), color: '#95a5a6', description: '' };
    
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
        <span style={{
          backgroundColor: config.color,
          color: 'white',
          padding: '4px 12px',
          borderRadius: '16px',
          fontSize: '0.8rem',
          fontWeight: 'bold'
        }}>
          {config.label}
        </span>
        <span style={{ color: '#666', fontSize: '0.9rem' }}>
          {config.description}
        </span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📖</div>
          <p>Loading story...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="card" style={{ color: '#dc3545', textAlign: 'center' }}>
          <h3>Error Loading Story</h3>
          <p>{error}</p>
          <Link to="/stories" className="btn btn-primary">
            Back to Stories
          </Link>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container">
        <div className="card" style={{ textAlign: 'center' }}>
          <h3>Story Not Found</h3>
          <p>The story you're looking for doesn't exist or may have been removed.</p>
          <Link to="/stories" className="btn btn-primary">
            Back to Stories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Navigation */}
      <div style={{ marginBottom: '2rem' }}>
        <Link to="/stories" style={{ color: '#007bff', textDecoration: 'none' }}>
          ← Back to All Stories
        </Link>
      </div>

      {/* Trigger Warning Modal */}
      {post.triggerWarning && (
        <div style={{
          backgroundColor: 'rgba(243, 156, 18, 0.1)',
          border: '2px solid #f39c12',
          borderRadius: '8px',
          padding: '1.5rem',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#e67e22', marginBottom: '0.5rem' }}>
            ⚠️ Trigger Warning
          </h3>
          <p style={{ color: '#e67e22', margin: 0 }}>
            This story contains content that may be triggering for some readers. 
            Please prioritize your well-being while reading.
          </p>
        </div>
      )}

      <article className="card">
        {/* Header */}
        <header style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div>
              {getRoleBadge(post.authorRole)}
            </div>
            {post.triggerWarning && (
              <span style={{
                backgroundColor: '#f39c12',
                color: 'white',
                padding: '4px 12px',
                borderRadius: '16px',
                fontSize: '0.8rem',
                fontWeight: 'bold'
              }}>
                ⚠️ TRIGGER WARNING
              </span>
            )}
          </div>

          <h1 style={{ 
            fontSize: '2.5rem', 
            marginBottom: '1rem',
            color: '#2c3e50',
            lineHeight: '1.2'
          }}>
            {post.title}
          </h1>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            padding: '1rem 0',
            borderTop: '1px solid #ecf0f1',
            borderBottom: '1px solid #ecf0f1'
          }}>
            <div>
              <p style={{ color: '#666', marginBottom: '0.3rem' }}>
                By <strong>{post.isAnonymous ? 'Anonymous' : post.author}</strong>
              </p>
              <p style={{ color: '#999', fontSize: '0.9rem', margin: 0 }}>
                Published on {new Date(post.createdAt).toLocaleDateString('en-KE', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
                {post.updatedAt !== post.createdAt && 
                  ` • Updated on ${new Date(post.updatedAt).toLocaleDateString('en-KE')}`
                }
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Link 
                to={`/edit-story/${post._id}`}
                className="btn"
                style={{ 
                  backgroundColor: '#3498db', 
                  color: 'white',
                  fontSize: '0.9rem'
                }}
              >
                Edit Story
              </Link>
              <button
                onClick={handleDelete}
                className="btn btn-danger"
                style={{ fontSize: '0.9rem' }}
              >
                Delete Story
              </button>
            </div>
          </div>
        </header>

        {/* Categories and Tags */}
        {(post.categories?.length > 0 || post.tags?.length > 0) && (
          <div style={{ marginBottom: '2rem' }}>
            {post.categories && post.categories.length > 0 && (
              <div style={{ marginBottom: '1rem' }}>
                <strong style={{ color: '#2c3e50' }}>Related Topics: </strong>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                  {post.categories.map(cat => (
                    <span 
                      key={cat._id}
                      style={{
                        backgroundColor: '#007bff',
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '16px',
                        fontSize: '0.8rem'
                      }}
                    >
                      {cat.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {post.tags && post.tags.length > 0 && (
              <div>
                <strong style={{ color: '#2c3e50' }}>Tags: </strong>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                  {post.tags.map((tag, index) => (
                    <span 
                      key={index}
                      style={{
                        backgroundColor: '#e9ecef',
                        color: '#495057',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '0.8rem'
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Featured Image */}
        {post.featuredImage && (
          <div style={{ marginBottom: '2rem' }}>
            <img 
              src={post.featuredImage} 
              alt={post.title}
              style={{ 
                width: '100%', 
                maxHeight: '400px', 
                objectFit: 'cover',
                borderRadius: '8px'
              }}
            />
          </div>
        )}

        {/* Story Content */}
        <div 
          style={{ 
            lineHeight: '1.8',
            fontSize: '1.1rem',
            color: '#2c3e50'
          }}
        >
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index} style={{ marginBottom: '1.5rem' }}>
              {paragraph}
            </p>
          ))}
        </div>

        {/* Support Resources Section */}
        <div style={{ 
          backgroundColor: '#e8f4fd',
          border: '1px solid #b3d9ff',
          borderRadius: '8px',
          padding: '2rem',
          marginTop: '3rem'
        }}>
          <h3 style={{ color: '#2980b9', marginBottom: '1rem', textAlign: 'center' }}>
            💙 Support is Available
          </h3>
          <p style={{ color: '#3498db', textAlign: 'center', marginBottom: '1.5rem' }}>
            Remember that you are not alone. Help is available whenever you're ready.
          </p>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📞</div>
              <strong>GBV Hotline</strong>
              <div style={{ color: '#e74c3c', fontWeight: 'bold' }}>1195</div>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🚓</div>
              <strong>Police Emergency</strong>
              <div style={{ color: '#e74c3c', fontWeight: 'bold' }}>999</div>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>👶</div>
              <strong>Childline Kenya</strong>
              <div style={{ color: '#e74c3c', fontWeight: 'bold' }}>116</div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <Link to="/resources" className="btn" style={{ 
              backgroundColor: '#3498db', 
              color: 'white' 
            }}>
              Find More Resources
            </Link>
          </div>
        </div>

        {/* Author's Note */}
        <footer style={{ 
          marginTop: '3rem',
          paddingTop: '2rem',
          borderTop: '2px solid #ecf0f1',
          textAlign: 'center'
        }}>
          <p style={{ 
            color: '#7f8c8d', 
            fontStyle: 'italic',
            fontSize: '0.9rem'
          }}>
            Thank you for reading this story. Every story shared helps break the silence 
            and creates a safer Kenya for all.
          </p>
        </footer>
      </article>

      {/* Navigation to other stories */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
        <Link to="/stories" className="btn" style={{ backgroundColor: '#95a5a6', color: 'white' }}>
          ← Back to All Stories
        </Link>
        <Link to="/share-story" className="btn" style={{ backgroundColor: '#e74c3c', color: 'white' }}>
          Share Your Story →
        </Link>
      </div>
    </div>
  );
};

export default StoryDetail;
