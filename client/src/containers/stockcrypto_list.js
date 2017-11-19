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
   }

   renderTracker (ticker) {
      console.log("renderTracker ");

      let currentPrice = 0.00;
      if (this.props.dataList[ticker]) {
         currentPrice = this.props.dataList[ticker]["Time Series (1min)"][Object.keys(this.props.dataList)[0]];
      }

      return (
            <StockCryptoTracker key={ticker} trackerName={ticker} currentPrice={currentPrice} />
         // currentPrice={currentPrice}
      );

   }

   renderTrackerList () {
         return (
            this.props.tickerList.map(this.renderTracker)
         );
   }

   render () {
      return (
         <div>
            {/* <ReactInterval timeout={2000} enabled={true}
            callback={}
            /> */}
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

export default connect(mapStateToProps)(StockCryptoList);
