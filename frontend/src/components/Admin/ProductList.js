import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from "../../redux/actions/productAction";
import { Link } from "react-router-dom";
// import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from "../../redux/constants/productConstants";
import Notification from "../Notification";
import Navbar from "./navbar/Navbar";

const ProductList = ({ history }) => {
  const dispatch = useDispatch();

  // const alert = useAlert();

  const { error, products } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.seller);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  let id = user._id;

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

    if (deleteError) {
      // alert.error(deleteError);
      setNotify({
        isOpen: true,
        message: deleteError,
        type: "error",
      });
      dispatch(clearErrors());
    }

    if (isDeleted) {
      // alert.success("Product Deleted Successfully");
      setNotify({
        isOpen: true,
        message: "Product Deleted Successfully",
        type: "success",
      });
      history.push("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct(id));
  }, [dispatch, error, deleteError, history, isDeleted]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
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
          <Fragment>
            <Link to={`/admin/product/${params?.getValue(params?.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(params?.getValue(params?.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products?.forEach((item) => {
      rows.push({
        id: item?._id,
        stock: item?.Stock,
        price: item?.price,
        name: item?.name,
      });
    });

  return (
    <Fragment>
      {/* <Navbar /> */}
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <p style={{ fontSize: 15, color: "#5FABA5" }}>Add</p>
            <div
              className="AddIcon"
              style={{
                width: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
                border: "2px solid #5FABA5",
                borderRadius: "100%",
                boxShadow: "border-box",
                margin: 20,
                marginTop: 0,
                marginRight: 50,
                marginLeft: 10,
              }}
            >
              <Link to="/admin/product">
                <AddIcon fontSize={"large"} className="iconColor" />
              </Link>
            </div>
          </div>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={8}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </Fragment>
  );
};

export default ProductList;
