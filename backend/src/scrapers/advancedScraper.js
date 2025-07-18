// src/scrapers/advancedScraper.js
const puppeteer = require('puppeteer');

class AdvancedScraper {
  constructor() {
    this.browser = null;
  }

  async init() {
    this.browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  }

  async scrapeWithBrowser(url, selectors) {
    const page = await this.browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    
    try {
      await page.goto(url, { waitUntil: 'networkidle2' });
      
      const products = await page.evaluate((selectors) => {
        // Extract product data using provided selectors
        const items = document.querySelectorAll(selectors.container);
        return Array.from(items).map(item => ({
          title: item.querySelector(selectors.title)?.textContent?.trim(),
          price: item.querySelector(selectors.price)?.textContent?.trim(),
          image: item.querySelector(selectors.image)?.src,
          link: item.querySelector(selectors.link)?.href
        }));
      }, selectors);

      return products.filter(p => p.title && p.price);
    } finally {
      await page.close();
    }
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

