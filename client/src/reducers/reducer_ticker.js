import { ADD_TICKER, REMOVE_TICKER, LOAD_TICKERS } from '../actions/types';

export default function(state = [], action) {
   switch (action.type) {
   case ADD_TICKER:
      return [ ...state, action.payload ];
   case REMOVE_TICKER:
      return state.filter( ticker => ticker._id != action.payload && ticker.name != action.payload); //action.payload = _id
   case LOAD_TICKERS:
      return action.payload;
   default:
      return state;
  }

}
