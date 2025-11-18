import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import { blogService } from '../services/blogService';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updatePost, categories } = useBlog();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    author: '',
    categories: [],
    tags: '',
    featuredImage: ''
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const postData = await blogService.getPost(id);
        setPost(postData.data);
        setFormData({
          title: postData.data.title,
          content: postData.data.content,
          excerpt: postData.data.excerpt || '',
          author: postData.data.author,
          categories: postData.data.categories?.map(cat => cat._id) || [],
          tags: postData.data.tags?.join(', ') || '',
          featuredImage: postData.data.featuredImage || ''
        });
      } catch (error) {
        alert('Error loading post: ' + error.message);
        navigate('/posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryChange = (categoryId) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const postData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      await updatePost(id, postData);
      navigate(`/posts/${id}`);
    } catch (error) {
      alert('Error updating post: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !post) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Loading post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ marginBottom: '2rem' }}>
        <h1>Edit Post</h1>
      </div>

      <form onSubmit={handleSubmit} className="card">
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author *</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="excerpt">Excerpt</label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content *</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows="10"
          />
        </div>

        {categories.length > 0 && (
          <div className="form-group">
            <label>Categories</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
              {categories.map(category => (
                <label key={category._id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="checkbox"
                    checked={formData.categories.includes(category._id)}
                    onChange={() => handleCategoryChange(category._id)}
                  />
                  <span>{category.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="Enter tags separated by commas"
          />
        </div>

        <div className="form-group">
          <label htmlFor="featuredImage">Featured Image URL</label>
          <input
            type="url"
            id="featuredImage"
            name="featuredImage"
            value={formData.featuredImage}
            onChange={handleChange}
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={() => navigate(`/posts/${id}`)}
            className="btn"
            style={{ backgroundColor: '#6c757d', color: 'white' }}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
