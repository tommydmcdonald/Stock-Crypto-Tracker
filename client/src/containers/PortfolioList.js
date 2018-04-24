import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { Row, Col, Preloader, Collapsible, CollapsibleItem } from 'react-materialize';

import { TYPE } from '../actions/types';
import { removeTicker, updateQuantity, selectChart } from '../actions';
import Tracker from './Tracker';
import SearchBar from './SearchBar';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import TextField from 'material-ui/TextField';

import '../style/PortfolioList.css';

class PortfolioList extends Component {
   constructor() {
      super();
      this.state = {
         showCheckboxes: false,
         selectable: true,
         deselectOnClickaway: false,
      }
   }


   renderTracker(tickerItem, renderType) {
      let { name, type, quantity, logo } = tickerItem;



      if (type == TYPE.CRYPTO) {
         const cryptoImgs = ['ADA', 'BCH', 'BTC', 'DASH', 'DOGE', 'EOS', 'ETH', 'IOTA', 'LTC', 'NEO', 'XMR'];
         if (_.includes(cryptoImgs, name)) {
            logo = require('../img/CryptoImages/' + name.toLowerCase() + '.png');
         }
      }

      if (type === renderType) {
         const key = name + '-' + type;

         let currentPrice = _.get(
            this.props.priceList,
            `[${type}][${name}]`,
            ''
         );

         if (currentPrice !== '') {
            currentPrice = Number(currentPrice).toFixed(2);
            currentPrice = '$' + this.numberWithCommas(currentPrice);
         } else {
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

         //selecting row if it is currently selected chart
         const { selectedChart } = this.props;
         let selected = false;
         if (selectedChart.name === name && selectedChart.type === type) {
            selected = true;
         }


         return (
            <TableRow selected={selected}>
               <TableRowColumn><img className="ticker-img" src={logo} height="18" width="18"></img></TableRowColumn>
               <TableRowColumn>{name}</TableRowColumn>
               <TableRowColumn>{currentPrice}</TableRowColumn>
               <TableRowColumn>{quantity}</TableRowColumn>
            </TableRow>
         );
      }
   }

   checkChartTicker(removingTicker) {
      if ( _.isEqual(removingTicker, this.props.selectedChart) ) { //need to update selectedChart if it is ticker being removed
         const tickerList0 = _.pick(this.props.tickerList[0], ['name', 'type']);

         if ( _.isEqual(removingTicker, tickerList0) ) {
            this.props.tickerList[1] ? this.props.selectChart(this.props.tickerList[1]) : this.props.selectChart({ name: '', type: ''});
            //if no 2nd ticker in tickerList, no graphs will be available to display since first graph is being deleted
         }
         else {
            this.props.selectChart(this.props.tickerList[0]);
         }
      }
      this.props.removeTicker(removingTicker);
   }

   renderHeader(renderType) {
      let header;
      if (renderType === TYPE.STOCK) {
         header = 'Stocks';
      }
      else if (renderType === TYPE.CRYPTO) {
         header = 'Cryptocurrencies';
      }

      return (
         <TextField></TextField>
      );
   }

   numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
   }

   renderTrackerList(renderType) {
      return (
         this.props.tickerList.map(ticker =>
            this.renderTracker(ticker, renderType)
         )
      );
   }

   renderList(renderType) {
      let header;
      if (renderType === TYPE.STOCK) {
         header = 'Stocks';
      }
      else if (renderType === TYPE.CRYPTO) {
         header = 'Cryptocurrencies';
      }

      return (
            <CollapsibleItem defaultActiveKey={0}
               className="portfolio-list white-text z-depth-10"
               header={header} >
               <Table onCellClick={(rowNumber, columnId) => this.handleCellClick(renderType, rowNumber, columnId)}
                  className='portfolio-list'
               >
                  <TableHeader
                     displaySelectAll={this.state.showCheckboxes}
                     adjustForCheckbox={this.state.showCheckboxes}>
                     <TableRow>
                        <TableHeaderColumn>Company</TableHeaderColumn>
                       <TableHeaderColumn>Ticker</TableHeaderColumn>
                       <TableHeaderColumn>Price</TableHeaderColumn>
                       <TableHeaderColumn>Quantity</TableHeaderColumn>
                     </TableRow>
                  </TableHeader>
                  <TableBody
                     displayRowCheckbox={this.state.showCheckboxes}
                     deselectOnClickaway={this.state.deselectOnClickaway}
                  >
                     {this.renderTrackerList(renderType)}
                  </TableBody>
               </Table>
            </CollapsibleItem>
      )

   }

   handleCellClick(renderType, rowNumber, columnId) {

      let i = 0, foundIndex = -1, found = false;
      while (this.props.tickerList[i] && !found) {
         const ticker = this.props.tickerList[i];

         if (ticker.type === renderType) {
            foundIndex++;
         }

         if (foundIndex === rowNumber) { //if final index, stop i and exit loop
            found = true;
         }
         else { //if not the final index, move onto next item
            i++;
         }

      }

      console.log('i = ' + i + ' tickerfound = ', this.props.tickerList[i]);

      this.props.selectChart(this.props.tickerList[i].name, renderType);
   }

   render() {
      return (
         <div>
            <SearchBar type={TYPE.CRYPTO}/>

            <div className='row'>
               <Collapsible defaultActiveKey={0} popout>
                  {this.renderList(TYPE.CRYPTO)}
               </Collapsible>
            </div>

            <SearchBar type={TYPE.STOCK}/>

            <div className='row'>
               <Collapsible defaultActiveKey={0} popout>
                  {this.renderList(TYPE.STOCK)}
               </Collapsible>
            </div>

         </div>
      );
   }

}

function mapStateToProps({tickerList, priceList, selectedChart}) {
   return { tickerList, priceList, selectedChart }
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({ removeTicker, updateQuantity, selectChart }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioList);
