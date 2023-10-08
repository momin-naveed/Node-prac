const passport = require('passport');
const { googleSignup } = require('../controller/signUp.controller');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async function (user, done) {
  // console.log('===>', _id);
  //   const user = await getAUser(_id);
  done(null, user);
});
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// console.log('================>', process.env.CLIENT_ID);

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID:
//         '307053827249-jm1svmjshbcaor2337gdul4o9r9lrpph.apps.googleusercontent.com',
//       clientSecret: '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',
//       callbackURL: 'http://localhost:3003/auth/google/callback',
//       // passReqToCallback: true,
//       // scope: ['profile'],
//       // state: true,
//     },
//     async (req, accessToken, refreshToken, params, profile, done) => {
//       try {
//         const profileUser = profile._json;

//         // const existingUser = await getAUserByGoogleId(profileUser.sub);
//         // if (existingUser) {
//         //   console.log('PREV SESSION USED');

//         //   return done(null, existingUser);
//         // }
//         console.log('LOGIN SESSSIO CREATED AGAIN');
//         // const user = await googleSignup({
//         //   googleId: profileUser.sub,
//         //   firstName: profileUser.given_name,
//         //   lastName: profileUser.family_name,
//         //   avatar: profileUser.picture,
//         //   verified: true,
//         //   email: profileUser.email,
//         // });
//         // req.data = user;
//         done(null, profileUser);
//       } catch (err) {
//         // done(err, null);
//         console.log('err', err);
//       }
//     }
//   )
// );

passport.use(
  new GoogleStrategy(
    {
      clientID:
        '307053827249-jm1svmjshbcaor2337gdul4o9r9lrpph.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3003/auth/google/callback',
      passReqToCallback: true,
    },
    function (req, accessToken, refreshToken, profile, cb) {
      // Check for any potential errors
      if (err) {
        return cb(err);
      }

      // If no error, pass the user profile to the 'cb' function
      return cb(null, profile);
    }
  )
);

module.exports = passport;
