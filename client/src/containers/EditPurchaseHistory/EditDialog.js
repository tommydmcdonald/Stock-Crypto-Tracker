import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { EditList } from '../EditPurchaseHistory';
import { TYPE } from '../../actions/types';

import '../../style/EditPurchaseHistory.css';

class EditDialog extends Component {
   constructor(props) {
      super(props);

      console.log('editDialog constructor');

      this.state = {
         title: this.props.type === TYPE.STOCK ? 'Edit Stocks' : 'Edit Cryptocurrencies',
      }

      this.modifyHistory = this.modifyHistory.bind(this);
   }

   static getDerivedStateFromProps(nextProps, prevState) { //called only when component receives new props (tickerList updating in redux)
      return {
         tickers: EditDialog.getInitTickers(nextProps)
      };
   }

   static getInitTickers(props) { //returns reduced & formatted tickers, static so must pass in props
      const tickers = props.tickerList.reduce( (tickers, ticker) => {
         if ( ticker.type == props.type) {
            ticker.modified = false;
            tickers.push(ticker);
         }
         return tickers;
      }, []);

      return tickers;
   }

   modifyHistory(history, field, newValue) {

      const ticker = _.find(this.state.tickers, { purchaseHistory: [ { _id: history._id } ] } );
      const { name } = ticker;

      const tickerIndex = _.findIndex(this.state.tickers, { name });

      const historyIndex = _.findIndex(ticker.purchaseHistory, { _id: history._id } );

      const newTickers = _.cloneDeep(this.state.tickers); //must use otherwise editing history is actual object (shallow copy)

      console.log('newTickers = ', newTickers);
      console.log('tI', tickerIndex, 'hI', historyIndex, 'name', name);

      const newHistory = newTickers[tickerIndex].purchaseHistory[historyIndex];
      newHistory[field] = newValue;
      newHistory['modified'] = true;

      this.setState({ tickers: newTickers });
   }

   handleSave() {
      console.log(this.state.tickers);
   }

   internalHandleClose = () => {
      console.log('internal handle close');
      console.log(this.props);
      console.log('tickers in internalHandleClose = ', EditDialog.getInitTickers(this.props));
      this.setState( {tickers: EditDialog.getInitTickers(this.props)} ); //sets this.state.tickers to original values from this.props.tickerList

      this.props.handleClose();
   }

   actions = [
     <FlatButton
      label="Cancel"
      primary={true}
      onClick={this.internalHandleClose}
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
            onRequestClose={this.internalHandleClose}
            autoScrollBodyContent={true}
         >
            <EditList
               type={this.props.type}
               tickers={this.state.tickers}
               modifyHistory={this.modifyHistory}
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
