import { FETCH_NEWS_GENERAL, FETCH_NEWS_CUSTOM } from '../actions/types';

export default function(state = {}, action) {
   switch (action.type) {
      case FETCH_NEWS_GENERAL:

         for(let i = 0; i < data.length; i++) {

         }
         const { headline[i], url[i], summary[i] } = action.payload;

         const newState = { ...state};
         return newState;
      /*case FETCH_NEWS_CUSTOM:
         return action.payload*/
  }
  return state;
}
