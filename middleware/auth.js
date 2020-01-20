//TO authenticate
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  //GET TOKEN FROM HEADER
  const token = req.header("x-auth-token");

  //Check if no token
  if (!token) {
    return res.status(401).json({ msg: "NO token,Authorization Denied" });
  }

  //Verify Token
  try {
    //TO dECODE THE TOKEN
    const decoded = jwt.verify(token, config.get("jwtToken"));
    //Decoded Token has payload
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "TOKEN IS NOT VALID" });
  }
};
