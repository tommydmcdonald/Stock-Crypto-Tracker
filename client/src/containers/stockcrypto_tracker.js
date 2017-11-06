import React, { Component } from 'react';
import { connect } from 'react-redux';

class StockCryptoTracker extends Component {

   render() {
      return (
         <div>
            Tracker
         </div>
      )
   }
}

function mapStateToProps({ tracker }){
   return { tracker };
}

export default connect(mapStateToProps)(StockCryptoTracker);
