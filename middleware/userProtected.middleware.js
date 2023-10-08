const _ = require('lodash');
const User = require('../models/createUser.model');

const requiredAdmin = async (req, res, next) => {
  try {
    const email = await _.get(req.user, 'email');
    // console.log(req.user, email);

    if (!email) {
      return res.status(400).json('Required Login.....');
    }
    // console.log(req.user);
    const user = await User.findOne({ email });
    // console.log(user);
    if (user.role != 'admin') {
      return res.json('Required Login.....');
    }
    return next();
  } catch (error) {
    console.log(error);
  }
};

const requiredUser = async (req, res, next) => {
  try {
    const email = await _.get(req.user, 'email');
    // console.log(req.user, email);

    if (!email) {
      return res.status(400).json('Required Login.....');
    }
    // console.log(req.user);
    const user = await User.findOne({ email });
    if (user.role != 'user') {
      return res.json('Required Login.....');
    }
    return next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { requiredAdmin, requiredUser };
