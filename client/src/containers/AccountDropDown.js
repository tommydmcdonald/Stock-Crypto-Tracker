import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar, NavItem, Icon, Dropdown, Button, Row, Col, Section } from 'react-materialize';

class AccountDropDown extends Component {
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
    return (
        <Dropdown trigger={
            <a>
                <Row>
                   <Col s={2}><Icon large>account_circle</Icon></Col>
                   <Col s={8}>{this.renderName()}</Col>
                   <Col s={2}><Icon>keyboard_arrow_down</Icon></Col>
                </Row>
              </a>
          }
          data-beloworigin="true">
        	<NavItem>Settings</NavItem>
        	<NavItem>FAQ</NavItem>
          <NavItem>Invite peeps</NavItem>
        	<NavItem divider />
        	<NavItem href="/api/logout">Sign out</NavItem>
        </Dropdown>
    );
  }
}

function mapStateToProps({ auth }) {
   return { auth };
}

export default connect(mapStateToProps)(AccountDropDown);
