import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from './chart';
import { Row } from 'react-materialize';

export default class StockCryptoTracker extends Component {

   render() {
      const { name, type, quantity } = this.props;
      return (
         <tr>
            <th scope="row">{this.props.name}</th>
            <td>{this.props.currentPrice}</td>
            <td><input value={quantity} onChange={ event => this.props.updateQuantity(name, type, event.target.value)} /></td>
            <td><a className="waves-effect waves-teal btn-flat" onClick={ () => this.props.onClick(name, type)}>Remove</a></td>
        </tr>
      );
   }
}

{/*  */}
