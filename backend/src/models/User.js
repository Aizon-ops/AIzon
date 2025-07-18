// src/models/User.js
const userSchema = new mongoose.Schema({
  email: String,
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  priceAlerts: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    targetPrice: String,
    isActive: { type: Boolean, default: true }
  }]
});
