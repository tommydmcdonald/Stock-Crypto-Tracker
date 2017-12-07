import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar, NavItem } from 'react-materialize';

class Header extends Component {
   renderContent() {
      switch(this.props.auth) {
         case null:
            return;
         case false:
            return <li><a href="/auth/google">Login With Google</a></li>
         default:
            return <li><a href="/api/logout">Logout</a></li>;
      }
   }

   render() {
      return (
        <Navbar className="z-depth-4" id="header"
                brand = {
                <Link
                  to={this.props.auth ? '/' : '/landing'}
                  className="brand-logo" id="logo">
                  StockCrypto Tracker
               </Link>}
               fixed right>
  	      <NavItem className="">{this.renderContent()}</NavItem>
        </Navbar>


      );
   }
}

function mapStateToProps({ auth }) {
   return { auth };
}

export default connect(mapStateToProps)(Header);
