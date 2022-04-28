import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { getProducts } from "../axios-services/products";
import { getAPIHealth } from "../axios-services";
import "../style/App.css";
import Login from "./Login";
import Header from "./Header";
import Register from "./Register";
import Products from "./Products";
import SingleProduct from "./SingleProduct";
import Footer from "./Footer";
import Cart from "./Cart";
import AdminProductForm from "./AdminProductForm";
import AdminDashboard from "./AdminDashboard";


const App = () => {
  const [APIHealth, setAPIHealth] = useState("");
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const getAllProducts = async () => {
      const allProducts = await getProducts();
      setProducts(allProducts);
    };
    getAllProducts();
  }, []);

  useEffect(() => {
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? "api is up! :D" : "api is down :/");
    };


    getAPIStatus();
  }, []);

  return (
    <div className="app-container">
      <Header />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/products/:singleProductId" element={<SingleProduct products={products} setproducts={setProducts} />} />
        <Route path="/products" element={<Products products={products} setProducts={setProducts} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin/product-form" element={< AdminProductForm />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/" element={<Products />} />
      </Routes>
      <Footer APIHealth={APIHealth} />
    </div>
  );
};

export default App;
