import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import EditList from './EditList';

import { TYPE } from '../actions/types';

import '../style/PortfolioList.css';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class EditButton extends Component {
   constructor(props) {
      super(props);
      this.state = {
        open: false,
        title: this.props.type === TYPE.STOCK ? 'Edit Stocks' : 'Edit Cryptocurrencies'
      };
   }


  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Save"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div className='edit-button'>
        <RaisedButton label="Edit" onClick={this.handleOpen} />
        <Dialog
          title={this.state.title}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
           <EditList type={this.props.type}/>
        </Dialog>
      </div>
    );
  }
}
