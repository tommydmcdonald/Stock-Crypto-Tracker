import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class StockCryptoTracker extends Component {

   render() {
      return (
         <div>
            Tracker info:
            {this.props.tracker["Meta Data"]}
         </div>
      );
   }
}
