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
      const newsList = {};

      try {
         const URL = `${BASE_URL.STOCK}/stock/market/news`;

         const { data } = await axios.get(URL);

         for(let i = 0; i < data.length; i++) {
            newNews.headline = data[i].headline;
            newNews.url = data[i].url;
            newNews.summary = data[i].summary;

            // const addNews = new News({...newNews, headline: newNews.headline, url: newNews.url, summary: newNews.summary });
            newsList[i] = newNews;
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
