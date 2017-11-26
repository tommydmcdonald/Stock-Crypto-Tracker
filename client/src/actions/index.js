import axios from 'axios';
import { FETCH_USER, GET_TICKER_DATA, ADD_TICKER, TYPE, LOAD_TICKER_LIST } from './types';


const API_KEY = 'BIYQYMYZ9KIBXS9V';
const BASE_URL = `https://www.alphavantage.co/query?apikey=${API_KEY}&`;

const STOCK_URL = `${BASE_URL}function=TIME_SERIES_INTRADAY&interval=1min&symbol=`;
const CRYPTO_URL = `${BASE_URL}function=DIGITAL_CURRENCY_INTRADAY&market=USD&symbol=`;

export const addTicker = (name, type) => async dispatch => {
   const newTicker = { name: name, type: type};
   const res = await axios.post('/api/tickers', newTicker);
   dispatch({ type: FETCH_USER, payload: res.data });
}

export const fetchUser = () => async dispatch => {
   const res = await axios.get('/api/current_user');
   dispatch({ type: FETCH_USER, payload: res.data});
}

export const loadTickerList = () => async dispatch => {
   console.log('load ticker list action');
   const res = await axios.get('/api/tickers');
   console.log("res.data= ", res.data);
   dispatch({ type: LOAD_TICKER_LIST, payload: res.data});
}
