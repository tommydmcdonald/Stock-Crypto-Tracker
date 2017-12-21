import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Collapsible, CollapsibleItem, Card, CardTitle, Collection, CollectionItem } from 'react-materialize';

//from list
import Tracker from '../components/Tracker';
import PortfolioValue from '../components/PortfolioValue';
import { addTicker, loadTickerList, loadTickerPrices, removeTicker, loadChartData, updateQuantity } from '../actions/index';
import { TYPE } from '../actions/types';
import _ from 'lodash';
import { Row, Col, Preloader, Table } from 'react-materialize';
import ReactInterval from 'react-interval';
import { PieChart, Sector, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';


// http://recharts.org/#/en-US/guide/getting-started
// For dynamic pie chart documentation

class SideNav extends Component {
  constructor(props) {
     super(props);

     this.renderTrackerList = this.renderTrackerList.bind(this);
     this.renderTracker = this.renderTracker.bind(this);
     this.loadTickerPrices = this.loadTickerPrices.bind(this);

  }

  async componentDidMount() {
     await this.props.loadTickerList();
     await this.props.loadTickerPrices();

     if (this.props.tickerList[0]) {
        const { name, type } = this.props.tickerList[0];
        this.props.updateGraphTicker({ name, type });
     }

  }

  handleRemoveClick( _id ) {
     this.props.removeTicker(_id);
  }

  returnProgress(){
    return (<Row> <Col> <Preloader size='small'/> </Col> </Row>);
  }

  renderTracker (tickerItem, renderType) {
     const { name, type, quantity } = tickerItem;

     if ( type === renderType ) {
        const key = name + '-' + type;
       console.log('tickerItem = ', tickerItem);

       let currentPrice = _.get(this.props.priceList, `[${type}][${name}]`, '');

        if (currentPrice != '') {
           currentPrice = Number(currentPrice).toFixed(2);
           currentPrice = '$' + this.numberWithCommas(currentPrice);
        }
        else {
          currentPrice = this.returnProgress();
        }

       let chartData = _.get(this.props.chartData, `[${type}][${name}]`, {prices: [0], times:[0] } );

       return (
          <li class="collection-item">
            <Tracker key={key} name={name} type={type} currentPrice={currentPrice} quantity={quantity}
               updateQuantity={this.props.updateQuantity} chartData={chartData}
               onClick={this.props.removeTicker} updateGraphTicker={this.props.updateGraphTicker}
            />
         </li>);
     }


  }

  numberWithCommas(x) {
     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  renderTrackerList (renderType) {
     console.log('renderType = ', renderType);
     return (
        <div className="black-text">
           <ul class="collection">
	             <li class="collection-item">
                   <Row>
                     <Col s={2}>Ticker</Col><Col className='price-text' s={3}>Price</Col><Col s={2}><div className='quantity-text'>Quantity</div></Col>
                   </Row>
                </li>
                 {this.props.tickerList.map( ticker => this.renderTracker(ticker, renderType))}
            </ul>
        </div>
    )
  }

  loadTickerPrices() {
     this.props.loadTickerPrices();
  }


  getPieChartData() {
    const { priceList, tickerList } = this.props;
    let pieChartData = new Array;

    for (let i = 0; i < tickerList.length; i++) {
      if(tickerList && priceList) {
          if(tickerList[i].name && tickerList[i].type)
          {
            const { name, type } = tickerList[i];

            if(tickerList[i] && tickerList[i].quantity)
            {
              const { quantity } = _.find( tickerList, { name, type} );

              if(priceList && priceList[type] && priceList[type][name])
              {
                const price = Number(priceList[type][name]).toFixed(2);
                const valueOwn = Number(price*quantity).toFixed(2);
                pieChartData.push({name: name, value: Number(valueOwn)});
              }
            }
          }
        }
    }
    return pieChartData;
   }


  render() {
    const refreshRateSeconds = 15;
    const timeout = refreshRateSeconds * 1000;

    const COLORS = ['#8884d8'];

    const data = this.getPieChartData();
    console.log('names: ', data);

    return(
      <div>
         <ReactInterval timeout={timeout} enabled={true}
         callback={this.props.loadTickerPrices}
         />
         <ul id="nav-mobile" className="side-nav fixed z-depth-8">

           <Card className='navbar-img'
           	header={<CardTitle image={require('../img/a.jpg')}>
                      <PieChart width={300} height={300} onMouseEnter={this.onPieEnter}>
                        <Pie data={data} cx={155} cy={200} innerRadius={70} outerRadius={80} fill="#8884d8" paddingAngle={6} >
                          {data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/> )}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </CardTitle>}>
            <PortfolioValue tickerList={this.props.tickerList} priceList={this.props.priceList} />
           </Card>
           <Collapsible className='ticker-collasp'>
           	<CollapsibleItem id="collapsible-header" className="white-text z-depth-6" header='Stocks' icon='trending_up'>
               {this.renderTrackerList(TYPE.STOCK)}
           	</CollapsibleItem>
           	<CollapsibleItem id="collapsible-header" className="white-text z-depth-6" header='Crypto Currencies' icon='trending_up'>
               {this.renderTrackerList(TYPE.CRYPTO)}
             </CollapsibleItem>
           </Collapsible>
         </ul>
      </div>
    );
  }
}

function mapStateToProps({tickerList, priceList, auth}){
   return { tickerList, priceList, auth }
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({ loadTickerList, loadTickerPrices, removeTicker, updateQuantity }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);
