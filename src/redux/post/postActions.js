import {
  POST_CREATE_FAIL,
  POST_CREATE_REQUEST,
  POST_CREATE_RESET,
  POST_CREATE_SUCCESS,
  POST_GET_LIST_FAIL,
  POST_GET_LIST_REQUEST,
  POST_GET_LIST_RESET,
  POST_GET_LIST_SUCCESS,
  POST_LIST_UPDATE_ADD_POST,
  POST_LIST_UPDATE_DELETE_POST,
  POST_REMOVE_FAIL,
  POST_REMOVE_REQUEST,
  POST_REMOVE_RESET,
  POST_REMOVE_SUCCESS,
} from "./postTypes";
import axios from "axios";

export const getPosts = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: POST_GET_LIST_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get("/api/posts", config);
      dispatch({ type: POST_GET_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: POST_GET_LIST_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
};

export const resetGetPosts = () => {
  return { type: POST_GET_LIST_RESET };
};

export const createPost = content => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: POST_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/posts",
        { content: content },
        config
      );

      dispatch({
        type: POST_CREATE_SUCCESS,
        payload: data,
      });

      dispatch({
        type: POST_LIST_UPDATE_ADD_POST,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: POST_CREATE_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
};

export const resetCreatePost = () => {
  return { type: POST_CREATE_RESET };
};

export const removePost = id => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: POST_REMOVE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.delete(`/api/posts/${id}`, config);

      dispatch({
        type: POST_REMOVE_SUCCESS,
        payload: data,
      });

      dispatch({
        type: POST_LIST_UPDATE_DELETE_POST,
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: POST_REMOVE_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
};

export const resetRemovePost = () => {
  return { type: POST_REMOVE_RESET };
};
