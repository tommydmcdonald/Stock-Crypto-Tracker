import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { EditList } from '../EditPurchaseHistory';
import { TYPE } from '../../actions/types';

import '../../style/EditPurchaseHistory.css';

class EditDialog extends Component {
   constructor(props) {
      super(props);

      this.state = {
         title: this.props.type === TYPE.STOCK ? 'Edit Stocks' : 'Edit Cryptocurrencies',
      }
   }

   componentDidUpdate() {
      this.state.tickers = this.props.tickerList.filter( ticker => ticker.type == this.props.type);
   }

   handleSave() {
      console.log(this.state.tickers);
   }

   actions = [
     <FlatButton
      label="Cancel"
      primary={true}
      onClick={this.props.handleClose}
     />,
     <FlatButton
      label="Save"
      primary={true}
      keyboardFocused={true}
      onClick={this.handleSave.bind(this)}
     />,
   ];

   render() {
      return (
         <Dialog
            title={this.state.title}
            actions={this.actions}
            modal={false}
            open={this.props.open}
            onRequestClose={this.props.handleClose}
            autoScrollBodyContent={true}
         >
            <EditList
               type={this.props.type}
               tickers={this.state.tickers}
            />
         </Dialog>
      );
   }
}

function mapStateToProps({tickerList}) {
   return { tickerList }
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({ }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditDialog);
