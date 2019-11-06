import {combineReducers} from 'redux';
import usersListReducer from "./usersList";
import userCardReducer from "./userCard";
import loadingReducer from "./loading";

export default combineReducers({
  usersList : usersListReducer,
  userCard: userCardReducer,
  loading: loadingReducer
})
