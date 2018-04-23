import { ADD_TICKER, REMOVE_TICKER, LOAD_TICKERS, UPDATE_TICKER_QUANTITY, ADD_TICKER_HISTORY } from '../actions/types';
import _ from 'lodash';

export default function(state = [], action) {
   switch (action.type) {
   case ADD_TICKER:
      return [ ...state, action.payload ];
   case REMOVE_TICKER: {
      const newState = state.filter( ticker => {
         const { name, type } = action.payload;
         if (ticker.name !== name) {
            return true;
         }
         else if (ticker.type !== type) { //if name is same but type is different
            return true;
         }
         return false;
      }); //action.payload = _id
      return newState;
   }
   case LOAD_TICKERS:
      return action.payload;
   case UPDATE_TICKER_QUANTITY: {
      const { name, type, quantity } = action.payload
      const newState = [ ...state ];
      _.find(newState, { name, type }).quantity = quantity;
      return newState;
   }
   case ADD_TICKER_HISTORY: {
      const { name, type, purchaseHistory } = action.payload
      const newState = [ ...state ];
      console.log('ATH, action.payload = ', action.payload);
      _.find(newState, { name, type }).purchaseHistory = purchaseHistory;
      return newState;
   }
   default:
      return state;
  }

}
