const jwt = require('jsonwebtoken');

// Create JWT Token
const jwtSign = async (payload) => {
  const accessToken = jwt.sign(
    { email: payload.email, user: payload._id },
    process.env.JWT_PRIVATE_KEY,
    { expiresIn: process.env.JWT_EXPIRED_IN }
  );
  return accessToken;
};

// Decode JWT Token
const decodeToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    return decoded;
  } catch (err) {
    console.log(err.message);
    if (err instanceof Error) {
      return {
        valid: false,
        decoded: null,
        expired: err.message,
      };
    }
  }
};
module.exports = { jwtSign, decodeToken };
