const { sendOPT, verifyOPT } = require('../Service/phoneVerification.service');
const User = require('../models/createUser.model');

const sendOtp = async (req, res) => {
  try {
    const { email, no } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.json('email not found in records...');
    }
    await user.set({ no: no });
    await user.save();
    console.log(user.no);

    const response = await sendOPT(no);
    if (response) {
      res.send(`OPT code is sent to ${no}`);
    }
  } catch (err) {
    res.json(err);
    console.log(err);
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { otp, email } = req.body;
    if (!otp) {
      throw new error('OPT code is required');
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new error('User not found');
    }
    console.log(user);
    const { no } = user;
    console.log('nooooooooo=======>>>>>>>>>>', no);
    const response = await verifyOPT(no, otp);
    if (!response.valid) {
      res.json('Invalid OPT Code');
    }
    await user.set({ verified: true });
    await user.save();
    res.send('OPT verified successfull');
  } catch (err) {}
};

const verifyEmailController = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log(user.otp.code, otp);
    if (user.otp.code !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    const currentTime = new Date();
    if (currentTime > user.otp.time) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    // Mark the email as verified in the user object
    user.verified = true;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { sendOtp, verifyOtp, verifyEmailController };
