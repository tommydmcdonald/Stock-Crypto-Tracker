const mongoose = require('mongoose');
const { Schema } = mongoose;

const TYPE = ['STOCK', 'CRYPTO'];

const chartSchema = new Schema({
   name: String,
   type: { type: String, enum: [...TYPE] },
   data: { frequency: String, data: Schema.Types.Mixed }
});

console.log('chart schema bitch');

mongoose.model('chart', chartSchema);
