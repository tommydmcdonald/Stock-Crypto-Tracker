const axios = require('axios');
const delay = require('delay');
const mongoose = require('mongoose');
const Ticker = mongoose.model('tickers');
const API_KEY = 'BIYQYMYZ9KIBXS9V';
const BASE_URL = `https://www.alphavantage.co/query?apikey=${API_KEY}&function=`;
