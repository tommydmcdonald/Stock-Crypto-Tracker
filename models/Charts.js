const mongoose = require('mongoose');
const { Schema } = mongoose;

const TYPE = ['STOCK', 'CRYPTO'];

const chartSchema = new Schema({
   name: String,
   type: { type: String, enum: [...TYPE] },
   data: { data: Schema.Types.Mixed }
});

mongoose.model('chart', chartSchema);
