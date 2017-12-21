import React, { Component } from 'react';

import Chart from '../containers/Chart';
import SearchBar from '../containers/SearchBar';
import SideNav from '../containers/SideNav';
import { Row, Col } from 'react-materialize';

class Home extends Component {
   constructor() {
      super();
      this.state = { graphTicker: {name: '', type: ''} };

      this.updateGraphTicker = this.updateGraphTicker.bind(this);
   }

   updateGraphTicker(newTicker) {
      this.setState({graphTicker: newTicker});
   }

   render() {
      return (
         <div className='mainApp'>
           <Row> <Col s={9} offset="s3"> <SearchBar /> </Col></Row>
           <Row>
             <Col s={4}><SideNav updateGraphTicker={this.updateGraphTicker} s={12}/></Col>
             <Col s={8}><Chart graphTicker={this.state.graphTicker} /></Col>
           </Row>
         </div>
      );
   }

};

export default Home;
