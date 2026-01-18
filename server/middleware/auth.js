const jwt = require('jsonwebtoken');

const authenticate = (options = { required: true }) => {
  return (req, res, next) => {
    const token = req.headers['authorization'];
    
    if (!token) {
      if (options.required) {
        return res.status(401).json({ error: 'Unauthorised' });
      }
      return next();
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (options.required) {
          return res.status(401).json({ error: 'Unauthorised' });
        }
        return next();
      }
      req.user = decoded;
      next();
    });
  };
};

module.exports = { authenticate };