import { ADD_TICKER, REMOVE_TICKER, ADD_TICKER_PRICE, SELECT_CHART,
         LOAD_TICKERS, UPDATE_TICKER_QUANTITY, LOAD_TICKER_PRICES, OPEN_SNACKBAR, ADD_TICKER_LOGO } from './types'
import axios from 'axios';
import { fetchChartData } from './chartActions';

export const addTicker = (newTicker, tickerListSize) => async dispatch => { //adds new ticker to user's tickerList and add's price to priceList
   //initial ticker add before checking if it is valid
   const { name, type } = newTicker;
   newTicker.quantity = 1;

   dispatch({ type: ADD_TICKER, payload: newTicker });

   const res = await axios.post('/api/tickers', newTicker);
   const { price, logo } = res.data;
   console.log('res.data = ', res.data);

   if ( res.data.hasOwnProperty('error') ) { //if ticker is not valid for API
      dispatch({type: REMOVE_TICKER, payload: newTicker });
   }
   else { //add ticker price and load chart data
      dispatch({ type: ADD_TICKER_PRICE, payload: { name, type, price } });
      dispatch({ type: ADD_TICKER_LOGO, payload: { name, type, logo } });
      dispatch({ type: OPEN_SNACKBAR, payload: { name, type } });
      if (tickerListSize === 0) { //if nothing in tickerList, nothing will be graphed. Graph newly added ticker, since it is the only ticker
         dispatch({ type: SELECT_CHART, payload: {name, type} });
      }
      dispatch(fetchChartData(name, type));
   }
}

export const removeTicker = ( {name, type} ) => dispatch => {
   axios.delete(`/api/tickers/${type}/${name}`);
   dispatch({type: REMOVE_TICKER, payload: { type, name } });
}

export const loadTickerList = () => async dispatch => { //used to load initial tickers when page is loaded
   const res = await axios.get('/api/tickers');
   dispatch({ type: LOAD_TICKERS, payload: res.data});
}

export const updateQuantity = ( name, type, quantity ) => async dispatch => { //updates ticker quantity in user's tickerList when field is changed in Tracker
   axios.post(`/api/tickers/${type}/${name}/${quantity}`);
   dispatch({ type: UPDATE_TICKER_QUANTITY, payload: { name, type, quantity } });
}

export const loadTickerPrices = () => async dispatch => { //used to load initial ticker prices when page is loaded
   const res = await axios.get('/api/tickers/current_prices');
   dispatch({ type: LOAD_TICKER_PRICES, payload: res.data});
}
