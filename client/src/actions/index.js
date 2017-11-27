import axios from 'axios';
import { FETCH_USER, ADD_TICKER, LOAD_TICKERS, FETCH_TICKER_PRICE, LOAD_TICKER_PRICES } from './types';

export const addTicker = (name, type) => async dispatch => { //adds new ticker to user's tickerList and add's price to priceList
   const newTicker = { name, type };

   const res = await axios.post('/api/tickers', newTicker);
   dispatch({ type: ADD_TICKER, payload: res.data });

   let resolved = false;
   while (!resolved) {
      try {
         const resPrice = await axios.get(`/api/tickers/current_prices/${type}/${name}`);
         resolve = true;
      }
      catch (err) {}
   }

   dispatch({type: FETCH_TICKER_PRICE, payload: resPrice.data});
}

// export const fetchTickerPrice = (name, type) => async dispatch => { //used to fetch one ticker price, when initially added to tickerList
//
// }

export const fetchUser = () => async dispatch => { //get user information for who is logged in
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
