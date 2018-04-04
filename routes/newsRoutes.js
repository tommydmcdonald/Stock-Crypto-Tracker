const express = require('express');
const router = express.Router();
const { BASE_URL } = require('../config/keys');
const axios = require('axios');
const _ = require('lodash');

const mongoose = require('mongoose');
const News = mongoose.model('news');

const addNewsToNews = require('../services/newsDB');

router.get('/api/news', async (req, res) => {

      const newNews = { headline: '', url: '', summary: ''};
      const newsList = [];

      try {
         const URL = `${BASE_URL.STOCK}/stock/market/news`;

         const { data } = await axios.get(URL);

         for(let i = 0; i < data.length; i++) {
            newsList.push(_.pick(data[i], ['headline', 'url', 'summary']));
         }

         res.send(newsList);

      } catch(err) {
         console.log(err);
      }
});

/*
router.get('/api/news', async (req, res) => {

   res.send(addNewsToNews);
});
*/


module.exports = router;
