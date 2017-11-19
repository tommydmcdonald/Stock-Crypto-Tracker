import React, { Component } from 'react';
import StockCryptoList from '../containers/stockcrypto_list';
import SearchBar from '../containers/search_bar';
import '../style/style.css';

export default class App extends Component {
   render () {
      return (
         <div>
           <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossOrigin="anonymous" />
            <SearchBar />
            <StockCryptoList />
         </div>
      );
   }
}
