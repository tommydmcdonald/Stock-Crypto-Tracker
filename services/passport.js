const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('user');

passport.serializeUser((user, done) => {
   done(null, user.id);
});

passport.deserializeUser((id, done) => {
   User.findById(id).then(user => {
      done(null, user);
   });
});

passport.use(
   new GoogleStrategy(
      {
         clientID: keys.googleClientID,
         clientSecret: keys.googleClientSecret,
         callbackURL: '/auth/google/callback'
      },
      async (accessToken, refreshToken, profile, done) => {
         const existingUser = await User.findOne({ googleId: profile.id });

         if (existingUser) { // We already have a record with the given profile Id

            return done(null, existingUser);
         }

         const user = await new User({ googleId: profile.id }).save(); // We do not have a user id with this profile, make new Id
         done(null, user);

      }
   )
);
