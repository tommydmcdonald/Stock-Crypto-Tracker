import React, { Component } from 'react';
import StockCryptoList from './stockcrypto_list';
import SearchBar from '../containers/search_bar'

export default class Home extends Component {
   render () {
      return (
         <div>
            <SearchBar />
            <StockCryptoList />
         </div>
      );
   }
}
