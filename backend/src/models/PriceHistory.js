// src/models/PriceHistory.js
const priceHistorySchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  price: String,
  date: { type: Date, default: Date.now }
});