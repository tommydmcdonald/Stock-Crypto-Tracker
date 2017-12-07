import { combineReducers } from 'redux';

import authReducer from './authReducer';
import tickerReducer from './reducer_ticker';
import priceReducer from './reducer_price';
import chartReducer from './reducer_chart_data';

const rootReducer = combineReducers({
   auth: authReducer,
   tickerList: tickerReducer,
   priceList: priceReducer,
   chartData: chartReducer
});

export default rootReducer;
