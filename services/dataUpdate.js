const axios = require('axios');
const _ = require('lodash');

const mongoose = require('mongoose');
const Ticker = mongoose.model('ticker');

const { addTickerToCharts } = require('./tickerDB');
const { TYPE, BASE_URL } = require('../config/keys');

const updateTickerDataCall = async () => {
   try {
      const tickerList = await Ticker.find({}).select('name type');

      const tickersWithUrls = tickerList.map( ticker => {
         const { type, name } = ticker;
         let PRICE_URL;

         if (type == TYPE.CRYPTO) {
            const coinbaseTickers = ['BTC', 'ETH', 'LTC', 'BCH'];

            if ( _.includes(coinbaseTickers, name) ) {
               PRICE_URL = `${BASE_URL.CRYPTO}price?fsym=${name}&tsyms=USD&e=Coinbase`;
            }
            else {
               PRICE_URL = `${BASE_URL.CRYPTO}price?fsym=${name}&tsyms=USD`;
            }
         }
         else if (type == TYPE.STOCK) {
            PRICE_URL = `${BASE_URL.STOCK}/stock/${name}/quote`;
         }
         /*console.log('url for ', name, type, 'is ', PRICE_URL);*/
         return { name, type, url: PRICE_URL}
      });

      const requests = [];

      tickersWithUrls.map( ticker => {
         requests.push( axios.get(ticker.url) );
      });

      const resolved = await axios.all(requests);

      for (let i = 0; i < tickerList.length; i++) {
         const { name, type, _id } = tickerList[i];
         let price;
         if (type == TYPE.CRYPTO) {
            price = resolved[i].data.USD;
         }
         else { //stock
            price = resolved[i].data.latestPrice;
         }
         /*console.log('Updating price for ', name, type, price);*/
         const tic = await Ticker.findByIdAndUpdate( _id, { $set: { price } });
      }
   } catch(err) {
      console.log('err');
      console.log(err);
   }
}

const updateChartDataCall = async () => {
   try {
      const tickerList = await Ticker.find({}).select('name type');
      _.forEach(tickerList, ticker => {
         addTickerToCharts(ticker, 'update');
      })

   } catch (err) {
      console.log('caught err');
      console.log(err);
   }
}

exports.updateTickerData = (intervalMS) => {
   updateTickerDataCall();
   setInterval(updateTickerDataCall, intervalMS);
}

exports.updateChartData = (intervalMS) => {
   updateChartDataCall();
   setInterval(updateChartDataCall, intervalMS);
}
