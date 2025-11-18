import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';

const ShareStory = () => {
  const navigate = useNavigate();
  const { createPost, categories } = useBlog();
  const [loading, setLoading] = useState(false);
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
    triggerWarning: false,
    supportResources: []
  });

  const authorRoles = [
    { value: 'survivor', label: 'Survivor', description: 'Sharing personal experience' },
    { value: 'counselor', label: 'Counselor', description: 'Professional mental health support' },
    { value: 'advocate', label: 'Advocate', description: 'Working in GBV prevention' },
    { value: 'legal_expert', label: 'Legal Expert', description: 'Providing legal assistance' },
    { value: 'healthcare_worker', label: 'Healthcare Worker', description: 'Medical professional' }
  ];

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
        // Use anonymous name if selected
        author: formData.isAnonymous ? 'Anonymous' : formData.author
      };

      await createPost(postData);
      alert('Thank you for sharing your story. Your courage helps others.');
      navigate('/stories');
    } catch (error) {
      alert('Error sharing story: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '3rem 2rem',
        borderRadius: '10px',
        textAlign: 'center',
        marginBottom: '3rem'
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          ✍️ Share Your Story
        </h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
          Your story has power. Share your experience to help others feel less alone and break the silence.
        </p>
      </div>

      {/* Safety First Notice */}
      <div style={{ 
        backgroundColor: '#fff3cd',
        border: '1px solid #ffeaa7',
        borderRadius: '8px',
        padding: '1.5rem',
        marginBottom: '2rem'
      }}>
        <h4 style={{ color: '#856404', marginBottom: '0.5rem' }}>
          🔒 Your Safety First
        </h4>
        <p style={{ color: '#856404', margin: 0, fontSize: '0.9rem' }}>
          • You can choose to share anonymously<br/>
          • Avoid sharing identifying details (names, specific locations)<br/>
          • Remember, you can edit or delete your story later<br/>
          • If you need immediate help, visit our Resources page
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
            placeholder="Give your story a meaningful title"
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
            placeholder={formData.isAnonymous ? 'Will show as "Anonymous"' : 'How you want to be identified'}
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
            placeholder="A short summary of your story (optional)"
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
            placeholder="Share your experience, thoughts, and journey. Your words matter."
            rows="12"
          />
          <small style={{ color: '#666' }}>
            You are brave for sharing. Remember to focus on your healing journey and what helped you.
          </small>
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
            placeholder="Add relevant tags separated by commas (e.g., recovery, legal help, counseling)"
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
            placeholder="https://example.com/your-image.jpg"
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

        <div style={{ 
          backgroundColor: '#e8f4fd',
          border: '1px solid #b3d9ff',
          borderRadius: '8px',
          padding: '1.5rem',
          marginBottom: '2rem'
        }}>
          <h4 style={{ color: '#2980b9', marginBottom: '0.5rem' }}>
            💙 Before You Share
          </h4>
          <p style={{ color: '#3498db', margin: 0, fontSize: '0.9rem' }}>
            Remember that your well-being comes first. Only share what you feel comfortable with. 
            This platform is here to support you, not to cause additional distress.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={() => navigate('/stories')}
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
              backgroundColor: '#e74c3c', 
              color: 'white',
              padding: '12px 30px',
              fontSize: '1.1rem'
            }}
            disabled={loading}
          >
            {loading ? 'Sharing...' : '✨ Share Your Story'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShareStory;
