import React, { Fragment, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useProductsContext } from "../context/products_context";
import { single_product_url as url } from "../utils/constants";
import { formatPrice } from "../utils/helpers";
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from "../components";
import { DataGrid } from "@material-ui/data-grid";
import ReviewCard from "./ReviewCard.js";
import { Rating } from "@material-ui/lab";
import "./ProductDetails.css";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  createBid,
  getAllProductBids,
  getAutoBid,
  getProductDetails,
  newReview,
} from "../redux/actions/productAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { NEW_REVIEW_RESET } from "../redux/constants/productConstants";
import { clearErrors } from "../redux/actions/userAction";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Timer from "../components/Timer";
import EditIcon from "@material-ui/icons/Edit";

const bidData = [
  {
    customer: "Joseph",
    pName: "Sumsung",
    amount: 1000,
  },
  {
    customer: "John",
    pName: "Dell Laptop",
    amount: 2000,
  },
  {
    customer: "Richard",
    pName: "Iphone",
    amount: 1500,
  },
];

const SingleProductPage = () => {
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { autoBidInfo } = useSelector((state) => state.autoBid);
  const { id } = useParams();
  const history = useHistory();

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  // console.log(product);

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [bidAmount, setBidAmount] = useState(product?.currentBidPrice);

  const [comment, setComment] = useState("");
  const [bidData, setBidData] = useState([]);
  const [timerDays, setTimerDays] = useState();
  const [timerHours, setTimerHours] = useState();
  const [timerMinutes, setTimerMinutes] = useState();
  const [timerSeconds, setTimerSeconds] = useState();

  let interval;

  const startTimer = () => {
    const countDownDate = new Date(product.closeDate).getTime();

    interval = setInterval(() => {
      const now = new Date().getTime();

      const distance = countDownDate - now;

      const days = Math.floor(distance / (24 * 60 * 60 * 1000));
      const hours = Math.floor(
        (distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60));
      const seconds = Math.floor((distance % (60 * 1000)) / 1000);

      if (distance < 0) {
        clearInterval(interval.current);
      } else {
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    });
  };

  useEffect(() => {
    startTimer();
  }, []);
  // const {
  //   single_product_loading: loading,
  //   single_product_error: error,
  //   single_product: product,
  //   fetchSingleProduct,
  // } = useProductsContext()

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  // console.log(bidData);

  useEffect(() => {
    if (error) {
      // alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      // alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      // alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
    dispatch(getAutoBid());
  }, []);

  // console.log(bidAmount + 1);
  let autoamt = parseInt(bidAmount) + 1;
  console.log(autoamt);

  const submitBidHandler = () => {
    const bidData = {
      bidAmount: bidAmount,
      bidType: "normal",
      product: product?._id,
      user: user?._id,
    };

    dispatch(createBid(bidData));

    if (product.autoBid && isAuthenticated) {
      const bidData = {
        bidAmount: autoamt,
        bidType: "Auto",
        product: product?._id,
        user: autoBidInfo[0]?.user?._id,
      };
      dispatch(createBid(bidData));
    }

    dispatch(getProductDetails(id));
    // dispatch(getAllProductBids(id));
  };

  useEffect(() => {
    setBidData(product);
  }, [bidData, setBidData, product]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        history.push("/");
      }, 3000);
    }
    // eslint-disable-next-line
  }, [error]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  const {
    name,
    price,
    description,
    Stock,
    stars,
    reviews,
    _id: sku,
    // company,
    images,
  } = product;

  const columns = [
    { field: "id", headerName: "ID", minWidth: 150, flex: 0.1 },
    { field: "customer", headerName: "Customer", minWidth: 180, flex: 0.2 },

    {
      field: "pname",
      headerName: "Product",
      minWidth: 150,
      flex: 0.2,
    },
    {
      field: "bid",
      headerName: "Bid",
      // type: "number",
      minWidth: 150,
      flex: 0.2,
    },

    {
      field: "actions",
      flex: 0.1,
      headerName: "Actions",
      minWidth: 150,
      // type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link>
              <EditIcon />
            </Link>

            {/* <Button
              onClick={() =>
                deleteProductHandler(params?.getValue(params?.id, 'id'))
              }>
              <DeleteIcon />
            </Button> */}
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  bidData.bids &&
    bidData?.bids?.forEach((item) => {
      rows.push({
        id: item?._id,
        customer: item?.user.name,
        pname: bidData.name,
        bid: item?.bidAmount,
      });
    });

  return (
    <>
      {/* className="product-center" */}
      <Navbar />
      <Wrapper>
        <PageHero title={name} product />
        <div className="section section-center page">
          <Link to="/products" className="btn" style={{ marginBottom: 10 }}>
            back to products
          </Link>
          <div>
            <ProductImages images={images} />
            <section className="content" style={{ marginTop: 40 }}>
              <h2>{name}</h2>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
                <button onClick={submitReviewToggle} className="submitReview">
                  Submit Review
                </button>
              </div>
              <div className="bidSection section-center section">
                <div className="productInfo">
                  <h5 className="price" style={{ marginTop: 15 }}>
                    {" "}
                    {formatPrice(price)}
                  </h5>
                  <p className="desc"> {description}</p>
                  <p className="info">
                    <span>Status : </span>
                    {product.openDate <= new Date()
                      ? "Bidding in Progress"
                      : product.closeDate >= new Date()
                      ? "Bidding Completed"
                      : "Bidding Pending"}
                  </p>

                  <Timer
                    timerDays={timerDays}
                    timerHours={timerHours}
                    timerMinutes={timerMinutes}
                    timerSeconds={timerSeconds}
                  />
                  <div className="bidContainer">
                    <div className="amountText">
                      <p>Amount</p>
                    </div>

                    <div className="bidInputContainer">
                      <input
                        type="number"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        className="bidInput"
                      />
                    </div>
                    <div className="btn-container">
                      <Link to="#" className="btn" onClick={submitBidHandler}>
                        Submit Bid
                      </Link>
                    </div>
                  </div>
                  {/* {Stock > 0 && <AddToCart product={product} />} */}
                </div>
                <div className="customerBidInfo">
                  <div className="customerBidInfoTable">
                    <h3 style={{}}>Customers Bidding Infomation</h3>
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      pageSize={4}
                      disableSelectionOnClick
                      className="productListTable"
                      autoHeight
                    />
                  </div>
                </div>
              </div>
              <hr style={{ marginTop: 20 }} />
            </section>
          </div>
          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </div>
      </Wrapper>
      <Footer />
    </>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
