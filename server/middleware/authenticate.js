// server/middleware/authenticate.js

const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports.authenticate = (req, res, next) => {
  const token = req.cookies.usertoken;
  if (!token) {
    return res.status(401).json({ verified: false, message: "No token provided" });
  }

  jwt.verify(token, process.env.FIRST_SECRET_KEY, (err, payload) => {
    if (err) {
      return res.status(401).json({ verified: false, message: "Invalid token" });
    } else {
      req.userId = payload.id;
      next();
    }
  });
};
