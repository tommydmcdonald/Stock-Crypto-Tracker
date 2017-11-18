import React, { Component } from 'react';
import StockCryptoTracker from '../components/stockcrypto_tracker.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchTracker } from '../actions/index';

import ReactInterval from 'react-interval';

class StockCryptoList extends Component {

   constructor(props) {
      super(props);

      this.renderTrackerList = this.renderTrackerList.bind(this);
      this.renderTracker = this.renderTracker.bind(this);
   }

   renderTracker (tracker) {
      const stockName = tracker["Meta Data"]["2. Symbol"].toUpperCase();

      const priceData = tracker["Time Series (1min)"]
      const currentPriceKey = Object.keys( priceData )[0];
      const currentPrice = priceData[ currentPriceKey ]["4. close"]

      return (
            <StockCryptoTracker key={stockName} stockName={stockName} currentPrice={currentPrice}/>
      )
   }

   renderTrackerList () {
      console.log("rtl");
      return (
         this.props.trackerList.map(this.renderTracker)
      );

   }

   render () {
      return (
         <div>
            <ReactInterval timeout={2000} enabled={true}
            callback={this.renderTrackerList} />
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

function mapStateToProps({ trackerList }){
   return { trackerList };
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({ fetchTracker }, dispatch);
}

export default connect(mapStateToProps)(StockCryptoList);
