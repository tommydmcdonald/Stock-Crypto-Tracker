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
          <a data-beloworigin="true" data-hover="true">
            <Row id="AccountDropDown-row">
               <Icon medium left>account_circle</Icon>
               {this.renderName()}
               <Icon medium right>keyboard_arrow_down</Icon>
            </Row>
          </a>
          }>
          <div id="AccountDropDown-NavItem">
          	<NavItem>Settings</NavItem>
          	<NavItem>FAQ</NavItem>
            <NavItem>Invite peeps</NavItem>
          	<NavItem divider />
          	<NavItem href="/api/logout">Sign out</NavItem>
          </div>
        </Dropdown>
    );
  }
}

function mapStateToProps({ auth }) {
   return { auth };
}

export default connect(mapStateToProps)(AccountDropDown);
