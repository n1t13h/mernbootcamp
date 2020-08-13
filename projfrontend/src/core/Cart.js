import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import Paymentb from "./paymentB";
import { loadCart } from "./helper/CartHelper";
const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = products => {
    return (
      <div className="row ml-2">
        {products.map((product, index) => (
          <div className="col-6">
            <Card
            key={index}
            product={product}
            removeFromCart={true}
            addtoCart={false}
            setReload={setReload}
            reload={reload}
          />
          </div>
        ))}
      </div>
    );
  };
  const loadCheckout = () => {
    return (
      <div>
        <h2>This section for checkout</h2>
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Ready to checkout" className="theme-white container">
      <div className="row text-center">
        <div className="col-6">
          <h1>Your Cart<i class="fa fa-shopping-cart"></i></h1>
          {products.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <h4>No products</h4>
          )}
        </div>
        <div className="col-6 ">
          <Paymentb products={products} setReload={setReload} />
        </div>
      </div>
    </Base>
  );
};

export default Cart;
