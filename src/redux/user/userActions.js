import { POST_GET_LIST_RESET } from "../post/postTypes";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
} from "./userTypes";
import axios from "axios";

export const register = (name, email, password) => {
  return async dispatch => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const { data } = await axios.post(
        "/api/users/register",
        { name, email, password },
        config
      );

      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
};

export const login = (email, password) => {
  return dispatch => {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    axios
      .post("/api/users/login", { email, password }, config)
      .then(response => {
        const data = response.data;
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
      })
      .catch(error => {
        dispatch({
          type: USER_LOGIN_FAIL,
          payload: error.response.data.errors,
        });
      });
  };
};

export const logout = () => {
  return dispatch => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: POST_GET_LIST_RESET });
  };
};
