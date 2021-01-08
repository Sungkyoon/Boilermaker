const passport = require('passport');
const router = require('express').Router();
const { User } = require('../db/models');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

router.get(
  '/',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get(
  '/callback',
  passport.authenticate('google', {
    successRedirect: '/home',
    failureRedirect: '/login',
  })
);

const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
};

const strategy = new GoogleStrategy(
  googleConfig,
  function (token, refreshToken, profile, done) {
    const googleId = profile.id;
    const name = profile.name;
    const email = profile.emails[0].value;

    User.findOrCreate({ where: { googleId }, defaults: { email, name } })
      .then(function (user) {
        done(null, user);
      })
      .catch(done);
  }
);

passport.use(strategy);

module.exports = router;
