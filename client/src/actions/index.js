import axios from 'axios';
import alphavantage from 'alphavantage';

export const FETCH_TRACKER = 'FETCH_TRACKER';

export function fetchTracker(ticker) {

  const alpha = require('alphavantage')({ key: 'BIYQYMYZ9KIBXS9V' });

  alpha.data.intraday(ticker).then( apiCall => {

     const stockName = apiCall["Meta Data"]["2. Symbol"].toUpperCase();

     const priceData = apiCall["Time Series (1min)"]
     const currentPriceKey = Object.keys( priceData )[0];
     const currentPrice = priceData[ currentPriceKey ]["4. close"]
     return {
        type: FETCH_TRACKER,
        payload: {"stockName": stockName, "currentPrice": currentPrice}
     };
  });
}
