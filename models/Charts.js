const mongoose = require('mongoose');
const { Schema } = mongoose;

const TYPE = ['STOCK', 'CRYPTO'];

const chartDataSchema = new Schema({
   hour: [],
   day: [],
   week: [],
   month: [],
   threeMonth: [],
   sixMonth: [],
   year: []
});

const chartSchema = new Schema({
   name: String,
   type: { type: String, enum: [...TYPE] },
   data: chartDataSchema
});

mongoose.model('chart', chartSchema);
