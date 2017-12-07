import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from './chart';
import { Row } from 'react-materialize';

export default class StockCryptoTracker extends Component {

   render() {
      const { name, type } = this.props;
      return (
         <tr>
            <th className="white-text" scope="row">{name} </th>
            <td className="white-text">{this.props.currentPrice} </td>
            <td><Chart chartData={this.props.chartData} /></td>
            <td ><a className="white-text waves-effect waves-teal btn-flat" onClick={ () => this.props.onClick(name, type)}>Remove</a></td>
        </tr>
      );
   }
}
