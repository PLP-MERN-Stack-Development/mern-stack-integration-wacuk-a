import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Resource name is required'],
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    trim: true
  },
  location: {
    county: String,
    town: String,
    address: String
  },
  services: [{
    type: String,
    enum: ['counseling', 'legal', 'shelter', 'medical', 'police', 'hotline']
  }],
  website: {
    type: String,
    trim: true
  },
  operatingHours: {
    type: String,
    default: '24/7'
  },
  languages: [String],
  isVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default mongoose.model('Resource', resourceSchema);
