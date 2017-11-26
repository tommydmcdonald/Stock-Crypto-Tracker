import axios from 'axios';
import { TYPE, FETCH_USER, LOAD_TICKERS, LOAD_TICKER_PRICES } from './types';


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

export const loadTickerList = () => async dispatch => { //used to load initial tickers when page is loaded
   const res = await axios.get('/api/tickers');
   dispatch({ type: LOAD_TICKERS, payload: res.data});
}

export const loadTickerPrices = () => async dispatch => { //used to load initial ticker prices when page is loaded
   const res = await axios.get('/api/tickers/current_prices');
   dispatch({ type: LOAD_TICKER_PRICES, payload: res.data});
}

// export const fetchTickerPrice //used to fetch one ticker price, when initially added to tickerList
