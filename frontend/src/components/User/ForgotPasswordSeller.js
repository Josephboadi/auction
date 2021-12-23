import React, { Fragment, useState, useEffect } from "react";
import "./ForgotPassword.css";
import Loader1 from "../layout/Loader/Loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors_seller,
  forgotPassword_seller,
} from "../../redux/actions/sellerAction";
// import { useAlert } from 'react-alert';
import MetaData from "../layout/MetaData";
import Notification from "../Notification";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  // const alert = useAlert();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPasswordSeller
  );

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPassword_seller(myForm));
  };

  useEffect(() => {
    if (error) {
      // alert.error(error);
      setNotify({
        isOpen: true,
        message: error,
        type: "error",
      });
      dispatch(clearErrors_seller());
    }

    if (message) {
      // alert.success(message);
      setNotify({
        isOpen: true,
        message: message,
        type: "success",
      });
    }
  }, [dispatch, error, message]);

  return (
    <Fragment>
      {loading ? (
        <Loader1 />
      ) : (
        <Fragment>
          <MetaData title="Forgot Password" />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>

              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgotPasswordEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
      <Notification notify={notify} setNotify={setNotify} />
    </Fragment>
  );
};

export default ForgotPassword;
