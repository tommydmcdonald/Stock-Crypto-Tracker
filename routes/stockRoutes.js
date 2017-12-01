const mongoose = require('mongoose');
const axios = require('axios');
const _ = require('lodash');
const delay = require('delay');
const User = mongoose.model('users');
const Ticker = mongoose.model('tickers');
const { replaceKeys } = require('./index');
const { BASE_URL, TYPE } = require('../config/keys');

const addTickerToTickers = async (newTicker  = {name: '', type: ''}) => {

   const { name, type } = newTicker;

   const FUNCTION_TYPE = (type == TYPE.STOCK) ? 'TIME_SERIES_INTRADAY&interval=1min&' : 'DIGITAL_CURRENCY_INTRADAY&market=USD&'
   const URL = `${BASE_URL}${FUNCTION_TYPE}symbol=${name}`;

   let { data } = await axios.get(URL);
   data = replaceKeys(data);

   const addTicker = new Ticker ({ ...newTicker, data: { frequency: 'intraday', data: data } });
   addTicker.save( (err, addedTic) => {
      if (err) return console.log(addedTic + ' had this error while being added: ' + err);
   })

}

const findCurrentPrice = (ticker) => {
   const { name, type } = ticker;
   const timeSeriesType = type == TYPE.STOCK ? 'Time Series (1min)' : 'Time Series (Digital Currency Intraday)';
   const priceInterval = type == TYPE.STOCK ? '4_ close' : '1b_ price (USD)';

   const timeSeries = ticker.data.data[timeSeriesType];
   const seriesKey = Object.keys(timeSeries).reverse()[0];
   const currentPrice = timeSeries[seriesKey][priceInterval];

   return currentPrice;
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
            await delay(250);
         }
      }

      res.sendStatus(404);
   })

   app.delete('/api/tickers/:_id', async (req, res) => { //delete a ticker in user's tickerList
      const { _id } = req.params;

      let remove = null;
      if ( _id.length > 15) { // checks if true _id, not name
         remove = { $pull: { tickerList: { _id } }}
      }
      else {
         remove = { $pull: { tickerList: { name: _id } }}
      }

      const updatedUser = await User.findByIdAndUpdate( req.user._id, remove, { new: true } );

      res.send(200);
   });

   app.get('/api/stock_chart/:type/:name', async (req, res) => {
      const name = req.params.name.toUpperCase();
      const type = req.params.type.toUpperCase();

      const timeSeriesType = type == TYPE.STOCK ? 'Time Series (1min)' : 'Time Series (Digital Currency Intraday)';
      const priceInterval = type == TYPE.STOCK ? '4_ close' : '1b_ price (USD)';

      try {
         const queryTicker = await Ticker.findOne( { name, type } );
         const timeSeries = queryTicker.data.data[timeSeriesType]

         const chartData = { prices: [], times: [] };

         for (const key in timeSeries) {
            const price = timeSeries[key][priceInterval];
            const time = key.slice(11,16);

            chartData.prices.push(price);
            chartData.times.push(time);
         }

         res.send(chartData);
      } catch (err) {
         console.log(err);
      }
   });

}
