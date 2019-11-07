import {combineReducers} from 'redux';
import userCardReducers from "./userCard";
import usersListReducers from "./usersList";

export default combineReducers({
  userCard : userCardReducers,
  usersList : usersListReducers,
})
