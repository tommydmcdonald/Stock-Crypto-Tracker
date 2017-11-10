import React, { Component } from 'react';
import StockCryptoTracker from '../components/stockcrypto_tracker.js';
import { connect } from 'react-redux';

class StockCryptoList extends Component {

   renderTracker (tracker) {
      const stockName = tracker["Meta Data"]["2. Symbol"];
      console.log('StockName: ', stockName);

      return (
        <tr key={stockName}>
          <td>
            <StockCryptoTracker data={stockName}/>
          </td>
        </tr>
      )
   }

   render () {
      return (
        <table className="table table-hover">
         <thead>
           <tr>
             <th>Ticker</th>
           </tr>
         </thead>
         <tbody>
           {this.props.tracker.map(this.renderTracker)}
         </tbody>
     </table>
      );
   }
}

function mapStateToProps({ tracker }){
   return { tracker };
}

export default connect(mapStateToProps)(StockCryptoList);
