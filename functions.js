const axios = require('axios');
const _ = require('lodash');
const { replaceKeys } = require('./routes');
require('./models/Users');
require('./models/Tickers');
const { TYPE, BASE_URL } = require('./config/keys');
const mongoose = require('mongoose');
const Ticker = mongoose.model('tickers');

exports.updateTickerData = (intervalMS) => {
   const updateTickerDataCall = async () => {
      try {
         console.log('updating data');
         const tickerList = await Ticker.find({}).select('name type');

         const urls = tickerList.map( ticker => {
                 const { type, name } = ticker;
                 const FUNCTION_TYPE = (type == TYPE.STOCK) ? 'TIME_SERIES_INTRADAY&interval=1min&' : 'DIGITAL_CURRENCY_INTRADAY&market=USD&'
                 return `${BASE_URL}${FUNCTION_TYPE}symbol=${name}`;
         });
         const requests = urls.map( url => axios.get(url));
         const results = _.map( await axios.all(requests), req => {
            const data = replaceKeys(req.data);
            const metaData = data['Meta Data'];
            const type = metaData.hasOwnProperty('2_ Symbol') ? TYPE.STOCK : TYPE.CRYPTO;
            const name = type == TYPE.STOCK ? metaData['2_ Symbol'] : metaData['2_ Digital Currency Code'];
            return {name, type, data};
         });

         _.forEach(results, async (ticker) => {
            const { name, type, data } = ticker;
            const queryTic = await Ticker.findOne( {name, type} );
            const newTic = await Ticker.findOneAndUpdate( {name, type}, { $set: { 'data.data': data} }, { new: true });
         });
      } catch(err) {
         console.log(err);
      }
   }
   updateTickerDataCall();
   setInterval(updateTickerDataCall, intervalMS);
}
