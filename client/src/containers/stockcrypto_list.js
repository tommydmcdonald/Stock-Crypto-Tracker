import React, { Component } from 'react';
import StockCryptoTracker from '../components/stockcrypto_tracker.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTicker, loadTickerList, loadTickerPrices, removeTicker, loadChartData } from '../actions/index';
import { TYPE } from '../actions/types';
import _ from 'lodash';

import ReactInterval from 'react-interval';

class StockCryptoList extends Component {

   constructor(props) {
      super(props);

      this.renderTrackerList = this.renderTrackerList.bind(this);
      this.renderTracker = this.renderTracker.bind(this);
      // this.loadTickerPrices = this.loadTickerPrices.bind(this);
   }

   componentDidMount() {
      this.props.loadTickerList();
      this.props.loadTickerPrices();
      this.props.loadChartData();
   }

   // handleRemoveClick( _id ) {
   //    this.props.removeTicker(_id);
   // }


   renderTracker (tickerItem) {
      const { name, type } = tickerItem;
      const _id = tickerItem._id != null ? tickerItem._id : name;
      let currentPrice = _.get(this.props.priceList, `[${type}][${name}]`, '-');
      let allChartData = this.props.chartData;
      if (currentPrice != '-')
         currentPrice = Number(currentPrice).toFixed(2);
      currentPrice = '$' + currentPrice;

      return (
            <StockCryptoTracker key={_id} _id={_id} name={name} type={type} currentPrice={currentPrice} onClick={this.props.removeTicker} />
      );
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
            callback={this.loadTickerPrices.bind(this)}
            />
            <table className="table table-hover">
               <thead>
                  <tr>
                     <th>Ticker</th>
                     <th>Price (USD)</th>
                  </tr>
               </thead>
               <tbody>
                 {this.renderTrackerList()}
               </tbody>
            </table>
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
   return bindActionCreators({ loadTickerList, loadTickerPrices, removeTicker, loadChartData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StockCryptoList);
