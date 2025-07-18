const cron = require('node-cron');
const Product = require('../models/Product');
const amazonScraper = require('../scrapers/amazonScraper');
const productHuntScraper = require('../scrapers/productHuntScraper');

class ScraperService {
  constructor() {
    this.scrapers = [
      amazonScraper,
      productHuntScraper
    ];
  }

  async scrapeAllSources() {
    console.log('Starting scheduled scraping...');
    
    for (const scraper of this.scrapers) {
      try {
        console.log(`Scraping ${scraper.name}...`);
        const products = await scraper.scrape();
        await this.saveProducts(products);
        console.log(`Saved ${products.length} products from ${scraper.name}`);
      } catch (error) {
        console.error(`Error scraping ${scraper.name}:`, error.message);
      }
    }
  }

  async saveProducts(products) {
    for (const productData of products) {
      try {
        // Check if product already exists
        const existingProduct = await Product.findOne({
          title: productData.title,
          source: productData.source
        });

        if (existingProduct) {
          // Update existing product
          await Product.findByIdAndUpdate(existingProduct._id, {
            ...productData,
            lastUpdated: new Date()
          });
        } else {
          // Create new product
          const product = new Product(productData);
          await product.save();
        }
      } catch (error) {
        console.error('Error saving product:', error.message);
      }
    }
  }

  startScheduledScraping() {
    // Run every hour
    cron.schedule('0 * * * *', () => {
      this.scrapeAllSources();
    });

    // Run once on startup
    setTimeout(() => {
      this.scrapeAllSources();
    }, 5000);
  }
}

module.exports = new ScraperService();
