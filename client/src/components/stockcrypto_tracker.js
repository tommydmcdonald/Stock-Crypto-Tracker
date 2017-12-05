import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from './chart';

export default class StockCryptoTracker extends Component {

   render() {
      return (
         <tr>
            <th scope="row">{this.props.trackerName} </th>
            <td> ${this.props.currentPrice} </td>
            <Chart />
            <td><a className="waves-effect waves-teal btn-flat" onClick={ () => this.props.onClick(this.props._id)}>Remove</a></td>
        </tr>
      );
   }
}
