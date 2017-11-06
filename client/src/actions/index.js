import axios from 'axios';

// Key to access Alphavantage API
const API_KEY = 'BIYQYMYZ9KIBXS9V';
const FUNCTIONKEY = 'TIME_SERIES_INTRADAY';
const INTERVAL = '1min';
const ROOT_URL = `https://www.alphavantage.co/query?apikey=${API_KEY}`;


export const FETCH_DATA = 'FETCH_DATA';

export function fetchData(ticker) {

  const url = `${ROOT_URL}&function=${FUNCTIONKEY}&symbol=${ticker}&interval=${INTERVAL}`;
  const request = axios.get(url);

  console.log(request);

  return {
    type: FETCH_DATA,
    payload: request
  };
}
