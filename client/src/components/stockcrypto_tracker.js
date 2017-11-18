import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (props) => {

  return (
     <tr>
        <th scope="row">{props.stockName}</th>
        <td>{props.currentPrice}</td>
     </tr>
  );
}
