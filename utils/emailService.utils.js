const nodemailer = require('nodemailer');

const otpVerify = async (email, otp) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    service: 'Gmail',
    auth: {
      user: 'adnasirkbw@gmail.com',
      pass: 'pxmergyggookfttq',
    },
  });
  let status = true;

  var mailOptions = {
    to: email,
    subject: 'Otp for registration is: ',
    html:
      '<h3>OTP for account verification is </h3>' +
      "<h1 style='font-weight:bold;'>" +
      otp +
      '</h1>', // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      status = false;
      return;
    }
  });
  return { status };
};

module.exports = otpVerify;
