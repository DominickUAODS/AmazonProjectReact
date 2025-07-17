
import AccountOrders from './AccountComp/AccountOrders';
import AccountSettings from './AccountComp/AccountSettings';
import AccountWishlist from './AccountComp/AccountWishlist';
import AccountMenu from './AccountMenu/AccountMenu'
import './App.css'
import Footer from './FooterComp/Footer'

import Header from './HeaderComp/Header'

function App() {
  return (
    <div className="pageWrapper">
      <Header />
      <main className="pageContent">
        {/* <AccountOrders/> */}
        <AccountSettings/>
      </main>
      <Footer />
    </div>
  );
}


export default App
