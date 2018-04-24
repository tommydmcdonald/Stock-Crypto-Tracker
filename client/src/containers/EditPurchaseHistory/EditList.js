import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TYPE } from '../../actions/types';

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
import DatePicker from 'material-ui/DatePicker';

import DropdownArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import CloseDropdownArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import AddButton from 'material-ui/svg-icons/content/add';

import { Row, Col, Preloader } from 'react-materialize';

class EditList extends Component {
   constructor(props) {
      super(props);
      this.state = {
         selected: {name: '', rowNumber: -1, addPriceHistory: 0},
         showCheckboxes: false,
         dropdownColumnId: 4,
         addPriceHistoryColumnId: 3,
      };

      this.handleCellClick = this.handleCellClick.bind(this);
   }

   numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
   }

   renderTrackerList() {
      return this.props.tickers.map(ticker => this.renderTracker(ticker) );
   }

   renderEditRow(history) {
      return (
         <TableRow>
            <TableRowColumn>Quantity:
               <TextField
                  defaultValue={history.quantity}
                  onChange={(e, newValue) => {history.quantity = newValue}}
               />
            </TableRowColumn>
            <TableRowColumn>Cost:
               <TextField
                  defaultValue={history.price}
                  onChange={(e, newValue) => {history.price = newValue}}
               />
            </TableRowColumn>
            <TableRowColumn>Date: <DatePicker hintText="Pick date" container="inline" defaultDate={ new Date(history.date) }/></TableRowColumn>
            <TableRowColumn><AddButton/></TableRowColumn>
         </TableRow>
      );
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
         selected = true;
      }

      let editRow = []
      // if (selected) {
      //    for (let i = 0; i < this.state.selected.addPriceHistory; i++) {
      //       editRow.push( this.renderEditRow() );
      //    }
      // }

      if (selected) {
         editRow = ticker.purchaseHistory.map( history => this.renderEditRow(history));
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

   changePHCount(change) {

   }

   handleCellClick(rowNumber, columnId) {
      let { selected } = this.state;
      const previousSelected = selected.name;
      const sameSelected = (rowNumber == selected.rowNumber) ? true : false

      console.log(`rowNumber = ${rowNumber}, columnId = ${columnId}`);

      if (columnId == this.state.addPriceHistoryColumnId && previousSelected &&
         (rowNumber >= selected.rowNumber+1 && rowNumber <= (selected.rowNumber + selected.addPriceHistory) ) ) { //add button
         selected = { ...selected };

         selected.addPriceHistory += 1;

         this.setState( {selected} );
      }
      else if (columnId == this.state.dropdownColumnId) { //dropdown button
         if (sameSelected) { //close if already selected
            selected = {name: '', rowNumber: -1, addPriceHistory: 0};
            this.setState({ selected });
         }
         else { //new selection
            if (previousSelected && this.state.selected.rowNumber < rowNumber) { //account for extra row if already selected
               rowNumber--;
            }
            let selected = {name: this.props.tickers[rowNumber].name, rowNumber, addPriceHistory: 1};
            this.setState({ selected })
         }
      }

      console.log(this.state.selected);
   }

   render() {
      return (
         <div>
            <Table
               height='300px'
               onCellClick={this.handleCellClick}
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

function mapStateToProps({ priceList }) {
   return { priceList }
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({ }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditList);
