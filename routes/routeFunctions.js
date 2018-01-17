const axios = require('axios');
const _ = require('lodash');
const mongoose = require('mongoose');
const Chart = mongoose.model('chart');
const { BASE_URL, TYPE } = require('../config/keys');

exports.addTickerToCharts = async (newTicker = {name: '', type: ''}, chartStatus = '') => { //returns true if stock/crypto successfully added, returns false if not
   const { name, type } = newTicker;
   const chartData = {};

   console.log('addTickerToCharts', chartStatus, name, type);

   if (type == TYPE.CRYPTO) {
      try {
         const NAME_TO = `fsym=${name}&tsym=USD`;
         const HISTO = {
            MIN: 'histominute?',
            HOUR: 'histohour?',
            DAY: 'histoday?'
         };

         const URL = BASE_URL.CRYPTO;
         let cryptoURLs = [
            /*hour*/ `${URL}${HISTO.MIN}${NAME_TO}&limit=60&aggregate=1`, // 1hr * 60 min = 60 min
            /*day*/ `${URL}${HISTO.MIN}${NAME_TO}&limit=288&aggregate=5`, // 1 day * 24hrs * 60 min = 1440 min
            /*week*/ `${URL}${HISTO.MIN}${NAME_TO}&limit=672&aggregate=15`, // 7 day * 24hrs * 60 min = 10,080 min
            /*month*/ `${URL}${HISTO.HOUR}${NAME_TO}&limit=240&aggregate=3`, //30 days * 24hrs = 720 hours
            /*threeMonth*/ `${URL}${HISTO.HOUR}${NAME_TO}&limit=364&aggregate=6`, //91 days * 24hrs = 2,184 hours
            /*sixMonth*/ `${URL}${HISTO.HOUR}${NAME_TO}&limit=364&aggregate=12`, //182 days * 24hrs = 4,368 hours
            /*year*/ `${URL}${HISTO.HOUR}${NAME_TO}&limit=1460&aggregate=6` //365 days * 24hrs = 8,760 hours
         ];

         //if supported by coinbase, use coinbase as exchange
         const coinbaseTickers = ['BTC', 'ETH', 'LTC', 'BCH'];

         if ( _.includes(coinbaseTickers, name) ) {
            cryptoURLs = cryptoURLs.filter( url => url += '&e=Coinbase');
         }

         const requests = [];
         cryptoURLs.map( url => {
            requests.push(axios.get(url));
         });

         const resolved = await axios.all(requests);

            const chartFreq = ['hour', 'day', 'week', 'month', 'threeMonth', 'sixMonth', 'year'];

            for (let i = 0; i < resolved.length; i++) {
               const req = resolved[i];
               const reqData = req.data.Data.map(obj => {
                  const selectedProps = _.pick(obj, ['close', 'time'])
                  return {time: selectedProps.time, price: selectedProps.close};
               });
               chartData[chartFreq[i]] = reqData;
            }

      } catch(err) {
         console.log('aTtC err');
         console.log(err);
      }
   }
   else if (type == TYPE.STOCK) {

      let stockURLs = [
         /*day*/ `${BASE_URL.STOCK}/stock/${name}/chart/1d`,
         /*month*/ `${BASE_URL.STOCK}/stock/${name}/chart/1m`,
         /*threeMonth*/ `${BASE_URL.STOCK}/stock/${name}/chart/3m`,
         /*sixMonth*/ `${BASE_URL.STOCK}/stock/${name}/chart/6m`,
         /*year*/ `${BASE_URL.STOCK}/stock/${name}/chart/1y`,
      ];

      const requests = [];
      stockURLs.map( url => {
         requests.push(axios.get(url));
      });

      const resolved = await axios.all(requests);

      const chartFreq = ['day', 'month', 'threeMonth', 'sixMonth', 'year'];

      for (let i = 0; i < resolved.length; i++) {
         const req = resolved[i];

         const reqRemovePriceZero = req.data.filter(obj => {
            if ( (obj.close && obj.close != 0) || (obj.average && obj.average != 0)) {
               return true;
            }
            return false;

         });

         const reqData = reqRemovePriceZero.map(obj => {
            const selectedProps = _.pick(obj, ['date', 'average', 'close'])
            // console.log('selectedProps = ', selectedProps);
            const price = selectedProps.close ? selectedProps.close : selectedProps.average;
            return {time: selectedProps.date, price};
      });
         chartData[chartFreq[i]] = reqData;
      }
   }

   if (chartStatus == 'new') {
      const newChart = new Chart({ ...newTicker, data: chartData});
      await newChart.save();
   }
   else if (chartStatus == 'update') {
      Chart.updateOne( { ...newTicker}, { $set: { data: chartData }});
   }

}
