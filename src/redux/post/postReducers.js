import {
  POST_CREATE_FAIL,
  POST_CREATE_REQUEST,
  POST_CREATE_RESET,
  POST_CREATE_SUCCESS,
  POST_GET_LIST_FAIL,
  POST_GET_LIST_REQUEST,
  POST_GET_LIST_RESET,
  POST_GET_LIST_SUCCESS,
  POST_REMOVE_FAIL,
  POST_REMOVE_REQUEST,
  POST_REMOVE_RESET,
  POST_REMOVE_SUCCESS,
  POST_GET_LIST_UPDATE_TOGGLE_LIKE,
  POST_GET_LIST_UPDATE_ADD_POST,
  POST_GET_LIST_UPDATE_DELETE_POST,
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

export const postListReducer = (state = { posts: [] }, action) => {
  const { payload, type } = action;
  switch (type) {
    case POST_GET_LIST_REQUEST:
      return { loading: true, posts: [] };
    case POST_GET_LIST_SUCCESS:
      return { loading: false, posts: payload };

    case POST_GET_LIST_UPDATE_ADD_POST:
      return { success: true, posts: [payload, ...state.posts] };
    case POST_GET_LIST_UPDATE_DELETE_POST:
      return {
        success: true,
        posts: state.posts.filter(post => String(post.id) !== String(payload)),
      };
    case POST_GET_LIST_UPDATE_TOGGLE_LIKE:
      return {
        posts: state.posts.map(post => {
          if (post.id === payload.id) {
            post.likes = payload.likes;
            return post;
          } else {
            return post;
          }
        }),
        success: true,
      };

    case POST_GET_LIST_FAIL:
      return { loading: false, errors: payload, posts: [] };
    case POST_GET_LIST_RESET:
      return { posts: [] };
    default:
      return state;
  }
};

export const postGetByIdReducer = (state = {}, action) => {
  const { payload, type } = action;
  switch (type) {
    case POST_GET_BY_ID_REQUEST:
      return { loading: true };
    case POST_GET_BY_ID_SUCCESS:
      return { loading: false, post: payload, success: true };
    case POST_GET_BY_ID_UPDATE_TOGGLE_LIKE:
      return {
        loading: false,
        post: { ...state.post, likes: payload },
        success: true,
      };

    case POST_GET_BY_ID_UPDATE_COMMENT:
      return {
        loading: false,
        post: { ...state.post, comments: payload },
        success: true,
      };

    case POST_GET_BY_ID_UPDATE_DELETE_COMMENT:
      return {
        loading: false,
        post: { ...state.post, comments: payload },
        success: true,
      };
    case POST_GET_BY_ID_FAIL:
      return { loading: false, errors: payload };
    case POST_GET_BY_ID_RESET:
      return {};
    default:
      return state;
  }
};

export const postCreateReducer = (state = {}, action) => {
  const { payload, type } = action;
  switch (type) {
    case POST_CREATE_REQUEST:
      return { loading: true };
    case POST_CREATE_SUCCESS:
      return { loading: false, posts: payload, success: true };
    case POST_CREATE_FAIL:
      return { loading: false, errors: payload };
    case POST_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const postRemoveReducer = (state = {}, action) => {
  const { payload, type } = action;
  switch (type) {
    case POST_REMOVE_REQUEST:
      return { loading: true };
    case POST_REMOVE_SUCCESS:
      return { loading: false, message: payload, success: true };
    case POST_REMOVE_FAIL:
      return { loading: false, errors: payload };
    case POST_REMOVE_RESET:
      return {};
    default:
      return state;
  }
};

export const postToggleLikeReducer = (state = {}, action) => {
  const { payload, type } = action;
  switch (type) {
    case POST_TOGGLE_LIKE_REQUEST:
      return { loading: true };
    case POST_TOGGLE_LIKE_SUCCESS:
      return { loading: false, success: true };
    case POST_TOGGLE_LIKE_FAIL:
      return { loading: false, errors: payload };
    case POST_TOGGLE_LIKE_RESET:
      return {};
    default:
      return state;
  }
};

export const postAddCommentReducer = (state = {}, action) => {
  const { payload, type } = action;
  switch (type) {
    case POST_ADD_COMMENT_REQUEST:
      return { loading: true };
    case POST_ADD_COMMENT_SUCCESS:
      return { loading: false, success: true };
    case POST_ADD_COMMENT_FAIL:
      return { loading: false, errors: payload };
    case POST_ADD_COMMENT_RESET:
      return {};
    default:
      return state;
  }
};

export const postRemoveCommentReducer = (state = {}, action) => {
  const { payload, type } = action;
  switch (type) {
    case POST_REMOVE_COMMENT_REQUEST:
      return { loading: true };
    case POST_REMOVE_COMMENT_SUCCESS:
      return { loading: false, success: true };
    case POST_REMOVE_COMMENT_FAIL:
      return { loading: false, errors: payload };
    case POST_REMOVE_COMMENT_RESET:
      return {};
    default:
      return state;
  }
};
