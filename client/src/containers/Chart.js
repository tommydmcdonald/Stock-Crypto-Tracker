import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadChartData, selectChartFreq } from '../actions'
import {Line} from 'react-chartjs-2';
import { Row, Col } from 'react-materialize';
import { Tabs, Tab } from 'material-ui/Tabs';
import _ from 'lodash';
import { TYPE } from '../actions/types';

class Chart extends Component {
   componentDidMount() {
      this.props.loadChartData();
   }

   convertFrequency(freq) {
      switch (freq) {
         case 'Hour':
            return 'hour';
         case 'Day':
            return 'day';
         case 'Week':
            return 'week';
         case 'Month':
            return 'month';
         case '3 Month':
            return 'threeMonth';
         case '6 Month':
            return 'sixMonth';
         case 'Year':
            return 'year';
      }
   }

   formatChartData() {
      let prices = [0];
      let times = [0];
      const frequency = this.convertFrequency(this.props.selectedChart.frequency);

      if (this.props.selectedChart.name && this.props.chartData) {
         const { name, type } = this.props.selectedChart;
         const { chartData } = this.props;

         if ( chartData[type] && chartData[type][name] && chartData[type][name][frequency]) {
            prices = chartData[type][name][frequency].prices;
            if(type === TYPE.CRYPTO) {
               times = chartData[type][name][frequency].times.map( time => new Date(time*1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) );
            }
            else {
               times = chartData[type][name][frequency].times;
            }
         }
      }

      return {
        labels: times,
        datasets: [
          {
            label: frequency,
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(94, 108, 186, 0.5)',
            borderColor: 'rgba(94, 108, 186, 1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(94, 108, 186, 1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 0,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)',
            pointHoverBorderColor: 'rgba(94, 108, 186, 1)',
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
      let logo_url = '';
      if (this.props.selectedChart) {
         const { name, type } = this.props.selectedChart;
         if (this.props.priceList && this.props.priceList[type] && this.props.priceList[type][name] ) {

            const { quantity, logo } = _.find( this.props.tickerList, { name, type } );

            const logo_url = logo;

            const price = Number(this.props.priceList[type][name]).toFixed(2);
            priceText = { price, amtOwned: Number(price*quantity).toFixed(2) };

         }
      }

      return (
               <Row>
                  <Col s={2} className="ticker-name">
                     <h5 className="white-text">{this.props.selectedChart.name}:</h5>
                  </Col>
                  <Col s={10}>
                     <h5 className="ticker-price">${priceText.price} </h5>
                  </Col>
                  <Row>
                     <Col s={9} className="" ><h6 className="white-text">value owned: ${priceText.amtOwned}</h6></Col>
                  </Row>
               </Row>

      )
   }

   renderTabs() {
      if (this.props.selectedChart.type) {
         const tabTitles = {
            [TYPE.STOCK]: ['Day', 'Month', '3 Month', '6 Month', 'Year'],
            [TYPE.CRYPTO]: ['Hour', 'Day', 'Week', 'Month', '3 Month', '6 Month', 'Year']
         }

         const { type, frequency } = this.props.selectedChart;
         return (
            <div>
               <Tabs value={frequency} onChange={ (frequency) => this.props.selectChartFreq({ frequency }) }>
                  { tabTitles[type].map( title => <Tab label={title} value={title} className='time-series-tabs'/> ) }
               </Tabs>
            </div>
         );
      }
   }

   render() {
      return (
         <div>
           {this.renderLabel()}
              {this.renderTabs()}
               <Line className="Graph" data={this.formatChartData()}></Line>
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
