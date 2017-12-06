import axios from 'axios';
import axiosRetry from 'axios-retry';
// import retry from 'async/retry';
import { FETCH_USER, ADD_TICKER, ADD_TICKER_PRICE, REMOVE_TICKER, LOAD_TICKERS, FETCH_TICKER_PRICE, LOAD_TICKER_PRICES, FETCH_CHART_DATA, LOAD_CHART_DATA } from './types';

export const addTicker = (newTicker) => async dispatch => { //adds new ticker to user's tickerList and add's price to priceList
   //initial ticker add before checking if it is valid
   const { name, type } = newTicker;

   dispatch({ type: ADD_TICKER, payload: newTicker });

   const res = await axios.post('/api/tickers', newTicker);

   if ( res.data.hasOwnProperty('error') ) { //if ticker is not valid for API
      dispatch({type: REMOVE_TICKER, payload: newTicker });
   }
   else { //add ticker price
      dispatch({ type: ADD_TICKER_PRICE, payload: { name, type, data: res.data } });
   }
}

export const removeTicker = ( name, type ) => dispatch => {
   axios.delete(`/api/tickers/${type}/${name}`);
   dispatch({type: REMOVE_TICKER, payload: { type, name } });
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

export const loadChartData = () => async dispatch => { //used to laod initial chart data
    const res = await axios.get('/api/stock_charts');
    dispatch({type: LOAD_CHART_DATA, payload: res.data});
}

export const fetchChartData = (name, type) => async dispatch => {
  const res = { name, type };

  dispatch({type: FETCH_CHART_DATA, payload: res.data});
}
