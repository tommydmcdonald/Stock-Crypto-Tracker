const mongoose = require('mongoose');
const { Schema } = mongoose;

const TYPE = ['STOCK', 'CRYPTO'];

const stockData = {
   open: Number,
   high: Number,
   low: Number,
   week52Low: Number,
   week52High: Number,
   volume: Number,
   avgVolume: Number,
   marketCap: Number,
   peRatio: Number,
   sector: String,
};

const cryptoData = {
   open: Number,
   high: Number,
   low: Number,
   week52Low: Number,
   week52High: Number,
   volume: Number,
   marketCap: Number,
   supply: Number,
   algorithm: String
};

// data: { type: Schema.Types.Mixed, enum: [stockData, cryptoData] }

const tickerSchema = new Schema({
   name: String,
   type: { type: String, enum: [...TYPE] },
   price: Schema.Types.Mixed,
   data: Schema.Types.Mixed,
   logo: String
});

mongoose.model('ticker', tickerSchema);
