import axios from 'axios';
import alphavantage from 'alphavantage';


// Key to access Alphavantage API
const API_KEY = 'BIYQYMYZ9KIBXS9V';
const FUNCTIONKEY = 'TIME_SERIES_INTRADAY';
const INTERVAL = '1min';
const ROOT_URL = `https://www.alphavantage.co/query?apikey=${API_KEY}`;


export const FETCH_TRACKER = 'FETCH_TRACKER';

export function fetchTracker(ticker) {

  const url = `${ROOT_URL}&function=${FUNCTIONKEY}&symbol=${ticker}&interval=${INTERVAL}`;
//  const request = axios.get(url);
  const alpha = require('alphavantage')({ key: 'BIYQYMYZ9KIBXS9V' });

  alpha.data.intraday(ticker).then(data => {
    console.log('Request: ', data);
  });

  return {
    type: FETCH_TRACKER,
    payload: alpha.data.intraday(ticker)
  };
}
