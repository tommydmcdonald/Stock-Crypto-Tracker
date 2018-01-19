import React, { Component } from 'react';

import PortfolioChart from '../containers/PortfolioChart';
import PortfolioList from '../containers/PortfolioList'

export default class SideNav extends Component {
   render() {
      return (
         <div>
            <ul id="nav-mobile" className="side-nav fixed z-depth-8">
               <PortfolioChart />
               <PortfolioList />
            </ul>
         </div>
      );
   }
}
