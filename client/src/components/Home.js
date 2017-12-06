import React from 'react';

import StockCryptoList from '../containers/stockcrypto_list';
import SearchBar from '../containers/search_bar';
import SideBarNav from '../containers/sidebar_nav';

const Home = () => {
   return (
      <div className='container'>
        <SideBarNav />
        <SearchBar />
        <StockCryptoList />
      </div>
   );
};

export default Home;
