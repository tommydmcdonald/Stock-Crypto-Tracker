import React, { Component } from 'react';

export default class PortfolioValue extends Component {
   constructor(props) {
      super(props);

      this.state = { currentValue: '' };
      this.calculateValue()
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

         return numberWithCommas(currentValue);
      }
      return 0;

   }

   render() {
      return (
         <h2 className="white-text">Current Value: ${this.calculateValue()}</h2>
      );
   }

}
