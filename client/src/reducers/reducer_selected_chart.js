import { SELECT_CHART, SELECT_CHART_FREQ } from '../actions/types';

export default function(state = {name: '', type: '', frequency: 'Day'}, action) {
   switch (action.type) {
      case SELECT_CHART:
      case SELECT_CHART_FREQ:
         console.log('action.payload = ', action.payload);
         return { ...state, ...action.payload };
  }
  return state;
}
