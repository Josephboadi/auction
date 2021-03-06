import React, { Fragment, useState, useEffect } from "react";
import "./UpdatePassword.css";
import Loader1 from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors_seller,
  updatePassword_seller,
} from "../../redux/actions/sellerAction";
// import { useAlert } from 'react-alert';
import { UPDATE_PASSWORD_RESET_SELLER } from "../../redux/constants/sellerConstants";
import MetaData from "../layout/MetaData";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Notification from "../Notification";

const UpdatePassword = ({ history }) => {
  const dispatch = useDispatch();
  // const alert = useAlert();

  const { error, isUpdated, loading } = useSelector(
    (state) => state.profileSeller
  );

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword_seller(myForm));
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

    if (isUpdated) {
      // alert.success('Profile Updated Successfully');
      setNotify({
        isOpen: true,
        message: "Profile Updated Successfully",
        type: "success",
      });
      history?.push("/account");

      dispatch({
        type: UPDATE_PASSWORD_RESET_SELLER,
      });
    }
  }, [dispatch, error, history, isUpdated]);

  return (
    <Fragment>
      {loading ? (
        <Loader1 />
      ) : (
        <Fragment>
          <MetaData title="Change Password" />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Profile</h2>

              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword">
                  <VpnKeyIcon />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Change"
                  className="updatePasswordBtn"
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

export default UpdatePassword;
