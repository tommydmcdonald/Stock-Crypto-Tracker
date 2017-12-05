import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class StockCryptoTracker extends Component {

   render() {
      const { name, type } = this.props;
      return (
         <tr>
            <th scope="row">{this.props.name}</th>
            <td>{this.props.currentPrice}</td>
            <td><a className="waves-effect waves-teal btn-flat" onClick={ () => this.props.onClick(name, type)}>Remove</a></td>
         </tr>
      );
   }
}
