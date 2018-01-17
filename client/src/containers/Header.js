import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-materialize';
import { Navbar, NavItem, Icon, Dropdown, Button } from 'react-materialize';

import AccountDropDown from '../containers/AccountDropDown';

class Header extends Component {
   renderContent() {
      switch(this.props.auth) {
         case null:
            return;
         case false:
            return <Col><a href="/auth/google"><img className="googleSignIn" src={require('../img/google.png')} /></a></Col>
         default:
            return <Col><AccountDropDown /></Col>;
      }
   }

   render() {
      return (
         <div class="navbar-fixed">
            <nav id='header'>
               <div class="nav-wrapper">
                  <Link
                     to={this.props.auth ? '/' : '/landing'}
                     className="brand-logo" id="logo">
                     cryptofluence
                  </Link>
                  <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li>{this.renderContent()}</li>
                  </ul>
               </div>
            </nav>
         </div>
      );
   }

}

function mapStateToProps({ auth }) {
   return { auth };
}

export default connect(mapStateToProps)(Header);
