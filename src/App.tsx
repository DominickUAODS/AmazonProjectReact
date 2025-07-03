
import AccountMenu from './AccountMenu/AccountMenu'
import './App.css'
import Footer from './FooterComp/Footer'

import Header from './HeaderComp/Header'

function App() {
  return (
    <div className="pageWrapper">
      <Header />
      <main className="pageContent">
        <AccountMenu />
      </main>
      <Footer />
    </div>
  );
}


export default App
