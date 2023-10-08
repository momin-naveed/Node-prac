const { decodeToken } = require('../utils/jwt.utils');

const validUser = async (req, res, next) => {
  const accessToken = req.headers.authorization?.replace(/^Bearer\s/, '') || '';
  if (!accessToken) {
    // console.log('Login Required');
    return next();
  }
  const decoded = await decodeToken(accessToken);
  if (decoded) {
    req.user = decoded;

    return next();
  }
  next();
};
module.exports = validUser;
