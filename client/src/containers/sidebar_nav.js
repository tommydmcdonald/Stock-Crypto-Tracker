import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Collapsible, CollapsibleItem, Card, CardTitle } from 'react-materialize';


export default class SideBarNav extends Component {
  constructor(props) {
     super(props);
  }

  render() {
    return(
      <ul id="nav-mobile" className="side-nav fixed z-depth-6">
        <Card className='navbar-img'
        	header={<CardTitle image={require('../img/a.jpg')}>Hello World!</CardTitle>}>
        </Card>
        <Collapsible popout defaultActiveKey={1}>
        	<CollapsibleItem className="white-text" header='Stocks' icon='trending_up'>
        		<li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet.</li>
        	</CollapsibleItem>
        	<CollapsibleItem className="white-text" header='Crypto Currencies' icon='trending_up'>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet.</li>
          </CollapsibleItem>
        </Collapsible>
      </ul>
    );
  }
}
