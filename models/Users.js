const mongoose = require('mongoose');
const { Schema } = mongoose;

const TYPE = ['STOCK', 'CRYPTO'];

const userSchema = new Schema({
  googleId: String,
  displayName: String,
  tickerList: [ {
     name: String,
     type: { type: String, enum: [...TYPE] },
     quantity: Number,
     _id: false
  } ]
});

console.log('user schema bitch');

mongoose.model('user', userSchema);
