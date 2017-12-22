import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadChartData } from '../actions'
import {Line} from 'react-chartjs-2';
import { Row, Col } from 'react-materialize';
import _ from 'lodash';
import { FETCH_CHART_DATA, LOAD_CHART_DATA } from '../actions/types';
import { Pie, PieChart } from 'recharts';


class Chart extends Component {
   constructor(props) {
      super(props);
   }

   componentDidMount() {
      // this.props.loadChartData();
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
               <Col s={3}><h4 className="white-text">{this.props.selectedChart.name}</h4></Col>
               <Col s={4}><p className="white-text">price: ${priceText.price} <br />value owned: ${priceText.amtOwned}</p></Col>
            </div>
         </Row>

      )
   }

   render() {
      let prices = [0];
      let times = [0];

      if (this.props.selectedChart.name && this.props.chartData) {
         const { name, type } = this.props.selectedChart;
         const { chartData } = this.props;


         if ( chartData[type] && chartData[type][name] ) {
            prices = chartData[type][name]['prices'];
            times = chartData[type][name]['times'];
         }
      }

      const data = {
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
      return (
         <div id="chartPiece">
            {this.renderLabel()}
            <Line data={data} width={600} height={250} options={{maintainAspectRatio: false}} ></Line>
         </div>
      );
   }

}

function mapStateToProps({ chartData, tickerList, priceList, selectedChart }){
   return { chartData, tickerList, priceList, selectedChart };
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({ loadChartData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
