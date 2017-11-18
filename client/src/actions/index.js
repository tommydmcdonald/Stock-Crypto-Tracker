import axios from 'axios';
import alphavantage from 'alphavantage';

export const FETCH_TRACKER = 'FETCH_TRACKER';

export function fetchTracker(ticker) {

  const alpha = require('alphavantage')({ key: 'BIYQYMYZ9KIBXS9V' });

  return {
    type: FETCH_TRACKER,
    payload: alpha.data.intraday(ticker)
  };
}
