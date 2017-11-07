import React, { Component } from 'react';
import StockCryptoTracker from '../components/stockcrypto_tracker.js'; 
import { connect } from 'react-redux';

class StockCryptoList extends Component {
   renderTracker (tracker) { //one tracker
      return (
         <StockCryptoTracker data={tracker} />
      )
   }

   render () {
      return (
         <div>
            {this.props.tracker.map()}
         </div>
      );
   }
}

function mapStateToProps({ tracker }){
   return { tracker };
}

export default connect(mapStateToProps)(StockCryptoTracker);
