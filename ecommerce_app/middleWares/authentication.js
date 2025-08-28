const jwt = require('jsonwebtoken');


function authenticate(req, res, next) {
  try {
    if (!req.headers.authorization) {   //check if token is present and valid
      return res.status(400).send({message: "Not a valid token"});
    }

    const [scheme, token] = req.headers.authorization.split(' '); // Extract token

    if (scheme.toLowerCase() === 'bearer') {
      const value = jwt.verify(token, process.env.JWT_SECRET);
      req.user = value;   // Attach user info (userId, email, role) to request
      return next();
    } else {
      res.status(422).send({
        message: "Invalid authorization scheme"
      });
    } 

  } catch (error) {
    res.status(401).json({message: 'Invalid or expired token'});
  }
}




// Middleware to check if user has required role
const authorize = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({message: 'Forbidden: Insufficient permissions'});
    }
    next();
  };
};

//Checking for customer
const isCustomer = authorize("customer");



module.exports = {
  authenticate,
  authorize,
  isCustomer
}