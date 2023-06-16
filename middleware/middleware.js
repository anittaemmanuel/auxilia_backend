const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  let authHeader = req.headers.authorization;
  if (authHeader == undefined || !authHeader.includes(" ")) {
    res.status(401).json({ error: "no token provided" });
  }
  let token = authHeader.split(" ")[1];
  jwt.verify(token, "secret", function (err) {
    if (err) {
      res.status(500).json({ error: "Authentication failed" });
    } else {
      next();
    }
  });
}

module.exports = { verifyToken };
