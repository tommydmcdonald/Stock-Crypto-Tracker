import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './home';

const App = () => {
   return (
   <div>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous" />
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
