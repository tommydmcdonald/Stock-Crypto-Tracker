import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { closeSnackbar } from '../actions';

import SnackbarMU from 'material-ui/Snackbar';

import { TYPE } from '../actions/types';

class Snackbar extends Component {
   constructor() {
      super();

   }

   render() {

      console.log('snackbar props = ', this.props);

      if (this.props.snackbar.open) {
         let message = '';

         if (this.props.snackbar.open) {
            const type = this.props.snackbar.ticker.type === TYPE.STOCK ? 'stock' : 'cryptocurrency';

            message = `Successfully added ${type} ${this.props.snackbar.ticker.name}`;
         }

         return (
            <SnackbarMU
               className="snack-bar"
               open={this.props.snackbar.open}
               message={message}
               autoHideDuration={4000}
               onRequestClose={this.props.closeSnackbar}
            ></SnackbarMU>
         )
      }
      else {
         return <div>Loading</div>;
      }


   }
}

function mapStateToProps({snackbar}) {
   return { snackbar }
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({ closeSnackbar }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Snackbar);
