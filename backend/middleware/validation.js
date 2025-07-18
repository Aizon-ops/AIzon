// backend/middleware/validation.js
const { body, validationResult } = require('express-validator');

const validateSearch = [
  body('search').isLength({ max: 100 }).trim().escape(),
  body('category').isAlphanumeric().optional(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
