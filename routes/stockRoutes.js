const mongoose = require('mongoose');
const axios = require('axios');
const _ = require('lodash');
const delay = require('delay');
const User = mongoose.model('users');
const Ticker = mongoose.model('tickers');
const { replaceKeys } = require('./index');
const { BASE_URL, TYPE } = require('../config/keys');

const addTickerToTickers = async (newTicker  = {name: '', type: ''}) => { //returns true if stock/crypto successfully added, returns false if not

   const { name, type } = newTicker;

   const FUNCTION_TYPE = (type == TYPE.STOCK) ? 'TIME_SERIES_INTRADAY&interval=1min&' : 'DIGITAL_CURRENCY_INTRADAY&market=USD&'
   const URL = `${BASE_URL}${FUNCTION_TYPE}symbol=${name}`;

   const { data } = await axios.get(URL);

   if ( data.hasOwnProperty('Error Message') ) { //invalid stock or crypto
      return false;
   }
   else { //valid ticker
      const dataFormatted = replaceKeys(data);

      const addTicker = new Ticker ({ ...newTicker, data: { frequency: 'intraday', data: dataFormatted } });
      await addTicker.save();
      return true;
   }
}

const findCurrentPrice = (ticker) => {
   console.log('fCP, ticker = ', ticker);
   const { name, type } = ticker;
   const timeSeriesType = type == TYPE.STOCK ? 'Time Series (1min)' : 'Time Series (Digital Currency Intraday)';
   const priceInterval = type == TYPE.STOCK ? '4_ close' : '1b_ price (USD)';

   const timeSeries = ticker.data.data[timeSeriesType];
   const seriesKey = Object.keys(timeSeries).reverse()[0];
   const currentPrice = timeSeries[seriesKey][priceInterval];

   return currentPrice;
}

const findChartData = async (name, type) => {
   const timeSeriesType = type == TYPE.STOCK ? 'Time Series (1min)' : 'Time Series (Digital Currency Intraday)';
   const priceInterval = type == TYPE.STOCK ? '4_ close' : '1b_ price (USD)';

   const queryTicker = await Ticker.findOne( { name, type } );
   const timeSeries = queryTicker.data.data[timeSeriesType]

   const chartData = { prices: [], times: [] };

   for (const key in timeSeries) {
      const price = timeSeries[key][priceInterval];
      const time = key.slice(11,16);

      chartData.prices.push(price);
      chartData.times.push(time);
   }

   return chartData;
}

module.exports = app => {

   app.post('/api/tickers/', async (req, res) => { //add new ticker             //add error checking

      try {
         const newTicker = req.body;
         const { _id } = req.user;

         //check if ticker is in Ticker
         const queryTicker = await Ticker.findOne( { ...newTicker });

         if (!queryTicker) {  //if ticker in Ticker db, add it
            const tickerAddSuccess = await addTickerToTickers(newTicker); //if not found, add to Ticker collection
            if (!tickerAddSuccess) { //if ticker is not valid API ticker
               res.send( { error: 'Ticker could not be added.'} )
            }
         }
         //if exists in db or once added, send price back
         const queryTic = await Ticker.findOne( {'name': newTicker.name, 'type': newTicker.type } );
         const price = findCurrentPrice(queryTic);
         res.send( { price } );

         //Adding ticker to User's tickerList
         await User.findByIdAndUpdate( _id, { $addToSet: { tickerList: newTicker } }, {new: true} ); //$addToSet =  add a value to an array only if the value is not already present

      } catch(err) {
         res.send(err);
      }

   });

   app.get('/api/tickers', (req, res) => { //get list of tickers
      res.send(req.user.tickerList);
   });

   app.get('/api/tickers/current_prices', async (req, res) => { //return list of all current prices
      let currentPriceList = { STOCK: {}, CRYPTO: {} };

      try {
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

   app.delete('/api/tickers/:type/:name', async (req, res) => { //delete a ticker in user's tickerList
      const { type, name } = req.params;
      const updatedUser = await User.findByIdAndUpdate( req.user._id, { $pull: { tickerList: { name, type } }}, { new: true } );
      res.sendStatus(200);
   });

   app.get('/api/stock_charts', async (req, res) => {
      const tickerList = await User.findById( req.user._id, 'tickerList');
      const allChartData = [];

     tickerList.forEach( async ({name, type}) => {
       const chartData = await findChartData(name, type);
       allChartData.push(chartData);
      });

      res.send(allChartData);
   });

   app.get('/api/stock_charts/:type/:name', async (req, res) => {
      const name = req.params.name.toUpperCase();
      const type = req.params.type.toUpperCase();

      res.send(chartData);
   });

   app.get('/api/tickers/suggestions', async (req, res) => {
      const stockCryptoList = {
         aapl: null,
         msft: null,
         tsla: null,
         amzn: null,
         nvda: null,
         intc: null,
         f: null,
         ge: null,
         pypl: null,
         fb: null,
         snap: null,
         ebay: null,
         etsy: null,
         nflx: null,
         btc: null,
         eth: null,
         ltc: null,
         bch: null,
         dash: null,
         xmr: null,
         nxt: null,
         zec: null,
         xrp: null,
         etc: null,
         btg: null,
         neo: null,
         xlm: null,
         eos: null,
         sc: null,
         omg: null,
         dgb: null,
         iot: null
      };

      res.send(stockCryptoList);
   });

}
