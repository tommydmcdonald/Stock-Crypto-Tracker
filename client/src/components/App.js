import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import '../style/style.css';

import Home from './Home';
import Login from './Login';

export default class App extends Component {
   render () {
      return (
         <BrowserRouter>
           <div>
           <Switch>
              <Route path="/login" component={Login} />
              <Route path="/" component={Home} />
             </Switch>
           </div>
         </BrowserRouter>
      );
   }
}
