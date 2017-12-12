import express from 'express';
const router = express.Router();
import passport from 'passport';
import config from '../config/index.json';

import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { OAuthStrategy as GoogleStrategy  } from 'passport-google-oauth';
import { Strategy as LocalStrategy } from 'passport-local';

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.use('facebook', new FacebookStrategy({
    clientID: '773757886149523',
    clientSecret: '5da444d22fb818b382131b4202c0af5a',
    callbackURL: 'http://localhost:8080/login/facebook/callback'
  },
  function(accessToken, refreshToken, profile, cb) {
    cb(null, profile);
}));
router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback', (req, res, next) => {
  return passport.authenticate('facebook', {
      failureRedirect: '/login/facebook',
      session: false
    }, (err, user) => {
      if(err) {
        res.status(401).send(err)
      } else {
        res.json(user);
      }
    })(req, res, next);
});

passport.use('twitter', new TwitterStrategy({
    consumerKey: 'TWITTER_CONSUMER_KEY',
    consumerSecret: 'TWITTER_CONSUMER_SECRET'
  },
  function(token, tokenSecret, profile, done) {
    //auth logic
}));
router.get('/twitter', passport.authenticate('twitter'));
router.get('/twitter/callback', passport.authenticate('twitter'));

passport.use('google', new GoogleStrategy({
    consumerKey: 'GOOGLE_CONSUMER_KEY',
    consumerSecret: 'GOOGLE_CONSUMER_SECRET'
  },
  function(token, tokenSecret, profile, done) {
    //auth logic
}));
router.get('/google', passport.authenticate('google'));
router.get('/google/callback', passport.authenticate('google'));

passport.use('local', new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password',
    session: false
  },
  function (username, password, done) {
    if (username === config.user.login && password === config.user.password) {
      done(null, {
        email: config.user.email,
        username: config.user.login
      });
    } else {
      done(null, false, 'Wrong user or password');
    }
  }
));
router.post('/local', passport.authenticate('local', { session: false }), function (req, res) {
  res.send(req.user);
});

export default router;