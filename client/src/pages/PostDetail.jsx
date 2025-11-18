import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { blogService } from '../services/blogService';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  if (loading) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Loading post...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="card" style={{ color: '#dc3545' }}>
          <h3>Error</h3>
          <p>{error}</p>
          <Link to="/posts" className="btn btn-primary">
            Back to Posts
          </Link>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container">
        <div className="card">
          <h3>Post not found</h3>
          <Link to="/posts" className="btn btn-primary">
            Back to Posts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ marginBottom: '2rem' }}>
        <Link to="/posts" style={{ color: '#007bff', textDecoration: 'none' }}>
          ← Back to Posts
        </Link>
      </div>

      <article className="card">
        <header style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{post.title}</h1>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p style={{ color: '#666', marginBottom: '0.5rem' }}>
                By <strong>{post.author}</strong>
              </p>
              <p style={{ color: '#999', fontSize: '0.9rem' }}>
                Published on {new Date(post.createdAt).toLocaleDateString()} 
                {post.updatedAt !== post.createdAt && 
                  ` • Updated on ${new Date(post.updatedAt).toLocaleDateString()}`
                }
              </p>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link 
                to={`/edit-post/${post._id}`}
                className="btn"
                style={{ backgroundColor: '#28a745', color: 'white' }}
              >
                Edit Post
              </Link>
            </div>
          </div>
        </header>

        {post.categories && post.categories.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
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

        <div 
          style={{ 
            lineHeight: '1.6',
            fontSize: '1.1rem',
            color: '#333'
          }}
        >
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index} style={{ marginBottom: '1rem' }}>
              {paragraph}
            </p>
          ))}
        </div>

        {post.tags && post.tags.length > 0 && (
          <footer style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
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
          </footer>
        )}
      </article>
    </div>
  );
};

export default PostDetail;
