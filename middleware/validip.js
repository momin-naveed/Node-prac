const satelize = require('satelize');

const ipIsValid = async (req, res, next) => {
  var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;

  const rawIp = req.ip;

  const ipAddressParts = rawIp.split(':');

  const potentialIPv4 = ipAddressParts[ipAddressParts.length - 1];

  const ipPattern = /^[0-9.]+$/;

  if (ipPattern.test(potentialIPv4)) {
    console.log(potentialIPv4);
    next();
  } else {
    res.status(400).json({ error: 'Invalid IP address' });
  }
};
module.exports = { ipIsValid };
