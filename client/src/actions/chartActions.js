import { LOAD_CHART_DATA, FETCH_CHART_DATA, SELECT_CHART } from './types';
import axios from 'axios';

export const loadChartData = () => async dispatch => { //used to laod initial chart data
    const res = await axios.get('/api/stock_charts');
    dispatch({type: LOAD_CHART_DATA, payload: res.data});
}

export const fetchChartData = (name, type) => async dispatch => {
  const res = { name, type };

  dispatch({type: FETCH_CHART_DATA, payload: res.data});
}

export const selectChart = ({ name, type }) => dispatch => {
   dispatch({type: SELECT_CHART, payload: { name, type } });
}
