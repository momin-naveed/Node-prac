const User = require('../models/createUser.model');
const { jwtSign } = require('../utils/jwt.utils');
const _ = require('lodash');
const path = require('path');

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const isMatch = await user.comparePassword(password);

  const accessToken = await jwtSign(user);

  const result = _.omit(user.toObject(), ['password']);

  //   user.password = null;
  if (isMatch) {
    return res
      .cookie('accessToken', accessToken, {
        maxAge: 300000, //5min
        httpOnly: true,
      })
      .json({ result, accessToken, msg: 'Successfully Login' });
  }
  res.status(404).json({
    msg: 'Invalid Password',
  });
};

module.exports = loginUser;
