const axios = require('axios');
const _ = require('lodash');
const mongoose = require('mongoose');
const News = mongoose.model('news');
const { BASE_URL, TYPE } = require('../config/keys');

exports.addNewsToNews = async (newNews = { headline: '', url: '', summary: ''}) => {

   const { headline, url, summary } = newNews;
   const newsData = {};

   try {
      const URL = `${BASE_URL.STOCK}/stock/market/news/last/1`;
      // const data = await axios.get(URL);

      for(let i = 0; i < data.length; i++) {
         const req = data[i];
         const reqData = req.data.Data.map(obj => {
            const selectedProps = _.pick(obj, ['headline', 'url', 'summary'])
            return {headline: selectedProps.headline, url: selectedProps.url, summary: selectedProps.summary};
         });
         newsData[i] = reqData;
         console.log('DATA: ', newsData[i]);


      }

      // No longer saving news in the data base. Uncomment to put back in database
      /* const addNews = new News{(...newNews, data )};*/
      /*await newsdata.save();*/

   } catch(err) {
      console.log(err);
   }
}
