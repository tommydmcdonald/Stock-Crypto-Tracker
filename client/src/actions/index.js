import axios from 'axios';
import axiosRetry from 'axios-retry';
// import retry from 'async/retry';
import { FETCH_USER, ADD_TICKER, REMOVE_TICKER, LOAD_TICKERS, FETCH_TICKER_PRICE, LOAD_TICKER_PRICES } from './types';

export const addTicker = (name, type) => async dispatch => { //adds new ticker to user's tickerList and add's price to priceList
   //initial ticker add before checking if it is valid
   const newTicker = { name, type };
   dispatch({ type: ADD_TICKER, payload: newTicker });

   const resAdd = await axios.post('/api/tickers', newTicker);

   if ( resAdd.data.hasOwnProperty('error') ) { //if ticker is not valid for API
      dispatch({type: REMOVE_TICKER, payload: newTicker });
   }
   else { //add ticker price
      dispatch({ type: FETCH_TICKER_PRICE, payload: resData.data });
   }



   const resData = await axios.get(`/api/tickers/current_prices/${type}/${name}`); // The first request fails and the second returns 'ok'

   if (resData.status == '200') { //created successfully

   }
   else if (resData.status == '202') { //stock/crypto not found

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
