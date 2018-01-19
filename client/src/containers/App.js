import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser, loadTickerList, loadTickerPrices, selectChart } from '../actions';
import * as actions from '../actions';

import '../style/style.css';
// import materializeCSS from 'materialize-css/dist/css/materialize.min.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Home from '../components/Home';
import Landing from '../components/Landing'
import Header from './Header';
import ReactInterval from 'react-interval';

class App extends Component {
   constructor() {
      super();
      const refreshRateSeconds = 15;
      this.timeout = refreshRateSeconds * 1000;
   }

   componentDidMount() {
      this.props.fetchUser();
      this.props.loadTickerList();
      this.props.loadTickerPrices();

      if (this.props.tickerList[0]) {
         const { name, type } = this.props.tickerList[0];
         this.props.selectChart({ name, type });
      }
   }

   render() {
      return (
         <div>
            <ReactInterval
               timeout={this.timeout}
               enabled={true}
               callback={this.props.loadTickerPrices}
            />
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

function mapStateToProps({ auth, tickerList }) {
   return { auth, tickerList };
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({ fetchUser, loadTickerList, loadTickerPrices, selectChart }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App); //guessint no mapdispatchtoprops cause no need to bind aciton creators causing using redux-thunk?
