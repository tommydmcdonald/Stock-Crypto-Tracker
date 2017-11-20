import React, { Component } from 'react';
import StockCryptoTracker from '../components/stockcrypto_tracker.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTicker, getTickerData } from '../actions/index';
import { TYPE } from '../actions/index';
import _ from 'lodash';

import ReactInterval from 'react-interval';

class StockCryptoList extends Component {

   constructor(props) {
      super(props);

      this.renderTrackerList = this.renderTrackerList.bind(this);
      this.renderTracker = this.renderTracker.bind(this);
      this.updateTrackerData = this.updateTrackerData.bind(this);
   }

   renderTracker (ticker) {
      const { name, type } = ticker;

      let timeSeries, latestTime, whichTime, currentPrice;

      if (this.props.dataList[name]) {
         const { data } = this.props.dataList[name];
         console.log("data= ",data);

         if( !_.isEmpty(data) ) {
            if (type == TYPE.STOCK) {
               timeSeries = data["Time Series (1min)"];
               console.log("timeSeries ", timeSeries);
               latestTime = Object.keys(timeSeries)[0];
               console.log("latest time =", latestTime);
               whichTime = "4. close";
            }
            else if (type == TYPE.CRYPTO) {
               timeSeries = data["Time Series (Digital Currency Intraday)"];
               latestTime = Object.keys(timeSeries)[0];
               whichTime = "1a. price (USD)";
            }

            currentPrice = timeSeries[latestTime][whichTime];
         }


      }

      return (
            <StockCryptoTracker key={name} trackerName={name} currentPrice={currentPrice} />
      );

   }

   renderTrackerList () {
         console.log("renderTrackerList");
         return (
            this.props.tickerList.map(this.renderTracker)
         );
   }

   updateTrackerData () {
      this.props.tickerList.forEach( ticker => this.props.getTickerData(ticker) );
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

function mapStateToProps({tickerList, dataList}){
   return {
      tickerList, // [ {name, type}, ...]
      dataList // {name: data}
   }
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({ getTickerData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StockCryptoList);
