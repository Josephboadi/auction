import React from "react";
import { useProductsContext } from "../context/products_context";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Carousel from "react-material-ui-carousel";
import Error from "./Error";
import Loading1 from "./layout/Loader/Loader";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import Product from "./Product";
// import fProduct from './FProduct';
import FProduct from "./FProduct";

const FeaturedProducts = ({ data }) => {
  console.log(data);
  const {
    products_loading: loading,
    products_error: error,
    featured_products: featured,
  } = useProductsContext();
  if (loading) {
    return <Loading1 />;
  }
  if (error) {
    return <Error />;
  }

  console.log(featured);
  return (
    <Wrapper className="section">
      <div className="title">
        <h2>featured products</h2>
        <div className="underline"></div>
      </div>
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        totalSlides={2}
      >
        {/* <div className="section-center featured">
          {featured.slice(0, 6).map((product) => {
            return <Product key={product.id} {...product} />;
          })}
        </div> */}
        <div className="section-center featured">
          {data?.slice(0, 3).map((fproduct) => {
            return <FProduct key={fproduct.id} {...fproduct} />;
          })}
        </div>
      </CarouselProvider>
      <Link to="/products" className="btn">
        all products
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`;

export default FeaturedProducts;
