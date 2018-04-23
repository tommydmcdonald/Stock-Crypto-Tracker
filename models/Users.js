const mongoose = require('mongoose');
const { Schema } = mongoose;

const TYPE = ['STOCK', 'CRYPTO'];

const userSchema = new Schema({
  googleId: String,
  displayName: String,
  tickerList: [ {
     name: String,
     type: { type: String, enum: [...TYPE] },
     purchaseHistory: [{
       price: Number,
       quantity: Number,
       date: Date,
    }],
     _id: false
  } ]
});

// userSchema.methods.tickerQuantities = async function() {
//    return this.tickerList.map( ticker => {
//       const { name, type, _id } = ticker;
//
//       let quantity = 0, price = 0;
//
//       ticker.purchaseHistory.forEach( history => {
//          quantity += history.quantity;
//          price += history.price;
//       });
//
//       return {name, type, quantity, price, _id};
//    });
//
// }



userSchema.methods.tickerQuantity = async function(name, type) {
   const ticker = (
      await this.model('user').aggregate([
         {$match: {_id: this._id} },

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

   let totalQuantity = 0;
   ticker.purchaseHistory.forEach( history => {
      totalQuantity += history.quantity;
   })
   return totalQuantity;
}

mongoose.model('user', userSchema);
