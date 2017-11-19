import { combineReducers } from 'redux';
import tickerReducer from './reducer_ticker';
import dataReducer from './reducer_data';

const rootReducer = combineReducers({
  tickerList: tickerReducer,
  dataList: dataReducer
});

export default rootReducer;
