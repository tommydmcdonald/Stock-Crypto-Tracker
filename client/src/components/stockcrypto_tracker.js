import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class StockCryptoTracker extends Component {
   componentDidMount() {
      this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
   }

   componentWillUnmount() {
      clearInterval(this.interval);
   }


   render() {
      return (
         <tr>
            <th scope="row">{this.props.trackerName}</th>
            <td>{this.props.currentPrice}</td>
         </tr>
      );
   }
}
