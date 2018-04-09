import { OPEN_SNACKBAR, CLOSE_SNACKBAR } from '../actions/types';

export default function(state = {open: false}, action) {
   switch(action.type) {
      case OPEN_SNACKBAR:
         return {open: true, ticker: action.payload};
      case CLOSE_SNACKBAR:
         return {open: false};
   }
   return state;
}
