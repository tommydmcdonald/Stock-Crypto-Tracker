import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class StockCryptoTracker extends Component {

   render() {
      return (
         <tr>
            <th scope="row">{this.props.trackerName}</th>
            <td>{this.props.currentPrice}</td>
            <td><a className="waves-effect waves-light btn">button</a></td>
         </tr>
      );
   }
}

//<i className="material-icons">remove_circle</i>
