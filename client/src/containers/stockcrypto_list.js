import React, { Component } from 'react';
import StockCryptoTracker from '../components/stockcrypto_tracker.js';
import { connect } from 'react-redux';

class StockCryptoList extends Component {

   renderTracker (tracker) {
      const stockName = tracker["Meta Data"]["2. Symbol"].toUpperCase();

      const priceData = tracker["Time Series (1min)"]
      const currentPriceKey = Object.keys( priceData )[0];
      const currentPrice = priceData[ currentPriceKey ]["4. close"]

      return (
            <StockCryptoTracker key={stockName} stockName={stockName} currentPrice={currentPrice}/>
      )
   }

   render () {
      return (
        <table className="table table-hover">
         <thead>
           <tr>
             <th>Ticker</th>
             <th>Price</th>
             <th></th>
             <th></th>
             <th></th>
           </tr>
         </thead>
         <tbody>
           {this.props.trackerList.map(this.renderTracker)}
         </tbody>
     </table>
      );
   }
}

function mapStateToProps({ trackerList }){
   return { trackerList };
}

export default connect(mapStateToProps)(StockCryptoList);
