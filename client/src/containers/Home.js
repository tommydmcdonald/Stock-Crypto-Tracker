import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadTickerList, loadTickerPrices, selectChart } from '../actions';

import Header from './Header';
import Chart from './Chart';
import SearchBar from './SearchBar';
import SideNav from '../components/SideNav';
import { Row, Col } from 'react-materialize';
import ReactInterval from 'react-interval';
import NewsList from './NewsList';

class Home extends Component {
   constructor() {
      super();
      const refreshRateSeconds = 15;
      this.timeout = refreshRateSeconds * 1000;
   }

   async componentDidMount() {
      this.props.loadTickerPrices();
      await this.props.loadTickerList();

      if (this.props.tickerList[0]) {
         const { name, type } = this.props.tickerList[0];
         this.props.selectChart({ name, type });
      }
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
            <Row>
              <Col s={2}><SideNav /></Col>
              <Col s={7}><Chart /></Col>
              <Col s={3}><NewsList className="NewsListColumn"/></Col>
            </Row>
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
