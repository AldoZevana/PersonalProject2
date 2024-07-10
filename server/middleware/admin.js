// server/middleware/admin.js
const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports.admin = (req, res, next) => {
  jwt.verify(req.cookies.usertoken, process.env.FIRST_SECRET_KEY, (err, payload) => {
    if (err || !payload.isAdmin) {
      return res.status(401).json({ verified: false });
    } else {
      next();
    }
  });
};
