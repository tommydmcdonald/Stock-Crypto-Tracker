import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTicker } from '../actions/index';
import _ from 'lodash';

import EditButton from './EditButton';

import { TYPE } from '../actions/types';

import SearchBarMU from 'material-ui-search-bar'

class SearchBar extends Component {

   constructor(props) {
      super(props);
      this.onRequestSearch = this.onRequestSearch.bind(this);

      console.log('props in SearchBar = ', this.props);
      this.state = {ticker: '', hint: ''};

      if (this.props.type == TYPE.STOCK) {
         console.log('if this.props.type = ' + TYPE.STOCK);
         this.state.hint = 'Add stock';
         console.log(this.state);
      }
      else if (this.props.type === TYPE.CRYPTO) {
         this.state.hint = 'Add crypto';
      }

   }

   onRequestSearch() {
      console.log('Search for ' + this.props.type + '  is = ', this.state.ticker);

      const newTicker = { name: this.state.ticker.toUpperCase(), type: this.props.type };

      if ( newTicker.name !== '' && !_.some(this.props.tickerList, newTicker) ) { //only add if not empty string and ticker doesn't exist in redux tickerList
         this.props.addTicker(newTicker, this.props.tickerList.length);
         this.setState({ticker: ''});
      } //
   }

   render() {

      const style = {margin: '0 auto', height: '40px'};

      let test = (
         // <div className='search-bar row'>
         //    <div className='col s10'>
               <SearchBarMU
                  value={this.state.ticker}
                  onChange={(value) => this.setState({ticker: value.toUpperCase()})}
                  onRequestSearch={this.onRequestSearch}
                  style={style}
                  hintText={this.state.hint}
                  className='search-bar-font'
               />
            // </div>
            // <div className='col s2'>
               // <EditButton></EditButton>
            // </div>
         // </div>
      );

      return (
         <div className='search-bar row'>
            <div className='col s10'>
               <SearchBarMU
                  value={this.state.ticker}
                  onChange={(value) => this.setState({ticker: value.toUpperCase()})}
                  onRequestSearch={this.onRequestSearch}
                  style={style}
                  hintText={this.state.hint}
                  className='search-bar-font'
               />
            </div>

            <div className='col s2'>
               <EditButton/>
            </div>
         </div>
      );

   }

}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({ addTicker }, dispatch);
}

function mapStateToProps( {tickerList} ){
   return {
      tickerList, // [ {name, type}, ...]
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
