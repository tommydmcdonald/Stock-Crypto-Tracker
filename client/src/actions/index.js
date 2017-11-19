import axios from 'axios';
import alphavantage from 'alphavantage';

export const ADD_TICKER = 'ADD_TICKER';
export const GET_TICKER_DATA = 'GET_TICKER_DATA';

const API_KEY = 'BIYQYMYZ9KIBXS9V';
const alpha = require('alphavantage')({ key: API_KEY });

export function addTicker(ticker) {

   return {
      type: ADD_TICKER,
      payload: ticker.toUpperCase()
    };
}

export function getTickerData(ticker) {
   return {
      type: GET_TICKER_DATA,
      payload: alpha.data.intraday(ticker),
      meta: ticker
   }
}
