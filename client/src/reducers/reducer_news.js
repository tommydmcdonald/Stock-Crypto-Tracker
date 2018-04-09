import { FETCH_NEWS_GENERAL, FETCH_NEWS_CUSTOM } from '../actions/types';

export default function(state = [], action) {
   switch (action.type) {
      case FETCH_NEWS_GENERAL:
         return action.payload;
      /*case FETCH_NEWS_CUSTOM:
         return action.payload*/
  }

   return state;
}
