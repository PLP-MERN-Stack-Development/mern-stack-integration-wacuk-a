import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    unique: true,
    trim: true,
    maxlength: [50, 'Category name cannot exceed 50 characters']
  },
  description: {
    type: String,
    maxlength: [200, 'Description cannot exceed 200 characters']
  },
  icon: {
    type: String,
    default: '📝'
  },
  color: {
    type: String,
    default: '#007bff'
  }
}, {
  timestamps: true
});

// Create text index for search functionality
categorySchema.index({ name: 'text', description: 'text' });

export default mongoose.model('Category', categorySchema);
