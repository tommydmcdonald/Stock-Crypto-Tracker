import React, { Component } from 'react';
import StockCryptoTracker from '../components/stockcrypto_tracker.js';
import { connect } from 'react-redux';

const META_DATA = "Meta Data";

class StockCryptoList extends Component {

   renderTracker (tracker) {
     const stockName = tracker.data['Meta Data']['2. Symbol']
      console.log(stockName);

      return (
         <StockCryptoTracker data={tracker} />
      )
   }

   render () {
      return (
        <table className="table table-hover">
         <thead>
           <tr>
             <th>Ticker</th>
             <th>Price</th>
           </tr>
         </thead>
         <tbody>
           {this.props.tracker.map(this.renderTracker)}
         </tbody>
     </table>
      );
   }
}

function mapStateToProps({ tracker }){
   return { tracker };
}

export default connect(mapStateToProps)(StockCryptoList);
