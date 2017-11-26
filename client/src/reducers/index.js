import { combineReducers } from 'redux';

import authReducer from './authReducer';
import tickerReducer from './reducer_ticker';
import priceReducer from './reducer_price';

const rootReducer = combineReducers({
   auth: authReducer,
   tickerList: tickerReducer,
   priceList: priceReducer
});

export default rootReducer;
