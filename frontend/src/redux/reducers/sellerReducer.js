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
  UPDATE_PROFILE_RESET_SELLER,
  UPDATE_PASSWORD_REQUEST_SELLER,
  UPDATE_PASSWORD_SUCCESS_SELLER,
  UPDATE_PASSWORD_RESET_SELLER,
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
  DELETE_USER_RESET_SELLER,
  UPDATE_USER_REQUEST_SELLER,
  UPDATE_USER_SUCCESS_SELLER,
  UPDATE_USER_FAIL_SELLER,
  UPDATE_USER_RESET_SELLER,
  USER_DETAILS_REQUEST_SELLER,
  USER_DETAILS_SUCCESS_SELLER,
  USER_DETAILS_FAIL_SELLER,
  CLEAR_ERRORS_SELLER,
} from "../constants/sellerConstants";

export const userSellerReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST_SELLER:
    case REGISTER_USER_REQUEST_SELLER:
    case LOAD_USER_REQUEST_SELLER:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS_SELLER:
    case REGISTER_USER_SUCCESS_SELLER:
    case LOAD_USER_SUCCESS_SELLER:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case LOGOUT_SUCCESS_SELLER:
      return {
        loading: false,
        user: null,
        isAuthenticated: false,
      };
    case LOGIN_FAIL_SELLER:
    case REGISTER_USER_FAIL_SELLER:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case LOAD_USER_FAIL_SELLER:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case LOGOUT_FAIL_SELLER:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS_SELLER:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const profileSellerReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST_SELLER:
    case UPDATE_PASSWORD_REQUEST_SELLER:
    case UPDATE_USER_REQUEST_SELLER:
    case DELETE_USER_REQUEST_SELLER:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PROFILE_SUCCESS_SELLER:
    case UPDATE_PASSWORD_SUCCESS_SELLER:
    case UPDATE_USER_SUCCESS_SELLER:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_USER_SUCCESS_SELLER:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
        message: action.payload.message,
      };

    case UPDATE_PROFILE_FAIL_SELLER:
    case UPDATE_PASSWORD_FAIL_SELLER:
    case UPDATE_USER_FAIL_SELLER:
    case DELETE_USER_FAIL_SELLER:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_PROFILE_RESET_SELLER:
    case UPDATE_PASSWORD_RESET_SELLER:
    case UPDATE_USER_RESET_SELLER:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_USER_RESET_SELLER:
      return {
        ...state,
        isDeleted: false,
      };

    case CLEAR_ERRORS_SELLER:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const forgotPasswordSellerReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST_SELLER:
    case RESET_PASSWORD_REQUEST_SELLER:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FORGOT_PASSWORD_SUCCESS_SELLER:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };

    case RESET_PASSWORD_SUCCESS_SELLER:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };

    case FORGOT_PASSWORD_FAIL_SELLER:
    case RESET_PASSWORD_FAIL_SELLER:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS_SELLER:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const allUsersSellerReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ALL_USERS_REQUEST_SELLER:
      return {
        ...state,
        loading: true,
      };
    case ALL_USERS_SUCCESS_SELLER:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case ALL_USERS_FAIL_SELLER:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS_SELLER:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const userDetailsSellerReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST_SELLER:
      return {
        ...state,
        loading: true,
      };
    case USER_DETAILS_SUCCESS_SELLER:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case USER_DETAILS_FAIL_SELLER:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS_SELLER:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
