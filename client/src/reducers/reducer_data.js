import { GET_TICKER_DATA } from '../actions/index';

export default function(state = {}, action) {
  switch (action.type) {
  case GET_TICKER_DATA:


      const name = action.meta
      const data = action.payload
      console.log("action.payload=", action.payload);
      console.log("reducer_data, name= ", name, "action.meta");

      return { ...state, [name]: data } // old code // return Object.assign({}, state, newTracker);
  }
  return state;
}
