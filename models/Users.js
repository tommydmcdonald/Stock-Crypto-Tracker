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

// userSchema.index( {tickerList.name: 1, tickerList.type: 1}, { unique: true});

// person.index({ firstName: 1, lastName: 1}, { unique: true });

mongoose.model('users', userSchema);
