const Twilio = require('twilio');
const accountSid = 'AC53746313323556d34a1515e64151ce1a';
const authToken = '19b89302e3ab4007ea750374170ac9a2';
const verifySid = 'VA78dab6b7fefe31326f689d3bfd277de6';
const client = new Twilio(accountSid, authToken);

const sendOPT = async (no) => {
  try {
    const verification = await client.verify.v2
      .services(verifySid)
      .verifications.create({
        to: no, // Replace with the recipient's phone number in E.164 format
        channel: 'sms',
      });
    console.log(verification.status);
    return verification.status;

    // const readline = require('readline').createInterface({
    //   input: process.stdin,
    //   output: process.stdout,
    // });
    // readline.question('Please enter the OTP:', async (otpCode) => {
    //   try {
    //     // Verify the OTP
    //     const verificationCheck = await client.verify.v2
    //       .services(verifySid)
    //       .verificationChecks.create({
    //         to: no, // Replace with the recipient's phone number in E.164 format
    //         code: otpCode,
    //       });

    //     console.log(verificationCheck.status);
    //     readline.close();
    //     res.json('Verification successful.');
    //   } catch (verificationError) {
    //     console.error(verificationError);
    //     readline.close();
    //     res.status(500).json({ error: 'Failed to verify OTP.' });
    //   }
    // });
  } catch (err) {
    console.log(err);
  }
};

const verifyOPT = async (no, otp) => {
  try {
    const verificationCheck = await client.verify.v2
      .services(verifySid)
      .verificationChecks.create({
        to: no, // Replace with the recipient's phone number in E.164 format
        code: otp,
      });

    console.log(verificationCheck.status);
    return verificationCheck;
  } catch (err) {
    return err;
  }
};

module.exports = { sendOPT, verifyOPT };
