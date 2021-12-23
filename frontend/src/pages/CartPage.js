import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import { useCartContext } from '../context/cart_context'
import { Link } from "react-router-dom";
import { CartContent, PageHero } from "../components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CartPage = () => {
  // const dispatch = useDispatch()
  // const { cart } = useCartContext()
  const { cartItems } = useSelector((state) => state.cart);
  const [cartdata, setCartdata] = useState([]);

  // const clearCartHandler = () => {
  //   dispatch(clearCart());
  //   setCartdata([]);
  // };

  useEffect(() => {
    setCartdata(cartItems);
  }, [cartItems]);

  if (cartdata.length < 1) {
    return (
      <>
        <Navbar />
        <PageHero title="cart" />
        <Wrapper className="page-100">
          <div className="empty">
            <h2>Your cart is empty</h2>
            <Link to="/products" className="btn">
              fill it
            </Link>
          </div>
        </Wrapper>
        <Footer />
      </>
    );
  }
  return (
    <main>
      <Navbar />
      <PageHero title="cart" />
      <Wrapper className="page">
        <CartContent cartItems />
      </Wrapper>
      <Footer />
    </main>
  );
};

const Wrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`;

export default CartPage;
