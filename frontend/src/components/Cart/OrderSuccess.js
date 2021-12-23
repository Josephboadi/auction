import React from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import './orderSuccess.css';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const OrderSuccess = () => {
  return (
    <>
      <Navbar />
      <div className="orderSuccess">
        <CheckCircleIcon />

        <Typography>Your Order has been Placed successfully </Typography>
        <Link to="/orders">View Orders</Link>
      </div>
      <Footer />
    </>
  );
};

export default OrderSuccess;
