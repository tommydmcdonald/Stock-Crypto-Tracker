import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadTickerList, loadTickerPrices, selectChart } from '../actions';

import Header from './Header';
import Chart from './Chart';
import SideNav from '../components/SideNav';
import { Row, Col } from 'react-materialize';
import ReactInterval from 'react-interval';
import NewsList from './NewsList';
import Snackbar from 'material-ui/Snackbar';

class Home extends Component {
   constructor() {
      super();
      const refreshRateSeconds = 15;
      this.timeout = refreshRateSeconds * 1000;

      this.state = { open: false,
                     ticker: '',
                   };
   }

   handleClick = () => {
     this.setState({
      open: true,
     });
   }

   handleRequestClose = () => {
        this.setState({
         open: false,
        });
    };

   async componentDidMount() {
      this.props.loadTickerPrices();
      await this.props.loadTickerList();

      if (this.props.tickerList[0]) {
         const { name, type } = this.props.tickerList[0];
         this.props.selectChart( name, type );
      }

      // this.handleClick();
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
              <Col s={6}><Chart className="homeChart" /></Col>
              <Col s={3}><NewsList  /></Col>
            </Row>
            <Snackbar
               className="snack-bar"
               open={this.state.open}
               message="Success"
               autoHideDuration={4000}
               onRequestClose={this.handleRequestClose}
            ></Snackbar>
         </div>
       );
   }
}


function mapStateToProps({tickerList, priceList, selectedChart}) {
   return { tickerList, priceList, selectedChart }
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({ loadTickerList, loadTickerPrices, selectChart }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
