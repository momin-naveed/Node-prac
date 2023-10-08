const User = require('../models/createUser.model');
const lodash = require('lodash');
const otpVerify = require('../utils/emailService.utils');
const { jwtSign } = require('../utils/jwt.utils');

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, password, email, age } = req.body;
    console.log('======================>', req.body);
    var otp = Math.random();
    otp = otp * 1000000;
    otp = parseInt(otp);
    const currentDate = new Date();
    const expirationTimeInMinutes = 5;
    const otpExpiresAt = new Date(
      currentDate.getTime() + expirationTimeInMinutes * 60000
    );
    console.log(otp);
    // Convert minutes to milliseconds
    // const otpExpiresAt = addMinutes(new Date(), 5); // Set OTP expiration time to 5 minutes from now

    const saveUser = await User.create({
      firstName,
      lastName,
      password,
      email,
      age,
      otp: {
        code: otp,
        time: otpExpiresAt,
      },
    });
    // const result = await otpVerify(email, otp);
    const accessToken = await jwtSign(saveUser);

    // console.log(result.otp);
    return res.status(201).json({
      message: 'User created successfully,check your mail for verification',
      user: saveUser,
      accessToken,
      // email: result.status ? 'Email send' : 'Email send Error',
    });
  } catch (err) {
    if (err.code === 11000) {
      res.json('Email is Already Registered...');
    }
    console.log(err.message);
  }
};

const googleSignup = async (req, res) => {
  try {
    const user = await User.create(req.data);
    return user;
  } catch (err) {
    if (err.code === 11000) {
      throw new BadRequestError('Email is already reserved');
    }
    console.log(err);
    throw new BadRequestError('Something is wrong!');
  }
};
module.exports = { createUser, googleSignup };
