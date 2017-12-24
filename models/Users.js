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

mongoose.model('user', userSchema);
