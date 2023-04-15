const createError = require('http-errors');

// Error handler middleware function
const errorHandler = (err, req, res, next) => {
  // Handle the error based on the error status code
  if (err.status) {
    res.status(err.status).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = errorHandler;
