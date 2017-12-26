const passport = require('passport');
const _ = require('lodash');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
     '/auth/google/callback',
     passport.authenticate('google'),
     (req, res) => { //what happens after user logins
        res.redirect("/");
     }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect("/")
  });

  app.get('/api/current_user', (req, res) => {
     if (req.user)
     {
        const userInfo = _.pick(req.user, ['_id', 'googleId', '__v', 'displayName']);
        res.send( userInfo ); //send user back without tickerlist
        return;
     }

     res.send(req.user);
  });

};
