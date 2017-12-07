import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadChartData } from '../actions'
import {Line} from 'react-chartjs-2';
import { FETCH_CHART_DATA, LOAD_CHART_DATA } from '../actions/types';

class Chart extends Component {
   constructor(props) {
      super(props);
   }

   componentDidMount() {
      this.props.loadChartData();
   }

   render() {
      let prices = [0];
      let times = [0];

      console.log('render chart', this.props);

      if (this.props.graphTicker && this.props.chartData) {
         const { name, type } = this.props.graphTicker;
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
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
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
         <div className="container">
            <Line data={data} width={170} height={300} options={{maintainAspectRatio: false}} ></Line>
         </div>
      );
   }

}

function mapStateToProps({ chartData }){
   return { chartData };
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({ loadChartData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
