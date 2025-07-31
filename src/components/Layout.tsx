import { Outlet } from "react-router-dom";
import Header from "./HeaderComp/Header";
import Footer from "./FooterComp/Footer";

export default function Layout() {
  return (
    <div className="pageWrapper">
      <Header />
      <main className="pageContent">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
