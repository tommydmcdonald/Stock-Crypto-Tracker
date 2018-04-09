import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';


export default class SandwichBar extends Component {

   constructor(props) {
       super(props);
       this.state = {
         open: false,
       };
       this.handleClick;
     }

     handleClick = () => {
       this.setState({
         open: true,
       });
     };

     handleRequestClose = () => {
       this.setState({
         open: false,
       });
    };

   render() {
      return (
         <div>
           <Snackbar
             open={this.state.open}
             message="Event added to your calendar"
             autoHideDuration={4000}
             onRequestClose={this.handleRequestClose}
           />
         </div>
      );
   }
}
