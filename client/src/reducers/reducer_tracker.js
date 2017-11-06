import { FETCH_TRACKER } from '../actions/index';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_TRACKER:
      return action.payload.data;
  }
  return state;
}
