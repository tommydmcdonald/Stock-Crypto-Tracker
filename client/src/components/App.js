import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import '../style/style.css';
import materializeCSS from 'materialize-css/dist/css/materialize.min.css';

import Home from './Home';
import Login from './Login';
import Header from './Header';

const App = () => {
   return (
      <BrowserRouter>
         <div>
            <Header />
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
         </div>
      </BrowserRouter>
   );
}
export default App;
