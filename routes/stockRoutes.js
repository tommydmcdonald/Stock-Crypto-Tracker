const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = app => {

   app.post('/api/ticker/', (req, res) => {

      const { ticker } = req.body;
      const { _id } = req.user;

      User.findByIdAndUpdate( _id,
         { $push: {"tickerList": ticker}},
         function(err, user) {
            if (err) next(err)
            res.sendStatus(200);
      });

   });

   app.post('/api/test', (req, res) => {
      console.log(req.body);
      res.send();
   });
}
