import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { Row, Col, Preloader, Collapsible, CollapsibleItem } from 'react-materialize';

import { TYPE } from '../actions/types';
import { removeTicker, updateQuantity, selectChart } from '../actions';
import Tracker from './Tracker';

class PortfolioList extends Component {
   renderTracker(tickerItem, renderType) {
      const { name, type, quantity } = tickerItem;

      if (type === renderType) {
         const key = name + '-' + type;

         let currentPrice = _.get(
            this.props.priceList,
            `[${type}][${name}]`,
            ''
         );

         if (currentPrice !== '') {
            currentPrice = Number(currentPrice).toFixed(2);
            currentPrice = '$' + this.numberWithCommas(currentPrice);
         } else {
            currentPrice = (
               <Row>
                  {' '}
                  <Col>
                     {' '}
                     <Preloader size="small" />{' '}
                  </Col>{' '}
               </Row>
            );
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
                  checkChartTicker={this.checkChartTicker.bind(this)}
               />
            </li>
         );
      }
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

   numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
   }

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

   render() {
      return (
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
      );
   }
}

function mapStateToProps({tickerList, priceList, selectedChart}) {
   return { tickerList, priceList, selectedChart }
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({ removeTicker, updateQuantity, selectChart }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioList);
