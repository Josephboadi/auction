import React, { Fragment, useState, useEffect } from "react";
import "./UpdateProfile.css";
import Loader1 from "../layout/Loader/Loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors_seller,
  updateProfile_seller,
  loadUser_seller,
} from "../../redux/actions/sellerAction";
// import { useAlert } from 'react-alert';
import { UPDATE_PROFILE_RESET_SELLER } from "../../redux/constants/sellerConstants";
import MetaData from "../layout/MetaData";
import Notification from "../Notification";

const UpdateProfile = ({ history }) => {
  const dispatch = useDispatch();
  // const alert = useAlert();

  const { user } = useSelector((state) => state.seller);
  const { error, isUpdated, loading } = useSelector(
    (state) => state.profileSeller
  );

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile_seller(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user?.avatar?.url);
    }

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
      dispatch(loadUser_seller());

      history?.push("/account");

      dispatch({
        type: UPDATE_PROFILE_RESET_SELLER,
      });
    }
  }, [dispatch, error, history, user, isUpdated]);
  return (
    <Fragment>
      {loading ? (
        <Loader1 />
      ) : (
        <Fragment>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
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

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
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

export default UpdateProfile;
