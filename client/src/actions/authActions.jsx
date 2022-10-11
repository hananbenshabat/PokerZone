import axios from "axios";
import { returnStatus } from "./statusActions";

import {
  UPDATE_SUCCESS,
  UPDATE_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_SUCCESS,
  AUTH_FAIL,
  LOGOUT_SUCCESS,
  IS_LOADING,
} from "./types";

// Check if user is already logged in
export const isAuth = () => (dispatch) => {
  axios
    .get("/api/users/authchecker", {
      withCredentials: true,
    })
    .then((res) =>
      dispatch({
        type: AUTH_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch({
        type: AUTH_FAIL,
      });
    });
};

// Updates an existing User
export const update = (user) => (dispatch) => {
  // Headers
  const headers = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request body
  const body = JSON.stringify({ user });

  axios
    // .put("/api/users/authchecker", body, headers)
    .put("/api/users/update", body, headers)
    .then((res) => {
      dispatch({
        type: UPDATE_SUCCESS,
        payload: res.data,
      });
      // dispatch(returnStatus(res.data, res.status, UPDATE_SUCCESS));
      // dispatch({ type: UPDATE_SUCCESS });
    })
    .catch((err) => {
      dispatch(
        returnStatus(err.response.data, err.response.status, UPDATE_FAIL)
      );
      dispatch({
        type: UPDATE_FAIL,
      });
    });
};

// Register New User
export const register =
  ({ name, email, password }) =>
  (dispatch) => {
    // Headers
    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Request body
    const body = JSON.stringify({ name, email, password });

    axios
      .post("/api/users/register", body, headers)
      .then((res) => {
        dispatch(returnStatus(res.data, res.status, REGISTER_SUCCESS));
        dispatch({ type: IS_LOADING });
      })
      .catch((err) => {
        dispatch(
          returnStatus(err.response.data, err.response.status, REGISTER_FAIL)
        );
        dispatch({
          type: REGISTER_FAIL,
        });
        dispatch({ type: IS_LOADING });
      });
  };

// Login User
export const login =
  ({ email, password }) =>
  (dispatch) => {
    // Headers
    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Request body
    const body = JSON.stringify({ email, password });

    axios
      .post("/api/users/login", body, headers)
      .then((res) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
        dispatch({ type: IS_LOADING });
      })
      .catch((err) => {
        dispatch(
          returnStatus(err.response.data, err.response.status, LOGIN_FAIL)
        );
        dispatch({
          type: LOGIN_FAIL,
        });
        dispatch({ type: IS_LOADING });
      });
  };

// Logout User and Destroy session
export const logout = () => (dispatch) => {
  axios
    .delete("/api/users/logout", {
      withCredentials: true,
    })
    .then((res) =>
      dispatch({
        type: LOGOUT_SUCCESS,
      })
    )
    .catch((err) => {
      console.log(err);
    });
};
