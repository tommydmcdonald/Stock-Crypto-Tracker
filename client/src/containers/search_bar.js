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
      this.setDefaultState = this.setDefaultState.bind(this);
      this.onButtonClick = this.onButtonClick.bind(this);
   }

   setDefaultState() {
      this.setState( { ticker: '', type: ''} );
   }

   onInputChange(event) {
      this.setState({ ticker: event.target.value });
   }

   onFormSubmit(event) {
      event.preventDefault();

      // Fetch tracker info
      const tickerFormatted = this.state.ticker.toUpperCase();

      console.log("addTicker in search_bar. tickerFormatted = ", tickerFormatted, "type = ", this.state.type);
      this.props.addTicker(tickerFormatted, this.state.type);

      this.setDefaultState();
   }

   onButtonClick(event) {
      const { id } = event.target;

      this.setState( {type: id} );

      console.log("this.state.type =" + id);
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
                  <button id={TYPE.STOCK} type="submit" className="btn btn-secondary" onClick={this.onButtonClick}>
                     Add Stock
                  </button>
                  <div>   </div>
                  <button id={TYPE.CRYPTO} type="submit" className="btn btn-secondary" onClick={this.onButtonClick}>
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
