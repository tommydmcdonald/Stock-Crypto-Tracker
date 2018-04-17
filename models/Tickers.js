const mongoose = require('mongoose');
const { Schema } = mongoose;

const TYPE = ['STOCK', 'CRYPTO'];

const tickerSchema = new Schema({
   name: String,
   type: { type: String, enum: [...TYPE] },
   price: Schema.Types.Mixed,
   open: Schema.Types.Mixed ,
   high: Schema.Types.Mixed,
   low: Schema.Types.Mixed,
   week52Low: Schema.Types.Mixed,
   week52High: Schema.Types.Mixed,
   volume: Schema.Types.Mixed,
   avgVolume: Schema.Types.Mixed,
   marketCap: Schema.Types.Mixed,
   peRatio: Schema.Types.Mixed,
   sector: String,
   logo: String
});

mongoose.model('ticker', tickerSchema);
