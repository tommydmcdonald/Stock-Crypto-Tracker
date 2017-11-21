import React, { Component } from 'react';

export default class Header extends Component {
   render() {
      return (
         <nav>
            <div className="nav-wrapper">
               <a className="brand-logo" id="logo">
                  StockCrypto List
               </a>
               <ul className="right">
                  <li>
                     <a>Login With Google</a>
                  </li>
               </ul>
            </div>
         </nav>
      );
   }
}
