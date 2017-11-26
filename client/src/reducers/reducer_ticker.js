import { ADD_TICKER, LOAD_TICKERS } from '../actions/types';

export default function(state = [], action) {
   switch (action.type) {
   case ADD_TICKER:
      return [ action.payload, ...state ];
   case LOAD_TICKERS:
      return action.payload;
   default:
      return state;
  }

}
