import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// import { useCartContext } from '../context/cart_context';
import { Link } from 'react-router-dom';
import CartColumns from './CartColumns';
import CartItem from './CartItem';
import CartTotals from './CartTotals';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clearCart } from '../redux/actions/cartAction';

const CartContent = () => {
  const dispatch = useDispatch();
  // const { cart, clearCart } = useCartContext();
  // console.log(cart);
  const { cartItems } = useSelector((state) => state.cart);

  const [cartdata, setCartdata] = useState([]);

  const clearCartHandler = () => {
    dispatch(clearCart());
    setCartdata([]);
  };

  useEffect(() => {
    setCartdata(cartItems);
  }, [cartItems]);

  return (
    <Wrapper className="section section-center">
      <CartColumns />
      {cartdata.length > 0 &&
        cartdata?.map((item) => {
          return <CartItem key={item.product} {...item} />;
        })}
      <hr />
      <div className="link-container">
        <Link to="/products" className="link-btn">
          continue shopping
        </Link>
        <button
          type="button"
          className="link-btn clear-btn"
          onClick={clearCartHandler}>
          clear shopping cart
        </button>
      </div>
      {cartdata.length > 0 && <CartTotals />}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .link-container {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
  }
  .link-btn {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    background: var(--clr-primary-5);
    color: var(--clr-white);
    border-radius: var(--radius);
    letter-spacing: var(--spacing);
    font-weight: 400;
    cursor: pointer;
  }
  .clear-btn {
    background: var(--clr-black);
  }
`;
export default CartContent;
