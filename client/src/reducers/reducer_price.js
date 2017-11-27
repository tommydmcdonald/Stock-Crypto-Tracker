import { FETCH_TICKER_PRICE, LOAD_TICKER_PRICES } from '../actions/types';

export default function(state = {}, action) {
   switch (action.type) {
      case FETCH_TICKER_PRICE:
         return Object.assign({}, state, action.payload) //combines both objects into new one
      case LOAD_TICKER_PRICES:
         return action.payload

  }
  return state;
}
