// backend/middleware/security.js
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const securityMiddleware = (app) => {
  app.use(helmet());
  
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP'
  });
  
  app.use('/api/', limiter);
};
