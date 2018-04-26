const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const moment = require('moment');
const User = mongoose.model('user');
const Ticker = mongoose.model('ticker');

const { addTickerToTickers, addTickerToCharts } = require('../services/tickerDB');
const autocompleteLibrary = require('../services/autocompleteLibrary');
const _ = require('lodash');


router.get('/api/tickers/purchase_history', async (req, res) => {
   const user = await User.findById(req.user._id);
   const quantity = await user.tickerQuantity('MSFT', 'STOCK');

   res.send( {quantity} );
});

//add one purchase history
router.post('/api/tickers/purchase_history', async (req, res) => {
   console.log('post ph, body = ', req.body);
   const { ticker, history } = req.body;

   const { name, type } = ticker;
   try {
      await User.update( {_id: req.user._id, tickerList: { $elemMatch: { name, type }}},
         { $push: { 'tickerList.$.purchaseHistory': history } });

   } catch (err) {
      console.log('err in post PH');
      console.log(err);
   }

   console.log('end of ph post');
   res.sendStatus(200);
});

//delete one purchase history
router.delete('/api/tickers/purchase_history/:type/:name/:_id', async (req, res) => {
   const { name, type, _id } = req.params;

   await User.update({_id: req.user._id, tickerList: { $elemMatch: { name, type }}},
      {$pull: {'tickerList.$.purchaseHistory': { _id }} });
   res.sendStatus(200);
});

//update one purchase history
router.put('/api/tickers/purchase_history', async (req, res) => {

   const history = req.body;

   console.log('update purchase history');
   console.log('history = ', history);

   try {
      let index = -1;
      const user = (await User.find( {_id: req.user._id} ))[0];

      let tickerIndex = 0, historyIndex = 0;

      for (let ticI = 0; ticI < user.tickerList.length; ticI++) {
         for (let hisI = 0; hisI < user.tickerList[ticI].purchaseHistory.length; hisI++) {
            const his = user.tickerList[ticI].purchaseHistory[hisI];
            if (his._id == history._id) {
               user.tickerList[ticI].purchaseHistory[hisI] = history;
            }
         }
      }

      console.log('user ', user);
      await user.save();
      console.log('user ', user);
   } catch(err) {
      console.log(err);
   }


   // await User.update( {_id: req.user._id, tickerList: { $elemMatch: { ...ticker, "purchaseHistory._id": history._id } }},
   //    { $set: { 'tickerList.$.purchaseHistory': history } });

   res.sendStatus(200);
});

router.post('/api/tickers/', async (req, res) => { //add new ticker             //add error checking
   try {
      const newTicker = req.body;

      const { name, type } = newTicker;
      const { _id } = req.user;

      //check if ticker is in Ticker
      const queryTicker = await Ticker.findOne( { name, type });

      if (!queryTicker) {  //if ticker is not in Ticker db, add it
         const tickerAddSuccess = await addTickerToTickers(newTicker); //if not found, add to Ticker collection

         if (!tickerAddSuccess) { //if ticker is not valid API ticker
            res.send( { error: 'Ticker could not be added.'} )
            return;
         }
         // if (!chartAddSuccess) { //if ticker is not valid API ticker
         //    res.send( { error: 'Ticker could not be added.'} )
         // }

      }
      //if exists in db or once added, send price back
      const { price } = await Ticker.findOne( { name, type } );

      // res.send( { price } );

      if (!queryTicker) {
         addTickerToCharts(newTicker, 'new');
      }

      newTicker.purchaseHistory = [{ price , quantity: 1, date: moment()}];

      //Adding ticker to User's tickerList
      await User.findByIdAndUpdate( _id, { $addToSet: { tickerList: newTicker } }, {new: true} ); //$addToSet =  add a value to an array only if the value is not already present
      // const tickerAdded = await User.findOne( { _id, tickerList: {'$elemMatch': {name, type} } } );
      const tickerAdded = (
         await User.aggregate([
            {$match: {_id} },

            {$project: {
               tickerList: {
                  $slice: [
                     { $filter: {
                        input: '$tickerList',
                        as: 'ticker',
                        cond: { $and: [
                           { $eq: ['$$ticker.name', name]},
                           { $eq: ['$$ticker.type', type]},
                        ]}
                     }}, 1]
               }
            }},
         ])
      )[0].tickerList[0];



      console.log('tickerAdded', tickerAdded);

      const responseData = {
         ticker: tickerAdded,
         price
      };
      res.send(responseData); //change from sending price back to sending back full ticker
   } catch(err) {
      console.log('err in api/post');
      console.log(err);
      res.send( { error: 'Ticker could not be added.'} )
   }

});

router.post('/api/tickers/:type/:name/:quantity', async (req, res) => { //update ticker quantity for a user
   const { type, name, quantity } = req.params;

   await User.updateOne( { _id: req.user._id, tickerList: { $elemMatch: { name, type }}},
   { $set: { 'tickerList.$.quantity': quantity }} )

});

router.get('/api/tickers', async (req, res) => { //get list of tickers
   // const modifiedTickers = await Promise.all(req.user.tickerList.map( async ticker => {
   //    const modTic = { ...ticker };
   //    modTic.quantity = await req.user.tickerQuantity(ticker.name, ticker.type);
   //    console.log('tic = ', modTic);
   //    return modTic;
   // }));

   console.log('api');

   const tickers = [];

   for (let ticker of req.user.tickerList) {
      const newTic = { ...ticker.toObject() };
      newTic.quantity = await req.user.tickerQuantity(newTic.name, newTic.type);
      tickers.push(newTic);
   }

   // console.log('tickers = ', tickers);
   res.send(tickers);
});

router.get('/api/tickers/current_prices', async (req, res) => { //return list of all current prices
   let currentPriceList = { STOCK: {}, CRYPTO: {} };

   //Stock stuff
   try {
        const { tickerList } = req.user;
        for (let i = 0; i < tickerList.length; i++) {

           const { type, name } = tickerList[i];
           const { price } = await Ticker.findOne( { name, type });

           currentPriceList[type][name] = price;
        }
        res.send(currentPriceList);

     } catch(err) {
        console.log('current_prices err');
        console.log(err);
        return res.status(500).send(err);
     }

});

router.delete('/api/tickers/:type/:name', async (req, res) => { //delete a ticker in user's tickerList
   const { type, name } = req.params;

   const updatedUser = await User.findByIdAndUpdate( req.user._id, { $pull: { tickerList: { name, type } }}, { new: true } );
   res.sendStatus(200);
});

router.get('/api/tickers/suggestions', async (req, res) => {
   res.send(autocompleteLibrary);
});

module.exports = router;
