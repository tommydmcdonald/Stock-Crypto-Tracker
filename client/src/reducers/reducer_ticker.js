import { ADD_TICKER, LOAD_TICKER_LIST } from '../actions/types';

export default function(state = [], action) {
   switch (action.type) {
   case ADD_TICKER:
      return [ action.payload, ...state ];

   case LOAD_TICKER_LIST:
      return action.payload;
   default:
      return state;
  }

}
