import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchTracker } from '../actions/index';

class SearchBar extends Component {
   constructor(props) {
      super(props);

      this.state = { tracker: '' };

      this.onInputChange = this.onInputChange.bind(this);
      this.onFormSubmit = this.onFormSubmit.bind(this);
   }

   onInputChange(event) {
      this.setState({ tracker: event.target.value });
   }

   onFormSubmit(event) {
      event.preventDefault();

      // Fetch tracker info
      this.props.fetchTracker(this.state.tracker);
      this.setState({ tracker: '' });
   }

   render() {
      return (
         <div className="container search-bar">
            <form onSubmit={this.onFormSubmit} className="input-group">
               <input
                  placeholder="Add a stock or cryptocurrency to your portfolio"
                  className="form-control"
                  value={this.state.tracker}
                  onChange={this.onInputChange}
               />
               <span className="input-group-btn">
                  <button type="submit" className="btn btn-secondary">
                     Submit
                  </button>
               </span>
            </form>
         </div>

      );

   }
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({ fetchTracker }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);
