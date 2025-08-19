const jwt = require('jsonwebtoken');

// Middleware to check if token is present and valid
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;


  // Check if header exists and starts with "Bearer"
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({message: 'Authentication token missing or invalid'});
  }

  const token = authHeader.split(' ')[1]; // Extract token

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info (userId, email, role) to request
    req.user = decoded;

    next(); // Allow request to proceed
  } catch (err) {
    res.status(401).json({message: 'Invalid or expired token'});
  }
};


// Middleware to check if user has required role
const authorize = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({message: 'Forbidden: Insufficient permissions'});
    }
    next();
  };
};

module.exports = {authenticate, authorize};