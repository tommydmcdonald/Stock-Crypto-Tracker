import { combineReducers } from 'redux';

import authReducer from './authReducer';
import tickerReducer from './reducer_ticker';
import priceReducer from './reducer_price';
import chartReducer from './reducer_chart_data';
import selectedChartReducer from './reducer_selected_chart';

const rootReducer = combineReducers({
   auth: authReducer,
   tickerList: tickerReducer,
   priceList: priceReducer,
   chartData: chartReducer,
   selectedChart: selectedChartReducer
});

export default rootReducer;
