import { FETCH_CHART_DATA, LOAD_CHART_DATA } from '../actions/types';

export default function( state = {}, action ) {
  switch(action.type) {
    case FETCH_CHART_DATA:
      const {name, type, prices, times } = action.payload;
      const newState = { ...state};
      newState[type][name] = {times, prices};
      return newState;
    case LOAD_CHART_DATA:
      return action.payload;
  }
  return state;
}
