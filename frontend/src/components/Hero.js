import React from "react";
import styled from "styled-components";
import Carousel from "react-material-ui-carousel";
import { Link } from "react-router-dom";

import heroBcg3 from "../assets/hero.jpg";
import heroBcg4 from "../assets/hero1.jpg";
import heroBcg5 from "../assets/hero2.png";
import heroBcg6 from "../assets/hero5.png";
import heroBcg7 from "../assets/hero6.jpg";

const Hero = () => {
  return (
    <Wrapper>
      <article className="content">
        <h1>
          Get Now <br />
          Very Rare
        </h1>
        <p>Get your rarerest antique at this place.</p>
        <Link to="/products" className="btn hero-btn">
          shop now
        </Link>
      </article>
      <article className="img-container">
        <img
          src={heroBcg6}
          alt="nice table"
          className="main-img"
          style={{
            borderBottomRightRadius: "30%",
            borderTopLeftRadius: "20%",
          }}
        />
      </article>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 60vh;
  width: 100%;
  // margin-top: 5rem;
  left: 0;
  right: 0;
  background: linear-gradient(270deg, #f5f4b0, #ebb3b4, #f3d4c4);
  display: grid;
  place-items: center;
  .img-container {
    display: none;
  }

  p {
    line-height: 2;
    max-width: 35em;
    margin-bottom: 2rem;
    color: var(--clr-grey-2);
    font-size: 1rem;
    margin-left: 3rem;
  }
  h1 {
    margin-left: 3rem;
  }
  .hero-btn {
    margin-left: 3rem;
  }
  @media (min-width: 992px) {
    height: calc(100vh - 5rem);
    grid-template-columns: 1fr 1fr;
    gap: 8rem;
    h1 {
      margin-bottom: 2rem;
    }
    p {
      font-size: 1.25rem;
    }
    .hero-btn {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
    }
    .img-container {
      display: block;
      position: relative;
    }
    .main-img {
      width: 90%;
      height: 550px;
      position: relative;
      border-radius: var(--radius);
      display: block;
      object-fit: contain;
    }
    .accent-img {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 250px;
      transform: translateX(-50%);
      border-radius: var(--radius);
    }
    // .img-container::before {
    //   content: "";
    //   position: absolute;
    //   width: 10%;
    //   height: 80%;
    //   background: var(--clr-primary-9);
    //   bottom: 0%;
    //   left: -8%;
    //   border-radius: var(--radius);
    // }
  }
`;

export default Hero;
