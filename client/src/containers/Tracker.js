import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Icon, Col } from 'react-materialize';
import { selectChart } from '../actions'

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class Tracker extends Component {

   render() {
      const { name, type, currentPrice, quantity } = this.props;
      return (
         <TableRow>
            <TableRowColumn>{name}</TableRowColumn>
            <TableRowColumn>{currentPrice}</TableRowColumn>
            <TableRowColumn>{quantity}</TableRowColumn>
         </TableRow>

      );
   }
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({ selectChart }, dispatch);
}

export default connect(null, mapDispatchToProps)(Tracker);
