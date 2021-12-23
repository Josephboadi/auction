import React from "react";
import { FaShoppingCart, FaUserMinus, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useProductsContext } from "../context/products_context";
import { useCartContext } from "../context/cart_context";
// import { useUserContext } from '../context/user_context';
import { useSelector } from "react-redux";

const CartButtons = ({ history }) => {
  const { closeSidebar } = useProductsContext();
  // const { total_items, clearCart } = useCartContext();
  // const { loginWithRedirect, myUser, logout } = useUserContext();
  const userAuth = useSelector((state) => state.user);

  const sellerAuth = useSelector((state) => state.seller);

  const { cartItems } = useSelector((state) => state.cart);

  // const loginHandler = () => {
  //   history.push('/login');
  // };

  return (
    <Wrapper className="cart-btn-wrapper">
      {/* <Link to="/cart" className="cart-btn" onClick={closeSidebar}>
        Cart
        <span className="cart-container">
          <FaShoppingCart />
          <span className="cart-value">{cartItems?.length}</span>
        </span>
      </Link> */}
      {
        !userAuth.isAuthenticated && (
          <Link to="/login" onClick={closeSidebar}>
            <button type="button" className="auth-btn">
              Login <FaUserPlus style={{ fontSize: "1.5rem" }} />
            </button>
          </Link>

          // <button
          //   type='button'
          //   className='auth-btn'
          //   onClick={() => {
          //     clearCart()
          //     localStorage.removeItem('user')
          //     logout({ returnTo: window.location.origin })
          //   }}
          // >
          //   Logout <FaUserMinus />
          // </button>
        )
        // : (
        // <button type='button' className='auth-btn' onClick={loginWithRedirect}>
        //   Login <FaUserPlus />
        // </button>
        // )
      }
      {/* {
        !sellerAuth.isAuthenticated && (
          <Link to="/seller-login" onClick={closeSidebar}>
            <button type="button" className="auth-btn">
              Seller Login <FaUserPlus />
            </button>
          </Link>

          
      } */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 225px;

  .cart-btn {
    color: var(--clr-grey-1);
    font-size: 1.5rem;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-1);
    display: flex;

    align-items: center;
  }
  .cart-container {
    display: flex;
    align-items: center;
    position: relative;
    svg {
      height: 1.6rem;
      margin-left: 5px;
    }
  }
  .cart-value {
    position: absolute;
    top: -10px;
    right: -16px;
    background: var(--clr-primary-5);
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    color: var(--clr-white);
    padding: 12px;
  }
  .auth-btn {
    display: flex;
    align-items: center;
    background: transparent;
    border-color: transparent;
    font-size: 1rem;
    cursor: pointer;
    color: var(--clr-grey-1);
    letter-spacing: var(--spacing);
    svg {
      margin-left: 5px;
    }
  }
`;
export default CartButtons;
