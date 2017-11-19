import { combineReducers } from 'redux';
import tickerReducer from './reducer_ticker';
import updateTrackerList from './reducer_trackerlist_update';

const rootReducer = combineReducers({
  tickerList: tickerReducer,
  dataList: dataReducer
});

export default rootReducer;
