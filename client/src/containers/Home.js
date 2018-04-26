import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadTickerList, loadTickerPrices, selectChart, closeSnackbar } from '../actions';
import { TYPE } from '../actions/types';

import Header from './Header';
import Chart from './Chart';
import SideNav from '../components/SideNav';
import { Row, Col } from 'react-materialize';
import ReactInterval from 'react-interval';
import NewsList from './NewsList';
import Stats from './Stats';

import Snackbar from 'material-ui/Snackbar';


class Home extends Component {
   constructor(props) {
      super(props);

      const refreshRateSeconds = 15;

      this.timeout = refreshRateSeconds * 1000;
   }

   async componentDidMount() {
      this.props.loadTickerPrices();
      await this.props.loadTickerList();

      if (this.props.tickerList[0]) {
         const { name, type } = this.props.tickerList[0];
         this.props.selectChart( name, type );
      }

   }

   snackbarMessage() {
      let message = '';

      if (this.props.snackbar.open) {
         const type = this.props.snackbar.ticker.type === TYPE.STOCK ? 'stock' : 'cryptocurrency';

         message = `Successfully added ${type} ${this.props.snackbar.ticker.name}`;
      }

      return message;
   }

   render() {

      return (
         <div className='mainApp'>
            <ReactInterval
               timeout={this.timeout}
               enabled={true}
               callback={this.props.loadTickerPrices}
            />

            <Header />
            <Row> <Col s={9} offset="s3"></Col></Row>
            <Row>
              <Col s={3}><SideNav   /></Col>
              <Col className="graph-and-stats" s={6} offset="">
                  <Chart className="homeChart w3-spin" />
                  <Stats className="stats-container"/>
              </Col>
              <Col s={2} offset="s1"><NewsList  /></Col>
            </Row>

            <Snackbar className="snack-bar"
               bodyStyle={{ backgroundColor: '#5C6BC0', color: 'teal' }}
               action = 'undo'
               actionStyle={{backgroundColor: '#FFF'}}
              open={this.props.snackbar.open}
              message={this.snackbarMessage()}
              autoHideDuration={4000}
              onRequestClose={this.props.closeSnackbar}
            />

         </div>
       );
   }
}


function mapStateToProps({tickerList, snackbar}) {
   return { tickerList, snackbar }
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({ loadTickerList, loadTickerPrices, selectChart, closeSnackbar }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
