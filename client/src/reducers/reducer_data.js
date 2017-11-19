import { GET_TICKER_DATA } from '../actions/index';

export default function(state = {}, action) {
  switch (action.type) {
  case GET_TICKER_DATA:
      const ticker = action.meta
      console.log("action.meta= " + action.meta);
      // console.log("reducer_data " + action.payload["Time Series (1min)"]["2017-11-17 16:00:00"]["4. close"] );
      // return action.payload;
      const newTracker = {}
      newTracker[ticker] = action.payload;
      return Object.assign({}, state, newTracker);
  }
  return state;
}
