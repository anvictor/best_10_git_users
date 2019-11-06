import * as types from '../constants/actions';
export const refreshUsersList = () =>{return {type: types.REFRESH_USERS_LIST}};
export const throwErrorMessage = () =>{return {type: types.THROW_ERROR_MESSAGE}};
export const hideErrorMessage = () =>{return {type: types.HIDE_ERROR_MESSAGE}};

