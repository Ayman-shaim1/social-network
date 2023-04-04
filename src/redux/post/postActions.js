import {
  POST_CREATE_FAIL,
  POST_CREATE_REQUEST,
  POST_CREATE_RESET,
  POST_CREATE_SUCCESS,
  POST_GET_LIST_FAIL,
  POST_GET_LIST_REQUEST,
  POST_GET_LIST_RESET,
  POST_GET_LIST_SUCCESS,
  POST_GET_LIST_UPDATE_ADD_POST,
  POST_GET_LIST_UPDATE_DELETE_POST,
  POST_REMOVE_FAIL,
  POST_REMOVE_REQUEST,
  POST_REMOVE_RESET,
  POST_REMOVE_SUCCESS,
  POST_GET_LIST_UPDATE_TOGGLE_LIKE,
  POST_TOGGLE_LIKE_FAIL,
  POST_TOGGLE_LIKE_REQUEST,
  POST_TOGGLE_LIKE_RESET,
  POST_TOGGLE_LIKE_SUCCESS,
  POST_GET_BY_ID_FAIL,
  POST_GET_BY_ID_REQUEST,
  POST_GET_BY_ID_RESET,
  POST_GET_BY_ID_SUCCESS,
  POST_GET_BY_ID_UPDATE_TOGGLE_LIKE,
  POST_ADD_COMMENT_FAIL,
  POST_ADD_COMMENT_REQUEST,
  POST_ADD_COMMENT_RESET,
  POST_ADD_COMMENT_SUCCESS,
  POST_REMOVE_COMMENT_FAIL,
  POST_REMOVE_COMMENT_REQUEST,
  POST_REMOVE_COMMENT_RESET,
  POST_REMOVE_COMMENT_SUCCESS,
  POST_GET_BY_ID_UPDATE_COMMENT,
  POST_GET_BY_ID_UPDATE_DELETE_COMMENT,
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

export const getPostById = id => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: POST_GET_BY_ID_REQUEST,
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

      const { data } = await axios.get(`/api/posts/${id}`, config);
      dispatch({ type: POST_GET_BY_ID_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: POST_GET_BY_ID_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
};

export const resetGetPostById = () => {
  return { type: POST_GET_BY_ID_RESET };
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
        type: POST_GET_LIST_UPDATE_ADD_POST,
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
        type: POST_GET_LIST_UPDATE_DELETE_POST,
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

export const toggleLike = id => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: POST_TOGGLE_LIKE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const {
        postGetById: { post },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/posts/togglelike/${id}`,
        {},
        config
      );
      console.log(data);

      dispatch({
        type: POST_TOGGLE_LIKE_SUCCESS,
      });

      dispatch({
        type: POST_GET_LIST_UPDATE_TOGGLE_LIKE,
        payload: { id, likes: data },
      });
      if (post) {
        dispatch({
          type: POST_GET_BY_ID_UPDATE_TOGGLE_LIKE,
          payload: data,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: POST_TOGGLE_LIKE_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
};

export const resetToggleLikePost = () => {
  return { type: POST_TOGGLE_LIKE_RESET };
};

export const addComment = (id, content) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: POST_ADD_COMMENT_REQUEST,
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
        `/api/posts/comment/${id}`,
        { content: content },
        config
      );

      dispatch({
        type: POST_ADD_COMMENT_SUCCESS,
      });

      dispatch({
        type: POST_GET_BY_ID_UPDATE_COMMENT,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: POST_ADD_COMMENT_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
};

export const resetAddComment = () => {
  return { type: POST_ADD_COMMENT_RESET };
};

export const removeComment = (idPost, idComment) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: POST_REMOVE_COMMENT_REQUEST,
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

      const { data } = await axios.delete(
        `/api/posts/${idPost}/comment/${idComment}`,
        config
      );
      console.log(data);

      dispatch({
        type: POST_REMOVE_COMMENT_SUCCESS,
      });

      dispatch({
        type: POST_GET_BY_ID_UPDATE_DELETE_COMMENT,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: POST_REMOVE_COMMENT_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
};

export const resetRemoveComment = () => {
  return { type: POST_REMOVE_COMMENT_RESET };
};
