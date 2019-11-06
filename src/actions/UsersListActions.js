import * as types from '../constants/actions';

export const refreshUsersList = (arrayOfUsers) => {
  return {type: types.REFRESH_USERS_LIST, payload: arrayOfUsers}
};
export const throwErrorMessage = (error) => {
  return {type: types.THROW_ERROR_MESSAGE, payload: error}
};
export const hideErrorMessage = () => {
  return {type: types.HIDE_ERROR_MESSAGE}
};

