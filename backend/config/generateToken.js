const jwt = require("jsonwebtoken");

const jwt_secret = process.env.JWT_SECRET || "";
const generateToken = (id) => {
  return jwt.sign({ id }, jwt_secret, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
