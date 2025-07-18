const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  originalPrice: String,
  image: {
    type: String,
    required: true
  },
  buyLink: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  category: {
    type: String,
    default: 'AI Tools'
  },
  rating: Number,
  tags: [String],
  isActive: {
    type: Boolean,
    default: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Text search index
productSchema.index({ 
  title: 'text', 
  description: 'text', 
  tags: 'text' 
});

module.exports = mongoose.model('Product', productSchema);
