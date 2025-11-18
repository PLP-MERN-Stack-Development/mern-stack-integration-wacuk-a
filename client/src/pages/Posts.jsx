import React from 'react';
import { Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';

const Posts = () => {
  const { posts, loading, error, deletePost } = useBlog();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(id);
      } catch (error) {
        alert('Error deleting post: ' + error.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Loading posts...</p>
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
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Blog Posts</h1>
        <Link to="/create-post" className="btn btn-primary">
          Create New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="card" style={{ textAlign: 'center' }}>
          <h3>No posts yet</h3>
          <p>Get started by creating your first blog post!</p>
          <Link to="/create-post" className="btn btn-primary">
            Create First Post
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {posts.map(post => (
            <div key={post._id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ marginBottom: '0.5rem' }}>
                    <Link 
                      to={`/posts/${post._id}`}
                      style={{ color: '#333', textDecoration: 'none' }}
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p style={{ color: '#666', marginBottom: '1rem' }}>
                    {post.excerpt || post.content.substring(0, 150)}...
                  </p>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <span style={{ color: '#999', fontSize: '0.9rem' }}>
                      By {post.author} • {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                    {post.categories && post.categories.length > 0 && (
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {post.categories.map(cat => (
                          <span 
                            key={cat._id}
                            style={{
                              backgroundColor: '#e9ecef',
                              padding: '2px 8px',
                              borderRadius: '12px',
                              fontSize: '0.8rem',
                              color: '#495057'
                            }}
                          >
                            {cat.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem' }}>
                  <Link 
                    to={`/edit-post/${post._id}`}
                    className="btn"
                    style={{ 
                      backgroundColor: '#28a745', 
                      color: 'white',
                      padding: '5px 10px',
                      fontSize: '12px'
                    }}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="btn btn-danger"
                    style={{ 
                      padding: '5px 10px',
                      fontSize: '12px'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;
