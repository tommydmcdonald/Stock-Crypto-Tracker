const axios = require('axios');
const _ = require('lodash');
const { replaceKeys } = require('./routes');
require('./models/Users');
require('./models/Tickers');
const { TYPE, BASE_URL } = require('./config/keys');
const mongoose = require('mongoose');
const Ticker = mongoose.model('ticker');

exports.updateTickerData = (intervalMS) => {
   const updateTickerDataCall = async () => {
      try {
         const tickerList = await Ticker.find({}).select('name type');

         const tickersWithUrls = tickerList.map( ticker => {
            const { type, name } = ticker;
            if (type == TYPE.CRYPTO) {

               const coinbaseTickers = ['BTC', 'ETH', 'LTC', 'BCH'];
               let PRICE_URL;

               if ( _.includes(coinbaseTickers, type) ) {
                  PRICE_URL = `${BASE_URL.CRYPTO}price?fsym=${name}&tsyms=USD&e=Coinbase`;
               }
               else {
                  PRICE_URL = `${BASE_URL.CRYPTO}price?fsym=${name}&tsyms=USD`;
               }
               return { name, type , url: PRICE_URL}
            }
         });

         const requests = [];

         tickersWithUrls.map( ticker => {
            requests.push( axios.get(ticker.url) );
         });

         const resolved = await axios.all(requests);

         for (let i = 0; i < tickerList.length; i++) {
            const { name, type } = tickerList[i];
            await requests[i];
            console.log('requests[' + i + '] = ', resolved[i].data.USD);
            const price = resolved[i].data.USD;
            await Ticker.findOneAndUpdate( {name, type}, { $set: { data: price} });
         }
         // _.forEach(, async (ticker) => {
         //    const { name, type, data } = ticker;
         //    const newTic = await Ticker.findOneAndUpdate( {name, type}, { $set: { 'data.data': data} }, { new: true });
         // });

         // const requests = tickersWithUrls.map( ticker => {
         //    console.log('requests, ticker = ', ticker);
         //    const { name, type } = ticker;
         //    return { name, type, data: axios.get(ticker.url) }
         // });
         //
         // const results = _.map( await axios.all(requests), ticker => {
         //    const { name, type } = ticker;
         //    // const data = replaceKeys(req.data);
         //    // const metaData = data['Meta Data'];
         //    // const type = metaData.hasOwnProperty('2_ Symbol') ? TYPE.STOCK : TYPE.CRYPTO;
         //    // const name = type == TYPE.STOCK ? metaData['2_ Symbol'] : metaData['2_ Digital Currency Code'];
         //    console.log('results, ticker = ', ticker);
         //    return {name, type, data: ticker.data.USD};
         // });
         //
         // _.forEach(results, async (ticker) => {
         //    const { name, type, data } = ticker;
         //    const newTic = await Ticker.findOneAndUpdate( {name, type}, { $set: { 'data.data': data} }, { new: true });
         // });
      } catch(err) {
         console.log('err');
         console.log(err);
      }
   }

   updateTickerDataCall();
   setInterval(updateTickerDataCall, intervalMS);
}
