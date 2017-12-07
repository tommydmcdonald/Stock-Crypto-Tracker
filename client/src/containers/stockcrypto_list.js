import React, { Component } from 'react';
import StockCryptoTracker from '../components/stockcrypto_tracker';
import PortfolioValue from '../components/PortfolioValue';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTicker, loadTickerList, loadTickerPrices, removeTicker, loadChartData, updateQuantity } from '../actions/index';
import { TYPE } from '../actions/types';
import _ from 'lodash';
import { Row, Col } from 'react-materialize';


import ReactInterval from 'react-interval';
import { Table } from 'react-materialize';

class StockCryptoList extends Component {

   constructor(props) {
      super(props);

      this.renderTrackerList = this.renderTrackerList.bind(this);
      this.renderTracker = this.renderTracker.bind(this);
      this.loadTickerPrices = this.loadTickerPrices.bind(this);
   }

   componentDidMount() {
      this.props.loadTickerList();
      this.props.loadTickerPrices();
      this.props.loadChartData();
   }

   handleRemoveClick( _id ) {
      this.props.removeTicker(_id);
   }

   renderTracker (tickerItem) {
      const { name, type, quantity } = tickerItem;
      const key = name + '-' + type;
      console.log('tickerItem = ', tickerItem);

      let currentPrice = _.get(this.props.priceList, `[${type}][${name}]`, '-');

      if (currentPrice != '-')
         currentPrice = Number(currentPrice).toFixed(2);

      currentPrice = '$' + this.numberWithCommas(currentPrice);

      let chartData = _.get(this.props.chartData, `[${type}][${name}]`, {prices: [0], times:[0] } );

      return (
            <StockCryptoTracker key={key} name={name} type={type} currentPrice={currentPrice} quantity={quantity} updateQuantity={this.props.updateQuantity} chartData={chartData} onClick={this.props.removeTicker} />
      );
   }

   numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
   }

   renderTrackerList () {
      return (
         this.props.tickerList.map(this.renderTracker)
      );
   }

   loadTickerPrices() {
      this.props.loadTickerPrices();
   }

   render () {
      const refreshRateSeconds = 15;
      const timeout = refreshRateSeconds * 1000;

      return (
         <div>
            <ReactInterval timeout={timeout} enabled={true}
            callback={this.loadTickerPrices}
            />
            <PortfolioValue tickerList={this.props.tickerList} priceList={this.props.priceList} />
            <Table>
               <thead>
                  <tr>
                     <th>Ticker</th>
                     <th>Price (USD)</th>
                     <th>Graph</th>
                     <th>Quantity</th>
                  </tr>
               </thead>

               <tbody>
                 {this.renderTrackerList()}
               </tbody>
            </Table>
         </div>
      );
   }
}

function mapStateToProps({tickerList, priceList, chartData}){
   return {
      tickerList,   // [ {name, type}, ...]
      priceList,    // { STOCK: { name: price, ...} , CRYPTO: { name: price, ...} }
      chartData  //
   }
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({ loadTickerList, loadTickerPrices, removeTicker, loadChartData, updateQuantity }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StockCryptoList);
