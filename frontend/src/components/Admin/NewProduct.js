import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../redux/actions/productAction";
// import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import ToggleOffIcon from "@material-ui/icons/ToggleOff";
import { DateRangePicker } from "react-date-range";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../redux/constants/productConstants";
import Notification from "../Notification";

import Navbar from "./navbar/Navbar";

const NewProduct = ({ history }) => {
  const dispatch = useDispatch();
  // const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const { user } = useSelector((state) => state.seller);

  // console.log(user);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [targetPrice, setTargetPrice] = useState(0);
  const [openDate, setOpenDate] = useState(new Date());
  const [closeDate, setCloseDate] = useState(new Date());
  const [auctionStatus, setAuctionStatus] = useState("");

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  const status = ["Pending", "Active", "Complete", "Cancelled"];

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

    if (success) {
      // alert.success("Product Created Successfully");
      setNotify({
        isOpen: true,
        message: "Product Created Successfully",
        type: "success",
      });
      history.push("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, history, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    console.log(name, price, description);

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("currentBidPrice", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);
    myForm.set("openDate", openDate);
    myForm.set("closeDate", closeDate);
    myForm.set("targetPrice", targetPrice);
    myForm.set("auctionStatus", auctionStatus);
    myForm.set("id", user._id);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    console.log(myForm);
    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  // const handleSelect = (ranges) => {
  //   setOpenDate(ranges.selection.startDate);
  //   setCloseDate(ranges.selection.endDate);
  // };

  // const selectionRange = {
  //   startDate: openDate,
  //   endDate: closeDate,
  //   key: "selection",
  // };

  return (
    <Fragment>
      {/* <Navbar /> */}
      <MetaData title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>
            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Highest Bid Target"
                required
                value={targetPrice}
                onChange={(e) => setTargetPrice(e.target.value)}
              />
            </div>
            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>
            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <ToggleOffIcon />
              <select onChange={(e) => setAuctionStatus(e.target.value)}>
                <option value="">Choose Auction Status</option>
                {status.map((stat) => (
                  <option key={stat} value={stat}>
                    {stat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                value={Stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div>
              {/* <StorageIcon /> */}
              <label htmlFor="startDte">Start</label>
              <input
                id="startDte"
                type="date"
                placeholder="Start Date"
                required
                value={openDate}
                onChange={(e) => setOpenDate(e.target.value)}
              />
            </div>
            <div>
              {/* <StorageIcon /> */}
              <label htmlFor="endDte">End</label>
              <input
                id="endDte"
                type="date"
                placeholder="End Date"
                required
                value={closeDate}
                onChange={(e) => setCloseDate(e.target.value)}
              />
            </div>
            {/* <div>
              <DateRangePicker
                className="w-auto"
                ranges={[selectionRange]}
                minDate={new Date()}
                rangeColors={["#FD5B61"]}
                onChange={handleSelect}
              />
            </div> */}
            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>
            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>
            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </Fragment>
  );
};

export default NewProduct;
