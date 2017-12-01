import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTicker } from '../actions/index';

import { TYPE } from '../actions/types';

const API_KEY = 'BIYQYMYZ9KIBXS9V';

class SearchBar extends Component {
   constructor(props) {
      super(props);

      this.state = { ticker: '', type: ''}

      this.onInputChange = this.onInputChange.bind(this);
      this.onFormSubmit = this.onFormSubmit.bind(this);
      this.onButtonClick = this.onButtonClick.bind(this);
   }

   onInputChange(event) {
      this.setState({ ticker: event.target.value });
   }

   onFormSubmit(event) {
      event.preventDefault();
      // Fetch tracker info
      const tickerFormatted = this.state.ticker.toUpperCase();

      if (tickerFormatted != '') //only add if not empty string
         this.props.addTicker(tickerFormatted, this.state.type);

      this.setState( { ticker: '', type: ''} ); //sets default state
   }

   onButtonClick(event) {
      const { id } = event.target;
      this.setState( {type: id} );
   }

   render() {
      return (
         <div className="container search-bar">
            <form onSubmit={this.onFormSubmit} className="input-group">
               <input
                  placeholder="Add a stock or cryptocurrency to your portfolio"
                  className="form-control"
                  value={this.state.ticker}
                  onChange={this.onInputChange}
               />
               <span className="input-group-btn">
                  <button id={TYPE.STOCK} type="submit" className="waves-effect waves-light btn teal lighten-2" onClick={this.onButtonClick}>
                     Add Stock
                  </button>
                  <button id={TYPE.CRYPTO} type="submit" className="waves-effect waves-light btn teal lighten-2" onClick={this.onButtonClick}>
                     Add Crypto
                  </button>
               </span>
            </form>
         </div>

      );

   }
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({ addTicker }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);
