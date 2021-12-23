import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./myOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../redux/actions/orderAction";
import Loader1 from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
// import { useAlert } from 'react-alert';
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import LaunchIcon from "@material-ui/icons/Launch";
import Notification from "../Notification";
import { Footer, Loading, Navbar } from "..";

const MyOrders = () => {
  const dispatch = useDispatch();

  // const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  console.log(user);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params?.getValue(params?.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params?.getValue(params?.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item?.orderItems?.length,
        id: item?._id,
        status: item?.orderStatus,
        amount: item?.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      // alert.error(error);
      setNotify({
        isOpen: true,
        message: error,
        type: "error",
      });
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, error]);

  return (
    <Fragment>
      {/* <Navbar /> */}
      <MetaData title={`${user?.name} - Orders`} />

      {loading ? (
        <Loader1 />
      ) : (
        // <Loading />
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />

          <Typography id="myOrdersHeading">{user?.name}'s Orders</Typography>
        </div>
      )}
      <Notification notify={notify} setNotify={setNotify} />
      {/* <Footer /> */}
    </Fragment>
  );
};

export default MyOrders;