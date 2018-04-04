import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SearchBarMU from 'material-ui-search-bar'

class SearchBar extends Component {

   render() {
      const style = {
         margin: '0 auto',
         height: '40px',
      }

      return (
         <div className='search-bar row'>
            <SearchBarMU
               onChange={() => console.log('onChange')}
               onRequestSearch={() => console.log('onRequestSearch')}
               style={style}
               className='search-bar-font'
               hintText='Add stock'
            />
         </div>
      )
   }
}

function mapStateToProps({}) {
   return;
}

function mapDispatchToProps(dispatch) {
   return; //bindActionCreators({ removeTicker, updateQuantity, selectChart }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
