import { combineReducers } from 'redux';

import authReducer from './authReducer';
import tickerReducer from './reducer_ticker';
import dataReducer from './reducer_data';

const rootReducer = combineReducers({
   auth: authReducer,
   tickerList: tickerReducer,
   dataList: dataReducer
});

export default rootReducer;
