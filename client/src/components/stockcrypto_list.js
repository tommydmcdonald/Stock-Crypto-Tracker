import React, { Component } from 'react';
import StockCryptoTracker from '../containers/stockcrypto_tracker';
import _ from 'lodash';

export default class StockCryptoList extends Component {
   render () {
      return (
         <div>
            <StockCryptoTracker />

         </div>
      );
   }
}

function mapStateToProps({ tracker }){
   return { tracker };
}

export default connect(mapStateToProps)(StockCryptoTracker);
