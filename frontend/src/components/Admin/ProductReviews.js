import React, { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import './productReviews.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  clearErrors,
  getAllReviews,
  deleteReviews,
} from '../../redux/actions/productAction';
// import { useAlert } from "react-alert";
import { Button } from '@material-ui/core';
import MetaData from '../layout/MetaData';
import DeleteIcon from '@material-ui/icons/Delete';
import Star from '@material-ui/icons/Star';

import SideBar from './Sidebar';
import { DELETE_REVIEW_RESET } from '../../redux/constants/productConstants';
import Notification from '../Notification';
import Navbar from './navbar/Navbar';

const ProductReviews = ({ history }) => {
  const dispatch = useDispatch();

  // const alert = useAlert();

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );

  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );

  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });

  const [productId, setProductId] = useState('');

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, productId));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
    if (error) {
      // alert.error(error);
      setNotify({
        isOpen: true,
        message: error,
        type: 'error',
      });
      dispatch(clearErrors());
    }

    if (deleteError) {
      // alert.error(deleteError);
      setNotify({
        isOpen: true,
        message: deleteError,
        type: 'error',
      });
      dispatch(clearErrors());
    }

    if (isDeleted) {
      // alert.success("Review Deleted Successfully");
      setNotify({
        isOpen: true,
        message: 'Review Deleted Successfully',
        type: 'success',
      });
      history.push('/admin/reviews');
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, deleteError, history, isDeleted, productId]);

  const columns = [
    { field: 'id', headerName: 'Review ID', minWidth: 200, flex: 0.5 },

    {
      field: 'user',
      headerName: 'User',
      minWidth: 200,
      flex: 0.5,
    },

    {
      field: 'comment',
      headerName: 'Comment',
      minWidth: 250,
      flex: 0.5,
    },

    {
      field: 'rating',
      headerName: 'Rating',
      type: 'number',
      minWidth: 180,
      flex: 0.4,

      cellClassName: (params) => {
        return params.getValue(params.id, 'rating') >= 3
          ? 'greenColor'
          : 'redColor';
      },
    },

    {
      field: 'actions',
      flex: 0.3,
      headerName: 'Actions',
      minWidth: 150,
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button
              onClick={() =>
                deleteReviewHandler(params.getValue(params.id, 'id'))
              }>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  return (
    <Fragment>
      {/* <Navbar /> */}
      <MetaData title={`ALL REVIEWS - Admin`} />
      {/* <Navbar /> */}
      <div className="dashboard">
        {/* <Navbar /> */}
        <SideBar />
        {/* <Navbar /> */}
        <div className="productReviewsContainer">
          <form
            className="productReviewsForm"
            onSubmit={productReviewsSubmitHandler}>
            <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

            <div>
              <Star />
              <input
                type="text"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              style={{ background: '#5FABA5' }}
              disabled={
                loading ? true : false || productId === '' ? true : false
              }>
              Search
            </Button>
          </form>

          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          ) : (
            <h1 className="productReviewsFormHeading">No Reviews Found</h1>
          )}
        </div>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </Fragment>
  );
};

export default ProductReviews;
