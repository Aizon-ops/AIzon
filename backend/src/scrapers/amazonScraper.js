const axios = require('axios');
const cheerio = require('cheerio');

class AmazonScraper {
  constructor() {
    this.name = 'Amazon';
    this.baseUrl = 'https://www.amazon.com';
  }

  async scrape() {
    try {
      // Note: Amazon has anti-bot measures. This is a simplified example.
      // In production, you'd need to use proxies, headers, and handle CAPTCHAs
      const searchUrl = `${this.baseUrl}/s?k=AI+artificial+intelligence+software`;
      
      const response = await axios.get(searchUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });

      const $ = cheerio.load(response.data);
      const products = [];

      $('[data-component-type="s-search-result"]').each((i, element) => {
        if (i >= 20) return false; // Limit to 20 products

        const $element = $(element);
        const title = $element.find('h2 a span').text().trim();
        const price = $element.find('.a-price-whole').first().text().trim();
        const image = $element.find('img').attr('src');
        const link = $element.find('h2 a').attr('href');

        if (title && price && image && link) {
          products.push({
            title,
            description: title,
            price: `$${price}`,
            image,
            buyLink: `${this.baseUrl}${link}`,
            source: this.name,
            category: 'AI Software',
            tags: ['AI', 'Software', 'Amazon']
          });
        }
      });

      return products;
    } catch (error) {
      console.error('Amazon scraper error:', error.message);
      return [];
    }
  }
}

module.exports = new AmazonScraper();
