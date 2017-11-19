import { ADD_TICKER } from '../actions/index';

export default function(state = [], action) {
   switch (action.type) {
   case ADD_TICKER:
      return [action.payload, ...state];
  }

  return state;
}


// return {
//    data:[ action.payload, ...state.data],
//    ticker: [action.meta, ...state.ticker]
// }
