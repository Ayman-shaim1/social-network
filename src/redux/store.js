import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { userLoginReducer, userRegisterReducer } from "./user/userReducers";
import {
  postCreateReducer,
  postListReducer,
  postRemoveReducer,
} from "./post/postReducers";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const reducer = combineReducers({
  // user :
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  // post :
  postList: postListReducer,
  postCreate: postCreateReducer,
  postRemove: postRemoveReducer,
});

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
