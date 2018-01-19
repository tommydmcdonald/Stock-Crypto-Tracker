import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../actions';

import '../style/style.css';
// import materializeCSS from 'materialize-css/dist/css/materialize.min.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Home from './Home';
import Landing from '../components/Landing'

class App extends Component {
   componentDidMount() {
      this.props.fetchUser();
   }

   render() {
      return (
         <div>
            <MuiThemeProvider>
            <BrowserRouter>
               <div>
                  <Route exact path='/' component={this.props.auth ? Home : Landing} />
                  <Route path='/landing' component={Landing} />
               </div>
            </BrowserRouter>
            </MuiThemeProvider>
         </div>
      );
   }
}

function mapStateToProps({ auth, tickerList }) {
   return { auth, tickerList };
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({ fetchUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App); //guessint no mapdispatchtoprops cause no need to bind aciton creators causing using redux-thunk?
