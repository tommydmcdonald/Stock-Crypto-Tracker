import { ADD_TICKER, REMOVE_TICKER, LOAD_TICKERS } from '../actions/types';

export default function(state = [], action) {
   switch (action.type) {
   case ADD_TICKER:
      return [ ...state, action.payload ];
   case REMOVE_TICKER:
      const newState = state.filter( ticker => {
         const { name, type } = action.payload;
         if (ticker.name != name) {
            return true;
         }
         else if (ticker.type != action.payload.type) { //if name is same but type is different
            return true;
         }
         return false;
      }); //action.payload = _id
      console.log('remove_ticker = ', newState);
      return newState;
   case LOAD_TICKERS:
      return action.payload;
   default:
      return state;
  }

}
