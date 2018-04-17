import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { Row, Col, Preloader, Collapsible, CollapsibleItem } from 'react-materialize';

import { TYPE } from '../actions/types';
import { removeTicker, updateQuantity, selectChart } from '../actions';
import Tracker from './Tracker';
import SearchBar from './SearchBar';
import EditButton from './EditButton';

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
   constructor(props) {
      super(props);
      this.state = {
         showCheckboxes: false,
         selectable: true,
         deselectOnClickaway: false,
         stocks: [],
         cryptos: [],
      }

   }

   componentDidUpdate() {
      this.state.stocks = this.props.tickerList.filter( ticker => ticker.type == TYPE.STOCK);
      this.state.cryptos = this.props.tickerList.filter( ticker => ticker.type == TYPE.CRYPTO);
   }

   handleCellClick(renderType, rowNumber, columnId) {
      const selectedTicker = (renderType == TYPE.STOCK) ? this.state.stocks[rowNumber] : this.state.cryptos[rowNumber];

      this.props.selectChart(selectedTicker.name, selectedTicker.type);
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

   numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
   }

   renderTracker(ticker) {
      const { name, type, quantity } = ticker;

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
            <TableRowColumn>{name}</TableRowColumn>
            <TableRowColumn>{currentPrice}</TableRowColumn>
            <TableRowColumn>{quantity}</TableRowColumn>
         </TableRow>
      );
   }

   renderTrackerList(renderType) {
      const renderList = renderType === TYPE.STOCK ? this.state.stocks : this.state.cryptos;

      return renderList.map( ticker => this.renderTracker(ticker))
   }

   renderList(renderType) {
      let header;
      if (renderType === TYPE.STOCK) {
         header = (
            <div>
               <div>Stocks</div>
            </div>
         );
      }
      else if (renderType === TYPE.CRYPTO) {
         header = 'Cryptocurrencies';
      }

      return (
            <CollapsibleItem
               className="portfolio-list white-text z-depth-10"
               header={header} >
               <Table onCellClick={(rowNumber, columnId) => this.handleCellClick(renderType, rowNumber, columnId)}
                  className='portfolio-list'
               >
                  <TableHeader
                     displaySelectAll={this.state.showCheckboxes}
                     adjustForCheckbox={this.state.showCheckboxes}>
                     <TableRow>
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
      );

   }

   render() {
      return (
         <div>
            <SearchBar type={TYPE.STOCK}/>

            <div className='row'>
               <Collapsible popout>
                  {this.renderList(TYPE.STOCK)}
               </Collapsible>
            </div>

            <SearchBar type={TYPE.CRYPTO}/>

            <div className='row'>
               <Collapsible popout>
                  {this.renderList(TYPE.CRYPTO)}
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
