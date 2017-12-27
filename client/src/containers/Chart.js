import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTestUtils from 'react-dom/test-utils';
import { bindActionCreators } from 'redux';
import { loadChartData, selectChartFreq } from '../actions'
import {Line} from 'react-chartjs-2';
import { Row, Col } from 'react-materialize';
import { Tabs, Tab } from 'material-ui/Tabs';
import _ from 'lodash';
import { FETCH_CHART_DATA, LOAD_CHART_DATA, TYPE } from '../actions/types';


class Chart extends Component {
   constructor(props) {
      super(props);
   }

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
         const frequency = this.convertFrequency(this.props.selectedChart.frequency);

         if ( chartData[type] && chartData[type][name] && chartData[type][name][frequency]) {
            prices = chartData[type][name][frequency].prices;
            if(type == TYPE.CRYPTO) {
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
      if (this.props.selectedChart.type) {
         const tabTitles = {
            [TYPE.STOCK]: ['Day', 'Month', '3 Month', '6 Month', 'Year'],
            [TYPE.CRYPTO]: ['Hour', 'Day', 'Week', 'Month', '3 Month', '6 Month', 'Year']
         }

         const { type, frequency } = this.props.selectedChart;
         return (
            <div>
               <Tabs className='time-series-tabs' value={frequency} onChange={ (frequency) => this.props.selectChartFreq({ frequency }) }>
                  { tabTitles[type].map( title => <Tab label={title} value={title}/> ) }
               </Tabs>
            </div>
         );
      }
   }

   render() {
      return (
         <div>
           {this.renderLabel()}
            <div id="chartPiece">
              {this.renderTabs()}
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
