const mongoose = require('mongoose');
const { Schema } = mongoose;

const TYPE = ['STOCK', 'CRYPTO'];

const userSchema = new Schema({
  googleId: String,
  tickerList: [ {
     name: String,
     type: { type: String, enum: [...TYPE] }
  } ]
});

mongoose.model('users', userSchema);
