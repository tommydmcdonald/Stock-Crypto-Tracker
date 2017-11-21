import axios from 'axios';
import { FETCH_USER, GET_TICKER_DATA, ADD_TICKER, TYPE} from './types';


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

   console.log("GET_TICKER_DATA " + ticker.name);
   return {
      type: GET_TICKER_DATA,
      payload: axios.get(URL),
      meta: ticker.name
   }
}

export const fetchUser = () => async dispatch => {
   const res = await axios.get('/api/current_user');
   dispatch({ type: FETCH_USER, payload: res.data});
}
