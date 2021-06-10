const jwt = require("jsonwebtoken");
const mySecret = process.env.JWT_KEY;

function authenticationVerification(req, res, next) {
  try {
    const Authorization = req.get("Authorization");
    const decoded = jwt.verify(Authorization, mySecret);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ success: false, message: "Invalid Signature" });
  }
}

module.exports = authenticationVerification;
