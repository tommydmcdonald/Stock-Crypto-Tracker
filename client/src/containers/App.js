import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../actions';
import * as actions from '../actions';

import '../style/style.css';
// import materializeCSS from 'materialize-css/dist/css/materialize.min.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Home from '../components/Home';
import Landing from '../components/Landing'
import Header from './Header';

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
                  <Route exact path={"/"} component={this.props.auth ? Home : Landing} />
                  <Route path="/landing" component={Landing} />
               </div>
            </BrowserRouter>
            </MuiThemeProvider>
         </div>
      );
   }
}

function mapStateToProps({ auth }) {
   return { auth };
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({ fetchUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App); //guessint no mapdispatchtoprops cause no need to bind aciton creators causing using redux-thunk?
