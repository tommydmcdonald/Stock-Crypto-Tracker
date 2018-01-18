import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import _ from 'lodash';
import ReactInterval from 'react-interval';
import { Row, Col, Preloader, Table, Collapsible, CollapsibleItem, Collection, CollectionItem } from 'react-materialize';
import PortfolioChart from './PortfolioChart';

import Divider from 'material-ui/Divider';

import { TYPE } from '../actions/types';
import Tracker from './Tracker';
import { addTicker, loadTickerList, loadTickerPrices, removeTicker, loadChartData, updateQuantity, selectChart } from '../actions/index';
// http://recharts.org/#/en-US/guide/getting-started
// For dynamic pie chart documentation

class SideNav extends Component {
   constructor(props) {
      super(props);

      this.renderTrackerList = this.renderTrackerList.bind(this);
      this.renderTracker = this.renderTracker.bind(this);
      this.loadTickerPrices = this.loadTickerPrices.bind(this);
      this.checkChartTicker = this.checkChartTicker.bind(this);
   }

   async componentDidMount() {
      await this.props.loadTickerList();
      await this.props.loadTickerPrices();

      if (this.props.tickerList[0]) {
         const { name, type } = this.props.tickerList[0];
         this.props.selectChart({ name, type });
      }
   }

   handleRemoveClick(_id) {
      this.props.removeTicker(_id);
   }

   returnProgress() {
      return (
         <Row>
            {' '}
            <Col>
               {' '}
               <Preloader size="small" />{' '}
            </Col>{' '}
         </Row>
      );
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


   renderTracker(tickerItem, renderType) {
      const { name, type, quantity } = tickerItem;

      if (type === renderType) {
         const key = name + '-' + type;

         let currentPrice = _.get(
            this.props.priceList,
            `[${type}][${name}]`,
            ''
         );

         if (currentPrice != '') {
            currentPrice = Number(currentPrice).toFixed(2);
            currentPrice = '$' + this.numberWithCommas(currentPrice);
         } else {
            currentPrice = this.returnProgress();
         }

         let chartData = _.get(this.props.chartData, `[${type}][${name}]`, {
            prices: [0],
            times: [0]
         });

         return (
            <li class="collection-item">
               <Tracker
                  key={key} name={name} type={type}
                  currentPrice={currentPrice} quantity={quantity} chartData={chartData}
                  removeTicker={this.props.removeTicker}
                  updateQuantity={this.props.updateQuantity}
                  checkChartTicker={this.checkChartTicker}
               />
            </li>
         );
      }
   }

   numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
   }


   // Needs to implemented as a table to look proper
   renderTrackerList(renderType) {
      return (
         <div className="black-text">
            <ul className="collection">
                  <Row className="ticker-price-row">
                     <Col s={3}>Ticker</Col>
                     <Col className="price-text" s={3}>
                        Price
                     </Col>
                     <Col s={2}>
                        <div className="quantity-text">Quantity</div>
                     </Col>
                  </Row><hr className="margin: 0px"></hr>
               {this.props.tickerList.map(ticker =>
                  this.renderTracker(ticker, renderType)
               )}
            </ul>
         </div>
      );
   }

   loadTickerPrices() {
      this.props.loadTickerPrices();
   }

   render() {
      const refreshRateSeconds = 15;
      const timeout = refreshRateSeconds * 1000;

      return (
         <div>
            <ReactInterval
               timeout={timeout}
               enabled={true}
               callback={this.props.loadTickerPrices}
            />
            <ul id="nav-mobile" className="side-nav fixed z-depth-8">

               <PortfolioChart />

               <Collapsible popout defaultActiveKey={0} className="collapsible-header">
                  <CollapsibleItem
                     id="collapsible-body"
                     className="white-text z-depth-10"
                     header="Stocks"
                     icon="trending_up"
                  >
                     {this.renderTrackerList(TYPE.STOCK)}
                  </CollapsibleItem>
                  <CollapsibleItem
                     id="collapsible-body"
                     className="white-text z-depth-10"
                     header="Crypto Currencies"
                     icon="trending_up"
                  >
                     {this.renderTrackerList(TYPE.CRYPTO)}
                  </CollapsibleItem>
               </Collapsible>
            </ul>
         </div>
      );
   }
}


function mapStateToProps({tickerList, priceList, auth, selectedChart}) {
   return { tickerList, priceList, auth, selectedChart }
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({ loadTickerList, loadTickerPrices, removeTicker, updateQuantity, selectChart }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);
