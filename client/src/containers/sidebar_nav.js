import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Collapsible, CollapsibleItem, Card, CardTitle } from 'react-materialize';


class SideBarNav extends Component {
  constructor(props) {
     super(props);
  }

  renderName() {
    const { auth } = this.props;
    if (auth) {
      return auth.displayName;
    }
    return 'Welcome';
  }


  render() {
    return(
      <ul id="nav-mobile" className="side-nav fixed z-depth-6">
        <Card className='navbar-img'
        	header={<CardTitle image={require('../img/a.jpg')}>{this.renderName()}</CardTitle>}>
        </Card>
        <Collapsible popout defaultActiveKey={1}>
        	<CollapsibleItem id="collapsible-header" className="white-text" header='Stocks' icon='trending_up'>
            <div className="black-text">
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
            </div>
        	</CollapsibleItem>
        	<CollapsibleItem id="collapsible-header" className="white-text" header='Crypto Currencies' icon='trending_up'>
            <div className="black-text collapsible-options">
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
            </div>
          </CollapsibleItem>
        </Collapsible>
      </ul>
    );
  }
}
function mapStateToProps({ auth }) {
   return { auth };
}

export default connect(mapStateToProps)(SideBarNav);
