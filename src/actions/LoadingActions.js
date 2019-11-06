import * as types from '../constants/actions';

export const showLoading = () => {
  return {type: types.SHOW_LOADING}
};
export const hideLoading = () => {
  return {type: types.HIDE_LOADING}
};


