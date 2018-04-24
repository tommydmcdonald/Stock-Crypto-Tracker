import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';

import { EditDialog } from '../EditPurchaseHistory';

import '../../style/PortfolioList.css';

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
      };
   }

  handleClose = () => {
    this.setState({open: false});
  };

  handleOpen = () => {
     this.setState({open: true});
 }

  render() {
    return (
      <div className='edit-button'>
        <RaisedButton label="Edit" onClick={this.handleOpen} />
        <EditDialog
           open={this.state.open}
           handleClose={this.handleClose}
           type={this.props.type}
        />
      </div>
    );
  }
}
