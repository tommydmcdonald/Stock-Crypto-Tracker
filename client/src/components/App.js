import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '../style/style.css';

import Home from './home';

const App = () => {
   return (
   <div>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossOrigin="anonymous" />
      <BrowserRouter>
        <div>
           <Switch>
             <Route path="/" component={Home} />
           </Switch>
        </div>
     </BrowserRouter>
   </div>
);
}

export default App;
