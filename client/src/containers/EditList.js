import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TYPE } from '../actions/types';

import _ from 'lodash';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';

import DropdownArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import CloseDropdownArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-up';

import { Row, Col, Preloader } from 'react-materialize';

class EditList extends Component {
   constructor(props) {
      super(props);
      this.state = {
         selected: {name: '', rowNumber: -1},
         showCheckboxes: false,
         dropdownColumnId: 4,
      };

      this.state.tickers = this.props.tickerList.filter( ticker => ticker.type == this.props.type);
   }

   numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
   }

   renderTrackerList() {
      return this.state.tickers.map(ticker => this.renderTracker(ticker) );
   }

   renderTracker(ticker) {
      const { name, type, quantity } = ticker;

      const key = name;

      let currentPrice = _.get(
         this.props.priceList,
         `[${type}][${name}]`,
         ''
      );

      if (currentPrice !== '') {
         currentPrice = Number(currentPrice).toFixed(2);
         currentPrice = '$' + this.numberWithCommas(currentPrice);
      }
      else {
         currentPrice = (
            <Row>
               {' '}
               <Col>
                  {' '}
                  <Preloader size="small" />{' '}
               </Col>{' '}
            </Row>
         );
      }

      let selected = false;
      if (this.state.selected.name === name) {
         console.log('selected name = ', name);
         selected = true;
      }

      let editRow;
      if (selected) {
         editRow = (
            <TableRow selected={selected}>
               <TableRowColumn>New</TableRowColumn>
               <TableRowColumn>New</TableRowColumn>
               <TableRowColumn>New</TableRowColumn>
            </TableRow>
         )
      }

      const standardRow = (
         <TableRow selected={selected}>
            <TableRowColumn>{name}</TableRowColumn>
            <TableRowColumn>{currentPrice}</TableRowColumn>
            <TableRowColumn>{quantity}</TableRowColumn>
            <TableRowColumn>Remove</TableRowColumn>
            <TableRowColumn>
               {!selected ? <DropdownArrow/> : <CloseDropdownArrow/>}
            </TableRowColumn>
         </TableRow>
      );

      return [standardRow, editRow];
   }

   handleCellClick(rowNumber, columnId) {
      const { selected } = this.state;
      const previousSelected = selected.name;
      const sameSelected = (rowNumber == selected.rowNumber) ? true : false

      console.log('sameSelected = ', sameSelected);

      if (columnId == this.state.dropdownColumnId) {
         if (sameSelected) {
            const selected = {name: '', rowNumber: -1};
            this.setState({ selected });
            console.log('sameselected = ', this.state.selected);
         }
         else {
            if (previousSelected && this.state.selected.rowNumber < rowNumber) {
               rowNumber--;
            }
            const selected = {name: this.state.tickers[rowNumber].name, rowNumber };
            console.log('selected = ', selected, 'columnId = ', columnId);
            this.setState({ selected })
         }
      }


   }

   render() {
      return (
         <div>
            <Table
               onCellClick={(rowNumber, columnId) => this.handleCellClick(rowNumber, columnId)}
            >
               <TableHeader
                  displaySelectAll={this.state.showCheckboxes}
                  adjustForCheckbox={this.state.showCheckboxes}
               >
                  <TableRow>
                     <TableHeaderColumn>Ticker</TableHeaderColumn>
                     <TableHeaderColumn>Price</TableHeaderColumn>
                     <TableHeaderColumn>Quantity</TableHeaderColumn>
                     <TableHeaderColumn>Remove</TableHeaderColumn>
                     <TableHeaderColumn>Edit Quantity</TableHeaderColumn>
                  </TableRow>
               </TableHeader>
             <TableBody
                displayRowCheckbox={this.state.showCheckboxes}
             >
                {this.renderTrackerList(TYPE.STOCK)}
             </TableBody>

           </Table>
         </div>
      );

   }
}

function mapStateToProps({tickerList, priceList, selectedChart}) {
   return { tickerList, priceList, selectedChart }
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({ }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditList);
