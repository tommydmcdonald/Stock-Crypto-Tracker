import React, { Component } from 'react';
import StockCryptoTracker from '../components/stockcrypto_tracker.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTicker, getTickerData } from '../actions/index';

import ReactInterval from 'react-interval';

class StockCryptoList extends Component {

   constructor(props) {
      super(props);

      this.renderTrackerList = this.renderTrackerList.bind(this);
      this.renderTracker = this.renderTracker.bind(this);
      this.updateTrackerData = this.updateTrackerData.bind(this);
   }

   renderTracker (ticker) {
      console.log("renderTracker ");
      console.log("ticker = " + ticker);
      let currentPrice = '';
      if (this.props.dataList[ticker]) {
         // currentPrice = this.props.dataList[ticker]["Time Series (1min)"]["2017-11-17 16:00:00"]["4. close"];
         const timeSeries = this.props.dataList[ticker]["Time Series (1min)"];
         const latestTime = Object.keys(timeSeries)[0]
         const whichTime = "4. close"
         
         currentPrice = timeSeries[latestTime][whichTime];
      }

      return (
            <StockCryptoTracker key={ticker} trackerName={ticker} currentPrice={currentPrice} />
      );

   }

   renderTrackerList () {
         return (
            this.props.tickerList.map(this.renderTracker)
         );
   }

   updateTrackerData () {
      this.props.tickerList.forEach( ticker => getTickerData(ticker) );
   }

   render () {
      const refreshRateSeconds = 30;
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
                     <th>Price</th>
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

function mapStateToProps(state){
   return {
      tickerList: state.tickerList,
      dataList: state.dataList
   }
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({ getTickerData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StockCryptoList);
