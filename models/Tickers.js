const mongoose = require('mongoose');
const { Schema } = mongoose;

const TYPE = ['STOCK', 'CRYPTO'];

const tickerSchema = new Schema({
   name: String,
   type: { type: String, enum: [...TYPE] },
   data: { frequency: String, data: Schema.Types.Mixed }
});

mongoose.model('ticker', tickerSchema);
