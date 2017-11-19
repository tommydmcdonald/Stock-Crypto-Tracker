import React, { Component } from 'react';
import StockCryptoTracker from '../components/stockcrypto_tracker.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTicker } from '../actions/index';

import ReactInterval from 'react-interval';

class StockCryptoList extends Component {

   constructor(props) {
      super(props);

      this.renderTrackerList = this.renderTrackerList.bind(this);
      this.renderTracker = this.renderTracker.bind(this);
   }

   renderTracker (ticker) {
      return (
            <StockCryptoTracker key={ticker} stockName={ticker} />
      )
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
      tickerList: state.tickerList
   }
}

export default connect(mapStateToProps)(StockCryptoList);
