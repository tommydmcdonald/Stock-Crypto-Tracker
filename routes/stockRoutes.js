const mongoose = require('mongoose');
const axios = require('axios');
const _ = require('lodash');
//const sleep = require('sleep').msleep; //in ms
const delay = require('delay');
const User = mongoose.model('users');
const Ticker = mongoose.model('tickers');
const TYPE = {STOCK: 'STOCK', CRYPTO: 'CRYPTO'};

const API_KEY = 'BIYQYMYZ9KIBXS9V';
const BASE_URL = `https://www.alphavantage.co/query?apikey=${API_KEY}&function=`;

const replaceKeys = (data) => { //removes . from keys of data object. '.' are not valid keys in mongodb
   data = _.mapKeys(data, (value, key) => {
      return key.replace('.', '_');
   })

   for (let key in data) {
      if ( typeof data[key] == 'object') {
         for (let subkey in data[key]) {
            if (typeof data[key][subkey] == 'object') {
               data[key][subkey] = _.mapKeys(data[key][subkey], (value, key) => {
                  return key.replace('.', '_');
               })
            }
         }

         data[key] = _.mapKeys(data[key], (value, key) => {
            return key.replace('.', '_');
         })
      }
   }

   return data;
}

const addTickerToTickers = async (newTicker  = {name: '', type: ''}) => {

   const { name, type } = newTicker;

   const FUNCTION_TYPE = (type == TYPE.STOCK) ? 'TIME_SERIES_INTRADAY&interval=1min&' : 'DIGITAL_CURRENCY_INTRADAY&market=USD&'
   const URL = `${BASE_URL}${FUNCTION_TYPE}symbol=${name}`;

   console.log('URL = ', URL);
   let { data } = await axios.get(URL);
   data = replaceKeys(data);

   const addTicker = new Ticker ({ ...newTicker, data: { frequency: 'intraday', data: data } });
   addTicker.save( (err, addedTic) => {
      if (err) return console.log(addedTic + ' had this error while being added: ' + err);
   })

}

const findCurrentPrice = (ticker) => {
   const { name, type } = ticker;
   if ( type == TYPE.STOCK ) {
      const timeSeries = ticker['data']['data']['Time Series (1min)'];
      const seriesKey = Object.keys(timeSeries).sort()[0];
      const currentPrice = timeSeries[seriesKey]['4_ close'];
      return currentPrice;
   }
   else if ( type == TYPE.CRYPTO ) {
      const timeSeries = ticker['data']['data']['Time Series (Digital Currency Intraday)'];
      const seriesKey = Object.keys(timeSeries).sort()[0];
      const currentPrice = timeSeries[seriesKey]['1b_ price (USD)'];
      return currentPrice;
   }
}

module.exports = app => {

   app.post('/api/tickers/', async (req, res) => { //add new ticker             //add error checking

      try {
         const newTicker = req.body;
         const { _id } = req.user;

         //check if ticker is in Ticker
         const queryTicker = await Ticker.findOne( { ...newTicker });

         if (!queryTicker)
            addTickerToTickers(newTicker); //if not found, add to Ticker collection

         const queryUser = await User.findOne( { _id, tickerList: { $elemMatch: newTicker } } ); //refactor with update

         if (!queryUser) { //if user does not contain ticker in their list, add it to their tickerList
            await User.findByIdAndUpdate( _id, { $addToSet: { tickerList: newTicker } } ); //$addToSet =  add a value to an array only if the value is not already present
            res.send(newTicker);
         }
      } catch(err) {
         console.log('err');
         return res.status(500).send(err);
      }

   });

   app.get('/api/tickers', (req, res) => { //get list of tickers
      res.send(req.user.tickerList);
   });

   app.get('/api/tickers/current_prices', async (req, res) => { //return list of all current prices
      let currentPriceList = { STOCK: {}, CRYPTO: {} };

      try {
         console.log(req.user.tickerList);
         const { tickerList } = req.user;
         for (let i = 0; i < tickerList.length; i++) {

            const { type, name } = tickerList[i];
            const ticker = await Ticker.findOne( { name, type });

            currentPriceList[type][name] = findCurrentPrice(ticker);
         }
         res.send(currentPriceList);

      } catch(err) {
         return res.status(500).send(err);
      }

   });

   app.get('/api/tickers/current_prices/:type/:name', async (req, res) => { //get one stock's price
      const name = req.params.name.toUpperCase();
      const type = req.params.type.toUpperCase();

      let found = false;
      let count = 0;

      //waits for data to be added to Ticker from Alpha Vantage API
      while (!found && count < 50) {
         try {
            const price = findCurrentPrice( await Ticker.findOne( { name, type }) );
             found = true;
            res.send( { name, type, price } );
            return;
         }
         catch (err) {
            count++;
            delay(300);
         }
      }

      res.sendStatus(404);
   })

   app.delete('/api/tickers/:_id', async (req, res) => { //delete a ticker in user's tickerList
      const { _id } = req.params;

      const updatedUser = await User.findByIdAndUpdate( req.user._id, { $pull: { tickerList: { _id } }}, { new: true } );

      res.send(200);
   });

   app.get('/api/stock_chart/:type/:name', async (req, res) => {
      const name = req.params.name.toUpperCase();
      const type = req.params.type.toUpperCase();

      try {
         const queryTicker = await Ticker.findOne( { name, type } );
         const timeSeries = queryTicker.data.data['Time Series (1min)'];

         const prices = []

         if ( type == TYPE.STOCK ) {
            const timeSeries = ticker['data']['data']['Time Series (1min)'];

            for (key in timeSeries) {
               prices.push( timeSeries[key]['4_ close'] );
            }
         }
         else if ( type == TYPE.CRYPTO ) {

         }
      }


      res.send(prices);
   })

}
