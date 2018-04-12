import { LOAD_CHART_DATA, FETCH_CHART_DATA, SELECT_CHART, SELECT_CHART_FREQ } from './types';
import axios from 'axios';

export const loadChartData = () => async dispatch => { //used to laod initial chart data
   const res = await axios.get('/api/charts');
   dispatch({type: LOAD_CHART_DATA, payload: res.data});
}

export const fetchChartData = (name, type) => async dispatch => {
   console.log('fetch chart data');
   const res = await axios.get(`/api/charts/${type}/${name}`);
   const newChart = {name, type, data: res.data};
   dispatch({ type: FETCH_CHART_DATA, payload: newChart});
}

export const selectChart = ( name, type ) => dispatch => {
   console.log('selectChart');
   console.log('name = ' + name + ' type = ' + type);
   dispatch({type: SELECT_CHART, payload: { name, type } });
}

export const selectChartFreq = ( frequencyObj ) => dispatch => {
   console.log('freqObj = ', frequencyObj);
   dispatch({ type: SELECT_CHART_FREQ, payload: frequencyObj });
}
