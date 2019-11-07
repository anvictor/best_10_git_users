import InitialState from '../constants/initialState';
import * as types from '../constants/actions';

export default function usersListlReducers(state = {
  usersList: InitialState.usersList,
  isErrorVisible: InitialState.isErrorVisible
}, action) {

  switch (action.type) {

    case types.REFRESH_USERS_LIST:
      return {...state, usersList: action.payload };
    case types.THROW_ERROR_MESSAGE:
      return {...state, isErrorVisible: true};
    case types.HIDE_ERROR_MESSAGE:
      return {...state, isErrorVisible: false};

    default:
      return state
  }
}


