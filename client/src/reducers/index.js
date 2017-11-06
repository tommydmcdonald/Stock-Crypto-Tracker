import { combineReducers } from 'redux';
import TrackerReducer from './reducer_tracker';

const rootReducer = combineReducers({
  tracker: TrackerReducer
});

export default rootReducer;
