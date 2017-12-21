import React, { Component } from 'react';

import Chart from '../containers/Chart';
import SearchBar from '../containers/SearchBar';
import SideNav from '../containers/SideNav';
import { Row, Col } from 'react-materialize';

const Home = () => {
   return (
      <div className='mainApp'>
        <Row> <Col s={9} offset="s3"> <SearchBar /> </Col></Row>
        <Row>
          <Col s={4}><SideNav s={12}/></Col>
          <Col s={8}><Chart /></Col>
        </Row>
      </div>
   );
}

export default Home;
