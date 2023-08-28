import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import { removeFromCart } from "../axios-services/product-orders";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { token, user } = useAuth();
  const { cart, setCart, updateQty, deleteItem, checkout } = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    const orderId = cart.id;
    await checkout(orderId, user.id);
    // navigate("/", { replace: true });
  };

  const handleQuantityUpdate = async (id, quantity, increment = true) => {
    setLoading(true);
    const newQuantity = increment ? quantity + 1 : quantity - 1;
    await updateQty(id, newQuantity);
    setLoading(false);
  };

  const handleItemRemove = async (id) => {
    await deleteItem(token, id);
  };

  return (
    <div>
      <button onClick={handleCheckout}>Checkout</button>

      {cart.product_orders.map((product_order, i) => {
        return (
          <div key={`cartProduct${i}`}>
            <h2>{product_order.products.name}</h2>
            <img
              src={product_order.products.imageURL}
              alt={product_order.products.name}
              width='200px'
            />
            <div>
              ${" "}
              {parseFloat(
                product_order.products.price * product_order.quantity,
              ).toFixed(2)}
            </div>
            <button
              disabled={loading || product_order.quantity === 1}
              onClick={() =>
                handleQuantityUpdate(
                  product_order.id,
                  product_order.quantity,
                  false,
                )
              }>
              -
            </button>
            <div>{product_order.quantity}</div>
            <button
              disabled={loading}
              onClick={() =>
                handleQuantityUpdate(product_order.id, product_order.quantity)
              }>
              +
            </button>
            <div>
              <button onClick={() => handleItemRemove(product_order.id)}>
                Remove Item
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cart;
