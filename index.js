const express = require('express');
const morgan = require('morgan');
const router = require('./routes/routes');
const connectDB = require('./utils/db');
const dotenv = require('dotenv');
const passport = require('./Service/passport.service.js');
const path = require('path');
const User = require('./models/createUser.model');
const _ = require('lodash');
const cors = require('cors');

// const stripe = require('stripe')(
//   'sk_test_51NhITvLNmr3eLXMKodbLOShNh1EF19evgh9xT3zOGxl2r2JnFS4Fkjae4WiPz5rkxKMIiNB0mwjolR7mo0rOA2Hr00hMuEzkkg'
// );
const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');
const { jwtSign } = require('./utils/jwt.utils');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(express.json());
dotenv.config();
app.use(bodyParser.json());

app.post('/login', async (req, res) => {
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
  res.status(400).json({
    msg: 'Invalid Password',
  });
});

app.put('/update', async (req, res) => {
  try {
    const { userId, email, firstName, lastName } = req.body;
    if (!email || !firstName || !lastName) {
      return res.status(400).json({
        msg: 'All Fields are required...',
      });
    }
    const result = await User.findByIdAndUpdate(
      { _id: userId },
      { email, firstName, lastName }
    );

    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

// const connectDB = async (req, res) => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI);
//     const session = await mongoose.startSession();

//     // Use the session for database operations
//     session.startTransaction();

//     // Perform operations using the session
//     const database = conn.connection.db;
//     const collection = database.collection('users');
//     await collection.updateOne(
//       { _id: 1 },
//       { $set: { value: 100 } },
//       { session }
//     );
//     await collection.updateOne(
//       { _id: 2 },
//       { $set: { value: 200 } },
//       { session }
//     );
//     console.log(users);
//     await session.commitTransaction();
//     session.endSession();

//     console.log(`Database is connected at ${conn.connection.host}`);
//   } catch (err) {
//     throw new Error('Database Not Connected...');
//   }
// };

// module.exports = connectDB;
// app.post('/dbb', connectDB);
//   await client.verify.v2
//     .services(verifySid)
//     .verifications.create({ to: no, channel: 'sms' })
//     .then((verification) => console.log(verification.status))
//     .then(() => {
//       const readline = require('readline').createInterface({
//         input: process.stdin,
//         output: process.stdout,
//       });
//       readline.question('Please enter the OTP:', (otpCode) => {
//         client.verify.v2
//           .services(verifySid)
//           .verificationChecks.create({ to: '+923078169353', code: otpCode })
//           .then((verification_check) =>
//             console.log(verification_check.status)
//           )
//           .then(() => readline.close());
//       });
//       res.json('errroooooorrr');
//     });
// } catch (err) {
//   console.log(err);
// }

// app.post('/sms', (req, res) => {
//   const twiml = new MessagingResponse();

//   twiml.message('The Robots are coming! Head for the hills!');

//   res.type('text/xml').send(twiml.toString());
// });
// Passport configuration
app.use(
  require('express-session')({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true,
  })
);

// For payment route
app.get('/stripe', (req, res) => {
  res.render(path.join(__dirname, 'home.ejs'), {
    key: process.env.STRIPE_PUBLIC_KEY,
  });
});
// For Google login route
// app.get('/login', (req, res) => {
//   res.render(path.join(__dirname, 'login.ejs'), {
//     key: process.env.STRIPE_PUBLIC_KEY,
//   });
// });

// app.post('/payment', (req, res) => {
//   stripe.customers
//     .create({
//       email: req.body.stripeEmail,
//       source: req.body.stripeToken,
//       name: 'Momin Naveed',
//       address: {
//         line1: 'House No 63 ',
//         postal_code: '64000',
//         city: 'Liaquatpur',
//         country: 'Pakistan',
//       },
//     })
//     .then((customer) => {
//       return stripe.charges.create({
//         amount: 7000,
//         description: 'Web Development Product',
//         currency: 'USD',
//         customer: customer.id,
//       });
//     })
//     .then((charge) => {
//       console.log(charge);
//       res.send('success');
//     })
//     .catch((err) => {
//       res.send(err);
//     });
// });

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.CLIENT_ID,
//       clientSecret: process.env.CLIENT_SECRET,
//       callbackURL: 'http://localhost:3003/auth/google/callback',
//     },
//     function (accessToken, refreshToken, profile, cb) {
//       console.log('profile===>', profile);
//       cb(null, profile);
//     }
//   )
// );

// passport.serializeUser(function (user, cb) {
//   console.log('serializeUser', user);
//   cb(null, user);
// });
// passport.deserializeUser(function (obj, cb) {
//   console.log('derializeUser', user);
//   cb(null, obj);
// });

// app.get(
//   '/auth/google',
//   passport.authenticate('google', { scope: ['profile', 'email'] })
// );
// app.get(
//   '/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   (req, res) => {
//     // Successful authentication, redirect or respond as needed
//     res.redirect('/profile');
//   }
// );

// app.get('/profile', (req, res) => {
//   if (req.isAuthenticated()) {
//     const displayName = req.user.displayName;
//     const email = req.user.emails[0].value; // Get the first email from the user's emails array
//     const imageUrl = req.user.photos[0].value; // Get the URL of the first photo from the user's photos array

//     res.send(
//       `<h1>Welcome, ${displayName}!</h1>
//        <p>Email: ${email}</p>
//        <img src="${imageUrl}" alt="User Image">
//        <a href="/login">Logout</a>`
//     );
//   }
// });

// app.use(router);

const port = process.env.PORT || 3000;

app.post('/sig', async (req, res) => {
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
});

app.listen(port, async () => {
  await connectDB();
  console.log('Listening on Port 3003');
});

// process.on('unhandledRejection', (err) => {
//   console.log('Server unhandledRejection Error=====>', err);
//   server.close(process.exit(1));
// });
