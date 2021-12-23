import React from "react";
import styled from "styled-components";
import logo from "../assets/react.png";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { links } from "../utils/constants";
import CartButtons from "./CartButtons";
import { useProductsContext } from "../context/products_context";
import { useSelector } from "react-redux";
// import { useUserContext } from '../context/user_context';

const Nav = () => {
  const { openSidebar } = useProductsContext();
  // const { myUser } = useUserContext();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <NavContainer>
      <div>
        <div className="nav-center">
          <div className="nav-header">
            <Link to="/">
              <img
                src={logo}
                alt="react ecom"
                style={{ width: 65, height: 65 }}
              />
            </Link>
            <button type="button" className="nav-toggle" onClick={openSidebar}>
              <FaBars />
            </button>
          </div>
          <ul className="nav-links">
            {links.map((link) => {
              const { id, text, url } = link;
              return (
                <li key={id}>
                  <Link to={url}>{text}</Link>
                </li>
              );
            })}
            {/* {isAuthenticated && (
              <li>
                <Link to="/shipping">checkout</Link>
              </li>
            )} */}
          </ul>
          <CartButtons />
        </div>
      </div>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  height: 5rem;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  background: linear-gradient(270deg, #f5f4b0, #ebb3b4, #f3d4c4);
  z-index: 2;
  padding-top: 1rem;

  .nav-center {
    display: flex;
    position: relative;
    justify-content: space-around;
    align-items: space-between;
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
  }
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 175px;
      margin-left: -15px;
    }
  }
  .nav-toggle {
    background: silver;
    border: transparent;
    color: var(--clr-primary-5);
    cursor: pointer;
    svg {
      font-size: 2rem;
    }
  }
  .nav-links {
    display: none;
  }
  .cart-btn-wrapper {
    display: none;
  }
  @media (min-width: 992px) {
    .nav-toggle {
      display: none;
    }
    .nav-center {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
    }
    .nav-links {
      display: flex;
      justify-content: center;
      li {
        margin: 0 0.5rem;
      }
      a {
        color: var(--clr-grey-3);
        font-size: 1rem;
        text-transform: capitalize;
        letter-spacing: var(--spacing);
        padding: 0.5rem;
        &:hover {
          border-bottom: 2px solid var(--clr-primary-7);
        }
      }
    }
    .cart-btn-wrapper {
      display: grid;
    }
  }

  @media (max-width: 992px) {
    .nav-center {
      display: grid;
      position: relative;
      // width: 109vw;
      grid-template-columns: auto 1fr auto;
      align-items: space-evenly;
      justify-content: space-evenly;
    }
    img {
      display: none;
    }
  }
`;

export default Nav;
