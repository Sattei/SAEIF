const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // decoded will now contain { userId, role, isAdmin, ... }
    const decoded = jwt.verify(token, JWT_SECRET);

    // --- FIX ---
    // Check for the isAdmin boolean, not the role string
    if (!decoded.isAdmin) {
      return res.status(403).json({ error: "Admin access required" });
    }

    req.user = decoded; // Assigns the decoded payload to req.user
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};
