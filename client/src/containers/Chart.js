import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadChartData, selectChartFreq } from '../actions'
import {Line} from 'react-chartjs-2';
import { Row, Col, Tabs, Tab } from 'react-materialize';
import _ from 'lodash';
import { FETCH_CHART_DATA, LOAD_CHART_DATA } from '../actions/types';


class Chart extends Component {
   constructor(props) {
      super(props);
      this.onTabChange = this.onTabChange.bind(this);
   }

   componentDidMount() {
      this.props.loadChartData();
   }

   formatChartData() {
      let prices = [0];
      let times = [0];

      if (this.props.selectedChart.name && this.props.chartData) {
         const { name, type } = this.props.selectedChart;
         const { chartData } = this.props;
         const { frequency } = this.props.selectedChart;

         if ( chartData[type] && chartData[type][name] && chartData[type][name][frequency]) {
            prices = chartData[type][name][frequency].prices;
            times = chartData[type][name][frequency].times.map( time => new Date(time*1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) );
         }
      }

      return {
        labels: times,
        datasets: [
          {
            label: '1 Hour',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(95, 202, 157, 1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.2,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 7,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: prices, // this.props.chartData.prices
          }
        ]
     };
   }

   renderLabel() {
      let priceText = '';
      if (this.props.selectedChart) {
         const { name, type } = this.props.selectedChart;
         if (this.props.priceList && this.props.priceList[type] && this.props.priceList[type][name] ) {
            const { quantity } = _.find( this.props.tickerList, { name, type} );
            const price = Number(this.props.priceList[type][name]).toFixed(2);
            priceText = { price, amtOwned: Number(price*quantity).toFixed(2) };
         }
      }

      return (
         <Row>
            <div>
               <Col id="ticker-name" s={2}><h4 className="white-text ticker-name">{this.props.selectedChart.name}</h4></Col>
               <Col s={4}><p className="white-text">price: ${priceText.price} <br />value owned: ${priceText.amtOwned}</p></Col>
            </div>
         </Row>




      )
   }

   renderTabs() {
      return (
         <Tabs onChange={ (num) => {this.onTabChange(num)} }>
            <Tab title='Hour'></Tab>
            <Tab title='Day'></Tab>
            <Tab title='Week'></Tab>
            <Tab title='Month'></Tab>
            <Tab title='3 Month'></Tab>
            <Tab title='6 Month'></Tab>
            <Tab title='Year'></Tab>
         </Tabs>
      )
   }

   onTabChange(newTab) {
      const index = parseInt(newTab[1]);

      let frequency = ['hour', 'day', 'week', 'month', 'threeMonth', 'sixMonth', 'year'][index];

      this.props.selectChartFreq({ frequency });
   }

   render() {

      return (
         <div>
            {this.renderTabs()}
            <div id="chartPiece">
               {this.renderLabel()}
               <Line data={this.formatChartData()} width={600} height={250} options={{maintainAspectRatio: false}} ></Line>
            </div>
         </div>
      );
   }

}

function mapStateToProps({ chartData, tickerList, priceList, selectedChart }){
   return { chartData, tickerList, priceList, selectedChart };
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({ loadChartData, selectChartFreq }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
