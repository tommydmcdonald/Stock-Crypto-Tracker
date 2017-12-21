import { SELECT_CHART } from '../actions/types';

export default function(state = {name: '', type: ''}, action) {
   switch (action.type) {
      case SELECT_CHART:
         console.log('reducer_selected_chart, select_chart =', action.payload);
         return action.payload
  }
  return state;
}
