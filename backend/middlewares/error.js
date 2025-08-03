const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  // Prisma errors
  if (err.code && err.code.startsWith('P')) {
    return res.status(400).json({ 
      error: 'Database error',
      message: err.message 
    });
  }
  
  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ 
      error: 'Invalid token' 
    });
  }
  
  // Default error handling
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    error: err.message || 'Internal server error'
  });
};

module.exports = { errorHandler };