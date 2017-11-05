import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import StockCryptoList from './stockcrypto_list';

const App = () => {
   return (
   <div>
      <BrowserRouter>
        <div>
           <Switch>
             <Route path="/" component={StockCryptoList} />
           </Switch>
        </div>
     </BrowserRouter>
   </div>
   )
}

export default App;
