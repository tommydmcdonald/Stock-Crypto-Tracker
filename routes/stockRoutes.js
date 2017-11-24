const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = app => {

   app.post('/api/ticker/', (req, res) => { //add error checking

      const newTicker = req.body;
      const { _id } = req.user;

      const options = {new: true};
      const update = { $push: { tickerList: newTicker } };

      User.findByIdAndUpdate( _id, update, options,
         (err, user) => {
         if (err) {
            console.log("error: ", err);
         }
         else {
            res.send(newTicker);
         }
      });

   });

   app.get('/api/ticker_list', (req, res) => {
      res.send(req.user.tickerList);
   });
}
