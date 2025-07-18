// src/services/priceTracker.js
class PriceTracker {
  async trackPriceChanges(product, newPrice) {
    if (product.price !== newPrice) {
      await PriceHistory.create({
        productId: product._id,
        price: newPrice
      });
      
      // Send price alert if significant change
      if (this.isPriceDropSignificant(product.price, newPrice)) {
        await this.sendPriceAlert(product, newPrice);
      }
    }
  }
}