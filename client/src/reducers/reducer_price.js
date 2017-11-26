import { GET_TICKER_DATA, LOAD_TICKER_PRICES } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
  case GET_TICKER_DATA: //fix for new model

      const name = action.meta
      const data = action.payload

      return { ...state, [name]: data } // old code // return Object.assign({}, state, newTracker);

   case LOAD_TICKER_PRICES:
      return action.payload

  }
  return state;
}
