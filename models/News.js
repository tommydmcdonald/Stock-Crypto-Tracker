const mongoose = require('mongoose');
const { Schema } = mongoose;

const newsSchema = new Schema ({
   headline: String,
   url: String,
   summary: String
});

mongoose.model('news', newsSchema);
