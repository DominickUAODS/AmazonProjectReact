
//import AccountOrders from './components/AccountComp/AccountOrders';
import AccountSettings from './components/AccountComp/AccountSettings';
//import AccountWishlist from './components/AccountComp/AccountWishlist';
//import AccountMenu from './components/AccountMenu/AccountMenu'
import './App.css'
import { BrowserRouter, Routes, Route, useLocation, } from "react-router-dom";
import { Main } from './components/Main'
import  Layout  from './components/Layout';
import { ProductList } from './components/ProductComp/ProductList';

import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import AccountWishlist from './components/AccountComp/AccountWishlist';
import SignUpAccount from './components/SignUpAccount/SignUpAccount';
import LogInAccount from './components/LogInAccount/LogInAccount';
import EnterCodeFromGmail from './components/SignUpAccount/EnterCodeFromGmail';
import SignUpFinal from './components/SignUpAccount/SignUpFinal';
import Congrats from './components/SignUpAccount/Congrats';

function App({ location, background } : any) {
  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="products" element={<ProductList />} />
          <Route path="settings" element={<AccountSettings />} />
          <Route path="wishlist" element={<AccountWishlist />} />
        </Route>
      </Routes>

      {background && (
        <Routes>
          <Route path="/signUp" element={<SignUpAccount />} />
          <Route path = "/login" element = {<LogInAccount/>}/>
          <Route path="/checkIn" element={<EnterCodeFromGmail background={location.state?.background}/>}/>
          <Route path="/finalSignUp" element={<SignUpFinal background={location.state?.background}/>}/>
          <Route path="/congrats" element={<Congrats/>}/>
        </Routes>
      )}
    </>
  );
}

export default App;