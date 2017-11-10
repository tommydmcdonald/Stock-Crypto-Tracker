import { FETCH_TRACKER } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
  case FETCH_TRACKER:
      return [action.payload, ...state];
  }
  return state;
}
