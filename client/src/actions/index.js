import axios from 'axios';

export const ADD_TICKER = 'ADD_TICKER';
export const GET_TICKER_DATA = 'GET_TICKER_DATA';

export const TYPE = {STOCK: 'STOCK', CRYPTO: 'CRYPTO'};

const API_KEY = 'BIYQYMYZ9KIBXS9V';
const BASE_URL = `https://www.alphavantage.co/query?apikey=${API_KEY}&`;

const STOCK_URL = `${BASE_URL}function=TIME_SERIES_INTRADAY&interval=1min&symbol=`;
const CRYPTO_URL = `${BASE_URL}function=DIGITAL_CURRENCY_INTRADAY&market=USD&symbol=`;

export function addTicker(ticker, type) {

   return {
      type: ADD_TICKER,
      payload: ticker,
      meta: type
    };
}

export function getTickerData(ticker = {name: '', type: ''}) {
   const { name, type } = ticker
   let URL;

   if (ticker.type == TYPE.STOCK) {
      URL = `${STOCK_URL}${name}`;
      console.log("URL ", URL);
   }
   else if (ticker.type == TYPE.CRYPTO) {
      URL = `${CRYPTO_URL}${name}`;
   }

   // const request =

   console.log("GET_TICKER_DATA " + ticker.name);
   return {
      type: GET_TICKER_DATA,
      payload: axios.get(URL),
      meta: ticker.name
   }
}
