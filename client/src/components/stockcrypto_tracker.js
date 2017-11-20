import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class StockCryptoTracker extends Component {
   
   render() {
      return (
         <tr>
            <th scope="row">{this.props.trackerName}</th>
            <td>{this.props.currentPrice}</td>
         </tr>
      );
   }
}
