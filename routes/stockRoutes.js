const mongoose = require('mongoose');
const User = mongoose.model('users');
const Ticker = mongoose.model('tickers');
const TYPE = {STOCK: 'STOCK', CRYPTO: 'CRYPTO'};

const API_KEY = 'BIYQYMYZ9KIBXS9V';
const BASE_URL = `https://www.alphavantage.co/query?apikey=${API_KEY}&`;

const STOCK_URL = `${BASE_URL}function=TIME_SERIES_INTRADAY&interval=1min&symbol=`;
const CRYPTO_URL = `${BASE_URL}function=DIGITAL_CURRENCY_INTRADAY&market=USD&symbol=`;

const addTickerToTickers = async (newTicker  = {name: '', type: ''}) => {
   const { name } = newTicker;
   const URL = ticker.type == TYPE.STOCK ? `${STOCK_URL}${name}` : `${CRYPTO_URL}${name}`; //if stock, url = 1st, if not, url = 2nd

   const data = await axios.get(URL);

   const addTicker = new Ticker ({ ...newTicker, data });
   addTicker.save( (err, addedTic) => {
      if (err) return console.log(addedTic + ' had this error while being added: ' + err);
   })

}

module.exports = app => {

   app.post('/api/ticker/', (req, res) => { //add error checking
      // console.log('post /api/ticker newTicker = ', req.body);
      const newTicker = req.body;
      const { _id } = req.user;

      const options = {new: true};
      const update = { $push: { tickerList: newTicker } };

      //check if ticker is in Ticker
      Ticker.findOne( { ...newTicker }, //...newTicker
         (err, ticker) => {
            if (!ticker) //if not found, add to Ticker collection
               addTickerToTickers(newTicker);
         });

      //check if ticker is already in User's tickerlist
      const checkUser = { _id, tickerList: newTicker}
      let userHasTicker;
      User.findOne( checkUser,
         (err, ticker) => {
            if (ticker) {
               console.log('Ticker exists. ticker = ', ticker);
            }
            else {
               console.log('Ticker does not exist, ticker = ', newTicker);
            }
      });

      //adding ticker to user's tickerList
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
