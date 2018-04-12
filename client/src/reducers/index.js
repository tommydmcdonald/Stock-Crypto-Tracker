import { combineReducers } from 'redux';

import authReducer from './authReducer';
import tickerReducer from './reducer_ticker';
import priceReducer from './reducer_price';
import chartReducer from './reducer_chart_data';
import selectedChartReducer from './reducer_selected_chart';
import newsReducer from './reducer_news';
import snackbarReducer from './reducer_snackbar';

const rootReducer = combineReducers({
   auth: authReducer,
   tickerList: tickerReducer,
   priceList: priceReducer,
   chartData: chartReducer,
   selectedChart: selectedChartReducer,
   news: newsReducer,
   snackbar: snackbarReducer,
});

export default rootReducer;
