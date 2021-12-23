import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PageHero, StripeCheckout } from '../components';

// extra imports
import { useCartContext } from '../context/cart_context';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CheckoutPage = () => {
  // const { cart } = useCartContext()
  const { cartItems } = useSelector((state) => state.cart);
  const [cartdata, setCartdata] = useState([]);

  useEffect(() => {
    setCartdata(cartItems);
  }, [cartItems]);

  return (
    <main>
      <PageHero title="checkout" />
      <Wrapper className="page">
        {cartdata.length < 1 ? (
          <div className="empty">
            <h2>your cart is empty</h2>
            <Link to="/products" className="btn">
              fill it
            </Link>
          </div>
        ) : (
          <StripeCheckout />
        )}
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .empty {
    text-align: center;
  }
`;
export default CheckoutPage;
