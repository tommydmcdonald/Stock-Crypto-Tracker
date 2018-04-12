import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import '../style/PortfolioChart.css';

class PortfolioChart extends Component {

   calculatePortfolioValue() {
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

         currentValue = numberWithCommas(Number(currentValue).toFixed(2));

         return currentValue;
      }
      return 0;
   }

   getPieChartData() {
      const { priceList, tickerList } = this.props;
      let pieChartData = [];

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

   render () {
      const data = this.getPieChartData();
      const COLORS = ['#79C7A0'];

      return (
         <ResponsiveContainer height="40%" width="100%">
            <PieChart onMouseEnter={this.onPieEnter} className='portfolio-chart' margin={{ right: 500 }}>
             <text className="portfolio-value" x={175} y={175} dy={8} textAnchor="middle" fill="#FFFFFF">
                ${this.calculatePortfolioValue()}
             </text>
               <Pie data={data} cx="170" cy={170} innerRadius={65} outerRadius={80} fill="#8884d8" paddingAngle={6}>
                  {data.map((entry, index) => (
                     <Cell fill={COLORS[index % COLORS.length]} />
                  ))}
               </Pie>
               <Tooltip />
             </PieChart>
         </ResponsiveContainer>
      )
   }
}

function mapStateToProps({tickerList, priceList}) {
   return { tickerList, priceList }
}

export default connect(mapStateToProps, null)(PortfolioChart);
