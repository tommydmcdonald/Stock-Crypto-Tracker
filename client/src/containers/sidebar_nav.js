import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Collapsible, CollapsibleItem } from 'react-materialize';


export default class SideBarNav extends Component {
  constructor(props) {
     super(props);
  }

  render() {
    return(
      <ul id="nav-mobile" className="side-nav fixed z-depth-2">
        <li className="navbar-img"></li>
        <Collapsible>
        	<CollapsibleItem header='Stocks' icon='poll'>
            <div className="collapsable-body">
              <ul>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
              </ul>
            </div>
        	</CollapsibleItem>
        	<CollapsibleItem header='Crypto Currencies' icon='trending_up'>
            <div className="collapsable-body">
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
            </div>
          </CollapsibleItem>
        </Collapsible>
      </ul>
    );
  }
}
