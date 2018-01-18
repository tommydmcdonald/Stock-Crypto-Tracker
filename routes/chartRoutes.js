const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const User = mongoose.model('user');

const { findChartData } = require('../services/tickerDB');

router.get('/api/charts', async (req, res) => {
   try {
      const { tickerList } = await User.findById( req.user._id, 'tickerList -_id');
      const allChartData = { STOCK: {}, CRYPTO: {} };

      for (let i = 0; i < tickerList.length; i++) {
         const { name, type} = tickerList[i];
         const chartData = await findChartData(name, type);
         allChartData[type][name] = chartData;
      }

      res.send(allChartData);
   } catch (err) {
      console.log('/api/charts - err');
      console.log(err);
   }

});

router.get('/api/charts/:type/:name', async (req, res) => {
   try {
      const name = req.params.name.toUpperCase();
      const type = req.params.type.toUpperCase();

      const chartData = await findChartData(name, type);

      res.send(chartData);
   } catch (err) {
      console.log('/api/charts/:type/:name err');
      console.log(err);
   }

});

module.exports = router;
