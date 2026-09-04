const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  try {
    const headers = req.headers.authorization;

    const token = headers.split(" ")[1];

    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    } else {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user_id = decoded;
      console.log({ decoded });

      next();
    }
  } catch (error) {
    res.status(500).json({ message: "Token is invalid" });
  }
};

module.exports = checkAuth;
