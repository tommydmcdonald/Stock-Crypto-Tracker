import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTicker } from '../actions/index';
import { Row, Autocomplete, Button, Col, Input } from 'react-materialize';
import axios from 'axios';
import _ from 'lodash';

import { TYPE } from '../actions/types';

const API_KEY = 'BIYQYMYZ9KIBXS9V';

class SearchBar extends Component {
   constructor(props) {
      super(props);

      this.state = { ticker: '', type: '', switch: TYPE.STOCK, suggestions: {} }

      this.onInputChange = this.onInputChange.bind(this);
      this.onFormSubmit = this.onFormSubmit.bind(this);
      this.onButtonClick = this.onButtonClick.bind(this);
      this.handleEnterOnSearchBar = this.handleEnterOnSearchBar.bind(this);
      this.onSwitchChange = this.onSwitchChange.bind(this);
   }

   async componentDidMount() {
      const res = await axios.get('/api/tickers/suggestions');
      this.setState( {suggestions: res.data} );
   }

   onInputChange(event, value) {
      this.setState({ ticker: value });
   }

   onSwitchChange() {
      if (this.state.switch == TYPE.STOCK) {
         this.setState( { switch: TYPE.CRYPTO } );
      }
      else {
         this.setState( { switch: TYPE.STOCK } )
      }
   }

   onFormSubmit() {
      // Fetch tracker info
      const newTicker = { name: this.state.ticker.toUpperCase(), type: this.state.type };

      if ( newTicker.name !== '' && !_.some(this.props.tickerList, newTicker) ) { //only add if not empty string and ticker doesn't exist in redux tickerList
         this.props.addTicker(newTicker);
      } //

      this.setState( { ticker: '', type: ''} ); //sets default state
   }

   async onButtonClick(event) {
      const { id } = event.target;
      await this.setState( { type: id } );
      this.onFormSubmit();
   }

   async handleEnterOnSearchBar(event) {
      if (event.key === 'Enter') {
         await this.setState( { type: this.state.switch } );
         this.onFormSubmit();
      }
   }

   render() {
      return (
         <Row className='valign-wrapper'>
            <Col s={5}>
               <Autocomplete
                  s={12}
                  title='Enter ticker'
                  value={this.state.ticker}
                  onChange={this.onInputChange}
                  onKeyPress={this.handleEnterOnSearchBar}
                  minLength={2}
                  data={this.state.suggestions}
                  limit={10}
               />
            </Col>
            <Col s={2}><Button className='search-button cyan' id={TYPE.STOCK} onClick={this.onButtonClick} waves='light'>Add Stock</Button></Col>
            <Col s={2}><Button className='search-button cyan' id={TYPE.CRYPTO} onClick={this.onButtonClick} waves='light'>Add Crypto</Button></Col>
            <Col s={2}><div className="switch"><label>Stock<input type="checkbox" onChange={this.onSwitchChange}/><span className="lever"></span>Crypto</label></div></Col>
          </Row>
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
