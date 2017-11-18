import { combineReducers } from 'redux';
import TrackerReducer from './reducer_tracker';

const rootReducer = combineReducers({
  trackerList: TrackerReducer
});

export default rootReducer;
