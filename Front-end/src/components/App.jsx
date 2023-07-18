import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MainPage from "./MainPage/MainPage";
import AllProducts from "./AllProducts/AllProducts";
import AllDiscounts from "./AllDiscounts/AllDiscounts";
import Catalogs from "./Catalog/Catalogs";
import Basket from "./Basket/Basket";
import Nfp from "./NFP/Nfp"
import NavLinks from "./Nav/NavLinks";
import ProductsFromCatalog from "./ProductsFromCatalog/ProductsFromCatalog";
import OneProduct from "./OneProduct/OneProduct";
function App() {
  return (
    <Router>    
        <NavLinks></NavLinks>
        <Routes>
              <Route path="/" element={<MainPage></MainPage>}></Route>
              <Route path="/catalog" element={<Catalogs></Catalogs>}></Route>
              <Route path="/catalog/:id" element={<ProductsFromCatalog></ProductsFromCatalog>}></Route>
              <Route path="/allproducts" element={<AllProducts></AllProducts>}></Route>
              <Route path="/products/:id" element={<OneProduct></OneProduct>}></Route>
              <Route path="/allsales" element={<AllDiscounts></AllDiscounts>}></Route>
              <Route path="/basket" element={<Basket></Basket>}></Route>
              <Route path="*" element={<Nfp></Nfp>}></Route>
        </Routes>
    </Router>
  );
}

export default App;
