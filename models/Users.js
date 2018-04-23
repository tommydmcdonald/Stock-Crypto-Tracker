const mongoose = require('mongoose');
const { Schema } = mongoose;

const TYPE = ['STOCK', 'CRYPTO'];

const userSchema = new Schema({
  googleId: String,
  displayName: String,
  tickerList: [ {
     name: String,
     quantity: Number,
     type: { type: String, enum: [...TYPE] },
     purchaseHistory: [{
       price: Number,
       quantity: Number,
       date: Date,
    }],
     _id: false
  } ]
});

userSchema.methods.tickerQuantities = async function() {
   return this.tickerList.map( ticker => {
      const { name, type, _id } = ticker;

      let quantity = 0, price = 0;

      ticker.purchaseHistory.forEach( history => {
         quantity += history.quantity;
         price += history.price;
      });

      return {name, type, quantity, price, _id};
   });

}

mongoose.model('user', userSchema);
