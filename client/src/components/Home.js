import React, { Component } from 'react';

import Chart from '../containers/Chart';
import SearchBar from '../containers/search_bar';
import SideBarNav from '../containers/sidebar_nav';
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
             <Col s={4}><SideBarNav updateGraphTicker={this.updateGraphTicker} s={12}/></Col>
             <Col s={8}><Chart graphTicker={this.state.graphTicker} /></Col>
           </Row>
         </div>
      );
   }

};

export default Home;
