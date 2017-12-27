import { FETCH_CHART_DATA, LOAD_CHART_DATA } from '../actions/types';

export default function( state = { STOCK: {}, CRYPTO: {}}, action ) {
  switch(action.type) {
    case FETCH_CHART_DATA:
      const {name, type, data } = action.payload;
      const newState = { ...state};
      newState[type][name] = data;
      return newState;
    case LOAD_CHART_DATA:
      return action.payload;
  }
  return state;
}

//testing
