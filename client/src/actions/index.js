import axios from 'axios';
import axiosRetry from 'axios-retry';
// import retry from 'async/retry';
import { FETCH_USER, ADD_TICKER, REMOVE_TICKER, LOAD_TICKERS, FETCH_TICKER_PRICE, LOAD_TICKER_PRICES, FETCH_CHART_DATA } from './types';

export const addTicker = (name, type) => async dispatch => { //adds new ticker to user's tickerList and add's price to priceList
   const newTicker = { name, type };

   const res = await axios.post('/api/tickers', newTicker);
   dispatch({ type: ADD_TICKER, payload: res.data });

   const result = await axios.get(`/api/tickers/current_prices/${type}/${name}`) // The first request fails and the second returns 'ok'
   dispatch({ type: FETCH_TICKER_PRICE, payload: result.data })
}

export const removeTicker = ( _id ) => dispatch => {
   console.log('actions - removeTicker. _id=', _id);
   axios.delete(`/api/tickers/${_id}`);
   dispatch({type: REMOVE_TICKER, payload: _id });
}

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

export const fetchChartData = (name, type) => async dispatch => {
  const newChart = { name, type };

  const res = await axios.get()('/api/stock_chart/${type}/${name}')   // Object that contains two array of past price and times of those prices
  dispatch({ type: FETCH_CHART_DATA, payload: res.data});
}
