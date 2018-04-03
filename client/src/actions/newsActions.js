import { FETCH_NEWS_GENERAL } from './types';
import axios from 'axios';

export const loadNews = () => async dispatch => {
   const res = await axios.get('/api/news');
   dispatch({type: FETCH_NEWS_GENERAL, payload: res.data});
}
