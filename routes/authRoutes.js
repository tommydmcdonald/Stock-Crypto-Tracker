const express = require('express');
const router = express.Router();
const passport = require('passport');
const _ = require('lodash');

router.get('/auth/google',
   passport.authenticate('google', {
      scope: ['profile', 'email']
   })
);

router.get('/auth/google/callback',
   passport.authenticate('google'),
   (req, res) => { //what happens after user logins
      res.redirect("/");
   }
);

router.get('/api/logout', (req, res) => {
   req.logout();
   res.redirect("/")
});

router.get('/api/current_user', (req, res) => {
   if (req.user)
   {
      const userInfo = _.pick(req.user, ['_id', 'googleId', '__v', 'displayName']);
      res.send( userInfo ); //send user back without tickerlist
      return;
   }

   res.send(null);
});

module.exports = router;
