import {
  LOGIN_REQUEST_SELLER,
  LOGIN_FAIL_SELLER,
  LOGIN_SUCCESS_SELLER,
  REGISTER_USER_REQUEST_SELLER,
  REGISTER_USER_SUCCESS_SELLER,
  REGISTER_USER_FAIL_SELLER,
  LOAD_USER_REQUEST_SELLER,
  LOAD_USER_SUCCESS_SELLER,
  LOAD_USER_FAIL_SELLER,
  LOGOUT_SUCCESS_SELLER,
  LOGOUT_FAIL_SELLER,
  UPDATE_PROFILE_REQUEST_SELLER,
  UPDATE_PROFILE_SUCCESS_SELLER,
  UPDATE_PROFILE_FAIL_SELLER,
  UPDATE_PASSWORD_REQUEST_SELLER,
  UPDATE_PASSWORD_SUCCESS_SELLER,
  UPDATE_PASSWORD_FAIL_SELLER,
  FORGOT_PASSWORD_REQUEST_SELLER,
  FORGOT_PASSWORD_SUCCESS_SELLER,
  FORGOT_PASSWORD_FAIL_SELLER,
  RESET_PASSWORD_REQUEST_SELLER,
  RESET_PASSWORD_SUCCESS_SELLER,
  RESET_PASSWORD_FAIL_SELLER,
  ALL_USERS_REQUEST_SELLER,
  ALL_USERS_SUCCESS_SELLER,
  ALL_USERS_FAIL_SELLER,
  DELETE_USER_REQUEST_SELLER,
  DELETE_USER_SUCCESS_SELLER,
  DELETE_USER_FAIL_SELLER,
  UPDATE_USER_REQUEST_SELLER,
  UPDATE_USER_SUCCESS_SELLER,
  UPDATE_USER_FAIL_SELLER,
  USER_DETAILS_REQUEST_SELLER,
  USER_DETAILS_SUCCESS_SELLER,
  USER_DETAILS_FAIL_SELLER,
  CLEAR_ERRORS_SELLER,
} from "../constants/sellerConstants";
import axios from "axios";

// Login
export const login_seller = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST_SELLER });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/v1/login-seller`,
      { email, password },
      config
    );

    dispatch({ type: LOGIN_SUCCESS_SELLER, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL_SELLER, payload: error.response.data.message });
  }
};

// Register
export const register_seller = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST_SELLER });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      `/api/v1/registerSeller`,
      userData,
      config
    );

    dispatch({ type: REGISTER_USER_SUCCESS_SELLER, payload: data.user });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL_SELLER,
      payload: error.response.data.message,
    });
  }
};

// Load User
export const loadUser_seller = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST_SELLER });

    const { data } = await axios.get(`/api/v1/me-seller`);

    dispatch({ type: LOAD_USER_SUCCESS_SELLER, payload: data.user });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL_SELLER,
      payload: error.response.data.message,
    });
  }
};

// Logout User
export const logout_seller = () => async (dispatch) => {
  try {
    await axios.get(`/api/v1/logout-seller`);

    dispatch({ type: LOGOUT_SUCCESS_SELLER });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL_SELLER,
      payload: error.response.data.message,
    });
  }
};

// Update Profile
export const updateProfile_seller = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST_SELLER });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(
      `/api/v1/me/update-seller`,
      userData,
      config
    );

    dispatch({ type: UPDATE_PROFILE_SUCCESS_SELLER, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL_SELLER,
      payload: error.response.data.message,
    });
  }
};

// Update Password
export const updatePassword_seller = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST_SELLER });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/password/update-seller`,
      passwords,
      config
    );

    dispatch({ type: UPDATE_PASSWORD_SUCCESS_SELLER, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL_SELLER,
      payload: error.response.data.message,
    });
  }
};

// Forgot Password
export const forgotPassword_seller = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST_SELLER });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/v1/password/forgot-seller`,
      email,
      config
    );

    dispatch({ type: FORGOT_PASSWORD_SUCCESS_SELLER, payload: data.message });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL_SELLER,
      payload: error.response.data.message,
    });
  }
};

// Reset Password
export const resetPassword_seller = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST_SELLER });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/password/reset/seller/${token}`,
      passwords,
      config
    );

    dispatch({ type: RESET_PASSWORD_SUCCESS_SELLER, payload: data.success });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL_SELLER,
      payload: error.response.data.message,
    });
  }
};

// get All Users
export const getAllUsers_seller = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST_SELLER });
    const { data } = await axios.get(`/api/v1/admin/sellers`);

    dispatch({ type: ALL_USERS_SUCCESS_SELLER, payload: data.users });
  } catch (error) {
    dispatch({
      type: ALL_USERS_FAIL_SELLER,
      payload: error.response.data.message,
    });
  }
};

// get  User Details
export const getUserDetails_seller = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST_SELLER });
    const { data } = await axios.get(`/api/v1/admin/seller/${id}`);

    dispatch({ type: USER_DETAILS_SUCCESS_SELLER, payload: data.user });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL_SELLER,
      payload: error.response.data.message,
    });
  }
};

// Update User
export const updateUser_seller = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST_SELLER });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/admin/seller/${id}`,
      userData,
      config
    );

    dispatch({ type: UPDATE_USER_SUCCESS_SELLER, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL_SELLER,
      payload: error.response.data.message,
    });
  }
};

// Delete User
export const deleteUser_seller = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST_SELLER });

    const { data } = await axios.delete(`/api/v1/admin/seller/${id}`);

    dispatch({ type: DELETE_USER_SUCCESS_SELLER, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL_SELLER,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors_seller = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS_SELLER });
};
