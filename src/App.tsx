
//import AccountOrders from './components/AccountComp/AccountOrders';
import AccountSettings from './components/AccountComp/AccountSettings';
//import AccountWishlist from './components/AccountComp/AccountWishlist';
//import AccountMenu from './components/AccountMenu/AccountMenu'
import './App.css'
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { Main } from './components/Main'
import { Layout } from './components/Layout';
import { ProductList } from './components/ProductList';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

function App() {
  return (
    
  
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <div className="pageWrapper">
            <Header />
            <main className="pageContent">
              {/* <AccountOrders/> */}
              <AccountSettings />
            </main>
            <Footer />
          </div>
          <Route path="products" element={<ProductList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>
  )
}


export default App