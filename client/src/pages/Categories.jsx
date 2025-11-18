import React, { useState } from 'react';
import { useBlog } from '../context/BlogContext';
import { blogService } from '../services/blogService';

const Categories = () => {
  const { categories, fetchCategories } = useBlog();
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await blogService.createCategory(formData);
      setFormData({ name: '', description: '' });
      setShowForm(false);
      fetchCategories(); // Refresh categories list
      alert('Category created successfully!');
    } catch (error) {
      alert('Error creating category: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Categories</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary"
        >
          {showForm ? 'Cancel' : 'Add Category'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="card" style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Create New Category</h3>
          
          <div className="form-group">
            <label htmlFor="name">Category Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter category name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter category description (optional)"
              rows="3"
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => setShowForm(false)}
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
              {loading ? 'Creating...' : 'Create Category'}
            </button>
          </div>
        </form>
      )}

      {categories.length === 0 ? (
        <div className="card" style={{ textAlign: 'center' }}>
          <h3>No categories yet</h3>
          <p>Create your first category to organize your posts!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {categories.map(category => (
            <div key={category._id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ marginBottom: '0.5rem' }}>{category.name}</h3>
                  {category.description && (
                    <p style={{ color: '#666', marginBottom: '0.5rem' }}>
                      {category.description}
                    </p>
                  )}
                  <p style={{ color: '#999', fontSize: '0.9rem' }}>
                    Created: {new Date(category.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
