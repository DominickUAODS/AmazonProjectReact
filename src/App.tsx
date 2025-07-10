import './App.css'
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { Main } from './components/Main'
import { Layout } from './components/Layout';
import { ProductList } from './components/ProductList';

function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Main />} />
              <Route path="products" element={<ProductList />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
