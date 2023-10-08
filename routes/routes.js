const express = require('express');
const router = express.Router();
const {
  healthCheck,
  getAllUsers,
  pagination,
} = require('../controller/healthcheck');
const { createUser } = require('../controller/signUp.controller');
const validateRequest = require('../middleware/validateRequest.middleware');
const {
  signUpSchema,
  signInSchema,
} = require('../schemas/dataAuth.middleware');
const loginUser = require('../controller/signIn.controller');
const {
  requiredAdmin,
  requiredUser,
} = require('../middleware/userProtected.middleware');
const {
  verifyOtp,
  sendOtp,
  verifyEmailController,
} = require('../controller/verifyOtp.controller');
const loginWthGoogle = require('../controller/loginWithGoogle');
const passport = require('passport');
const paymentCharge = require('../controller/stripe.controller');
const performTransaction = require('../controller/transactions');
const {
  verifiedStatus,
  averageAge,
  commonName,
  ageByRole,
  countUsersByGroup,
} = require('../controller/aggregation.controller');

router.get('/', healthCheck);
// Authentication
router.post('/signup', createUser);
router.post('/signin', validateRequest(signInSchema), loginUser);
// router.get('/getusers', requiredAdmin, getAllUsers);
router.get('/getusers', getAllUsers);
// Email otp verification
router.post('/verifyemailotp', verifyEmailController);

// Google Auth
router.get('/login', (req, res) => {
  res.render(path.join(__dirname, 'login.ejs'));
});
router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);
router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:3003/',
    failureRedirect: '/login',
  }),
  (req, res) => {
    res.redirect('/profile');
  }
);
router.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    const displayName = req.user.displayName;
    const email = req.user.emails[0].value;
    const imageUrl = req.user.photos[0].value;
    res.send(
      `<h1>Welcome, ${displayName}!</h1>
       <p>Email: ${email}</p>
       <img src="${imageUrl}" alt="User Image">
       <a href="/login">Logout</a>`
    );
  } else {
    res.redirect('/login');
  }
});

// Twilio OTP Verification

router.post('/sendotp', sendOtp);
router.post('/verifyotp', verifyOtp);

// Stripe Payment
router.post('/payment', paymentCharge);
// pagination
router.get('/pagination', pagination);
// database transaction
router.post('/transaction', performTransaction);

// Aggregationss
router.get('/verified-status', verifiedStatus);
router.get('/averageage', averageAge);
router.get('/commonname', commonName);
router.get('/avgagebyrole', ageByRole);
router.get('/countuser', countUsersByGroup);

module.exports = router;
