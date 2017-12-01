import React, { Component } from 'react';
import StockCryptoTracker from '../components/stockcrypto_tracker.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTicker, loadTickerList, loadTickerPrices, removeTicker } from '../actions/index';
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
   }

   // handleRemoveClick( _id ) {
   //    this.props.removeTicker(_id);
   // }

   renderTracker (tickerItem) {
      const { name, type } = tickerItem;
      console.log('renderTracker. name = ', name, ' type= ', type);
      const _id = tickerItem._id != null ? tickerItem._id : name;
      console.log('tickerItem = ', tickerItem);
      let currentPrice = _.get(this.props.priceList, `[${type}][${name}]`, '-');
      if (currentPrice != '-')
         currentPrice = Number(currentPrice).toFixed(2);
      currentPrice = '$' + currentPrice;

      return (
            <StockCryptoTracker key={_id} _id={_id} trackerName={name} trackerType={type} currentPrice={currentPrice} onClick={this.props.removeTicker} />
      );

   }

   renderTrackerList () {
      return (
         this.props.tickerList.map(this.renderTracker)
      );
   }

   loadTickerPrices() {
      console.log('list ltp');
      this.props.loadTickerPrices();
   }

   render () {
      console.log('type of loadTickerPrices = ', typeof this.props.loadTickerPrices);
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

function mapStateToProps({tickerList, priceList}){
   return {
      tickerList, // [ {name, type}, ...]
      priceList // { STOCK: { name: price, ...} , CRYPTO: { name: price, ...} }
   }
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({ loadTickerList, loadTickerPrices, removeTicker }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StockCryptoList);
