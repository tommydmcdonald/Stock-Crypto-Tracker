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
      this.updateTrackerData = this.updateTrackerData.bind(this);
      this.handleRemoveClick = this.handleRemoveClick.bind(this);
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
      const { name, type } = tickerItem;
      const _id = tickerItem._id != null ? tickerItem._id : name;
      console.log('tickerItem = ', tickerItem);
      let currentPrice = _.get(this.props.priceList, `[${type}][${name}]`, '-');
      let allChartData = this.props.chartData;
      console.log('Chart Data: ', allChartData);


      return (
            <StockCryptoTracker  key={_id} _id={_id} trackerName={name} currentPrice={currentPrice} onClick={this.handleRemoveClick.bind(this)} />
              // Would need to put chartData={cData} here right?
      );
   }

   renderTrackerList () {
      return (
         this.props.tickerList.map(this.renderTracker)
      );
   }

   updateTrackerData () {
      // this.props.tickerList.forEach( ticker => this.props.getTickerData(ticker) );
   }

   render () {
      const refreshRateSeconds = 25;
      const timeout = refreshRateSeconds * 1000;

      return (
         <div>
            <ReactInterval timeout={timeout} enabled={true}
            callback={this.updateTrackerData}
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
