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

export const postListReducer = (state = { posts: [] }, action) => {
  const { payload, type } = action;
  switch (type) {
    case POST_GET_LIST_REQUEST:
      return { loading: true, posts: [] };
    case POST_GET_LIST_SUCCESS:
      return { loading: false, posts: payload };

    case POST_LIST_UPDATE_ADD_POST:
      return { success: true, posts: [payload, ...state.posts] };
    case POST_LIST_UPDATE_DELETE_POST:
      return {
        success: true,
        posts: state.posts.filter(post => String(post.id) !== String(payload)),
      };
    // case POST_LIST_UPDATE_LIKE:
    //   return {
    //     posts: state.posts.map(post => {
    //       if (post._id === payload.id) {
    //         post.likes = payload.likes;
    //         return post;
    //       } else {
    //         return post;
    //       }
    //     }),
    //     success: true,
    //   };
    // case POST_LIST_UPDATE_UNLIKE:
    //   return {
    //     success: true,
    //     posts: state.posts.map(post => {
    //       if (post._id === payload.id) {
    //         post.likes = payload.likes;
    //         return post;
    //       } else {
    //         return post;
    //       }
    //     }),
    //   };

    // case POST_GET_LIST_UPDATE_COMMENT:
    //   return {
    //     success: true,
    //     posts: state.posts.map(post => {
    //       if (String(post._id) === String(payload.id)) {
    //         post.comments = payload.comments;
    //         return post;
    //       } else {
    //         return post;
    //       }
    //     }),
    //   };
    // case POST_GET_LIST_UPDATE_DELETE_COMMENT:
    // return {
    //   success: true,
    //   posts: state.posts.map(post => {
    //     if (String(post._id) === String(payload.id)) {
    //       post.comments = payload.comments;
    //       return post;
    //     } else {
    //       return post;
    //     }
    //   }),
    // };

    case POST_GET_LIST_FAIL:
      return { loading: false, errors: payload, posts: [] };
    case POST_GET_LIST_RESET:
      return { posts: [] };
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
