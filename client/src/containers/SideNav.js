import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import _ from 'lodash';
import ReactInterval from 'react-interval';
import { Row, Col, Preloader, Table, Collapsible, CollapsibleItem, Collection, CollectionItem } from 'react-materialize';
import { PieChart, Sector, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
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

   getPieChartData() {
      const { priceList, tickerList } = this.props;
      let pieChartData = new Array();

      for (let i = 0; i < tickerList.length; i++) {
         if (tickerList && priceList) {
            if (tickerList[i].name && tickerList[i].type) {
               const { name, type } = tickerList[i];

               if (tickerList[i] && tickerList[i].quantity) {
                  const { quantity } = _.find(tickerList, { name, type });

                  if (priceList && priceList[type] && priceList[type][name]) {
                     const price = Number(priceList[type][name]).toFixed(2);
                     const valueOwn = Number(price * quantity).toFixed(2);
                     pieChartData.push({ name: name, value: Number(valueOwn) });
                  }
               }
            }
         }
      }
      return pieChartData;
   }

   calculateValue() {
      const { priceList, tickerList } = this.props;

      if(priceList && tickerList) {
         let currentValue = 0;

         for (let i = 0; i < tickerList.length; i++) {
            if (tickerList[i]) {
               const { name, type, quantity } = tickerList[i];

               if (priceList[type] && priceList[type][name]) {
                  currentValue += priceList[type][name] * quantity;
               }
            }
         }
         const numberWithCommas = (x) => {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
         }
         currentValue = Number(currentValue).toFixed(2);

         return currentValue;
      }
      return 0;
   }

   render() {
      const refreshRateSeconds = 15;
      const timeout = refreshRateSeconds * 1000;

      const COLORS = ['#ED5281'];

      const data = this.getPieChartData();

      return (
         <div>
            <ReactInterval
               timeout={timeout}
               enabled={true}
               callback={this.props.loadTickerPrices}
            />
            <ul id="nav-mobile" className="side-nav fixed z-depth-8">
              <PieChart width={280} height={280} onMouseEnter={this.onPieEnter}>
                <text className="portfolio-value" x={175} y={175} dy={8} textAnchor="middle" fill="#FFFFFF">
                  ${this.calculateValue()}
                </text>
                 <Pie data={data} cx={170} cy={170} innerRadius={65} outerRadius={80} fill="#8884d8" paddingAngle={6}>
                    {data.map((entry, index) => (
                       <Cell fill={COLORS[index % COLORS.length]} />
                    ))}
                 </Pie>
                 <Tooltip />
               </PieChart>
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
