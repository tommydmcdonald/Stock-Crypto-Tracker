import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTicker } from '../actions/index';
import { Row, Autocomplete, Button, Col, Input } from 'react-materialize';

import { TYPE } from '../actions/types';

const API_KEY = 'BIYQYMYZ9KIBXS9V';

class SearchBar extends Component {
   constructor(props) {
      super(props);

      this.state = { ticker: '', type: '', switch: TYPE.STOCK}

      this.onInputChange = this.onInputChange.bind(this);
      this.onFormSubmit = this.onFormSubmit.bind(this);
      this.onButtonClick = this.onButtonClick.bind(this);
      this.handleEnterOnSearchBar = this.handleEnterOnSearchBar.bind(this);
      this.onSwitchChange = this.onSwitchChange.bind(this);
   }

   onInputChange(event) {
      this.setState({ ticker: event.target.value });
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
      const tickerFormatted = this.state.ticker.toUpperCase();

      if (tickerFormatted != '') {//only add if not empty string
         this.props.addTicker(tickerFormatted, this.state.type);
      }

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
                  data={
                     {
                        'Apple': null,
                        'Microsoft': null,
                        'Google': 'http://placehold.it/250x250'
                     }
                  }
               />
            </Col>
            <Col s={2}><Button className='search-button' id={TYPE.STOCK} onClick={this.onButtonClick} waves='light'>Add Stock</Button></Col>
            <Col s={2}><Button className='search-button' id={TYPE.CRYPTO} onClick={this.onButtonClick} waves='light'>Add Crypto</Button></Col>
            <Col s={2}><div class="switch"><label>Stock<input type="checkbox" onChange={this.onSwitchChange}/><span class="lever"></span>Crypto</label></div></Col></Row>
      );

   }
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({ addTicker }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);
