const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
require('./models');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser  = require("body-parser");
const { updateTickerData, updateChartData } = require('./services/dataUpdate');
const keys = require('./config/keys');
const { mongoURI } = require('./config/mongoURI');
const routes = require('./routes');

require('./services/passport');

mongoose.connect(mongoURI);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use('/', routes);

updateTickerData(11 * 1000);
updateChartData(60 * 5 * 1000);

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', index.html));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
