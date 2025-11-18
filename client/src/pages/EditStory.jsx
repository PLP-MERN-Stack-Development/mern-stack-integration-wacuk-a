import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import { blogService } from '../services/blogService';

const EditStory = () => {
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
    authorRole: 'survivor',
    categories: [],
    tags: '',
    featuredImage: '',
    isAnonymous: false,
    triggerWarning: false
  });

  const authorRoles = [
    { value: 'survivor', label: 'Survivor', description: 'Sharing personal experience' },
    { value: 'counselor', label: 'Counselor', description: 'Professional mental health support' },
    { value: 'advocate', label: 'Advocate', description: 'Working in GBV prevention' },
    { value: 'legal_expert', label: 'Legal Expert', description: 'Providing legal assistance' },
    { value: 'healthcare_worker', label: 'Healthcare Worker', description: 'Medical professional' }
  ];

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
          authorRole: postData.data.authorRole || 'survivor',
          categories: postData.data.categories?.map(cat => cat._id) || [],
          tags: postData.data.tags?.join(', ') || '',
          featuredImage: postData.data.featuredImage || '',
          isAnonymous: postData.data.isAnonymous || false,
          triggerWarning: postData.data.triggerWarning || false
        });
      } catch (error) {
        alert('Error loading story: ' + error.message);
        navigate('/stories');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        author: formData.isAnonymous ? 'Anonymous' : formData.author
      };

      await updatePost(id, postData);
      alert('Story updated successfully.');
      navigate(`/stories/${id}`);
    } catch (error) {
      alert('Error updating story: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !post) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📝</div>
          <p>Loading story...</p>
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
          ✏️ Edit Your Story
        </h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
          Update your story to continue helping others with your experience.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="card">
        <div className="form-group">
          <label htmlFor="title">Story Title *</label>
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
          <label htmlFor="authorRole">Your Role *</label>
          <select
            id="authorRole"
            name="authorRole"
            value={formData.authorRole}
            onChange={handleChange}
            required
          >
            {authorRoles.map(role => (
              <option key={role.value} value={role.value}>
                {role.label} - {role.description}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="author">Your Name or Alias *</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            disabled={formData.isAnonymous}
          />
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
            <input
              type="checkbox"
              name="isAnonymous"
              checked={formData.isAnonymous}
              onChange={handleChange}
            />
            <span>Share anonymously</span>
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="excerpt">Brief Summary</label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Your Story *</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows="12"
          />
        </div>

        {categories.length > 0 && (
          <div className="form-group">
            <label>Related Topics</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem', marginTop: '0.5rem' }}>
              {categories.map(category => (
                <label key={category._id} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}>
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
            placeholder="Add relevant tags separated by commas"
          />
        </div>

        <div className="form-group">
          <label htmlFor="featuredImage">Story Image URL (Optional)</label>
          <input
            type="url"
            id="featuredImage"
            name="featuredImage"
            value={formData.featuredImage}
            onChange={handleChange}
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              name="triggerWarning"
              checked={formData.triggerWarning}
              onChange={handleChange}
            />
            <span>Add trigger warning</span>
          </label>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={() => navigate(`/stories/${id}`)}
            className="btn"
            style={{ backgroundColor: '#95a5a6', color: 'white' }}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn"
            style={{ 
              backgroundColor: '#3498db', 
              color: 'white',
              padding: '12px 30px'
            }}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Story'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditStory;
