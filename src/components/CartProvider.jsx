import React, { useEffect, useState } from "react";
import CartContext from "../CartContext";
import useAuth from "../hooks/useAuth";
import { getCartByUser, createCart } from "../axios-services/cart";
import { getProductOrders } from "../axios-services/product-orders";
import { getProducts } from "../axios-services/products";

const CartProvider = ({ children }) => {
  const { token, user } = useAuth();
  const [cart, setCart] = useState({ product_orders: [] });
  console.log(cart, "before use effect")
  //   const localCart = JSON.parse(localStorage.getItem("cart"));
  //   console.log(localCart, "my local cart");
  //   console.log(cart, "This cart");
  //   if (localCart) {
  //     console.log("localCart exists");
  //   } else {
  //     console.log("localCart is not found");
  //   }
  useEffect(() => {
    console.log(cart, "in useeffect");
    if (user.id && cart.id) {
      async function getCart() {
        const userCart = await getCartByUser(user.id);
        // console.log(userCart);
        setCart(userCart);
      }

      getCart();
    }
    if (user.id && !cart.id) {
      async function newCart() {
        const newUserCart = await createCart(user.id);
        // console.log(newUserCart, "new user cart");
        setCart(newUserCart);
      }
      newCart();
    }
  }, [user]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
