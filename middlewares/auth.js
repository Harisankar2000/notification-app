const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  console.log("inside auth");
  const token = req.headers['authorization']?.split(' ')[1]; // Get token after "Bearer"

  if (!token) {
    return res.status(401).json({ error: 'Token missing' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("Token verification error:", err);
      return res.status(401).json({ error: 'Invalid token' });
    }
    console.log("Decoded payload:", decoded);
    req.userId = decoded.id; // Assign decoded id to req.userId
    console.log("Receiver ID (req.userId):", req.userId);
    next();
  });
};
