// backend/middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  // Log to external service (e.g., Sentry)
  if (process.env.NODE_ENV === 'production') {
    // Sentry.captureException(err);
  }
  
  res.status(500).json({
    message: 'Something went wrong!',
    ...(process.env.NODE_ENV === 'development' && { error: err.message })
  });
};
