import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Post title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Post content is required']
  },
  excerpt: {
    type: String,
    maxlength: [300, 'Excerpt cannot exceed 300 characters']
  },
  featuredImage: {
    type: String,
    default: ''
  },
  author: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true
  },
  authorRole: {
    type: String,
    enum: ['survivor', 'counselor', 'advocate', 'legal_expert', 'healthcare_worker'],
    required: true
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  tags: [{
    type: String,
    trim: true
  }],
  isPublished: {
    type: Boolean,
    default: true
  },
  isAnonymous: {
    type: Boolean,
    default: false
  },
  triggerWarning: {
    type: Boolean,
    default: false
  },
  supportResources: [{
    title: String,
    phone: String,
    description: String
  }],
  slug: {
    type: String,
    unique: true,
    trim: true
  }
}, {
  timestamps: true
});

// Create text index for search functionality
postSchema.index({ title: 'text', content: 'text', excerpt: 'text' });

// Generate slug before saving
postSchema.pre('save', function(next) {
  if (this.title && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }
  next();
});

export default mongoose.model('Post', postSchema);
