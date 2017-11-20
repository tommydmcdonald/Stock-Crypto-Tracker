import { ADD_TICKER } from '../actions/index';

export default function(state = [], action) {
   switch (action.type) {
   case ADD_TICKER:
      const name = action.payload;
      const type = action.meta;

      return [ {name, type}, ...state ];
  }

  return state;
}
