import axios from 'axios';

// Key to access Alphavantage API
const API_KEY = 'BIYQYMYZ9KIBXS9V';
const FUNCTIONKEY = 'TIME_SERIES_DAILY';
const ROOT_URL = `https://www.alphavantage.co/query?apikey=${API_KEY}`;


export const FETCH_DATA = 'FETCH_DATA';

export function fetchData(ticker) {

  const url = `${ROOT_URL}&function=${FUNCTIONKEY}&symbol=${ticker}`
  const request = axios.get(url);

  console.log(request);

  return {
    type: FETCH_DATA,
    payload: request
  };
}
