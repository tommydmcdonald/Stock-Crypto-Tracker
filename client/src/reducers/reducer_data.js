import { GET_TICKER_DATA } from '../actions/index';

export default function(state = {}, action) {
  switch (action.type) {
  case GET_TICKER_DATA:
      return Object.assign(state, )
  }
  return state;
}
